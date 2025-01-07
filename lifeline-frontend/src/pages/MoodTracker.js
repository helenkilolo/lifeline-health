import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const MoodTracker = () => {
  const [moods, setMoods] = useState([]);
  const [mood, setMood] = useState('');
  const [error, setError] = useState('');
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchMoods = async () => {
      const id = localStorage.getItem('id');
      const token = localStorage.getItem('token');

      // Debugging localStorage
      console.log('ID from localStorage:', id);
      console.log('Token from localStorage:', token);

      if (!id || !token) {
        setError('User ID or Token is missing. Please log in again.');
        console.error('User ID or Token is missing.');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/moods/${id}/moods`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Moods fetched successfully:', response.data);
        setMoods(response.data);
      } catch (error) {
        console.error('Error fetching moods:', error.response?.data || error.message);
        setError('Failed to fetch moods.');
      }
    };

    fetchMoods();
  }, []);

  const addMood = async () => {
    const userId = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    // Debugging localStorage values
    console.log('User ID from localStorage:', userId);
    console.log('Token from localStorage:', token);

    if (!userId || !token) {
      setError('User ID or Token is missing. Please log in again.');
      return;
    }

    if (!mood) {
      setError('Mood cannot be empty.');
      return;
    }

    try {
      console.log('Adding mood:', mood);
      const response = await axios.post(
        `http://localhost:5000/api/moods/${userId}/moods`,
        { mood, notes: 'Optional Notes' }, // Pass mood and optional notes
        {
          headers: { Authorization: `Bearer ${token}` }, // Include token in the header
        }
      );

      console.log('Mood added successfully:', response.data);
      setMood(''); // Clear the input
      const updatedMoods = await axios.get(`http://localhost:5000/api/moods/${userId}/moods`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMoods(updatedMoods.data);
      setError('');
    } catch (err) {
      console.error('Error adding mood:', err.response?.data || err.message);
      setError('Failed to add mood. Please try again.');
    }
  };

  const chartData = {
    labels: moods.map((entry) => new Date(entry.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Mood Entries',
        data: moods.map((_, index) => index + 1),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Mood Tracker
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 4 }}>
        <TextField
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="How are you feeling?"
          variant="outlined"
          fullWidth
        />
        <Button variant="contained" onClick={addMood}>
          Add Mood
        </Button>
      </Box>
      {error && (
        <Typography variant="body2" color="error" gutterBottom>
          {error}
        </Typography>
      )}
      <Box sx={{ marginTop: 4 }}>
        <Bar ref={chartRef} data={chartData} />
      </Box>
    </Box>
  );
};

export default MoodTracker;









