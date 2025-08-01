import express from 'express';
import { fetchMyEnrollments,enrollInCourse } from '../controllers/enrollment.controller.js';

const router = express.Router();

router.get('/me', fetchMyEnrollments);
router.post('/create', enrollInCourse);

export default router;
