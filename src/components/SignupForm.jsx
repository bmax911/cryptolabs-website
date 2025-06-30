// src/components/SignupForm.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you use React Router for navigation
import './SignupForm.css'; // We will create this CSS file next

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Optional: Use React Router's navigate to redirect after login
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission which reloads the page

    // Clear previous messages
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    // --- API Call to Your Heroku Backend ---
    // IMPORTANT: Use '/api/register' if you set up a Netlify proxy.
    // Otherwise, use the full Heroku URL: 'https://cryptolabs-app.herokuapp.com/api/register'
    const apiUrl = '/api/register'; 

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
        // Handle errors from the server (e.g., "User already exists")
        throw new Error(data.message || `HTTP error! Status: ${response.status}`);
      }

      // Handle success
      setSuccessMessage("Registration successful! An admin will review your application. You will be notified once you're approved.");
      setEmail(''); // Clear form fields on success
      setPassword('');

    } catch (err) {
      // Handle network errors or errors thrown from the response check
      setError(err.message || 'An unknown error occurred. Please try again.');
    } finally {
      setIsLoading(false); // Always stop loading state
    }
  };

  return (
    <div className="signup-container">
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