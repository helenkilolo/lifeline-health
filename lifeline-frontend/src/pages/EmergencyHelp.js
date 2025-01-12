import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Paper, Button } from '@mui/material';
import axios from 'axios';

// Set the base URL dynamically based on the environment
const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const EmergencyHelp = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [highlightedHelpline, setHighlightedHelpline] = useState(null);

  const helplines = [
    { country: 'United States', number: '988 (Suicide & Crisis Lifeline)' },
    { country: 'United Kingdom', number: '116 123 (Samaritans)' },
    { country: 'Canada', number: '1-833-456-4566 (Talk Suicide Canada)' },
    { country: 'India', number: '91-22-27546669 (AASRA)' },
    { country: 'Kenya', number: '1190 (Befrienders Kenya)' },
    { country: 'South Africa', number: '0800 567 567 (SADAG)' },
  ];

  useEffect(() => {
    // Fetch user location via IP-based geolocation API
    const fetchLocation = async () => {
      try {
        const response = await axios.get('https://ipapi.co/json/');
        setUserLocation(response.data);
        const matchedHelpline = helplines.find(
          (helpline) => helpline.country === response.data.country_name
        );
        setHighlightedHelpline(matchedHelpline);
      } catch (error) {
        console.error('Failed to fetch location:', error);
      }
    };

    fetchLocation();
  }, []);

  const sendEmergencyNotification = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/emergency/notify`, {
        message: 'This is an emergency notification!',
      });
      alert(response.data.message || 'Emergency notification sent successfully!');
    } catch (error) {
      console.error('Failed to send notification:', error);
      alert('Failed to send emergency notification.');
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Emergency Help
      </Typography>
      <Typography variant="body1" gutterBottom>
        If you or someone you know is in immediate danger, please reach out to one of the following helplines:
      </Typography>
      {userLocation && highlightedHelpline ? (
        <Typography variant="h6" color="primary" sx={{ marginBottom: 2 }}>
          Based on your location ({userLocation.country_name}), call {highlightedHelpline.number}.
        </Typography>
      ) : (
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
          Detecting your location...
        </Typography>
      )}
      <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
        <List>
          {helplines.map((helpline, index) => (
            <ListItem key={index} sx={{ backgroundColor: highlightedHelpline === helpline ? '#f0f8ff' : 'transparent' }}>
              <ListItemText
                primary={helpline.country}
                secondary={`Helpline: ${helpline.number}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Button
        variant="contained"
        color="secondary"
        sx={{ marginTop: 4 }}
        onClick={sendEmergencyNotification}
      >
        Send Emergency Notification
      </Button>
      <Typography variant="body2" color="text.secondary" sx={{ marginTop: 4 }}>
        Note: This page is for informational purposes only. Please contact a professional for further assistance.
      </Typography>
    </Box>
  );
};

export default EmergencyHelp;


