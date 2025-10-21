const User = require('../models/User');
const jwt = require('jsonwebtoken');

const normalizeAccountType = (value) => {
  if (!value) return '';
  const v = value.toString().toLowerCase();

  if (v === 'super_admin') return 'super_admin';
  if (v === 'college_admin' || v === 'admin') return 'college_admin';
  return 'student';
};


const signup = async (req, res) => {
  const { fullName, email, college, accountType, password } = req.body;
  try {
<<<<<<< Updated upstream
    // Basic validation
    if (!fullName || !email || !college || !accountType || !password) {
      return res.status(400).json({ message: 'All fields are required' });
=======
  
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
>>>>>>> Stashed changes
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
    const token = jwt.sign(
  { id: user._id, accountType: user.accountType }, // ✅ include accountType
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

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

    // ✅ include accountType in token
    const token = jwt.sign(
      { id: user._id, accountType: user.accountType },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        accountType: user.accountType
      }
    });
  } catch (error) {
    console.error('Signin Error Details:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
module.exports = { signup, signin };
