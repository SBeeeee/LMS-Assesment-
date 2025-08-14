import { getAllUsers,getUsersByRole,getUserById,updateUserRole } from "../services/user.service.js";

export const fetchAllUsers = async (req, res) => {
    try {
      const { role } = req.user;
  
      if (role !== 'Admin') {
        return res.status(403).json({
          success: false,
          message: "Only admins can view all users",
        });
      }
  
      const users = await getAllUsers();
      res.status(200).json({
        success: true,
        message: "Users fetched successfully",
        data: users,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Failed to fetch users",
        error: err.message,
      });
    }
  };

  export const fetchUsersByRole = async (req, res) => {
    try {
      const { role } = req.user;
      const { userRole } = req.params;
  
      if (role !== 'Admin') {
        return res.status(403).json({
          success: false,
          message: "Only admins can filter users by role",
        });
      }
  
      const users = await getUsersByRole(userRole);
      res.status(200).json({
        success: true,
        message: `${userRole}s fetched successfully`,
        data: users,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Failed to fetch users",
        error: err.message,
      });
    }
  };

  export const updateUserRoleController = async (req, res) => {
    try {
      const { role } = req.user;
      const { userId } = req.params;
      const { newRole } = req.body;
  
      if (role !== 'Admin') {
        return res.status(403).json({
          success: false,
          message: "Only admins can update user roles",
        });
      }
  
      if (!['Admin', 'Student', 'Instructor'].includes(newRole)) {
        return res.status(400).json({
          success: false,
          message: "Invalid role",
        });
      }
  
      const user = await updateUserRole(userId, newRole);
      res.status(200).json({
        success: true,
        message: "User role updated successfully",
        data: user,
      });
    } catch (err) {
      console.error(err);
      res.status(400).json({
        success: false,
        message: "Failed to update user role",
        error: err.message,
      });
    }
  };

