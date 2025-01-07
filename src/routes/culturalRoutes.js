const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Update cultural preference
router.post('/', async (req, res) => {
  try {
    const { userId, preference } = req.body;

    // Validate the input
    if (!userId || !preference) {
      console.error('Missing fields:', { userId, preference });
      return res.status(400).json({ error: 'User ID and preference are required.' });
    }

    console.log('Incoming Request:', { userId, preference });

    // Find the user by ID and update the cultural preference
    const user = await User.findByIdAndUpdate(
      userId,
      { culturalPreference: preference },
      { new: true } // Return the updated document
    );

    if (!user) {
      console.error('User not found:', userId);
      return res.status(404).json({ error: 'User not found.' });
    }

    console.log('Updated User:', user);

    // Respond with success message and updated user data
    res.json({ message: 'Cultural preference updated successfully!', user });
  } catch (error) {
    console.error('Error updating cultural preference:', error.message);
    res.status(500).json({ error: 'Failed to update cultural preference.' });
  }
});

module.exports = router;


