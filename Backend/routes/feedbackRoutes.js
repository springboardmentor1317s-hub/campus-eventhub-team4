const express = require("express");
const {
  addFeedback,
  getFeedbacks,
  editFeedback,
  deleteFeedback,
  addReply,
} = require("../controllers/feedbackController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, addFeedback);
router.get("/", getFeedbacks);
router.put("/:id", protect, editFeedback);
router.delete("/:id", protect, deleteFeedback);
router.post("/:id/replies", protect, addReply);

module.exports = router;
