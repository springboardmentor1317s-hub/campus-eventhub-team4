const express = require("express");
const { createEvent, getEvents } = require("../controllers/eventController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, authorizeRoles("college_admin", "super_admin"), createEvent);
router.get("/", getEvents);

module.exports = router;
