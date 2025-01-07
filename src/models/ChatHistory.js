const mongoose = require('mongoose');

// Define the ChatHistory schema
const ChatHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  reply: {
    type: String,
    required: true,
  },
  sentiment: {
    type: String, // Example: Positive, Neutral, Negative
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the ChatHistory model
const ChatHistory = mongoose.model('ChatHistory', ChatHistorySchema);

module.exports = ChatHistory;
