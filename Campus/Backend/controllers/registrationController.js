const Registration = require("../models/Registration");

// Student registers for event
const registerForEvent = async (req, res) => {
  const { event_id } = req.body;

  const exists = await Registration.findOne({ event_id, user_id: req.user._id });
  if (exists) return res.status(400).json({ message: "Already registered" });

  const registration = await Registration.create({
    event_id,
    user_id: req.user._id,
  });

  res.status(201).json(registration);
};

// Admin manages registrations
const manageRegistration = async (req, res) => {
  const { registrationId, status } = req.body;

  const registration = await Registration.findByIdAndUpdate(
    registrationId,
    { status },
    { new: true }
  ).populate("user_id", "name email");

  if (!registration) return res.status(404).json({ message: "Registration not found" });

  res.json(registration);
};

module.exports = { registerForEvent, manageRegistration };
