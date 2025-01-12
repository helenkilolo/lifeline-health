import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Set the base URL dynamically based on the environment
const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const WearableIntegration = () => {
  const navigate = useNavigate();

  const connectFitbit = () => {
    window.location.href = `${BASE_URL}/api/wearables/fitbit/auth`;
  };

  const connectGoogleFit = () => {
    window.location.href = `${BASE_URL}/api/wearables/googlefit/auth`;
  };

  const manualDataEntry = () => {
    navigate('/manual-data-entry'); // Navigate to the manual data entry page
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" gutterBottom>
        Wearable Integration
      </Typography>
      <Typography variant="body1" gutterBottom>
        Connect your device to monitor your heart rate, activity, and stress levels.
      </Typography>
      <Box sx={{ marginBottom: 2 }}>
        <Button variant="contained" color="primary" onClick={connectFitbit}>
          Connect Fitbit
        </Button>
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <Button variant="contained" color="secondary" onClick={connectGoogleFit}>
          Connect Google Fit
        </Button>
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <Button variant="contained" color="info" onClick={manualDataEntry}>
          Manual Data Entry
        </Button>
      </Box>
    </Box>
  );
};

export default WearableIntegration;
