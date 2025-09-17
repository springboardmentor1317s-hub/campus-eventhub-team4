const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
if (!process.env.MONGODB_URI) { console.error('MONGODB_URI missing'); process.exit(1); }
if (!process.env.JWT_SECRET)    { console.error('JWT_SECRET missing'); process.exit(1); }

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => { console.error('❌ MongoDB connection error:', err); process.exit(1); });

app.use('/api/auth', require('./routes/authRoutes'));

app.get('/', (req, res) => res.send('Campus EventHub API is running'));
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
