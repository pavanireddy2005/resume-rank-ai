import dotenv from "dotenv";
import "./utils/dnsConfig.js";
dotenv.config();
import express from "express";
import "./utils/dnsConfig.js";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import analysisRoutes from "./routes/analysisRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

dotenv.config();

const { default: connectDB } = await import("./config/db.js");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/analysis", analysisRoutes);
app.use("/api/notifications", notificationRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ResumeRank AI API Running 🚀",
  });
});

const PORT = process.env.PORT || 5000;

try {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
} catch (error) {
  console.error("Failed to start server:", error.message);
  process.exit(1);
}