const express = require("express");
const {
  addFeedback,
  getFeedbacks,
  editFeedback,
  deleteFeedback,
  addReply,
} = require("../controllers/feedbackController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * Feedback Access Rules
 * ----------------------------------------
 * Student        → can add feedback, view feedbacks
 * College Admin  → can reply, edit, delete feedback for their college
 * Super Admin    → can view, edit, delete any feedback globally
 */

// 🔹 Add Feedback (Students & Admins)
router.post(
  "/",
  protect,
  authorizeRoles("Student", "College Admin", "Super Admin"),
  addFeedback
);

// 🔹 Get All Feedbacks (Anyone logged in)
router.get("/", protect, getFeedbacks);

// 🔹 Edit Feedback
router.put(
  "/:id",
  protect,
  authorizeRoles("College Admin", "Super Admin"),
  editFeedback
);

// 🔹 Delete Feedback
router.delete(
  "/:id",
  protect,
  authorizeRoles("College Admin", "Super Admin"),
  deleteFeedback
);

// 🔹 Add Reply (Admins & Super Admins)
router.post(
  "/:id/replies",
  protect,
  authorizeRoles("College Admin", "Super Admin"),
  addReply
);

module.exports = router;
