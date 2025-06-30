// src/components/Dashboard.jsx

import React from 'react';
import './Dashboard.css'; // Import the new CSS
import Header from './Header'; // Assuming you have a Header component
import Footer from './Footer'; // Assuming you have a Footer component

const Dashboard = () => {
  const handleLogout = () => {
    // Handle logout logic here
    console.log("User logged out");
    // For example, redirect to login page:
    // navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="animated-gradient-background"></div>
      <Header />
      <main className="dashboard-main">
        <div className="dashboard-card">
          <h1>Welcome to Your Dashboard</h1>
          <p>This is your personal space for crypto analysis and trading.</p>
          <button onClick={handleLogout} className="logout-button">
            Log Out
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
