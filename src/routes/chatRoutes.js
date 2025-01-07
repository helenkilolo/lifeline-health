const express = require('express');
const router = express.Router();
const axios = require('axios');
const ChatHistory = require('../models/ChatHistory');

// Chat endpoint
router.post('/', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });

  try {
    const apiKey = process.env.OPENAI_API_KEY;

    const sentimentResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'Analyze the sentiment of this text: ' },
          { role: 'user', content: message },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const sentiment = sentimentResponse.data.choices[0].message.content.trim();

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'Respond empathetically based on the sentiment.' },
          { role: 'user', content: message },
          { role: 'assistant', content: sentiment },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const reply = response.data.choices[0].message.content.trim();
    res.json({ sentiment, reply });
  } catch (error) {
    console.error('Error generating chat response:', error);
    res.status(500).json({ error: 'Failed to generate response.' });
  }
});

router.post('/', async (req, res) => {
  const { userId, message } = req.body;

  try {
    // Process the chat response here...

    const chatRecord = new ChatHistory({
      userId,
      message,
      reply,
      sentiment,
    });

    await chatRecord.save();

    res.json({ reply, sentiment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save chat history.' });
  }
});

module.exports = router;
