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
    <div className="dashboard-container" style={{ width: '100vw', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <div className="animated-gradient-background"></div>
      <Header style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 100 }} />
      {/* Weather Decoration */}
      {showWeather && weather && (
        <div className="weather-decoration">
          <img src={require('../../lab-icon.svg').default} alt="Logo" className="weather-animated-icon" />
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
            <img src={require('../../lab-icon.svg').default} alt="Logo" width={54} />
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
              <button
                onClick={() => window.open(HEROKU_APP_URL, '_blank', 'noopener,noreferrer')}
                className="app-link"
                style={{ fontSize: '1.25rem', fontWeight: 700, padding: '0.8rem 2.2rem', borderRadius: '1.5rem', boxShadow: '0 0 24px #00fff7', background: 'linear-gradient(90deg,#00fff7 0%,#0072ff 100%)', color: '#0f172a', border: 'none', transition: 'all 0.2s', marginBottom: '0.5rem' }}
              >
                🚀 Launch Analysis Tool
              </button>
              <button onClick={() => navigator.clipboard.writeText(HEROKU_APP_URL)} className="copy-btn">Copy App Link</button>
            </div>
            <div className="crypto-section">
              <h2>Crypto Prices</h2>
              {cryptoLoading && <div className="crypto-loading" />}
              {cryptoError && <p className="error">{cryptoError}</p>}
              {cryptoData && (
                <div className="crypto-cards">
                  <div className="crypto-card">
                    <img className="crypto-icon" src="https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=026" alt="BTC" />
                    <span className="crypto-price">${cryptoData.bitcoin.usd}</span>
                    <span className="crypto-label">BTC</span>
                  </div>
                  <div className="crypto-card">
                    <img className="crypto-icon" src="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=026" alt="ETH" />
                    <span className="crypto-price">${cryptoData.ethereum.usd}</span>
                    <span className="crypto-label">ETH</span>
                  </div>
                  <div className="crypto-card">
                    <img className="crypto-icon" src="https://cryptologos.cc/logos/solana-sol-logo.svg?v=026" alt="SOL" />
                    <span className="crypto-price">${cryptoData.solana.usd}</span>
                    <span className="crypto-label">SOL</span>
                  </div>
                </div>
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
