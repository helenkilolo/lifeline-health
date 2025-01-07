import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  CircularProgress,
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Pie } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, ChartTooltip, Legend);

const DashboardPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve JWT from local storage
        const response = await axios.get('http://localhost:5000/api/sentiment/history', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching history:', error);
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  // Pie Chart Data Preparation
  const sentimentCounts = data.reduce(
    (acc, entry) => {
      if (entry.sentiment === 'Positive') acc.positive += 1;
      if (entry.sentiment === 'Negative') acc.negative += 1;
      if (entry.sentiment === 'Neutral') acc.neutral += 1;
      return acc;
    },
    { positive: 0, negative: 0, neutral: 0 }
  );

  const pieChartData = {
    labels: ['Positive', 'Negative', 'Neutral'],
    datasets: [
      {
        label: 'Sentiment Distribution',
        data: [sentimentCounts.positive, sentimentCounts.negative, sentimentCounts.neutral],
        backgroundColor: ['#4caf50', '#f44336', '#ffc107'],
      },
    ],
  };

  return (
    <Box sx={{ padding: 4 }}>
      {/* Navigation Buttons */}
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 4 }}>
        <Button variant="contained" color="primary" component={Link} to="/sentiment">
          Analyze Sentiment
        </Button>
        <Button variant="contained" color="primary" component={Link} to="/history">
          View History
        </Button>
      </Box>

      {/* Show loader while fetching data */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Line Chart for Sentiment Over Time */}
          <Typography variant="h6" gutterBottom>
            Sentiment Over Time
          </Typography>
          <ResponsiveContainer width="100%" height={400} sx={{ marginBottom: 4 }}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="createdAt"
                tickFormatter={(time) => new Date(time).toLocaleDateString()}
              />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sentiment" stroke="#ff7043" />
            </LineChart>
          </ResponsiveContainer>

          {/* Pie Chart for Sentiment Distribution */}
          <Typography variant="h6" gutterBottom>
            Sentiment Distribution
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
            <Pie data={pieChartData} />
          </Box>

          {/* Sentiment History as Cards */}
          <Typography variant="h6" gutterBottom>
            Sentiment History
          </Typography>
          <Grid container spacing={2}>
            {data.map((entry, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Paper elevation={3} sx={{ padding: 2 }}>
                  <Typography variant="h6">Date: {new Date(entry.createdAt).toLocaleDateString()}</Typography>
                  <Typography variant="body1">Sentiment: {entry.sentiment}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Text: {entry.text}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default DashboardPage;

