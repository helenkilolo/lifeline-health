import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'admin') {
      navigate('/'); // Redirect non-admin users to the homepage
    }

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [userRes, feedbackRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/auth/users`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BASE_URL}/api/admin/feedback`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setUsers(userRes.data);
        setFeedback(feedbackRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Typography variant="h6" gutterBottom>
        Users
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Typography variant="h6" gutterBottom sx={{ marginTop: 4 }}>
        User Feedback
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Feedback</TableCell>
            <TableCell>Submitted On</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {feedback.map((entry) => (
            <TableRow key={entry._id}>
              <TableCell>{entry.userId?.name || 'Unknown'}</TableCell>
              <TableCell>{entry.feedback}</TableCell>
              <TableCell>{new Date(entry.createdAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default AdminDashboard;





