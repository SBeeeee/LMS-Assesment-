import React from 'react';
import { FaStar, FaUser, FaClock } from 'react-icons/fa';

const courses = [
  {
    title: 'React Development',
    rating: 4.5,
    students: 512,
    level: 'Beginner',
    instructor: 'Sarah Johnson',
    duration: '8 weeks',
    enrolled: false,
  },
  {
    title: 'Advanced JavaScript',
    rating: 4.7,
    students: 890,
    level: 'Advanced',
    instructor: 'Michael Chen',
    duration: '10 weeks',
    enrolled: true,
  },
  {
    title: 'Node.js Backend',
    rating: 4.4,
    students: 763,
    level: 'Intermediate',
    instructor: 'Emily Rodriguez',
    duration: '12 weeks',
    enrolled: false,
  },
  {
    title: 'UI/UX Design',
    rating: 4.6,
    students: 430,
    level: 'Beginner',
    instructor: 'David Kim',
    duration: '6 weeks',
    enrolled: true,
  },
  {
    title: 'Python Data Science',
    rating: 4.8,
    students: 1023,
    level: 'Intermediate',
    instructor: 'Dr. Lisa Wong',
    duration: '9 weeks',
    enrolled: false,
  },
  {
    title: 'React Native Development',
    rating: 4.6,
    students: 547,
    level: 'Advanced',
    instructor: 'James Thompson',
    duration: '10 weeks',
    enrolled: false,
  },
];

const CourseGrid = () => {
  return (
    <div className="px-6 py-16 bg-slate-900 min-h-screen text-white">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Explore Our Top Courses</h1>
        <p className="text-slate-400 text-lg">
          Upskill with expert-led content. Join thousands of learners today.
        </p>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-slate-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300 border border-slate-700 flex flex-col justify-between h-full"
          >
            {/* Top content */}
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

            {/* Bottom Button */}
            <button
              className={`mt-4 w-full py-2 rounded-lg font-medium transition ${
                course.enrolled
                  ? 'bg-gray-600 text-white cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
              disabled={course.enrolled}
            >
              {course.enrolled ? 'Already Enrolled' : 'Enroll Now'}
            </button>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="mt-16 flex flex-wrap justify-center gap-6 text-white">
        <div className="bg-slate-800 px-6 py-4 rounded-xl shadow text-center border border-slate-700">
          <p className="text-3xl font-bold">6</p>
          <p className="text-slate-400 text-sm mt-1">Available Courses</p>
        </div>
        <div className="bg-slate-800 px-6 py-4 rounded-xl shadow text-center border border-slate-700">
          <p className="text-3xl font-bold">2</p>
          <p className="text-slate-400 text-sm mt-1">Total Enrolled</p>
        </div>
        <div className="bg-slate-800 px-6 py-4 rounded-xl shadow text-center border border-slate-700">
          <p className="text-3xl font-bold">5K+</p>
          <p className="text-slate-400 text-sm mt-1">Students</p>
        </div>
      </div>
    </div>
  );
};

export default CourseGrid;
