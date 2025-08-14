import axiosInstance from "@/utils/axiosInstance";

export const getCourses = async () => {
  const res = await axiosInstance.get("/courses");
  return res.data.data;
};

export const createCourse = async (courseData) => {
  const res = await axiosInstance.post("/courses", courseData);
  return res.data.data;
};

export const updateCourse = async (courseId, courseData) => {
  const res = await axiosInstance.put(`/courses/${courseId}`, courseData);
  return res.data.data;
};

export const updateCourseStatus = async (courseId, status) => {
  const res = await axiosInstance.patch(`/courses/${courseId}/status`, { status });
  return res.data.data;
};

export const getMyEnrollments = async () => {
  const res = await axiosInstance.get("/enrollment/my-enrollments");
  return res.data.data;
};

export const enrollInCourse = async (courseId) => {
  const res = await axiosInstance.post("/enrollment", { courseId });
  return res.data.data;
};

export const getStudentsInCourse = async (courseId) => {
  const res = await axiosInstance.get(`/enrollment/course/${courseId}/students`);
  return res.data.data;
};

export const getAllEnrollments = async () => {
  const res = await axiosInstance.get("/enrollment/all");
  return res.data.data;
};

export const logout = async (dispatch, router) => {
  try {
    // Call backend logout API (this will invalidate token server-side if implemented)
    await axiosInstance.post("/auth/logout");

  } catch (error) {
    console.error("Error calling logout API:", error);
    // Even if API fails, proceed with client logout
  } finally {
    // Remove token locally
    localStorage.removeItem("token");

    // Clear Redux user
    d

    // Redirect to login
    router.push("/");
  }
};
