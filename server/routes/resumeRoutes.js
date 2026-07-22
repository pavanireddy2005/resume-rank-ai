import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import protect from "../middleware/authMiddleware.js";

import {
  uploadResume,
  getDashboard,
} from "../controllers/resumeController.js";

const router = express.Router();

// Upload Resume
router.post(
  "/upload",
  protect,
  upload.single("resume"),
  uploadResume
);

// Dashboard Summary
router.get(
  "/dashboard",
  protect,
  getDashboard
);

export default router;