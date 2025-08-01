import { getAllCourses } from "../services/course.services.js";

export const fetchCourses = async (req, res) => {
    try {
      const courses = await getAllCourses();
      res.json(courses);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch courses' });
    }
  };