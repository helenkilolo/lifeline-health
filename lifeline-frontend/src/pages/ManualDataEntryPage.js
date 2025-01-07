import React, { useState } from 'react';
import { Box, Typography, TextField, Button, MenuItem } from '@mui/material';
import axios from 'axios';

const ManualDataEntryPage = () => {
  const [formData, setFormData] = useState({
    heartRate: '',
    activityLevel: '',
    sleepHours: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const activityLevels = ['Low', 'Moderate', 'High'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/wearables/manual',
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage(response.data.message);
      setFormData({ heartRate: '', activityLevel: '', sleepHours: '' }); // Reset form
    } catch (error) {
      console.error('Error submitting data:', error.response?.data || error.message);
      setError('Failed to submit data. Please try again.');
    }
  };

  return (
    <Box sx={{ padding: 4, maxWidth: 500, margin: 'auto', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Manual Health Data Entry
      </Typography>
      <Typography variant="body1" gutterBottom>
        Please enter your health data below.
      </Typography>
      {message && <Typography color="success.main">{message}</Typography>}
      {error && <Typography color="error.main">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Heart Rate (bpm)"
          name="heartRate"
          type="number"
          value={formData.heartRate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Activity Level"
          name="activityLevel"
          select
          value={formData.activityLevel}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        >
          {activityLevels.map((level, index) => (
            <MenuItem key={index} value={level}>
              {level}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Sleep Hours"
          name="sleepHours"
          type="number"
          value={formData.sleepHours}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
          fullWidth
        >
          Submit Data
        </Button>
      </form>
    </Box>
  );
};

export default ManualDataEntryPage;
