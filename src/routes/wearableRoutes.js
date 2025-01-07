const express = require('express');
const axios = require('axios');
const router = express.Router();
const authMiddleware = require('../middleware/auth'); // Authentication middleware
const User = require('../models/User');

// Fitbit API credentials
const clientId = process.env.FITBIT_CLIENT_ID;
const clientSecret = process.env.FITBIT_CLIENT_SECRET;

// Fitbit authentication endpoint
router.get('/fitbit/auth', async (req, res) => {
  const redirectUri = 'http://localhost:5000/api/wearables/fitbit/callback';
  const authUrl = `https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=heartrate activity sleep`;
  res.redirect(authUrl);
});

// Fitbit callback endpoint
router.get('/fitbit/callback', async (req, res) => {
  try {
    const { code } = req.query;
    const tokenResponse = await axios.post(
      'https://api.fitbit.com/oauth2/token',
      new URLSearchParams({
        code,
        redirect_uri: 'http://localhost:5000/api/wearables/fitbit/callback',
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { access_token } = tokenResponse.data;
    res.json({ message: 'Fitbit connected!', token: access_token });
  } catch (error) {
    console.error('Error during Fitbit connection:', error.response?.data || error.message);
    res.status(500).json({ error: 'Fitbit connection failed' });
  }
});

// Fetch Fitbit data
router.get('/fitbit/data', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Extract the token from the "Authorization" header
    const dataResponse = await axios.get('https://api.fitbit.com/1/user/-/activities/heart/date/today/1d.json', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    res.json(dataResponse.data);
  } catch (error) {
    console.error('Error fetching Fitbit data:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch Fitbit data' });
  }
});

// Google Fit Integration
router.get('/googlefit/auth', (req, res) => {
  const redirectUri = 'http://localhost:5000/api/wearables/googlefit/callback';
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${redirectUri}&scope=https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.body.read`;
  res.redirect(authUrl);
});

router.get('/googlefit/callback', async (req, res) => {
  try {
    const { code } = req.query;
    const tokenResponse = await axios.post(
      'https://oauth2.googleapis.com/token',
      {
        code,
        redirect_uri: 'http://localhost:5000/api/wearables/googlefit/callback',
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        grant_type: 'authorization_code',
      }
    );

    const { access_token } = tokenResponse.data;
    res.json({ message: 'Google Fit connected!', token: access_token });
  } catch (error) {
    console.error('Error during Google Fit connection:', error.response?.data || error.message);
    res.status(500).json({ error: 'Google Fit connection failed' });
  }
});


// Manual Data Entry
router.post('/manual', authMiddleware, async (req, res) => {
  const { heartRate, activityLevel, sleepHours } = req.body;

  try {
    // Validate input
    if (!heartRate || !activityLevel || !sleepHours) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Find the user making the submission
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Add manual entry to the user's health data
    const manualEntry = {
      heartRate,
      activityLevel,
      sleepHours,
      date: new Date(),
    };

    // Save data to the user's health log (ensure your user schema has a field for healthData)
    user.healthData = user.healthData || []; // Initialize if undefined
    user.healthData.push(manualEntry);
    await user.save();

    res.status(200).json({ message: 'Health data submitted successfully.' });
  } catch (error) {
    console.error('Error submitting health data:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});



module.exports = router;

