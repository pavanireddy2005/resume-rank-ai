import groq from "../config/groq.js";
import Resume from "../models/Resume.js";
import { createNotification } from "./notificationController.js";

// Analyze Resume
export const analyzeResume = async (req, res) => {
  try {
    const { resumeId, resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({
        success: false,
        message: "Resume text and job description are required.",
      });
    }

    const prompt = `
You are an ATS Resume Analyzer.

Analyze the resume against the given job description.

Resume:
${resumeText}

Job Description:
${jobDescription}

Return ONLY valid JSON.

{
  "atsScore": 85,
  "role": "Frontend Developer",
  "matchedSkills": ["React", "JavaScript"],
  "missingSkills": ["Docker", "AWS"],
  "suggestions": [
    "Add measurable achievements",
    "Mention Docker experience"
  ],
  "overallFeedback": "Strong frontend resume with a few missing backend skills."
}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
    });

    const responseText = completion.choices[0].message.content;

    const cleanedResponse = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let analysis;

    try {
      analysis = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error("Groq JSON Parse Error:", parseError);
      console.error(cleanedResponse);

      return res.status(500).json({
        success: false,
        message: "Failed to parse AI response.",
      });
    }

    // Save analysis to uploaded resume
    const latestResume = await Resume.findById(resumeId);

    if (latestResume) {
      latestResume.atsScore = analysis.atsScore || 0;
      latestResume.role = analysis.role || "";
      latestResume.matchedSkills = analysis.matchedSkills || [];
      latestResume.missingSkills = analysis.missingSkills || [];
      latestResume.suggestions = analysis.suggestions || [];
      latestResume.summary =
        analysis.overallFeedback || "";

      await latestResume.save();

      // ==========================
      // Create Notification
      // ==========================
      await createNotification({
        user: latestResume.user,
        title: "Analysis Completed",
        message: `Your ATS Score is ${analysis.atsScore}% for the ${analysis.role} role.`,
        type: "success",
      });
    }

    return res.status(200).json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error("Resume Analysis Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};