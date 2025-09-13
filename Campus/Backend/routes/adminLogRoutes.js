const express = require("express");
const { getLogs } = require("../controllers/adminLogController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, authorizeRoles("super_admin"), getLogs);

module.exports = router;
