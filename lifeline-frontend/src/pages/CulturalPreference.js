import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Select, MenuItem } from '@mui/material';
import axios from 'axios';

// Set the base URL dynamically based on the environment
const BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const CulturalPreference = () => {
  const [preference, setPreference] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Get user data from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserId(user.id);
      setPreference(user.culturalPreference || ''); // Default to user's saved preference
    }
  }, []);

  const updatePreference = async () => {
    if (!preference) {
      alert('Please select a preference.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      console.log('User ID:', userId, 'Preference:', preference);

      const response = await axios.post(
        `${BASE_URL}/api/cultural-preference`,
        { userId, preference },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log('API Response:', response.data);

      alert(response.data.message);

      // Update localStorage with the new preference
      const user = JSON.parse(localStorage.getItem('user'));
      localStorage.setItem(
        'user',
        JSON.stringify({ ...user, culturalPreference: preference })
      );
    } catch (error) {
      console.error('Error updating preference:', error.response?.data || error.message);
      alert('Failed to update preference.');
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" gutterBottom>
        Set Your Cultural Preference
      </Typography>
      <Select
        value={preference}
        onChange={(e) => setPreference(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      >
        <MenuItem value="Global">Global</MenuItem>
        <MenuItem value="African">African</MenuItem>
        <MenuItem value="Asian">Asian</MenuItem>
        <MenuItem value="Western">Western</MenuItem>
      </Select>
      <Button variant="contained" color="primary" onClick={updatePreference}>
        Save Preference
      </Button>
    </Box>
  );
};

export default CulturalPreference;


