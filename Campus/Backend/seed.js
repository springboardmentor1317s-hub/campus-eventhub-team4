const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const User = require("./models/User");
const Event = require("./models/Event");
const Registration = require("./models/Registration");
const AdminLog = require("./models/AdminLog");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Event.deleteMany();
    await Registration.deleteMany();
    await AdminLog.deleteMany();

    // --- Users ---
    const users = await User.insertMany([
      { fullName: "John Doe", email: "john@example.com", college: "ABC College", accountType: "Student", password: "password123" },
      { fullName: "Jane Smith", email: "jane@example.com", college: "XYZ College", accountType: "Student", password: "password123" },
      { fullName: "Admin User", email: "admin@example.com", college: "ABC College", accountType: "College Admin", password: "admin123" },
      { fullName: "Alice Johnson", email: "alice@example.com", college: "XYZ College", accountType: "Student", password: "password123" },
      { fullName: "Bob Williams", email: "bob@example.com", college: "ABC College", accountType: "Student", password: "password123" },
    ]);

    console.log("✅ Users seeded");

    // --- Events ---
    const events = await Event.insertMany([
      {
        college_id: users[2]._id, // Admin User
        title: "Tech Fest 2025",
        description: "Annual tech festival with workshops and competitions.",
        category: "hackathon",
        location: "Main Hall",
        start_date: new Date("2025-10-01"),
        end_date: new Date("2025-10-03"),
        banner: "https://images.unsplash.com/photo-1581091012184-7e1c68234bfa?auto=format&fit=crop&w=800&q=80",
      },
      {
        college_id: users[2]._id,
        title: "Music Fiesta",
        description: "College music event with live performances.",
        category: "cultural",
        location: "Auditorium",
        start_date: new Date("2025-11-10"),
        end_date: new Date("2025-11-12"),
        banner: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1350&q=80",
      },
      {
        college_id: users[2]._id,
        title: "Sports Meet",
        description: "Inter-college sports competition.",
        category: "sports",
        location: "Sports Ground",
        start_date: new Date("2025-09-20"),
        end_date: new Date("2025-09-22"),
        banner: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80",
      },
    ]);

    console.log("✅ Events seeded");

    // --- Registrations ---
    await Registration.insertMany([
      { user_id: users[0]._id, event_id: events[0]._id, status: "approved" },
      { user_id: users[1]._id, event_id: events[0]._id, status: "pending" },
      { user_id: users[3]._id, event_id: events[1]._id, status: "approved" },
      { user_id: users[4]._id, event_id: events[2]._id, status: "rejected" },
    ]);

    console.log("✅ Registrations seeded");

    // --- Admin Logs ---
    await AdminLog.insertMany([
      { user_id: users[2]._id, action: "Created Tech Fest 2025" },
      { user_id: users[2]._id, action: "Created Music Fiesta" },
      { user_id: users[2]._id, action: "Created Sports Meet" },
    ]);

    console.log("✅ AdminLogs seeded");

    console.log("🎉 Seed data inserted successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
