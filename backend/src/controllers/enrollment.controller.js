import { getEnrollmentsByStudent,createEnrollment } from "../services/enrollment.service.js";

export const fetchMyEnrollments = async (req, res) => {
    try {
      const enrolledCourseIds = await getEnrollmentsByStudent();
      res.json(enrolledCourseIds);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch enrollments' });
    }
  };
  
  export const enrollInCourse = async (req, res) => {
    const { courseId } = req.body;
    if (!courseId) {
      return res.status(400).json({ error: 'Course ID is required' });
    }
  
    try {
      const enrollment = await createEnrollment(courseId);
      res.status(201).json({ message: 'Enrolled successfully', enrollment });
    } catch (err) {
      res.status(400).json({ error: err.message || 'Enrollment failed' });
    }
  };