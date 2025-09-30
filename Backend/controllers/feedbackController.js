const Feedback = require("../models/Feedback");

// Add feedback
const addFeedback = async (req, res) => {
  const { event_id, rating, comments } = req.body;

  const feedback = await Feedback.create({
    event_id,
    user_id: req.user._id,
    rating,
    comments,
  });

  res.status(201).json(feedback);
};

// Get feedbacks for event
const getFeedbacks = async (req, res) => {
  const { eventId } = req.query;

  const feedbacks = await Feedback.find({ event_id: eventId })
    .populate("user_id", "fullName college"); // ✅ fixed

  res.json(feedbacks);
};

module.exports = { addFeedback, getFeedbacks };
