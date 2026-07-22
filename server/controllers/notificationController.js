import Notification from "../models/Notification.js";

// Get all notifications of logged-in user
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    console.error("Get Notifications Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch notifications",
    });
  }
};

// Create notification
export const createNotification = async ({
  user,
  title,
  message,
  type = "info",
}) => {
  try {
    await Notification.create({
      user,
      title,
      message,
      type,
    });
  } catch (error) {
    console.error("Create Notification Error:", error);
  }
};

// Mark one notification as read
export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      {
        isRead: true,
      },
      {
        new: true,
      }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.status(200).json({
      success: true,
      notification,
    });
  } catch (error) {
    console.error("Mark Read Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update notification",
    });
  }
};

// Mark all notifications as read
export const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      {
        user: req.user.id,
        isRead: false,
      },
      {
        isRead: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (error) {
    console.error("Mark All Read Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update notifications",
    });
  }
};

// Delete notification
export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Notification deleted",
    });
  } catch (error) {
    console.error("Delete Notification Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete notification",
    });
  }
};