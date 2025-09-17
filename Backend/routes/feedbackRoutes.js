const express = require("express");
const { addFeedback, getFeedbacks } = require("../controllers/feedbackController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, addFeedback); // student submits feedback
router.get("/", getFeedbacks); // anyone can view feedback

module.exports = router;
