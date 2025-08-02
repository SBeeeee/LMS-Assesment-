import {
  getEnrollmentsByStudent,
  createEnrollment,
} from "../services/enrollment.service.js";

export const fetchMyEnrollments = async (req, res) => {
  try {
    const enrolledCourseIds = await getEnrollmentsByStudent();
    res.status(200).json({
      success: true,
      message: "Fetched enrolled courses successfully",
      data: enrolledCourseIds,
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
  const { courseId } = req.body;

  if (!courseId) {
    return res.status(400).json({
      success: false,
      message: "Course ID is required",
    });
  }

  try {
    const enrollment = await createEnrollment(courseId);
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
