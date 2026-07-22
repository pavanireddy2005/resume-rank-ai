import express from "express";
import protect from "../middleware/authMiddleware.js";
import { analyzeResume } from "../controllers/analysisController.js";

const router = express.Router();

// Protected Routes
router.post("/", protect, analyzeResume);

export default router;