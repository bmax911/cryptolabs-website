// src/components/LoginPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './LoginPage.css';

const LoginPage = () => {
  const { login } = useAuth();

  const handleLogin = () => {
    login();
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Log In to Your Account</h2>
        <p className="login-subtitle">Access your dashboard and insights.</p>

        <div style={{ display: 'flex', justifyContent: 'center', margin: '32px 0' }}>
          <button onClick={handleLogin} className="login-button">
            Log In
          </button>
        </div>

        <div className="signup-link-container">
          <p>
            Don't have an account?{' '}
            <Link to="/signup" className="signup-link">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
