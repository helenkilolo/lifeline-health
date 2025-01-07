const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Add a new mood entry
router.post('/:id/moods', async (req, res) => {
  try {
    const { id } = req.params; // Extract user ID from the route parameter
    const { mood, notes } = req.body; // Extract mood and notes from the request body

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Add the new mood entry to the user's mood history
    user.moodHistory.push({ mood, notes, date: new Date() });
    await user.save();

    res.status(201).json({ message: 'Mood entry added successfully!' });
  } catch (err) {
    console.error('Error adding mood:', err.message);
    res.status(500).json({ error: 'Failed to add mood.' });
  }
});

// Get mood history
router.get('/:id/moods', async (req, res) => {
  try {
    const { id } = req.params; // Extract user ID from the route parameter

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user.moodHistory);
  } catch (err) {
    console.error('Error fetching moods:', err.message);
    res.status(500).json({ error: 'Failed to fetch moods.' });
  }
});

module.exports = router;






