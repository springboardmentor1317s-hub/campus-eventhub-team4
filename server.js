// server.js - Simple test version for CampusEventHub
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

console.log('🚀 CampusEventHub Backend Starting...');
console.log('📊 Environment:', process.env.NODE_ENV || 'development');
console.log('🌐 Port:', process.env.PORT || 5000);
console.log('💾 Database URI configured:', process.env.MONGODB_URI ? '✅ Yes' : '❌ No');

// Check if required environment variables exist
if (!process.env.MONGODB_URI) {
  console.log('⚠️  Please create .env file with MONGODB_URI');
}

const PORT = process.env.PORT || 5000;

// Simple Express server for testing
const express = require('express');
const cors = require('cors');

const app = express();

// Basic middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true,
    message: 'CampusEventHub Backend is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Test route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to CampusEventHub Backend API!',
    endpoints: {
      health: '/api/health',
      colleges: '/api/colleges (coming soon)',
      auth: '/api/auth (coming soon)'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  console.log('🔗 Test URLs:');
  console.log(`   - http://localhost:${PORT}/`);
  console.log(`   - http://localhost:${PORT}/api/health`);
  console.log('\n📝 To stop server: Press Ctrl+C');
});