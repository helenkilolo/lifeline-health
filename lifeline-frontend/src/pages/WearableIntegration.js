import React from 'react';
import { Button, Typography, Box } from '@mui/material';

const WearableIntegration = () => {
  const connectFitbit = () => {
    window.location.href = 'http://localhost:5000/api/wearables/fitbit/auth';
  };

  const connectGoogleFit = () => {
    window.location.href = 'http://localhost:5000/api/wearables/googlefit/auth';
  };

  const manualDataEntry = () => {
    window.location.href = '/manual-data-entry'; // Redirect to a manual data entry page
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

