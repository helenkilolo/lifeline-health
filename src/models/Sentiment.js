const mongoose = require('mongoose'); // Import mongoose

// Define the Sentiment schema
const SentimentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  text: { type: String, required: true },
  sentiment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Export the Sentiment model
module.exports = mongoose.model('Sentiment', SentimentSchema);


