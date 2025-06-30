// src/components/LoginPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css'; // We will create this CSS file next

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Optional: Use React Router's navigate to redirect after login
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission which reloads the page

    // Clear previous messages
    setError('');
    setIsLoading(true);

    // --- API Call to Your Heroku Backend ---
    // IMPORTANT: Use '/api/login' if you set up a Netlify proxy.
    // Otherwise, use the full Heroku URL: 'https://cryptolabs-app.herokuapp.com/api/login'
    const apiUrl = '/api/login'; 

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle errors from the server (e.g., "Invalid credentials")
        throw new Error(data.message || `HTTP error! Status: ${response.status}`);
      }

      // Handle success
      // You might want to store a token and redirect to a dashboard
      navigate('/dashboard');

    } catch (err) {
      // Handle network errors or errors thrown from the response check
      setError(err.message || 'An unknown error occurred. Please try again.');
    } finally {
      setIsLoading(false); // Always stop loading state
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
              minLength="6"
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
