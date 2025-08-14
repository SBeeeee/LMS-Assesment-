"use client";
import { useEffect, useState } from "react";
import PrivateRoute from "@/utils/Private";
import { getInstructorCourses, getStudentsInCourse,createCourse} from "./components/api";
import InstructorStats from "./components/InstructorStats";
import CourseList from "./components/CourseList";
import StudentListModal from "./components/StudentListModal";
import CreateCourseModal from "./components/CreateCourseModal";

export default function InstructorDashboard() {
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

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-slate-900 text-white pt-16 px-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Instructor Dashboard</h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
          >
            + Create Course
          </button>
        </div>

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
