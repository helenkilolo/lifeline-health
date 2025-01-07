const mongoose = require('mongoose');
const express = require('express');
const axios = require('axios');
const Sentiment = require('../models/Sentiment');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Map emotions to coping strategies
const copingStrategies = {
  stressed: ['Take a deep breath.', 'Try progressive muscle relaxation.', 'Go for a short walk.'],
  anxious: ['Practice grounding techniques.', 'Do a 5-minute mindfulness exercise.', 'Write down your worries.'],
  sad: ['Listen to uplifting music.', 'Talk to a trusted friend.', 'Spend time in nature.'],
  happy: ['Celebrate your moment!', 'Write in your gratitude journal.', 'Share your happiness with someone.'],
};

// Sentiment Analysis Endpoint
router.post('/analyze', authMiddleware, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      console.log('No text provided'); // Debug log
      return res.status(400).json({ error: 'Text is required for analysis' });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    console.log('Using OpenAI API key:', apiKey); // Debug log

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo', // Use a valid model
        messages: [
          { role: 'system', content: 'You are a sentiment analysis assistant.' },
          { role: 'user', content: `Analyze the sentiment of the following text: "${text}"` },
        ],
        max_tokens: 100,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    console.log('OpenAI API response:', response.data); // Debug log
    const sentiment = response.data.choices[0].message.content.trim().toLowerCase();

    const sentimentRecord = new Sentiment({
      userId: req.user.id,
      text,
      sentiment,
    });
    await sentimentRecord.save();
    console.log('Saved Sentiment Record:', sentimentRecord);
    
    const strategies = copingStrategies[sentiment] || ['Take a break.', 'Reflect on your emotions.', 'Consider journaling.'];

    res.json({ sentiment, strategies });
  } catch (err) {
    console.error('Error during sentiment analysis:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to analyze sentiment' });
  }
});

// Sentiment History Endpoint
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const sentiments = await Sentiment.find({ userId: req.user.id }).sort({ createdAt: -1 }); // Sort by most recent
    console.log('Fetched Sentiment History:', sentiments); // Debug log
    res.json(sentiments);
  } catch (error) {
    console.error('Error fetching sentiment history:', error);
    res.status(500).json({ error: 'Failed to fetch sentiment history' });
  }
});



module.exports = router;

