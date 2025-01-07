const express = require('express');
const router = express.Router();
const twilio = require('twilio');

// Twilio configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

router.post('/notify', async (req, res) => {
  try {
    const { message } = req.body;

    // Replace with the recipient's phone number
    const recipient = '+1234567890'; // Change this to your desired test number
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: recipient,
    });

    res.json({ message: 'Emergency notification sent successfully!' });
  } catch (error) {
    console.error('Failed to send Twilio notification:', error);
    res.status(500).json({ error: 'Failed to send emergency notification.' });
  }
});

module.exports = router;
