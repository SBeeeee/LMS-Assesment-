import { Enrollment } from "../models/enrollment.model.js";

const DUMMY_STUDENT_ID = 'dummyStudent123';

export const getEnrollmentsByStudent = async () => {
    const enrollments = await Enrollment.find({ studentId: DUMMY_STUDENT_ID }).populate('courseId');
    return enrollments.map((e) => e.courseId._id.toString());
  };

  export const createEnrollment = async (courseId) => {
    const existing = await Enrollment.findOne({ studentId: DUMMY_STUDENT_ID, courseId });
  
    if (existing) {
      throw new Error('Already enrolled');
    }
  
    const newEnrollment = new Enrollment({
      studentId: DUMMY_STUDENT_ID,
      courseId,
    });
  
    await newEnrollment.save();
    return newEnrollment;
}