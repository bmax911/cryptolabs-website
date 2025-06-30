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
    // This function is called when a user successfully signs in with Google.
    // `credentialResponse.credential` contains Google's ID Token.
    const googleIdToken = credentialResponse.credential;
    setErrorMessage(''); // Clear previous errors
    
    console.log("Received Google ID Token. Sending to backend...");

    // The API endpoint on your Heroku app
    const backendApiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/auth/google`;

    try {
      const response = await fetch(backendApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: googleIdToken }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle errors from your backend (e.g., "Invalid token")
        throw new Error(data.message || 'Login with Google failed.');
      }

      // SUCCESS! Your backend has returned YOUR application's JWT.
      const appToken = data.token;
      console.log("Success! Received our application's JWT:", appToken);

      // Save your app's token to localStorage to keep the user logged in
      localStorage.setItem('authToken', appToken);

      // Redirect the user to the pricing page to select a plan
      window.location.href = '/pricing';

    } catch (error) {
      console.error("Error during Google sign-in process:", error);
      setErrorMessage(error.message);
    }
  };

  const handleGoogleError = () => {
    console.error('Google Login Failed');
    setErrorMessage("Google sign-in failed. Please try again.");
  };

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
