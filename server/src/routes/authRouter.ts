import express from "express";
import authController from "../modules/auth/authController.js";
import authMiddleware from "../common/middleware/authMiddleware.js";

const router = express.Router();

router.post('/registration', authController.registration);
router.post('/login', authController.login);
router.get('/auth', authMiddleware, authController.checkAuth);

export default router;