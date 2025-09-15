const express = require('express');
const router = express.Router();
const {
  registerUser,
  authUser,
  getUserProfile,
  getUsers
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/profile', protect, getUserProfile);
router.get('/', protect, admin, getUsers); // admin only

module.exports = router;
