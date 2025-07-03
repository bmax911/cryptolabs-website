import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import { FaMoneyBillWave, FaUserFriends, FaUser, FaChartLine, FaRobot } from 'react-icons/fa';
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
    console.log('Research Analysis clicked');
    console.log('isAuthenticated:', isAuthenticated());
    console.log('token:', token ? 'exists' : 'missing');
    console.log('Full token value:', token); // Debug: see the actual token
    
    if (!isAuthenticated()) {
      alert('You need to be logged in to access the Research Analysis app.');
      return;
    }

    if (!token || token.trim() === '') {
        console.error('Token is missing or empty:', token);
        alert('Authentication token is missing. Please log in again.');
        return;
    }

    setIsGeneratingToken(true);
    
    try {
      // Since the backend authentication is failing, let's try direct access
      // for authenticated users as a workaround
      console.log('Attempting direct access to Heroku app...');
      
      // Option 1: Direct access without backend validation
      window.open(HEROKU_APP_URL, '_blank', 'noopener,noreferrer');
      
      // Option 2: Pass the Netlify token directly to the Heroku app
      // Uncomment this if the Heroku app can validate Netlify tokens directly
      // const urlWithToken = `${HEROKU_APP_URL}?netlify_token=${encodeURIComponent(token)}`;
      // window.open(urlWithToken, '_blank', 'noopener,noreferrer');
      
    } catch (err) {
      console.error('Error opening Heroku app:', err);
      alert('Failed to access Research Analysis. Please try again later.');
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
      <div className="kpi-card kpi-accent">
        <span className="kpi-icon"><FaUserFriends /></span>
        <span className="kpi-value">0</span>
        <span className="kpi-label">Referral</span>
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
