import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token'); // Check if user is logged in
  const user = isLoggedIn ? JSON.parse(localStorage.getItem('user')) : null;

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear JWT
    localStorage.removeItem('user'); // Clear user details
    navigate('/'); // Redirect to login page
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo Area */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/images/lifelinelogo.jpg"
            alt="Lifeline Logo"
            style={{ height: '80px', marginRight: '20px' }}
          />
          <Typography variant="h6" component="div">
            Lifeline Mental Health Assistant
          </Typography>
        </div>

        {/* Welcome User Message */}
        {isLoggedIn && user && (
          <Typography variant="body1" style={{ marginRight: '20px' }}>
            Welcome, {user.name}
          </Typography>
        )}

        {/* Mobile View Menu Toggle */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </div>
      </Toolbar>

      {/* Drawer for Mobile Menu */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List style={{ width: '250px' }}>
          <ListItem button component={Link} to="/">
            <ListItemText primary="Home" />
          </ListItem>
          {isLoggedIn && user?.role === 'admin' && (
            <ListItem button component={Link} to="/admin">
              <ListItemText primary="Admin Dashboard" />
            </ListItem>
          )}
          {isLoggedIn ? (
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItem>
          ) : (
            <>
              <ListItem button component={Link} to="/login">
                <ListItemText primary="Login" />
              </ListItem>
              <ListItem button component={Link} to="/signup">
                <ListItemText primary="Sign Up" />
              </ListItem>
            </>
          )}
          <Divider />
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Header;









