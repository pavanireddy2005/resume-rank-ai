import Resume from "../models/Resume.js";
import extractText from "../utils/extractText.js";
import { createNotification } from "./notificationController.js";

// Upload Resume
export const uploadResume = async (req, res) => {
  try {
    const { jobDescription } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a resume.",
      });
    }

    if (!jobDescription || jobDescription.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Job description is required.",
      });
    }

    const resumeText = await extractText(req.file.path);

    if (!resumeText || resumeText.trim() === "") {
      return res.status(400).json({
        success: false,
        message:
          "Unable to extract text from the uploaded resume.",
      });
    }

    const resume = await Resume.create({
      user: req.user._id,
      fileName: req.file.originalname,
      fileUrl: req.file.path,
      extractedText: resumeText,
      jobDescription,
    });

    // ==========================
    // Create Notification
    // ==========================
    await createNotification({
      user: req.user._id,
      title: "Resume Uploaded",
      message: `${resume.fileName} uploaded successfully.`,
      type: "success",
    });

    res.status(201).json({
      success: true,
      message: "Resume uploaded successfully.",
      resumeId: resume._id,
      fileName: resume.fileName,
      resumeText: resume.extractedText,
      jobDescription: resume.jobDescription,
      resume,
    });
  } catch (error) {
    console.error("Resume Upload Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ===============================
// Dashboard Summary
// ===============================
export const getDashboard = async (req, res) => {
  try {
    const resumes = await Resume.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    const uploadedFiles = resumes.length;

    if (uploadedFiles === 0) {
      return res.json({
        success: true,
        data: {
          atsScore: 0,
          role: "-",
          uploadedFiles: 0,
        },
      });
    }

    const latestResume = resumes[0];

    res.json({
      success: true,
      data: {
        atsScore: latestResume.atsScore || 0,
        role: latestResume.role || "Not Available",
        uploadedFiles,
      },
    });
  } catch (error) {
    console.error("Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard.",
    });
  }
};