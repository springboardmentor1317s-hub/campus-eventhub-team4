const express = require('express');
const { signup, signin } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);

// remove test routes in production

module.exports = router;
