import React from 'react';
import { FaMoneyBillWave, FaUserFriends, FaUser, FaChartLine, FaRobot } from 'react-icons/fa';

const kpis = [
  { icon: <FaMoneyBillWave />, label: 'Trading Fee Cashback', value: '$120.50', color: 'primary' },
  { icon: <FaUserFriends />, label: 'Referral', value: '8', color: 'accent' },
  { icon: <FaUser />, label: 'Profile', value: 'Verified', color: 'neutral' },
  { icon: <FaChartLine />, label: 'Research Analysis', value: '5 Reports', color: 'accent' },
  { icon: <FaRobot />, label: 'AI Assistant', value: 'Active', color: 'primary' },
];

const KpiCards = () => (
  <div className="kpi-cards-row">
    {kpis.map((kpi, idx) => (
      <div className={`kpi-card kpi-${kpi.color}`} key={idx}>
        <span className="kpi-icon">{kpi.icon}</span>
        <span className="kpi-value">{kpi.value}</span>
        <span className="kpi-label">{kpi.label}</span>
      </div>
    ))}
  </div>
);

export default KpiCards;
