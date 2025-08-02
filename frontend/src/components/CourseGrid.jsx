"use client"
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaStar, FaUser, FaClock } from 'react-icons/fa';
import { getAllCourses,createenroll,mycourses } from './api';
import { setCourses } from '@/store/courses/slice';
import { setEnrolledCourses } from '@/store/enrollments/slice';
import { setLoading } from '@/store/user/slice';

const CourseGrid = () => {
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.course);
  const { enrolledCourses } = useSelector((state) => state.enroll);
  const { loading } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchCoursesAndEnrollments = async () => {
      try {
        dispatch(setLoading(true));
        const [allCourses, enrolledIds] = await Promise.all([
          getAllCourses(),
          mycourses(),
        ]);
        dispatch(setCourses(allCourses));
        dispatch(setEnrolledCourses(enrolledIds));
      } catch (err) {
        console.error("Error loading course data:", err);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchCoursesAndEnrollments();
  }, [dispatch]);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  const enrolledCount = courses.filter(course =>
    enrolledCourses.includes(course._id)
  ).length;

  const totalStudents = courses.reduce((acc, cur) => acc + cur.students, 0);

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
        {courses.map((course) => {
          const isEnrolled = enrolledCourses.includes(course._id);

          return (
            <div
              key={course._id}
              className="bg-slate-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300 border border-slate-700 flex flex-col justify-between h-full"
            >
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

              <button
                onClick={() => !isEnrolled && handleEnroll(course._id)}
                className={`mt-4 w-full py-2 rounded-lg font-medium transition ${
                  isEnrolled
                    ? 'bg-gray-600 text-white cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
                disabled={isEnrolled}
              >
                {isEnrolled ? 'Already Enrolled' : 'Enroll Now'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Stats Section */}
      <div className="mt-16 flex flex-wrap justify-center gap-6 text-white">
        <div className="bg-slate-800 px-6 py-4 rounded-xl shadow text-center border border-slate-700">
          <p className="text-3xl font-bold">{courses.length}</p>
          <p className="text-slate-400 text-sm mt-1">Available Courses</p>
        </div>
        <div className="bg-slate-800 px-6 py-4 rounded-xl shadow text-center border border-slate-700">
          <p className="text-3xl font-bold">{enrolledCount}</p>
          <p className="text-slate-400 text-sm mt-1">Total Enrolled</p>
        </div>
        <div className="bg-slate-800 px-6 py-4 rounded-xl shadow text-center border border-slate-700">
          <p className="text-3xl font-bold">{totalStudents.toLocaleString()}+</p>
          <p className="text-slate-400 text-sm mt-1">Students</p>
        </div>
      </div>
    </div>
  );
};

export default CourseGrid;
