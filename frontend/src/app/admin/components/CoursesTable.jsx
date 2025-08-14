"use client";
import { useState, useEffect } from "react";
import {  fetchAllCourses, updateCourseStatus  } from "./api"; // Adjust path if different
import axiosInstance from "@/utils/axiosInstance";

export default function CoursesTable() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const data = await fetchAllCourses();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (courseId, status) => {
    try {
      await updateCourseStatus(courseId, status);
      loadCourses();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = async (courseId) => {
    if (confirm("Are you sure you want to delete this course?")) {
      try {
        await axiosInstance.delete(`/courses/${courseId}`);
        loadCourses();
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  if (loading) {
    return <div className="text-white">Loading courses...</div>;
  }

  return (
    <div className="overflow-x-auto bg-slate-800 rounded-xl shadow border border-slate-700">
      <table className="w-full text-left text-white">
        <thead className="bg-slate-700">
          <tr>
            <th className="p-4">Title</th>
            <th className="p-4">Instructor</th>
            <th className="p-4">Status</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.length > 0 ? (
            courses.map((course) => (
              <tr key={course._id} className="border-b border-slate-600">
                <td className="p-4">{course.title}</td>
                <td className="p-4">{course.instructor?.name || "N/A"}</td>
                <td className="p-4">
                  <select
                    value={course.status}
                    onChange={(e) => handleStatusChange(course._id, e.target.value)}
                    className="bg-slate-700 p-2 rounded"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
                <td className="p-4 flex gap-2">
                  <button
                    onClick={() => handleStatusChange(course._id, "Approved")}
                    className="bg-green-600 px-3 py-1 rounded hover:bg-green-500"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusChange(course._id, "Rejected")}
                    className="bg-yellow-600 px-3 py-1 rounded hover:bg-yellow-500"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="bg-red-600 px-3 py-1 rounded hover:bg-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4 text-gray-400">
                No courses found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
