// src/components/LoginPage.jsx

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './LoginPage.css';

const LoginPage = () => {
  const { login, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (user || isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [user, isAuthenticated, navigate]);

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // Check if Netlify Identity is available
      if (!window.netlifyIdentity) {
        throw new Error('Authentication service is not available. Please refresh the page and try again.');
      }
      
      console.log('Opening Netlify Identity login modal...');
      login();
      
      // Set a timeout to handle cases where the modal doesn't open
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Log In to Your Account</h2>
        <p className="login-subtitle">Access your dashboard and insights.</p>

        {error && (
          <div style={{ 
            color: 'red', 
            marginBottom: '15px', 
            padding: '10px', 
            backgroundColor: '#ffe6e6', 
            borderRadius: '5px',
            border: '1px solid #ffcccc'
          }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'center', margin: '32px 0' }}>
          <button 
            onClick={handleLogin} 
            className="login-button"
            disabled={isLoading}
            style={{
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? 'Opening Login...' : 'Log In'}
          </button>
        </div>

        {/* Debug information - remove in production */}
        <div style={{ 
          fontSize: '12px', 
          color: '#666', 
          marginTop: '20px',
          padding: '10px',
          backgroundColor: '#f5f5f5',
          borderRadius: '5px'
        }}>
          <strong>Debug Info:</strong><br />
          Netlify Identity Available: {window.netlifyIdentity ? 'Yes' : 'No'}<br />
          Current User: {user ? 'Logged in' : 'Not logged in'}<br />
          Is Authenticated: {isAuthenticated() ? 'Yes' : 'No'}
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
