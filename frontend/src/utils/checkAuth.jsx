"use client";
import axiosInstance from "./axiosInstance";
import { setUser } from "@/store/user/slice";


export const checkAuth = async (dispatch) => {

  try {
    const response = await axiosInstance.get("/auth/profile");
    if (response?.data?.success) {
      dispatch(setUser(response.data.data));
      return response.data.data;
      console.log(data.data.user)
    }
    return null;
  } catch (error) {
    console.error("Auth check failed:", error);
    return null;
  }
};
