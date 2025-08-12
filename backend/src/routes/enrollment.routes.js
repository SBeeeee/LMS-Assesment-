import express from 'express';
import { fetchMyEnrollments,enrollInCourse,fetchStudentsInCourse,fetchAllEnrollments } from '../controllers/enrollment.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/my-enrollments', authenticateToken, fetchMyEnrollments);
router.post('/', authenticateToken, enrollInCourse);
router.get('/course/:courseId/students', authenticateToken, fetchStudentsInCourse);
router.get('/all', authenticateToken, fetchAllEnrollments);


export default router;
