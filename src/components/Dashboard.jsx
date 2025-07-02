// src/components/Dashboard.jsx

import React, { useEffect, useState } from 'react';
import './Dashboard.css'; // Import the new CSS
import { useAuth } from '../contexts/AuthContext';
import labIcon from '../../lab-icon.svg';
import btcIcon from '../../btc.svg';
import ethIcon from '../../eth.svg';
import solanaIcon from '../../solana.svg';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import KpiCards from './KpiCards';
import WeatherWidget from './WeatherWidget';
import NotificationBar from './NotificationBar';
import DashboardCharts from './DashboardCharts';
import DashboardTable from './DashboardTable';

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
    <div className="dashboard-root">
      <Sidebar onLogout={handleLogout} />
      <div className="dashboard-mainarea">
        <TopNav user={user} />
        <div className="dashboard-content-area">
          <div className="dashboard-header-row">
            <KpiCards />
            <WeatherWidget weather={weather} />
          </div>
          <NotificationBar notifications={[]} />
          <DashboardCharts />
          <DashboardTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
