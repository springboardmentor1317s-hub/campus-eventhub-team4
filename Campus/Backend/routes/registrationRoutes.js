const express = require("express");
const { registerForEvent, manageRegistration } = require("../controllers/registrationController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

// Students register
router.post("/", protect, authorizeRoles("student"), registerForEvent);

// Admins approve/reject
router.put("/", protect, authorizeRoles("college_admin", "super_admin"), manageRegistration);

module.exports = router;
