import React from 'react';
import ThemeToggleButton from './ThemeToggleButton';
import labIcon from '../../lab-icon.svg';

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
      <span className="topnav-user">{user?.username || 'User'}</span>
      {/* Notification bell icon placeholder */}
      <span className="topnav-notification" title="Notifications">🔔</span>
    </div>
  </nav>
);

export default TopNav;
