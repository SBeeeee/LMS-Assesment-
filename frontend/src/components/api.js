import axiosInstance from "@/utils/axiosInstance";
import { setUser } from "@/store/user/slice";


export const getAllCourses = async () => {
  try {
    const res = await axiosInstance.get('/courses/');
    return res.data.data; // updated
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createenroll = async (courseId) => {
  try {
    const res = await axiosInstance.post("/enrollment/create", { courseId });
    return res.data.data; // updated
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const mycourses = async () => {
  try {
    const res = await axiosInstance.get("/enrollment/me");
    return res.data.data; // updated
  } catch (error) {
    console.error(error);
    throw error;
  }
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
    dispatch(setUser({}));

    // Redirect to login
    router.push("/");
  }
};
