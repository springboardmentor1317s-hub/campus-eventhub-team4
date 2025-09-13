const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables early
dotenv.config();

// Safeguard: Exit if MONGODB_URI is missing
if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI not set in .env file. Please check your configuration.');
  process.exit(1);
}

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);  // Logs the host for confirmation
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);  // Exit process on failure
  }
};

module.exports = connectDB;