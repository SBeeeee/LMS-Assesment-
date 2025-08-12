import { getEnrollmentsByStudent,createEnrollment,getStudentsInCourse,getAllEnrollments } from "../services/enrollment.service.js";

export const fetchMyEnrollments = async (req, res) => {
  try {
    const { role, _id: userId } = req.user;
    
    if (role !== 'Student') {
      return res.status(403).json({
        success: false,
        message: "Only students can view enrollments",
      });
    }

    const enrolledCourses = await getEnrollmentsByStudent(userId);
    res.status(200).json({
      success: true,
      message: "Fetched enrolled courses successfully",
      data: enrolledCourses,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch enrollments",
      error: err.message,
    });
  }
};

export const enrollInCourse = async (req, res) => {
  try {
    const { role, _id: studentId } = req.user;
    const { courseId } = req.body;

    if (role !== 'Student') {
      return res.status(403).json({
        success: false,
        message: "Only students can enroll in courses",
      });
    }

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    const enrollment = await createEnrollment(courseId, studentId);
    res.status(201).json({
      success: true,
      message: "Enrolled successfully",
      data: enrollment,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message || "Enrollment failed",
    });
  }
};

export const fetchStudentsInCourse = async (req, res) => {
  try {
    const { role } = req.user;
    const { courseId } = req.params;

    if (!['Admin', 'Instructor'].includes(role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const students = await getStudentsInCourse(courseId);
    res.status(200).json({
      success: true,
      message: "Students fetched successfully",
      data: students,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch students",
      error: err.message,
    });
  }
};

export const fetchAllEnrollments = async (req, res) => {
  try {
    const { role } = req.user;

    if (role !== 'Admin') {
      return res.status(403).json({
        success: false,
        message: "Only admins can view all enrollments",
      });
    }

    const enrollments = await getAllEnrollments();
    res.status(200).json({
      success: true,
      message: "All enrollments fetched successfully",
      data: enrollments,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch enrollments",
      error: err.message,
    });
  }
};