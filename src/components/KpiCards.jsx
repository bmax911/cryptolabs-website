import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMoneyBillWave, FaUserFriends, FaUser, FaChartLine, FaRobot } from 'react-icons/fa';

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

  const cards = [
    {
      icon: <FaMoneyBillWave className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
      label: 'Trading Fee Cashback',
      action: () => navigate('/cashback-program'),
    },
    {
      icon: <FaUserFriends className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
      label: 'Referral Program',
      action: () => alert('Referral program coming soon!'),
    },
    {
      icon: <FaChartLine className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
      label: 'Market Research',
      action: () => navigate('/overview'),
    },
    {
      icon: <FaRobot className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
      label: 'AI Assistant',
      action: () => alert('AI Assistant coming soon!'),
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