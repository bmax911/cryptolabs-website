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
  const { isAuthenticated, token } = useAuth(); // Get auth state
  const navigate = useNavigate(); // Get navigate function
  const [isGeneratingToken, setIsGeneratingToken] = useState(false); // New state for loading

  const handleResearchAnalysisClick = async () => {
    console.log('Research Analysis clicked');
    console.log('isAuthenticated:', isAuthenticated());
    console.log('token:', token ? 'exists' : 'missing');
    
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
    console.log('Making request to backend...');
    
    try {
      // Add timeout to the request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await axios.post('https://www.cryptolabs.cfd/api/auth/validate-and-generate', {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        signal: controller.signal,
        timeout: 10000
      });
      
      clearTimeout(timeoutId);
      console.log('Backend response:', response.data);

      const { temp_token } = response.data;
      if (temp_token) {
        console.log('Opening Heroku app with token...');
        const urlWithToken = `${HEROKU_APP_URL}?token=${temp_token}`;
        window.open(urlWithToken, '_blank', 'noopener,noreferrer');
      } else {
        throw new Error('Temporary token not received from backend');
      }
    } catch (err) {
      console.error('Full error object:', err);
      console.error('Error response:', err.response?.data);
      console.error('Error status:', err.response?.status);
      
      let errorMessage = 'Failed to access Research Analysis. ';
      if (err.code === 'ECONNABORTED' || err.name === 'AbortError') {
        errorMessage += 'Request timed out. Please check your connection.';
      } else if (err.response?.status === 401) {
        errorMessage += 'Authentication failed. Please log in again.';
      } else if (err.response?.status === 403) {
        errorMessage += 'Access denied. Please check your permissions.';
      } else if (err.response?.data?.message) {
        errorMessage += err.response.data.message;
      } else {
        errorMessage += 'Please try again later.';
      }
      
      alert(errorMessage);
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
