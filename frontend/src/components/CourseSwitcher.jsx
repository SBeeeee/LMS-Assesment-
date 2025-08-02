"use client";
import React, { useState } from "react";
import useCourseData from "@/hooks/useCourseData";
import CourseCard from "./CourseCard";
import { useDispatch } from "react-redux";
import { createenroll, mycourses } from "./api";
import { setEnrolledCourses } from "@/store/enrollments/slice";
import { setLoading } from "@/store/user/slice";

const CourseSwitcher = () => {
  const [activeTab, setActiveTab] = useState("all");
  const dispatch = useDispatch();
  const { courses, enrolledCourses, loading } = useCourseData();

  const handleEnroll = async (courseId) => {
    try {
      dispatch(setLoading(true));
      await createenroll(courseId);
      const updated = await mycourses();
      dispatch(setEnrolledCourses(updated));
    } catch (err) {
      console.error("Enrollment failed:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const displayedCourses =
    activeTab === "all"
      ? courses
      : courses.filter((course) => enrolledCourses.includes(course._id));

  const enrolledCount = enrolledCourses.length;
  const totalStudents = displayedCourses.reduce(
    (acc, cur) => acc + cur.students,
    0
  );

  if (loading) {
    return (
      <div className="min-h-screen flex mt-14 justify-center bg-slate-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Toolbar */}
      <div className="flex justify-center py-6 gap-4">
        {["all", "enrolled"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md font-semibold transition ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-slate-700 hover:bg-slate-600 text-slate-300"
            }`}
          >
            {tab === "all" ? "All Courses" : "My Courses"}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {displayedCourses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              isEnrolled={enrolledCourses.includes(course._id)}
              onEnroll={handleEnroll}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 flex flex-wrap justify-center gap-6 text-white">
          <div className="bg-slate-800 px-6 py-4 rounded-xl shadow text-center border border-slate-700">
            <p className="text-3xl font-bold">{displayedCourses.length}</p>
            <p className="text-slate-400 text-sm mt-1">
              {activeTab === "all" ? "Available Courses" : "Enrolled Courses"}
            </p>
          </div>
          <div className="bg-slate-800 px-6 py-4 rounded-xl shadow text-center border border-slate-700">
            <p className="text-3xl font-bold">{totalStudents.toLocaleString()}+</p>
            <p className="text-slate-400 text-sm mt-1">Students</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSwitcher;
