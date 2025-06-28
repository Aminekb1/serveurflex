const express = require("express");
const router = express.Router();
const notificationController = require("../Controllers/notificationController");

router.get("/", notificationController.getAllNotifications);
router.post("/", notificationController.createNotification);
router.get("/:id", notificationController.getNotificationById);
router.delete("/:id", notificationController.deleteNotificationById);
router.put("/markAsRead/:id", notificationController.markAsRead);

module.exports = router;