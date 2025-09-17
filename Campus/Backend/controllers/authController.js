const User = require('../models/User');
const jwt = require('jsonwebtoken');

const normalizeAccountType = (value) => {
  if (!value) return '';
  const v = value.toString().toLowerCase();
  if (v.includes('admin')) return 'college_admin';
  return 'student';
};

const signup = async (req, res) => {
  const { fullName, email, college, accountType, password } = req.body;
  try {
    // Basic validation
    if (!fullName || !email || !college || !accountType || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const normalizedAccountType = normalizeAccountType(accountType);

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    // Create & save user (password will be hashed by pre('save'))
    user = new User({
      fullName, email, college,
      accountType: normalizedAccountType,
      password
    });
    await user.save();

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      token,
      user: { id: user._id, fullName: user.fullName, email: user.email, accountType: user.accountType }
    });
  } catch (error) {
    console.error('Signup Error Details:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const signin = async (req, res) => {
  const { email, password, accountType } = req.body;
  try {
    if (!email || !password || !accountType) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const normalizedAccountType = normalizeAccountType(accountType);
    if (user.accountType !== normalizedAccountType) {
      return res.status(400).json({ message: 'Account type mismatch' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      token,
      user: { id: user._id, fullName: user.fullName, email: user.email, accountType: user.accountType }
    });
  } catch (error) {
    console.error('Signin Error Details:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
// Get logged-in user profile
const profile = async (req, res) => {
  try {
    // req.user is set by auth middleware
    const user = await User.findById(req.user._id).select("-password"); // exclude password
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// Get users (filterable by accountType)
const listUsers = async (req, res) => {
  try {
    const filter = {};
    if (req.query.accountType) {
      filter.accountType = req.query.accountType;
    }
    const users = await User.find(filter).select("-password"); // don’t send passwords
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

module.exports = { signup, signin, profile, listUsers  };

