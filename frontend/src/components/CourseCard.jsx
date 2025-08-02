"use client";

import React from "react";
import { useSelector } from "react-redux";
import { FaStar, FaUser, FaClock } from "react-icons/fa";

const CourseCard = ({ course, isEnrolled, onEnroll }) => {
  const activeTab = useSelector((state) => state.course.activeTab);

  return (
    <div className="bg-slate-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300 border border-slate-700 flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-xl">{course.title}</h2>
          <span className="text-xs bg-slate-700 px-3 py-1 rounded-full uppercase tracking-wide">
            {course.level}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-yellow-400 mb-3">
          <FaStar className="text-base" /> {course.rating} • {course.students} students
        </div>

        <div className="text-sm text-slate-300 space-y-2 mb-4">
          <div className="flex items-center gap-2">
            <FaUser className="text-slate-400" /> {course.instructor}
          </div>
          <div className="flex items-center gap-2">
            <FaClock className="text-slate-400" /> {course.duration}
          </div>
        </div>
      </div>

 
      {activeTab === 'all' && (
        <button
          onClick={() => !isEnrolled && onEnroll(course._id)}
          className={`mt-4 w-full py-2 rounded-lg font-medium transition hover:cursor-pointer ${
            isEnrolled
              ? "bg-gray-600 text-white cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
          disabled={isEnrolled}
        >
          {isEnrolled ? "Enrolled" : "Enroll Now"}
        </button>
      )}
    </div>
  );
};

export default CourseCard;
