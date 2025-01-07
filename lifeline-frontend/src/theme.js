import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff7043', // Warm orange
    },
    secondary: {
      main: '#6d4c41', // Warm brown
    },
    background: {
      default: '#fffaf0', // Soft beige
      paper: '#ffffff', // White for cards
    },
    text: {
      primary: '#4e342e', // Deep brown
      secondary: '#6d4c41', // Lighter brown
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    body1: {
      fontSize: '1rem',
    },
  },
});

export default theme;
