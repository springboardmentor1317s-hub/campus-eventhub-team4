const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
if (!process.env.MONGODB_URI) { console.error('MONGODB_URI missing'); process.exit(1); }
if (!process.env.JWT_SECRET)    { console.error('JWT_SECRET missing'); process.exit(1); }


const eventRoutes = require("./routes/eventRoutes");
const registrationRoutes = require("./routes/registrationRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const adminLogRoutes = require("./routes/adminLogRoutes");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => { console.error('❌ MongoDB connection error:', err); process.exit(1); });

app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => res.send('Campus EventHub API is running'));
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

// Middleware
app.use(cors({
  origin: "http://localhost:5173",  // explicitly allow frontend
  credentials: true                 // allow cookies/headers
}));
app.use(express.json());

// MongoDB Connection Function
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit process if DB connection fails
  }
};

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/adminlogs", adminLogRoutes);

app.get("/", (req, res) => {
  res.send("Campus EventHub API is running");
});

// Start Server
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});
