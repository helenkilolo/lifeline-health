import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, List, ListItem } from '@mui/material';
import axios from 'axios';

const SentimentForm = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);

  const analyzeSentiment = async () => {
    try {
      console.log('Analyzing text:', text); // Debug log
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      if (!token) {
        alert('User is not logged in.');
        return;
      }
  
      const response = await axios.post(
        'http://localhost:5000/api/sentiment/analyze',
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in header
          },
        }
      );
      console.log('Sentiment analysis result:', response.data); // Debug log
      setResult(response.data); // Save result for display
    } catch (error) {
      console.error('Error analyzing sentiment:', error.response?.data || error.message);
      alert('Failed to analyze sentiment');
    }
  };
  
  

  return (
    <Paper elevation={3} sx={{ padding: 4, margin: '20px auto', maxWidth: 600 }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Sentiment Analysis
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Enter your text"
          multiline
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={analyzeSentiment}>
          Analyze
        </Button>
        {result && (
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="h6">Sentiment: {result.sentiment}</Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>Coping Strategies:</Typography>
            <List>
              {result.strategies.map((strategy, index) => (
                <ListItem key={index}>{strategy}</ListItem>
              ))}
            </List>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default SentimentForm;


