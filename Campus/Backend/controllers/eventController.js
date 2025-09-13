const Event = require("../models/Event");

const createEvent = async (req, res) => {
  const { title, description, category, location, start_date, end_date, banner } = req.body;
  const event = await Event.create({ college_id: req.user._id, title, description, category, location, start_date, end_date, banner });
  res.status(201).json(event);
};

const getEvents = async (req, res) => {
  const { category, college } = req.query;
  const filters = {};
  if (category) filters.category = category;
  if (college) filters.college_id = college;

  const events = await Event.find(filters).populate("college_id", "name email");
  res.json(events);
};

module.exports = { createEvent, getEvents };
