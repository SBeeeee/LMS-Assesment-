"use client";
import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { fetchAllUsers,updateUserRole } from "./api";// Adjust path if different
import axiosInstance from "@/utils/axiosInstance";

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchAllUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole);
      loadUsers();
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const handleDelete = async (userId) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await axiosInstance.delete(`/users/${userId}`);
        loadUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  if (loading) {
    return <div className="text-white">Loading users...</div>;
  }

  return (
    <div className="overflow-x-auto overflow-y-auto max-h-96 bg-slate-800 rounded-xl shadow border border-slate-700">
      <table className="w-full text-left text-white">
        <thead className="bg-slate-700 sticky top-0">
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Role</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id} className="border-b border-slate-600">
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="bg-slate-700 p-2 hover:cursor-pointer  rounded"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Instructor">Instructor</option>
                    <option value="Student">Student</option>
                  </select>
                </td>
                <td className="p-4 flex gap-3">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-600 hover:cursor-pointer p-2 rounded hover:bg-red-500"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4 text-gray-400">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
