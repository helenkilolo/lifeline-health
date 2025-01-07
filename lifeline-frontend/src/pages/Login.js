import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      const { token, user } = response.data;
      console.log('Login Response:', response.data);
      
      // Save user ID and token to localStorage
      const userId = user.id;
      localStorage.setItem('id', userId);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Debugging
      console.log('Login Successful. User ID:', localStorage.getItem('id'));
      console.log('Token:', localStorage.getItem('token'));
      console.log('Form Data Submitted:', formData); // Add this log
      console.log('Saved User in Login:', JSON.parse(localStorage.getItem('user')));


      navigate('/'); // Redirect to the homepage
    } catch (err) {
      console.error('Login Failed:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
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
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;


