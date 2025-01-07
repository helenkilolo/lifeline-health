import React from 'react';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url(/images/background-image.jpg)', // Replace with actual image path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 4,
        color: 'white',
      }}
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            mb: 2,
            textShadow: '1px 1px 5px rgba(0, 0, 0, 0.7)',
          }}
        >
          Welcome to Lifeline Mental Health Assistant
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontStyle: 'italic',
            mb: 4,
            maxWidth: '600px',
            mx: 'auto',
            textShadow: '1px 1px 5px rgba(0, 0, 0, 0.5)',
          }}
        >
          Empowering you to take control of your mental health with innovative tools and resources.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate('/dashboard')}
          sx={{
            mb: 4,
            backgroundColor: '#ff7043',
            '&:hover': { backgroundColor: '#e64a19' },
          }}
        >
          Get Started
        </Button>
      </motion.div>

      {/* Cards Section */}
      <Grid container spacing={3} justifyContent="center">
        {[
          { label: 'Sentiment Analysis', route: '/sentiment', color: 'primary' },
          { label: 'AI Chat', route: '/chat', color: 'success' },
          { label: 'Mood Tracker', route: '/mood-tracker', color: 'info' },
          { label: 'Micro Therapy', route: '/micro-therapy', color: 'secondary' },
          { label: 'Wearable Integration', route: '/wearables', color: 'warning' },
          { label: 'Cultural Preferences', route: '/cultural-preferences', color: 'primary' },
          { label: 'Emergency Help', route: '/emergency-help', color: 'error' },
        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Paper
                elevation={3}
                sx={{
                  padding: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  height: '100%',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ mb: 2, color: `${item.color}.main` }}
                >
                  {item.label}
                </Typography>
                <Button
                  variant="outlined"
                  color={item.color}
                  onClick={() => navigate(item.route)}
                >
                  Explore
                </Button>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;





