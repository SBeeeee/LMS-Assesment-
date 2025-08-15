"use client";
import { useState, useEffect } from "react";
import { fetchAllCourses, updateCourseStatus } from "./api";
import axiosInstance from "@/utils/axiosInstance";

export default function CoursesTable() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filter state
  const [statusFilter, setStatusFilter] = useState("All");
  const [instructorFilter, setInstructorFilter] = useState("All");

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

  // Extract unique instructor names for filter
  const instructors = [
    ...new Set(courses.map((c) => c.instructor?.name).filter(Boolean)),
  ];

  // Apply filters
  const filteredCourses = courses.filter((course) => {
    const statusMatch =
      statusFilter === "All" || course.status === statusFilter;
    const instructorMatch =
      instructorFilter === "All" || course.instructor?.name === instructorFilter;
    return statusMatch && instructorMatch;
  });

  return (
    <div>
      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-slate-700  hover:cursor-pointer text-white p-2 rounded"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>

        <select
          value={instructorFilter}
          onChange={(e) => setInstructorFilter(e.target.value)}
          className="bg-slate-700 text-white p-2 rounded hover:cursor-pointer"
        >
          <option value="All">All Instructors</option>
          {instructors.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto overflow-y-auto max-h-96 bg-slate-800 rounded-xl shadow border border-slate-700">
        <table className="w-full text-left text-white">
          <thead className="bg-slate-700 sticky top-0">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Instructor</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <tr key={course._id} className="border-b border-slate-600">
                  <td className="p-4">{course.title}</td>
                  <td className="p-4">{course.instructor?.name || "N/A"}</td>
                  <td className="p-4">
                    <select
                      value={course.status}
                      onChange={(e) =>
                        handleStatusChange(course._id, e.target.value)
                      }
                      className="bg-slate-700 hover:cursor-pointer p-2 rounded"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() =>
                        handleStatusChange(course._id, "Approved")
                      }
                      className="bg-green-600 px-3 py-1 hover:cursor-pointer rounded hover:bg-green-500"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() =>
                        handleStatusChange(course._id, "Rejected")
                      }
                      className="bg-yellow-600 px-3 py-1 hover:cursor-pointer rounded hover:bg-yellow-500"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleDelete(course._id)}
                      className="bg-red-600 px-3 py-1 hover:cursor-pointer rounded hover:bg-red-500"
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
    </div>
  );
}
