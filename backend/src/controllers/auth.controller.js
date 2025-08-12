import { registerUser, loginUser,changePassword} from "../services/auth.service.js";

export const register = async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
  
      // Basic validation
      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Name, email, and password are required'
        });
      }
  
      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'Password must be at least 6 characters long'
        });
      }
  
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid email address'
        });
      }
  
      // Role validation (if provided)
      if (role && !['Admin', 'Student', 'Instructor'].includes(role)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid role specified'
        });
      }
  
      const result = await registerUser({ name, email, password, role });
  
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: result
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(400).json({
        success: false,
        message: error.message || 'Registration failed'
      });
    }
  };
  
  // Admin registration (for initial setup or admin use)
  export const registerAdmin = async (req, res) => {
    try {
      const { name, email, password, adminKey } = req.body;
  
      // Check admin key (you can set this in environment variables)
      if (adminKey !== process.env.ADMIN_REGISTRATION_KEY) {
        return res.status(403).json({
          success: false,
          message: 'Invalid admin key'
        });
      }
  
      // Basic validation
      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Name, email, and password are required'
        });
      }
  
      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'Password must be at least 6 characters long'
        });
      }
  
      const result = await registerUser({ name, email, password, role: 'Admin' });
  
      res.status(201).json({
        success: true,
        message: 'Admin registered successfully',
        data: result
      });
    } catch (error) {
      console.error('Admin registration error:', error);
      res.status(400).json({
        success: false,
        message: error.message || 'Admin registration failed'
      });
    }
  };
  
  // Register instructor (can be used by admin or with special key)
  export const registerInstructor = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Check if user is admin (if authenticated) or has instructor key
      const isAdminRequest = req.user && req.user.role === 'Admin';
      const hasInstructorKey = req.body.instructorKey === process.env.INSTRUCTOR_REGISTRATION_KEY;
  
      if (isAdminRequest && hasInstructorKey) {
        return res.status(403).json({
          success: false,
          message: 'Only admins can register instructors or valid instructor key required'
        });
      }
  
      // Basic validation
      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Name, email, and password are required'
        });
      }
  
      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'Password must be at least 6 characters long'
        });
      }
  
      const result = await registerUser({ name, email, password, role: 'Instructor' });
  
      res.status(201).json({
        success: true,
        message: 'Instructor registered successfully',
        data: result
      });
    } catch (error) {
      console.error('Instructor registration error:', error);
      res.status(400).json({
        success: false,
        message: error.message || 'Instructor registration failed'
      });
    }
  };
  
  // Login
  export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email and password are required'
        });
      }
  
      const result = await loginUser(email, password);
  
      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: result
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(401).json({
        success: false,
        message: error.message || 'Login failed'
      });
    }
  };
  
  // Change password
  export const changePasswordController = async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const userId = req.user._id;
  
      if (!oldPassword || !newPassword) {
        return res.status(400).json({
          success: false,
          message: 'Old password and new password are required'
        });
      }
  
      if (newPassword.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'New password must be at least 6 characters long'
        });
      }
  
      const result = await changePassword(userId, oldPassword, newPassword);
  
      res.status(200).json({
        success: true,
        message: result.message
      });
    } catch (error) {
      console.error('Change password error:', error);
      res.status(400).json({
        success: false,
        message: error.message || 'Password change failed'
      });
    }
  };
  
  // Get current user profile
  export const getProfile = async (req, res) => {
    try {
      const user = req.user;
      res.status(200).json({
        success: true,
        message: 'Profile fetched successfully',
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt
        }
      });
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch profile'
      });
    }
  };
  
  // Update profile
  export const updateProfile = async (req, res) => {
    try {
      const { name, email } = req.body;
      const userId = req.user._id;
  
      if (!name && !email) {
        return res.status(400).json({
          success: false,
          message: 'At least name or email must be provided'
        });
      }
  
      const updateData = {};
      if (name) updateData.name = name;
      if (email) {
        // Check if email is already taken by another user
        const existingUser = await User.findOne({ email, _id: { $ne: userId } });
        if (existingUser) {
          return res.status(400).json({
            success: false,
            message: 'Email is already taken'
          });
        }
        updateData.email = email;
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        updateData,
        { new: true }
      ).select('-password');
  
      res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: updatedUser
      });
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(400).json({
        success: false,
        message: error.message || 'Profile update failed'
      });
    }
  };
  
  // Logout (if using token blacklist - optional)
  export const logout = async (req, res) => {
    try {
      // In a simple JWT implementation, logout is handled client-side
      // by removing the token from storage
      // For a more secure implementation, you'd maintain a token blacklist
      
      res.status(200).json({
        success: true,
        message: 'Logged out successfully'
      });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({
        success: false,
        message: 'Logout failed'
      });
    }
  };

