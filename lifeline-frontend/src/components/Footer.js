import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        textAlign: 'center',
        padding: 2,
        position: 'fixed',
        bottom: 0,
        width: '100%',
      }}
    >
      <Typography variant="body2">
        © 2025 Lifeline Mental Health Assistant. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
