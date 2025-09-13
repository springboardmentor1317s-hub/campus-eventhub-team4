const AdminLog = require("../models/AdminLog");

// Fetch logs (super_admin only)
const getLogs = async (req, res) => {
  const logs = await AdminLog.find().populate("user_id", "name email role");
  res.json(logs);
};

module.exports = { getLogs };
