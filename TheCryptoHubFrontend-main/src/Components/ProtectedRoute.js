import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const navigate=useNavigate();
  const token = localStorage.getItem('token');

  if (!token) {
    // If no token is found, redirect to the login page
    return <Navigate to="/" replace />;
  }

  try {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);

    // Check if the user has the 'admin' category
    if (decodedToken.category !== 'admin') {
      // If the user is not an admin, redirect to login
      return <Navigate to="/" replace />;
    }
    // Token is valid, render the protected route
    return <Component {...rest} />;
  } catch (e) {
    // If token decoding fails, redirect to login
    return <Navigate to="/user/login" replace />;
  }
};

export default ProtectedRoute;
