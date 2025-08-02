import { getAllCourses } from "../services/course.services.js";

export const fetchCourses = async (req, res) => {
  try {
    const courses = await getAllCourses();
    res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      data: courses,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
      error: err.message,
    });
  }
};
