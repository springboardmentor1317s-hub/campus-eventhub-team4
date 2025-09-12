// scripts/seedColleges.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Simple College Schema (inline for now)
const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  address: {
    city: String,
    state: String,
    country: { type: String, default: 'India' }
  },
  contactInfo: {
    email: String,
    phone: String,
    website: String
  },
  adminEmail: { type: String, required: true },
  isVerified: { type: Boolean, default: true },
  description: String
}, { timestamps: true });

const College = mongoose.model('College', collegeSchema);

// Sample colleges data
const sampleColleges = [
  {
    name: "Indian Institute of Technology Delhi",
    code: "IITD",
    address: { city: "New Delhi", state: "Delhi", country: "India" },
    contactInfo: { email: "info@iitd.ac.in", phone: "1126591999", website: "https://www.iitd.ac.in" },
    adminEmail: "admin@iitd.ac.in",
    isVerified: true,
    description: "Premier engineering institution"
  },
  {
    name: "Delhi University",
    code: "DU",
    address: { city: "New Delhi", state: "Delhi", country: "India" },
    contactInfo: { email: "info@du.ac.in", phone: "1127667011", website: "https://www.du.ac.in" },
    adminEmail: "admin@du.ac.in",
    isVerified: true,
    description: "One of India's largest universities"
  },
  {
    name: "Anna University",
    code: "AU",
    address: { city: "Chennai", state: "Tamil Nadu", country: "India" },
    contactInfo: { email: "info@annauniv.edu", phone: "4422351723", website: "https://www.annauniv.edu" },
    adminEmail: "admin@annauniv.edu",
    isVerified: true,
    description: "Technical university in Tamil Nadu"
  },
  {
    name: "University of Mumbai",
    code: "MU",
    address: { city: "Mumbai", state: "Maharashtra", country: "India" },
    contactInfo: { email: "info@mu.ac.in", phone: "2226543000", website: "https://www.mu.ac.in" },
    adminEmail: "admin@mu.ac.in",
    isVerified: true,
    description: "Premier university in Mumbai"
  },
  {
    name: "Puducherry University",
    code: "PU",
    address: { city: "Puducherry", state: "Puducherry", country: "India" },
    contactInfo: { email: "info@pondiuni.edu.in", phone: "4132654000", website: "https://www.pondiuni.edu.in" },
    adminEmail: "admin@pondiuni.edu.in",
    isVerified: true,
    description: "Central university in Puducherry"
  }
];

// Connect to database
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI not found in environment variables');
      console.log('Please create .env file with MONGODB_URI');
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected for seeding');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
};

// Seed colleges
const seedColleges = async () => {
  try {
    console.log('🌱 Starting college seeding process...');

    // Clear existing colleges
    await College.deleteMany({});
    console.log('🧹 Cleared existing colleges');

    // Insert sample colleges
    const insertedColleges = await College.insertMany(sampleColleges);
    console.log(`✅ Successfully seeded ${insertedColleges.length} colleges:`);
    
    insertedColleges.forEach(college => {
      console.log(`   - ${college.name} (${college.code}) - ID: ${college._id}`);
    });

    console.log('\n🎉 Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

// Main function
const runSeeding = async () => {
  await connectDB();
  await seedColleges();
};

// Run if this file is executed directly
if (require.main === module) {
  runSeeding();
}

module.exports = { sampleColleges };