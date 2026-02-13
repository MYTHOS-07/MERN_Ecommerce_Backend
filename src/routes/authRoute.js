import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

// URL: /api/auth/register
router.post("/register", authController.register);

router.post("/login", authController.login);

router.post("/forgot-password", authController.forgetPassword);

router.post("/reset-password", authController.resetPassword);

router.post("/logout", authController.logout);

export default router;
