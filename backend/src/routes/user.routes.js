import express from "express";
import { fetchAllUsers, fetchUsersByRole,updateUserRoleController } from "../controllers/user.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get('/', authenticateToken, fetchAllUsers);
router.get('/role/:userRole', authenticateToken, fetchUsersByRole);
router.patch('/:userId/role', authenticateToken, updateUserRoleController);

export default router;