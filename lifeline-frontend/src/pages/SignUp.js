import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const SignUp = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
  
    console.log('Submitting form data:', formData);
  
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', formData);
      setMessage(response.data.message);
      setFormData({ name: '', email: '', password: '' });
    } catch (err) {
      console.error('Error details:', err.response?.data);
      setError(err.response?.data?.error || 'Failed to register. Please try again.');
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      {message && <Typography color="primary">{message}</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          fullWidth
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" color="primary" type="submit">
          Sign Up
        </Button>
      </form>
    </Box>
  );
};

export default SignUp;



