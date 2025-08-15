import { Course } from "../models/courses.model.js";
import { Enrollment } from "../models/enrollment.model.js";

export const getAllApprovedCourses = async () => {
  return await Course.find({ status: "Approved" }).populate('instructor', 'name email');
};

export const getAllCourses = async () => {
  return await Course.find().populate('instructor', 'name email').populate('approvedBy', 'name');
};

export const getCoursesByInstructor = async (instructorId) => {
  return await Course.find({ instructor: instructorId }).populate('instructor', 'name email');
};

export const createCourse = async (courseData, instructorId) => {
  const course = new Course({
    ...courseData,
    instructor: instructorId,
    status: "Pending"
  });
  return await course.save();
};

export const updateCourseStatus = async (courseId, status, adminId) => {
  const updateData = { status };
  
  if (status === "Approved") {
    updateData.approvedAt = new Date();
    updateData.approvedBy = adminId;
  }
  
  return await Course.findByIdAndUpdate(
    courseId,
    updateData,
    { new: true }
  ).populate('instructor', 'name email');
};

export const updateCourse = async (courseId, courseData, instructorId) => {
  const course = await Course.findOne({ 
    _id: courseId, 
    instructor: instructorId,
    status: "Pending" 
  });
  
  if (!course) {
    throw new Error('Course not found or cannot be updated');
  }
  
  return await Course.findByIdAndUpdate(
    courseId,
    courseData,
    { new: true }
  ).populate('instructor', 'name email');
};


export const deleteCourse = async (courseId) => {

  const deletedCourse = await Course.findByIdAndDelete(courseId);

  if (!deletedCourse) {
    return null;
  }


  await Enrollment.deleteMany({ courseId });

  return deletedCourse;
};
