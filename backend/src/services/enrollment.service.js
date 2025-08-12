import { Enrollment } from "../models/enrollment.model.js";
import { Course } from "../models/courses.model.js";

export const getEnrollmentsByStudent = async (studentId) => {
  const enrollments = await Enrollment.find({ studentId })
    .populate({
      path: 'courseId',
      populate: {
        path: 'instructor',
        select: 'name email'
      }
    });
  
  return enrollments.map(enrollment => ({
    ...enrollment.courseId.toObject(),
    enrollmentStatus: enrollment.status,
    enrollmentDate: enrollment.enrollmentDate
  }));
};

export const createEnrollment = async (courseId, studentId) => {
  // Check if course exists and is approved
  const course = await Course.findOne({ _id: courseId, status: "Approved" });
  if (!course) {
    throw new Error('Course not found or not approved');
  }

  // Check if already enrolled
  const existing = await Enrollment.findOne({ studentId, courseId });
  if (existing) {
    throw new Error('Already enrolled in this course');
  }

  const newEnrollment = new Enrollment({
    studentId,
    courseId,
  });

  await newEnrollment.save();
  
  // Update student count in course
  await Course.findByIdAndUpdate(courseId, { $inc: { students: 1 } });
  
  return newEnrollment;
};

export const getStudentsInCourse = async (courseId) => {
  return await Enrollment.find({ courseId })
    .populate('studentId', 'name email')
    .populate('courseId', 'title');
};

export const getAllEnrollments = async () => {
  return await Enrollment.find()
    .populate('studentId', 'name email')
    .populate({
      path: 'courseId',
      populate: {
        path: 'instructor',
        select: 'name email'
      }
    });
};
