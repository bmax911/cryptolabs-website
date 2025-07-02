import React from 'react';
import ThemeToggleButton from './ThemeToggleButton';
import labIcon from '../../lab-icon.svg';
import { FaUser } from 'react-icons/fa';

const TopNav = ({ user }) => (
  <nav className="topnav-bar">
    <div className="topnav-left">
      <img src={labIcon} alt="Logo" className="topnav-logo" />
      <span className="topnav-title">CryptoLabs Dashboard</span>
    </div>
    <div className="topnav-center">
      {/* Placeholder for search, filters, etc. */}
    </div>
    <div className="topnav-right">
      <ThemeToggleButton />
      <div className="topnav-user-container">
        <FaUser className="topnav-user-icon" />
        <span className="topnav-user">{user?.email || 'User'}</span>
      </div>
      {/* Notification bell icon placeholder */}
      <span className="topnav-notification" title="Notifications">🔔</span>
    </div>
  </nav>
);

export default TopNav;
