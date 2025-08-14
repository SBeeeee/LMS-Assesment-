"use client";
import React from "react";

export default function InstructorStats({ totalCourses, totalStudents }) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="bg-slate-800 p-4 rounded-lg shadow-lg border border-slate-700">
        <h3 className="text-lg font-semibold">My Courses</h3>
        <p className="text-2xl font-bold">{totalCourses}</p>
      </div>
      <div className="bg-slate-800 p-4 rounded-lg shadow-lg border border-slate-700">
        <h3 className="text-lg font-semibold">Enrolled Students</h3>
        <p className="text-2xl font-bold">{totalStudents}</p>
      </div>
    </div>
  );
}
