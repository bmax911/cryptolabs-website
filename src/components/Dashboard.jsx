import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import KpiCards from './KpiCards';
import DashboardCharts from './DashboardCharts';
import DashboardTable from './DashboardTable';
import WeatherWidget from './WeatherWidget';


const Dashboard = () => {
  const { user, logout } = useAuth();
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    // Example: fetch weather for London (replace with your preferred city or user's location)
    fetch('https://api.weatherapi.com/v1/current.json?key=demo&q=London')
      .then(res => res.json())
      .then(data => setWeather(data))
      .catch(() => setWeather(null));
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar onLogout={handleLogout} />
      <div className="flex flex-col">
        <TopNav user={user} />
        <main className="flex-1 overflow-y-auto bg-slate-100/50 p-4 dark:bg-slate-900/50 sm:p-6">
          <div className="mb-4 flex justify-end">
            <WeatherWidget weather={weather} />
          </div>
          <KpiCards />
          <div className="mt-6">
            <DashboardCharts />
          </div>
          <div className="mt-6">
            <DashboardTable />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;