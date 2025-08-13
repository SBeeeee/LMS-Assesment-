import axiosInstance from "@/utils/axiosInstance";

export const fetchAllUsers = async () => {
    const res = await axiosInstance.get("/users");
    return res.data.data;
  };
  
  export const fetchUsersByRole = async (role) => {
    const res = await axiosInstance.get(`/users/role/${role}`);
    return res.data.data;
  };
  
  export const updateUserRole = async (userId, newRole) => {
    const res = await axiosInstance.patch(`/users/${userId}/role`, { newRole });
    return res.data.data;
  };
  
  // COURSES
  export const fetchAllCourses = async () => {
    const res = await axiosInstance.get("/courses");
    return res.data.data;
  };
  
  export const updateCourseStatus = async (courseId, status) => {
    const res = await axiosInstance.patch(`/courses/${courseId}/status`, { status });
    return res.data.data;
  };
  
  // ENROLLMENTS
  export const fetchAllEnrollments = async () => {
    const res = await axiosInstance.get("/enrollment/all");
    return res.data.data;
  };
  
  export const fetchStudentsInCourse = async (courseId) => {
    const res = await axiosInstance.get(`/enrollment/course/${courseId}/students`);
    return res.data.data;
  };