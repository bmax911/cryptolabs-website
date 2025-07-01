// src/components/LoginPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import './LoginPage.css'; // We will create this CSS file next

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Optional: Use React Router's navigate to redirect after login
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    setErrorMessage('');
    setIsLoading(true);
    const googleIdToken = credentialResponse.credential;
    const backendApiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/auth/google`;
    try {
      const response = await fetch(backendApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: googleIdToken }),
        credentials: 'include',
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || data.message || 'Login with Google failed.');
      }
      const appToken = data.token;
      if (!appToken) {
        throw new Error('Authentication successful, but no token was received.');
      }
      localStorage.setItem('authToken', appToken);
      navigate('/dashboard');
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    console.error('Google Login Failed');
    setErrorMessage("Google sign-in failed. Please try again.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`;
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
        throw new Error(data.error || data.message || `HTTP error! Status: ${response.status}`);
      }
      const appToken = data.token;
      if (!appToken) {
        throw new Error('Login successful, but no token was received.');
      }
      localStorage.setItem('authToken', appToken);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'An unknown error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Log In to Your Account</h2>
        <p className="login-subtitle">Access your dashboard and insights.</p>

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
              minLength="8"
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>

          {/* Display feedback messages */}
          {error && <p className="message error-message">{error}</p>}

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Logging In...' : 'Log In'}
          </button>
        </form>

        {errorMessage && <p className="message error-message">{errorMessage}</p>}

        <div style={{ textAlign: 'center', margin: '20px 0', color: '#666' }}>
          <p>OR</p>
        </div>

        {/* --- The Google Login Button --- */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            theme="outline"
            size="large"
            text="signin_with"
          />
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
