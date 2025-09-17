const Registration = require("../models/Registration");
const AdminLog = require("../models/AdminLog");

// Student registers for event
const registerForEvent = async (req, res) => {
  try {
    const { event_id } = req.body;

    // prevent duplicate registrations
    const exists = await Registration.findOne({
      event_id,
      user_id: req.user._id,
    });

    if (exists) {
      return res.status(400).json({ message: "Already registered" });
    }

    const registration = await Registration.create({
      event_id,
      user_id: req.user._id,
    });

    // ✅ Log student action
    await AdminLog.create({
      user_id: req.user._id,
      action: `Registered for event ID: ${event_id}`,
    });

    res.status(201).json(registration);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Student cancels registration

const cancelRegistration = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Attempting to delete registration ID:", id);
    console.log("Requesting user:", req.user);

    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid registration ID" });
    }

    let registration;

    if (req.user.role === "admin") {
      // Admin can delete any registration
      registration = await Registration.findById(id).populate("event_id", "title");
      if (!registration) {
        return res.status(404).json({ message: "Registration not found" });
      }
      await registration.deleteOne();
    } else {
      // Student can delete only their own registration
      registration = await Registration.findOneAndDelete({
        _id: id,
        user_id: req.user._id,
      }).populate("event_id", "title");

      if (!registration) {
        return res.status(404).json({
          message: "Registration not found or you are not authorized to cancel it",
        });
      }
    }

    // ✅ Log cancellation
    await AdminLog.create({
      user_id: req.user._id,
      action: `Cancelled registration for event "${registration.event_id.title}"`,
    });

    res.json({ message: "Registration cancelled successfully" });

  } catch (err) {
    console.error("Cancel registration error:", err);
    res.status(500).json({ message: "Server error" });
  }
};



// Get all registrations for logged-in student
const myRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({
      user_id: req.user._id,
    }).populate("event_id");

    res.json(registrations);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Admin manages (approve/reject)
const manageRegistration = async (req, res) => {
  try {
    const { registrationId, status } = req.body;

    const registration = await Registration.findByIdAndUpdate(
      registrationId,
      { status },
      { new: true }
    )
      .populate("user_id", "fullName email college")
      .populate("event_id", "title");

    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    // ✅ Log admin action
    await AdminLog.create({
      user_id: req.user._id,
      action: `Changed registration status of ${registration.user_id.fullName} (${registration.user_id.email}) for event "${registration.event_id.title}" to ${status}`,
    });

    res.json(registration);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Admin: get all registrations for an event
const getEventRegistrations = async (req, res) => {
  try {
    const { eventId } = req.params;

    const registrations = await Registration.find({ event_id: eventId })
      .populate("user_id", "fullName email college")
      .populate("event_id", "title category");

    res.json(registrations);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all registrations (with populated user + event)
const listRegistrations = async (req, res) => {
  try {
    const regs = await Registration.find()
      .populate("user_id", "fullName email")
      .populate("event_id", "title");
    res.json(regs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch registrations" });
  }
};

// Update registration status (approve/reject)
const updateRegistration = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const reg = await Registration.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )
      .populate("user_id", "fullName email")
      .populate("event_id", "title");

    if (!reg) return res.status(404).json({ message: "Registration not found" });

    // ✅ Log admin update
    await AdminLog.create({
      user_id: req.user._id,
      action: `Updated registration of ${reg.user_id.fullName} (${reg.user_id.email}) for event "${reg.event_id.title}" → ${status}`,
    });

    res.json(reg);
  } catch (err) {
    res.status(500).json({ message: "Failed to update registration" });
  }
};

module.exports = {
  registerForEvent,
  cancelRegistration,
  myRegistrations,
  manageRegistration,
  getEventRegistrations,
  listRegistrations,
  updateRegistration,
};
