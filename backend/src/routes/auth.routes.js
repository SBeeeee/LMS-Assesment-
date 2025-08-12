import express from 'express';
import {
  register,
  registerAdmin,
  registerInstructor,
  login,
  changePasswordController,
  getProfile,
  updateProfile,
  logout
} from '../controllers/auth.controller.js';

import {authenticateToken} from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', register); // Default student registration
router.post('/register/admin', registerAdmin); // Admin registration with special key
router.post('/login', login);

// Protected routes
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);
router.post('/change-password', authenticateToken, changePasswordController);
router.post('/logout', authenticateToken, logout);

// Admin-only or with special key
router.post('/register/instructor', registerInstructor); // Can be used by admin or with instructor key

export default router;