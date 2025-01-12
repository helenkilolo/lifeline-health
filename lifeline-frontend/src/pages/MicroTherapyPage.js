import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, CircularProgress, TextField } from '@mui/material';
import axios from 'axios';

// Set the base URL dynamically based on the environment
const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const MicroTherapyPage = () => {
  const [therapySteps, setTherapySteps] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [savedSessions, setSavedSessions] = useState([]);

  const startTherapy = async (type) => {
    setLoading(true);
    setTherapySteps('');
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${BASE_URL}/api/therapy/session`,
        { type },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTherapySteps(response.data.steps);
      speak(response.data.steps); // Trigger TTS for the AI response
      await saveSession(type, response.data.steps); // Save session to the backend
    } catch (error) {
      console.error('Error fetching therapy steps:', error.response?.data || error.message);
      alert('Failed to start therapy session.');
    } finally {
      setLoading(false);
    }
  };

  const saveSession = async (type, steps) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${BASE_URL}/api/therapy/save`,
        { type, steps },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Session saved:', response.data);
    } catch (error) {
      console.error('Error saving session:', error.response?.data || error.message);
    }
  };

  const submitFeedback = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${BASE_URL}/api/therapy/feedback`,
        { feedback },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Feedback submitted successfully!');
      setFeedback('');
    } catch (error) {
      console.error('Error submitting feedback:', error.response?.data || error.message);
      alert('Failed to submit feedback.');
    }
  };

  const fetchSavedSessions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/api/therapy/history`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSavedSessions(response.data);
    } catch (error) {
      console.error('Error fetching saved sessions:', error.response?.data || error.message);
    }
  };

  // Text-to-Speech function
  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US'; // Adjust language as needed
      utterance.rate = 1; // Adjust speed (0.5 = slower, 1 = normal, 2 = faster)
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-Speech is not supported in your browser.');
    }
  };

  useEffect(() => {
    fetchSavedSessions();
  }, []);

  return (
    <Box sx={{ padding: 4, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Micro Therapy Sessions
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        Choose a therapy type to start.
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginBottom: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => startTherapy('gratitude')}
        >
          Gratitude Journaling
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => startTherapy('reframing')}
        >
          Cognitive Reframing
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => startTherapy('mindfulness')}
        >
          Mindfulness Meditation
        </Button>
        <Button
          variant="contained"
          color="info"
          onClick={() => startTherapy('self_compassion')}
        >
          Self-Compassion Exercises
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={() => startTherapy('breathing')}
        >
          Breathing Exercises
        </Button>
      </Box>
      {loading && <CircularProgress />}
      {therapySteps && (
        <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
          <Typography variant="h6" gutterBottom>
            Therapy Steps:
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', marginBottom: 2 }}>
            {therapySteps}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => speak(therapySteps)}
            sx={{ marginTop: 2 }}
          >
            Play Therapy Steps
          </Button>
        </Paper>
      )}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6" gutterBottom>
          Provide Feedback
        </Typography>
        <TextField
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="How did this session help you?"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" onClick={submitFeedback}>
          Submit Feedback
        </Button>
      </Box>
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6" gutterBottom>
          Saved Sessions
        </Typography>
        {savedSessions.map((session, index) => (
          <Paper key={index} elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
            <Typography variant="body1">
              <strong>Type:</strong> {session.type}
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
              {session.steps}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default MicroTherapyPage;






