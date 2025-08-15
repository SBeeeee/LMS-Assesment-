"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PrivateRoute from "@/utils/Private";
import { getInstructorCourses, getStudentsInCourse, createCourse } from "./components/api";
import InstructorStats from "./components/InstructorStats";
import CourseList from "./components/CourseList";
import StudentListModal from "./components/StudentListModal";
import CreateCourseModal from "./components/CreateCourseModal";
import { FaUser, FaEnvelope, FaCalendarAlt } from "react-icons/fa";

export default function InstructorDashboard() {
  const { user } = useSelector((state) => state.user);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const data = await getInstructorCourses();
    setCourses(data);
  };

  const handleViewStudents = async (courseId) => {
    const studentList = await getStudentsInCourse(courseId);
    setStudents(studentList);
    setShowStudentModal(true);
  };

  const handleCreateCourse = async (formData) => {
    await createCourse(formData);
    fetchCourses(); // Refresh list
  };

  const totalStudents = courses.reduce(
    (acc, course) => acc + (course.enrolledCount || 0),
    0
  );

  // Role check: Only Instructor can access
  if (user && user.role !== "Instructor") {
    return (
      <div className="min-h-screen bg-slate-900 pt-16 px-6 text-white flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="text-slate-300 text-center max-w-md">
          You do not have permission to access the Instructor Dashboard.
        </p>
      </div>
    );
  }

  return (
    <PrivateRoute>
      
      <div className="min-h-screen bg-slate-900 text-white pt-16 px-6">
        {/* Welcome Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Instructor Dashboard</h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-green-600 hover:cursor-pointer hover:bg-green-700 px-4 py-2 rounded"
          >
            + Create Course
          </button>
        </div>

        {user && (
          <div className="bg-slate-800 p-6 rounded-2xl shadow-xl mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Welcome, {user.name}!</h2>
              <p className="text-slate-300 flex items-center gap-2">
                <FaEnvelope /> {user.email}
              </p>
              <p className="text-slate-300 flex items-center gap-2">
                <FaCalendarAlt /> Joined {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}

      
        <InstructorStats
          totalCourses={courses.length}
          totalStudents={totalStudents}
        />

        <CourseList courses={courses} onViewStudents={handleViewStudents} />

        <StudentListModal
          isOpen={showStudentModal}
          students={students}
          onClose={() => setShowStudentModal(false)}
        />

        <CreateCourseModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onCourseCreated={handleCreateCourse}
        />
      </div>
    </PrivateRoute>
  );
}
