import { getAllUsers,getUsersByRole,getUserById,updateUserRole } from "../services/user.service.js";

import { User } from '../models/user.model.js';
import { Course } from '../models/course.model.js';
import { Enrollment } from '../models/enrollment.model.js';

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


  
  export const deleteUserController = async (req, res) => {
    try {
      const { role } = req.user;
      const { userId } = req.params;
  
      if (role !== 'Admin') {
        return res.status(403).json({ success: false, message: "Only admins can delete users" });
      }
  
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ success: false, message: "User not found" });
  
      if (user.role === 'Student') {
        await Enrollment.deleteMany({ student: userId });
      }
  
      if (user.role === 'Instructor') {
        const courses = await Course.find({ instructor: userId });
        const courseIds = courses.map(c => c._id);
        await Enrollment.deleteMany({ course: { $in: courseIds } });
        await Course.deleteMany({ instructor: userId });
      }
  
      await User.findByIdAndDelete(userId);
  
      res.status(200).json({ success: true, message: "User and related data deleted successfully" });
    } catch (err) {
      res.status(500).json({ success: false, message: "Failed to delete user", error: err.message });
    }
  };
  

