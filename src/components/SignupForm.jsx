// src/components/SignupForm.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import './SignupForm.css';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
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
      setTimeout(() => navigate('/pricing'), 2000);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    // Flask backend endpoint for registration
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/register`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || `HTTP error! Status: ${response.status}`);
      }

      setSuccessMessage("Registration successful! You can now log in.");
      setEmail('');
      setPassword('');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message || 'An unknown error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="animated-gradient-background"></div>
      <div className="signup-card">
        <h2>Create Your Account</h2>
        <p className="signup-subtitle">Join us to access exclusive financial insights.</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              disabled={isLoading}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>

          {/* Display feedback messages */}
          {error && <p className="message error-message">{error}</p>}
          {successMessage && <p className="message success-message">{successMessage}</p>}

          <button type="submit" className="signup-button" disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="divider">OR</div>

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