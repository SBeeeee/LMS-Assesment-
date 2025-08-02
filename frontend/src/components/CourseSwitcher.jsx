"use client";
import React from "react";
import useCourseData from "@/hooks/useCourseData";
import CourseCard from "./CourseCard";
import { useDispatch, useSelector } from "react-redux";
import { createenroll, mycourses } from "./api";
import { setEnrolledCourses } from "@/store/enrollments/slice";
import { setLoading } from "@/store/user/slice";
import { setTab } from "@/store/courses/slice";

const CourseSwitcher = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.course.activeTab);

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
    <div className="min-h-screen bg-slate-900 text-white px-6 py-10">
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-white">
          🚀 Explore Courses
        </h1>
        <p className="text-slate-400 text-lg">
          Learn new skills and grow your knowledge with our curated course list.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex justify-center mb-10">
        <div className="flex bg-slate-800 border border-slate-700 rounded-full p-1 shadow-inner">
          {["all", "enrolled"].map((tab) => (
            <button
              key={tab}
              onClick={() => dispatch(setTab(tab))}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-300 hover:bg-slate-700"
              }`}
            >
              {tab === "all" ? "All Courses" : "My Courses"}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
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
  );
};

export default CourseSwitcher;
