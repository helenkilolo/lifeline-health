import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token'); // Check if user is logged in
  const user = isLoggedIn ? JSON.parse(localStorage.getItem('user')) : null;

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear JWT
    localStorage.removeItem('user'); // Clear user details
    navigate('/login'); // Redirect to login page
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          Lifeline Mental Health Assistant
        </Typography>
        {isLoggedIn && user && (
          <Typography variant="body1" style={{ marginRight: '10px' }}>
            Welcome, {user.name}
          </Typography>
        )}
        <div>
          <Button component={Link} to="/" color="inherit" style={{ marginRight: '10px' }}>
            Home
          </Button>
          {isLoggedIn && user?.role === 'admin' && (
            <Button component={Link} to="/admin" color="inherit" style={{ marginRight: '10px' }}>
              Admin Dashboard
            </Button>
          )}
          {isLoggedIn ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button component={Link} to="/login" color="inherit" style={{ marginRight: '10px' }}>
                Login
              </Button>
              <Button component={Link} to="/signup" color="inherit">
                Sign Up
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;





