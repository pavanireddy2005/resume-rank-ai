import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
  {
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: [true, "Resume is required"],
      index: true,
    },

    atsScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
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

    overallFeedback: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Analysis", analysisSchema);