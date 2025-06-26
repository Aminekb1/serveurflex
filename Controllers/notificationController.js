const Notification = require('../models/Notification');

exports.createNotification = async (data) => {
  const notif = new Notification(data);
  await notif.save();
module.exports.GetAllNotifications = async (req, res) => {
  try {
    const notifications = await notificationModel.find().populate("user");
    if (notifications.length === 0) {
      throw new Error("Notifications not found");
    }
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.createNotification = async (req, res) => {
  try {
    const { message, userId } = req.body;
    const notification = new notificationModel({ message, user: userId, dateEnvoi: new Date() });
    await notification.save();
    await userModel.findByIdAndUpdate(userId, { $push: { notifications: notification._id } });
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getNotificationById = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await notificationModel.findById(id).populate("user");
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteNotificationById = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await notificationModel.findByIdAndDelete(id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    await userModel.updateMany({}, { $pull: { notifications: notification._id } });
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
};module.exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await notificationModel.findByIdAndUpdate(id, { $set: { lu: true } }, { new: true });
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};