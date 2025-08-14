// api.js
import axiosInstance from "@/utils/axiosInstance";

export const getInstructorCourses = async () => {
  const res = await axiosInstance.get("/courses"); 
  return res.data.data;
};

export const getStudentsInCourse = async (courseId) => {
  const res = await axiosInstance.get(`/enrollment/course/${courseId}/students`);
  console.log(res.data)
  return res.data.data;
};

export const createCourse = async (courseData) => {
  const res = await axiosInstance.post("/courses", courseData);
  return res.data.data;
};
