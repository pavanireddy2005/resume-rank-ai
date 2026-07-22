import express from "express";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../controllers/notificationController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all notifications
router.get("/", authMiddleware, getNotifications);

// Mark one notification as read
router.patch("/:id/read", authMiddleware, markAsRead);

// Mark all notifications as read
router.patch("/read-all", authMiddleware, markAllAsRead);

// Delete notification
router.delete("/:id", authMiddleware, deleteNotification);

export default router;