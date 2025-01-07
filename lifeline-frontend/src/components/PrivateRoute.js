import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, adminOnly }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user')); // Store user data in localStorage on login

  if (!token) return <Navigate to="/login" />;

  if (adminOnly && user.role !== 'admin') return <Navigate to="/" />;

  return children;
};

export default PrivateRoute;



