const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ quiet: true });

const app = express();

// ✅ Middleware must come FIRST
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

// ✅ Now load all routes AFTER middleware
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/order');
const gigRoutes = require('./routes/gig');

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/gigs', gigRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('🚀 API is working!');
});

// DB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(5000, () => {
      console.log('🚀 Server running on http://localhost:5000');
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err);
  });
