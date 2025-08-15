"use client";
import React from "react";

export default function CourseList({ courses, onViewStudents }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4">My Courses</h2>
      {courses.length === 0 ? (
        <p>No courses yet.</p>
      ) : (
        <ul>
          {courses.map((course) => (
            <li
              key={course._id}
              className="mb-4 p-4 border border-slate-700 rounded-lg bg-slate-900"
            >
              <h3 className="font-semibold text-lg">{course.title}</h3>
              <p>Status: <span className="capitalize">{course.status}</span></p>
              <button
                onClick={() => onViewStudents(course._id)}
                className="mt-2 bg-blue-600 hover:cursor-pointer hover:bg-blue-700 px-3 py-1 rounded"
              >
                View Students
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
