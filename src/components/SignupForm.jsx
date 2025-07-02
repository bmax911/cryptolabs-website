// src/components/SignupForm.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import './SignupForm.css';

const SignupForm = () => {

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    setError('');
    setSuccessMessage('');
    setIsLoading(true);
    try {
      // Flask backend endpoint for Google OAuth
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: credentialResponse.credential }),
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || data.error || 'Google sign-up failed.');
      }
      const appToken = data.token;
      if (!appToken) {
        throw new Error('Authentication successful, but no token was received.');
      }
      localStorage.setItem('authToken', appToken);
      setSuccessMessage('Sign-up successful! Redirecting...');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleFailure = (error) => {
    console.error('Google Sign-Up Error:', error);
    setError('Google sign-up failed. Please try again.');
  };

  return (
    <div className="signup-container">
      <div className="animated-gradient-background"></div>
      <div className="signup-card">
        <h2>Create Your Account</h2>
        <p className="signup-subtitle">Join us to access exclusive financial insights.</p>

        {/* Only Google OAuth sign up */}
        {error && <p className="message error-message">{error}</p>}
        {successMessage && <p className="message success-message">{successMessage}</p>}

        <div className="social-signup-container">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            useOneTap
            theme="outline"
            size="large"
            shape="pill"
            width="300px"
          />
        </div>

        <div className="login-link-container">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="login-link">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;