const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  registerForEvent,
  cancelRegistration,
  myRegistrations,
  manageRegistration,
  getEventRegistrations,
  listRegistrations,
  updateRegistration
} = require("../controllers/registrationController");

const router = express.Router();

// Student actions
router.post("/", protect, registerForEvent);
router.delete("/:id", protect, cancelRegistration);
router.get("/me", protect, myRegistrations);

// Admin actions
router.put("/manage", protect, manageRegistration);
router.get("/event/:eventId", protect, getEventRegistrations);
router.get("/", protect, listRegistrations);

// PUT update registration status
router.put("/:id", protect, updateRegistration);

module.exports = router;
