"use client";
import React, { useState } from "react";
import CourseGrid from "./CourseGrid"; // All courses
import EnrolledCoursesGrid from "./EnrolledCoursesGrid"; // Enrolled courses only

const CourseSwitcher = () => {
  const [activeTab, setActiveTab] = useState("all"); // 'all' or 'enrolled'

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Toolbar */}
      <div className="flex justify-center py-6 gap-4">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded-md font-semibold transition ${
            activeTab === "all"
              ? "bg-blue-600 text-white"
              : "bg-slate-700 hover:bg-slate-600 text-slate-300"
          }`}
        >
          All Courses
        </button>
        <button
          onClick={() => setActiveTab("enrolled")}
          className={`px-4 py-2 rounded-md font-semibold transition ${
            activeTab === "enrolled"
              ? "bg-blue-600 text-white"
              : "bg-slate-700 hover:bg-slate-600 text-slate-300"
          }`}
        >
          My Courses
        </button>
      </div>

      {/* Render Based on Tab */}
      <div>
        {activeTab === "all" ? <CourseGrid /> : <EnrolledCoursesGrid />}
      </div>
    </div>
  );
};

export default CourseSwitcher;
