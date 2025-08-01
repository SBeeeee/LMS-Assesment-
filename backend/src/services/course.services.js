import { Course } from "../models/courses.model.js";

export const getAllCourses = async () => {
    return await Course.find();
  };

  