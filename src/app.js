require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize the app
const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route Imports
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const moodRoutes = require('./routes/moodRoutes');
const sentimentRoutes = require('./routes/sentimentRoutes');
const emergencyRoutes = require('./routes/emergencyRoutes'); 
const therapyRoutes = require('./routes/therapyRoutes');
const chatRoutes = require('./routes/chatRoutes');
const wearableRoutes = require('./routes/wearableRoutes'); // Wearable integration routes
const culturalPreferenceRoutes = require('./routes/culturalRoutes');
const adminRoutes = require('./routes/adminRoutes')

// Route Middleware
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/moods', moodRoutes);
app.use('/api/sentiment', sentimentRoutes);
app.use('/api/emergency', emergencyRoutes);
app.use('/api/therapy', therapyRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/wearables', wearableRoutes); // Register wearable integration routes
app.use('/api/cultural-preference', culturalPreferenceRoutes);
app.use('/api/admin', adminRoutes);
app.use(
  cors({
    origin: ['https://lifeline-frontend-woad.vercel.app/', 'http://localhost:3000'], // Allow Vercel and local development
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
// Test Route
app.get('/', (req, res) => {
  res.send('Welcome to Lifeline Mental Health Assistant API!');
});

// MongoDB Connection
(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000, // 10-second timeout for server selection
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
})();

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
