// src/components/Dashboard.jsx

import React, { useEffect, useState } from 'react';
import './Dashboard.css'; // Import the new CSS
import Header from './Header'; // Assuming you have a Header component
import Footer from './Footer'; // Assuming you have a Footer component
import { useAuth } from '../contexts/AuthContext';

const HEROKU_APP_URL = 'https://www.cryptolabs.cfd/';

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY || import.meta.env.WEATHER_API_KEY;

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [weather, setWeather] = useState(null);
  const [showWeather, setShowWeather] = useState(false);
  const [cryptoData, setCryptoData] = useState(null);
  const [cryptoLoading, setCryptoLoading] = useState(true);
  const [cryptoError, setCryptoError] = useState(null);

  // Fetch WeatherAPI.com current weather and air quality, require geolocation
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const { latitude, longitude } = position.coords;
        const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${latitude},${longitude}&aqi=yes`);
        if (!res.ok) throw new Error('Weather fetch failed');
        const data = await res.json();
        setWeather(data);
        setShowWeather(true);
        setTimeout(() => setShowWeather(false), 8000);
      } catch (err) {
        setShowWeather(false);
      }
    });
  }, []);

  // Fetch crypto data from CoinGecko
  useEffect(() => {
    const fetchCrypto = async () => {
      setCryptoLoading(true);
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd');
        if (!res.ok) throw new Error('Crypto fetch failed');
        const data = await res.json();
        setCryptoData(data);
      } catch (err) {
        setCryptoError('Failed to load crypto data');
      } finally {
        setCryptoLoading(false);
      }
    };
    fetchCrypto();
  }, []);

  const handleLogout = () => {
    logout();
    // navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="animated-gradient-background"></div>
      <Header />
      {/* Weather Decoration */}
      {showWeather && weather && (
        <div className="weather-decoration">
          <img src={`https:${weather.current.condition.icon}`} alt="Weather Icon" className="weather-animated-icon" />
          <div className="weather-info">
            <span>{weather.current.temp_c}°C</span>
            <span>{weather.current.condition.text}</span>
            <span>Air Quality: {weather.current.air_quality.pm2_5 ? weather.current.air_quality.pm2_5.toFixed(1) : 'N/A'} PM2.5</span>
          </div>
        </div>
      )}
      <main className="dashboard-main">
        <aside className="dashboard-sidebar">
          <div className="sidebar-logo">
            <img src="/lab-icon.svg" alt="Logo" width={48} />
          </div>
          <ul className="sidebar-menu">
            <li>Home</li>
            <li>Trading Fee Cashback</li>
            <li>Referral</li>
            <li>Profile</li>
            <li onClick={handleLogout} className="logout-link">Logout</li>
          </ul>
        </aside>
        <div className="dashboard-content">
          <div className="dashboard-card">
            <h1>Welcome, {user?.username || 'User'}!</h1>
            <p>This is your personal space for crypto analysis and trading.</p>
            <div className="app-redirect">
              <span>Go to main app:</span>
              <a href={HEROKU_APP_URL} target="_blank" rel="noopener noreferrer" className="app-link">{HEROKU_APP_URL}</a>
              <button onClick={() => navigator.clipboard.writeText(HEROKU_APP_URL)} className="copy-btn">Copy URL</button>
            </div>
            <div className="crypto-section">
              <h2>Crypto Prices</h2>
              {cryptoLoading && <p>Loading...</p>}
              {cryptoError && <p className="error">{cryptoError}</p>}
              {cryptoData && (
                <ul>
                  <li>BTC: ${cryptoData.bitcoin.usd}</li>
                  <li>ETH: ${cryptoData.ethereum.usd}</li>
                  <li>SOL: ${cryptoData.solana.usd}</li>
                </ul>
              )}
            </div>
            <button onClick={handleLogout} className="logout-button">
              Log Out
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
