const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Signup (Create Account)
const signup = async (req, res) => {
  const { fullName, email, college, accountType, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = new User({ fullName, email, college, accountType, password });
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, user: { id: user._id, fullName, email, accountType } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Signin (Login)
const signin = async (req, res) => {
  const { email, password, accountType } = req.body;  // Account type for verification

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Optional: Verify account type matches
    if (user.accountType !== accountType) {
      return res.status(400).json({ message: 'Account type mismatch' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user: { id: user._id, fullName: user.fullName, email, accountType } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { signup, signin };