const express = require('express');
const axios = require('axios');
const authMiddleware = require('../middleware/auth');
const TherapySession = require('../models/TherapySession'); // New Model
const Feedback = require('../models/Feedback'); // Feedback Model

const router = express.Router();

// Therapy Session Endpoint
router.post('/session', authMiddleware, async (req, res) => {
  try {
    const { type } = req.body;

    if (!type) return res.status(400).json({ error: 'Therapy type is required' });

    const prompts = {
      gratitude: 'Guide the user through a gratitude journaling exercise. Provide a series of thoughtful prompts.',
      reframing: 'Guide the user through a cognitive reframing exercise. Help them view a situation from a positive perspective.',
      mindfulness: 'Guide the user through a mindfulness meditation exercise. Provide step-by-step instructions for relaxation.',
      self_compassion: 'Guide the user through self-compassion exercises. Help them treat themselves with kindness and understanding.',
      breathing: 'Guide the user through deep breathing exercises. Provide step-by-step instructions for relaxation and stress relief.',
    };

    const apiKey = process.env.OPENAI_API_KEY;
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a therapeutic AI assistant.' },
          { role: 'user', content: prompts[type] },
        ],
        max_tokens: 300,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const therapySteps = response.data.choices[0].message.content.trim();
    res.json({ type, steps: therapySteps });
  } catch (err) {
    console.error('Error during therapy session:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to generate therapy session' });
  }
});

// Save Therapy Session
router.post('/save', authMiddleware, async (req, res) => {
  try {
    const { type, steps } = req.body;
    const userId = req.user.id;

    const session = new TherapySession({ userId, type, steps });
    await session.save();

    res.status(201).json({ message: 'Session saved successfully.' });
  } catch (err) {
    console.error('Error saving session:', err.message);
    res.status(500).json({ error: 'Failed to save session.' });
  }
});

// Fetch Saved Sessions
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const sessions = await TherapySession.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(sessions);
  } catch (err) {
    console.error('Error fetching sessions:', err.message);
    res.status(500).json({ error: 'Failed to fetch sessions.' });
  }
});

// Submit Feedback
router.post('/feedback', authMiddleware, async (req, res) => {
  try {
    const { feedback } = req.body;
    const userId = req.user.id;

    const feedbackEntry = new Feedback({ userId, feedback });
    await feedbackEntry.save();

    res.status(201).json({ message: 'Feedback submitted successfully.' });
  } catch (err) {
    console.error('Error submitting feedback:', err.message);
    res.status(500).json({ error: 'Failed to submit feedback.' });
  }
});

module.exports = router;



