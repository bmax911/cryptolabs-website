// src/components/SignupForm.jsx

import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './SignupForm.css';

const SignupForm = () => {
  const navigate = useNavigate();
  const { signup, user } = useAuth();

  useEffect(() => {
    // If the user is logged in after an action, redirect to the dashboard.
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSignup = () => {
    signup(); // This opens the Netlify Identity widget
  };

  return (
    <div className="signup-container">
      <div className="animated-gradient-background"></div>
      <div className="signup-card">
        <h2>Create Your Account</h2>
        <p className="signup-subtitle">Join us to access exclusive financial insights.</p>

        <div className="social-signup-container">
          <button onClick={handleSignup} className="btn-primary-full">
            Sign Up with Email
          </button>
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