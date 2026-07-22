import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { createNotification } from "./notificationController.js";
import OTP from "../models/OTP.js";
import sendEmail from "../utils/sendEmail.js";
import otpGenerator from "otp-generator";

const SALT_ROUNDS = 10;

// Remove password before sending user data
const sanitizeUser = (user) => {
  const userData = user.toObject();
  delete userData.password;
  return userData;
};

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // ==========================
    // Welcome Notification
    // ==========================
    await createNotification({
      user: user._id,
      title: "🎉 Welcome to ResumeRank AI",
      message:
        "Thanks for joining! Upload your first resume to receive your ATS score and AI-powered suggestions.",
      type: "success",
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token: generateToken(user._id),
      user: sanitizeUser(user),
    });
  } catch (error) {
    console.error("Register Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      token: generateToken(user._id),
      user: sanitizeUser(user),
    });
  } catch (error) {
    console.error("Login Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Change Password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findById(req.user._id).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    user.password = await bcrypt.hash(
      newPassword,
      SALT_ROUNDS
    );

    await user.save();

    // ==========================
    // Password Changed Notification
    // ==========================
    await createNotification({
      user: user._id,
      title: "🔐 Password Changed",
      message: "Your account password has been changed successfully.",
      type: "info",
    });

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Change Password Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==========================
// Forgot Password - Send OTP
// ==========================
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email.",
      });
    }

    // Delete previous OTP (if any)
    await OTP.deleteMany({ email });

    // Generate 6-digit OTP
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
      digits: true,
    });

    // Save OTP
    await OTP.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    });

    // Send Email
    await sendEmail(
      email,
      "ResumeRank AI - Password Reset OTP",
      `
      <div style="font-family:Arial,sans-serif;padding:20px;">
        <h2>ResumeRank AI</h2>
        <p>Your password reset OTP is:</p>

        <h1 style="letter-spacing:5px;color:#2563eb;">
          ${otp}
        </h1>

        <p>This OTP is valid for <strong>10 minutes</strong>.</p>

        <p>If you didn't request a password reset, please ignore this email.</p>
      </div>
      `
    );

    res.status(200).json({
      success: true,
      message: "OTP sent successfully.",
    });

  } catch (error) {
    console.error("Forgot Password Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send OTP.",
    });
  }
};

// ==========================
// Verify OTP
// ==========================
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required.",
      });
    }

    const otpRecord = await OTP.findOne({ email, otp });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    if (otpRecord.expiresAt < new Date()) {
      await OTP.deleteOne({ _id: otpRecord._id });

      return res.status(400).json({
        success: false,
        message: "OTP has expired.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully.",
    });

  } catch (error) {
    console.error("Verify OTP Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==========================
// Reset Password
// ==========================
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const otpRecord = await OTP.findOne({ email, otp });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    if (otpRecord.expiresAt < new Date()) {
      await OTP.deleteOne({ _id: otpRecord._id });

      return res.status(400).json({
        success: false,
        message: "OTP has expired.",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    user.password = await bcrypt.hash(
      newPassword,
      SALT_ROUNDS
    );

    await user.save();

    // Delete OTP after successful reset
    await OTP.deleteMany({ email });

    // Optional notification
    await createNotification({
      user: user._id,
      title: "🔐 Password Reset",
      message:
        "Your password has been reset successfully.",
      type: "success",
    });

    return res.status(200).json({
      success: true,
      message: "Password reset successful.",
    });

  } catch (error) {
    console.error("Reset Password Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};