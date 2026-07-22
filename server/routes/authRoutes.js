import express from "express";
import {
  registerUser,
  loginUser,
  changePassword,
  forgotPassword,
  verifyOTP,
  resetPassword,
} from "../controllers/authController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================
// Public Routes
// ==========================
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);

// ==========================
// Protected Route
// ==========================
router.put("/change-password", protect, changePassword);

export default router;