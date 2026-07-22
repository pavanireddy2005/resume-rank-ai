import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
      index: true,
    },

    fileName: {
      type: String,
      required: [true, "File name is required"],
      trim: true,
    },

    fileUrl: {
      type: String,
      required: [true, "File URL is required"],
      trim: true,
    },

    extractedText: {
      type: String,
      default: "",
      trim: true,
    },

    jobDescription: {
      type: String,
      default: "",
      trim: true,
    },

    // ===== Analysis Result =====

    atsScore: {
      type: Number,
      default: 0,
    },

    role: {
      type: String,
      default: "",
      trim: true,
    },

    matchedSkills: {
      type: [String],
      default: [],
    },

    missingSkills: {
      type: [String],
      default: [],
    },

    suggestions: {
      type: [String],
      default: [],
    },

    strengths: {
      type: [String],
      default: [],
    },

    weaknesses: {
      type: [String],
      default: [],
    },

    summary: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Resume", resumeSchema);