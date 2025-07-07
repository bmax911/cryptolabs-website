import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import { FaMoneyBillWave, FaUserFriends, FaUser, FaChartLine, FaRobot, FaChartBar } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const kpis = [
  { icon: <FaMoneyBillWave />, label: 'Trading Fee Cashback', color: 'primary' },
  { icon: <FaUserFriends />, label: 'Referral', color: 'accent' },
  { icon: <FaUser />, label: 'Profile', color: 'neutral' },
  { icon: <FaChartLine />, label: 'Research Analysis', color: 'accent' },
  { icon: <FaRobot />, label: 'AI Assistant', value: 'Active', color: 'primary' },
];

const HEROKU_APP_URL = 'https://www.cryptolabs.cfd/';

const KpiCards = () => {
  const auth = useAuth(); // Get auth state
  const navigate = useNavigate(); // Get navigate function
  const [isGeneratingToken, setIsGeneratingToken] = useState(false); // New state for loading

  // Safely destructure auth values with fallbacks
  const { isAuthenticated = () => false, token = null } = auth || {};

  const handleResearchAnalysisClick = async () => {
    console.log('=== RESEARCH ANALYSIS CLICK DEBUG ===');
    console.log('Research Analysis clicked');
    console.log('isAuthenticated:', isAuthenticated());
    console.log('token exists:', token ? 'yes' : 'no');
    console.log('token length:', token ? token.length : 'N/A');
    console.log('token (first 50 chars):', token ? token.substring(0, 50) + '...' : 'missing');
    // Also check localStorage directly
    const storedToken = localStorage.getItem('netlify_jwt');
    console.log('localStorage token exists:', storedToken ? 'yes' : 'no');
    console.log('localStorage token (first 50 chars):', storedToken ? storedToken.substring(0, 50) + '...' : 'missing');
    if (!isAuthenticated()) {
      alert('You need to be logged in to access the Research Analysis app.');
      return;
    }
    const tokenToUse = token || storedToken;
    if (!tokenToUse || tokenToUse.trim() === '') {
      console.error('Token is missing or empty');
      console.error('Auth context token:', token);
      console.error('localStorage token:', storedToken);
      alert('Authentication token is missing. Please log in again.');
      return;
    }
    setIsGeneratingToken(true);
    try {
      // Decode Netlify JWT to extract email/sub/name
      function decodeJWTPayload(token) {
        if (!token) return null;
        const parts = token.split('.');
        if (parts.length !== 3) return null;
        try {
          const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
          const json = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
          return JSON.parse(json);
        } catch (e) {
          return null;
        }
      }
      const payload = decodeJWTPayload(tokenToUse);
      // Step 1: Exchange Netlify token for a backend session token, including email/sub/name
      const response = await axios.post('https://www.cryptolabs.cfd/api/auth/netlify-validate-and-generate', {
        netlifyToken: tokenToUse,
        email: payload && payload.email,
        sub: payload && payload.sub,
        name: payload && payload.name
      }, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000
      });
      if (response.data && response.data.session_token) {
        // Step 2: Open the Heroku app with the session token
        const urlWithSessionToken = `${HEROKU_APP_URL}?session_token=${encodeURIComponent(response.data.session_token)}`;
        window.open(urlWithSessionToken, '_blank', 'noopener,noreferrer');
      } else {
        throw new Error('No session token received from backend');
      }
    } catch (err) {
      console.error('Error with token exchange:', err);
      console.error('Error response:', err.response?.data);
      console.error('Error status:', err.response?.status);
      // Fallback: Try direct access for debugging
      if (err.response?.status === 401) {
        alert('Authentication failed. Please log in again.');
      } else if (err.response?.status === 403) {
        alert('Access denied. Please contact support.');
      } else {
        console.log('Attempting direct access as fallback...');
        alert('Token exchange failed. Trying direct access...');
        window.open(HEROKU_APP_URL, '_blank', 'noopener,noreferrer');
      }
    } finally {
      setIsGeneratingToken(false);
    }
  };

  const handleCryptoTrackerClick = async () => {
    console.log('=== CRYPTO TRACKER CLICK DEBUG ===');
    console.log('Crypto Tracker clicked');
    console.log('isAuthenticated:', isAuthenticated());
    console.log('token exists:', token ? 'yes' : 'no');
    console.log('token length:', token ? token.length : 'N/A');
    console.log('token (first 50 chars):', token ? token.substring(0, 50) + '...' : 'missing');
    // Also check localStorage directly
    const storedToken = localStorage.getItem('netlify_jwt');
    console.log('localStorage token exists:', storedToken ? 'yes' : 'no');
    console.log('localStorage token (first 50 chars):', storedToken ? storedToken.substring(0, 50) + '...' : 'missing');
    if (!isAuthenticated()) {
      alert('You need to be logged in to access the Crypto Tracker app.');
      return;
    }
    const tokenToUse = token || storedToken;
    if (!tokenToUse || tokenToUse.trim() === '') {
      console.error('Token is missing or empty');
      console.error('Auth context token:', token);
      console.error('localStorage token:', storedToken);
      alert('Authentication token is missing. Please log in again.');
      return;
    }
    setIsGeneratingToken(true);
    try {
      // Decode Netlify JWT to extract email/sub/name
      function decodeJWTPayload(token) {
        if (!token) return null;
        const parts = token.split('.');
        if (parts.length !== 3) return null;
        try {
          const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
          const json = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
          return JSON.parse(json);
        } catch (e) {
          return null;
        }
      }
      const payload = decodeJWTPayload(tokenToUse);
      // Step 1: Exchange Netlify token for a backend session token, including email/sub/name
      const response = await axios.post('https://www.cryptolabs.cfd/api/auth/netlify-validate-and-generate', {
        netlifyToken: tokenToUse,
        email: payload && payload.email,
        sub: payload && payload.sub,
        name: payload && payload.name
      }, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000
      });
      if (response.data && response.data.session_token) {
        // Step 2: Open the Tracker app with the session token
        const urlWithSessionToken = `https://tracker.cryptolabs.cfd?session_token=${encodeURIComponent(response.data.session_token)}`;
        window.open(urlWithSessionToken, '_blank', 'noopener,noreferrer');
      } else {
        throw new Error('No session token received from backend');
      }
    } catch (err) {
      console.error('Error with token exchange:', err);
      console.error('Error response:', err.response?.data);
      console.error('Error status:', err.response?.status);
      // Fallback: Try direct access for debugging
      if (err.response?.status === 401) {
        alert('Authentication failed. Please log in again.');
      } else if (err.response?.status === 403) {
        alert('Access denied. Please contact support.');
      } else {
        alert('Token exchange failed. Trying direct access...');
        window.open('https://tracker.cryptolabs.cfd', '_blank', 'noopener,noreferrer');
      }
    } finally {
      setIsGeneratingToken(false);
    }
  };

  const handleCashbackClick = () => {
    navigate('/cashback-program');
  };

  return (
    <div className="kpi-cards-row">
      <div className="kpi-card kpi-primary" style={{ cursor: 'pointer' }} onClick={handleCashbackClick}>
        <span className="kpi-icon"><FaMoneyBillWave /></span>
        <span className="kpi-value">Contact Us</span>
        <span className="kpi-label">Trading Fee Cashback</span>
      </div>
      <div className="kpi-card kpi-primary kpi-crypto-tracker" style={{ cursor: 'pointer' }} onClick={handleCryptoTrackerClick}>
        <span className="kpi-icon"><FaChartBar /></span>
        <span className="kpi-value">{isGeneratingToken ? 'Loading...' : 'Launch'}</span>
        <span className="kpi-label">Crypto Tracker</span>
      </div>
      <div className="kpi-card kpi-neutral">
        <span className="kpi-icon"><FaUser /></span>
        <span className="kpi-value">Verified</span>
        <span className="kpi-label">Profile</span>
      </div>
      <div className="kpi-card kpi-accent" style={{ cursor: 'pointer' }} onClick={handleResearchAnalysisClick}>
        <span className="kpi-icon"><FaChartLine /></span>
        <span className="kpi-value">{isGeneratingToken ? 'Loading...' : 'Tools'}</span>
        <span className="kpi-label">Research Analysis</span>
      </div>
      <div className="kpi-card kpi-primary">
        <span className="kpi-icon"><FaRobot /></span>
        <span className="kpi-value">Active</span>
        <span className="kpi-label">AI Assistant</span>
      </div>

    </div>
  );
};

export default KpiCards;
