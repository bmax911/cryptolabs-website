import React from 'react';
import { FaHome, FaMoneyBillWave, FaUserFriends, FaUser, FaChartLine, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = ({ onLogout }) => (
  <aside className="sidebar-menu-fixed">
    <ul>
      <li><FaHome title="Home" /></li>
      <li><FaMoneyBillWave title="Trading Fee Cashback" /></li>
      <li><FaUserFriends title="Referral" /></li>
      <li><FaUser title="Profile" /></li>
      <li><FaChartLine title="Research" /></li>
      <li onClick={onLogout} className="logout-link"><FaSignOutAlt title="Logout" /></li>
    </ul>
  </aside>
);

export default Sidebar;
