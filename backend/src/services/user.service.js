import { User } from "../models/user.model.js";

export const getAllUsers = async () => {
    return await User.find().select('-password');
  };

  export const getUsersByRole = async (role) => {
    return await User.find({ role }).select('-password');
  };

  export const getUserById = async (userId) => {
    return await User.findById(userId).select('-password');
  };

  export const updateUserRole = async (userId, newRole) => {
    return await User.findByIdAndUpdate(
      userId,
      { role: newRole },
      { new: true }
    ).select('-password');
  };