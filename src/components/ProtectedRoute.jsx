import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Using the real AuthContext

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    // You can replace this with a beautiful spinner component
    return <div className="text-center p-12">Loading...</div>;
  }

  if (!isAuthenticated()) {
    // If not authenticated, redirect to the login page.
    return <Navigate to="/login" replace />;
  }

  // If authenticated, show the children components (e.g., the Dashboard).
  return children;
};

export default ProtectedRoute;