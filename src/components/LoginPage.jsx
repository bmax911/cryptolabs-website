// src/components/LoginPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import './LoginPage.css'; // We will create this CSS file next

const LoginPage = () => {

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Log In to Your Account</h2>
        <p className="login-subtitle">Access your dashboard and insights.</p>

        {errorMessage && <p className="message error-message">{errorMessage}</p>}

        {/* --- The Google Login Button --- */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '32px 0' }}>
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
