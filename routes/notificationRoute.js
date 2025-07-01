const express = require("express");
const router = express.Router();
const notificationController = require("../Controllers/notificationController");
const { requireAuthUser } = require('../middlewares/authMiddleware');


router.get("/", notificationController.getAllNotifications);
router.post("/", notificationController.createNotification);
router.get("/:id", notificationController.getNotificationById);
router.delete("/:id", notificationController.deleteNotificationById);
router.put("/markAsRead/:id", notificationController.markAsRead);
router.post("/send-confirmation", requireAuthUser, notificationController.sendConfirmation);

module.exports = router;