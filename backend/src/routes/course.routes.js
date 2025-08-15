import express from "express";
import { fetchCourses,createNewCourse,updateCourseController,updateCourseStatusController,deleteCourseController } from "../controllers/course.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get('/', authenticateToken, fetchCourses);
router.post('/', authenticateToken, createNewCourse);
router.patch('/:courseId/status', authenticateToken, updateCourseStatusController);
router.put('/:courseId', authenticateToken, updateCourseController);
router.delete("/:courseId", authenticateToken, deleteCourseController);

export default router;