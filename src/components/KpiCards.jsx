import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMoneyBillWave, FaUserFriends, FaUser, FaChartLine, FaRobot } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const Card = ({ title, icon, onClick }) => (
  <button
    onClick={onClick}
    className="flex w-full items-center gap-4 rounded-lg border bg-white p-4 text-left shadow-sm transition-all hover:border-blue-500 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800/50"
  >
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
      {icon}
    </div>
    <span className="font-semibold">{title}</span>
  </button>
);


const KpiCards = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Helper to open external app with JWT token
  const openWithToken = async (baseUrl) => {
    if (user && typeof user.jwt === 'function') {
      try {
        const token = await user.jwt();
        const url = `${baseUrl}?token=${encodeURIComponent(token)}`;
        window.open(url, '_blank');
      } catch (err) {
        alert('Could not get session token. Please re-login.');
      }
    } else {
      alert('You must be logged in to access this app.');
    }
  };

  const cards = [
    {
      icon: <FaMoneyBillWave className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
      label: 'Trading Fee Cashback',
      action: () => navigate('/cashback-program'),
    },
    {
      icon: <FaUserFriends className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
      label: 'Transactions Tracker',
      action: () => openWithToken('https://tracker.cryptolabs.cfd'),
    },
    {
      icon: <FaChartLine className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
      label: 'Market Research',
      action: () => navigate('/overview'),
    },
    {
      icon: <FaRobot className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
      label: 'Analytics Dashboard',
      action: () => openWithToken('https://www.cryptolabs.cfd'),
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((kpi) => (
        <Card key={kpi.label} title={kpi.label} icon={kpi.icon} onClick={kpi.action} />
      ))}
    </div>
  );
};

export default KpiCards;