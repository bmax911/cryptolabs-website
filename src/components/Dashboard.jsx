import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import KpiCards from './KpiCards';
import DashboardCharts from './DashboardCharts';
import DashboardTable from './DashboardTable';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen w-full flex">
      {/* Sidebar: slider for mobile, static for md+ */}
      <Sidebar onLogout={handleLogout} open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <TopNav user={user} onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto bg-slate-100/50 p-4 dark:bg-slate-900/50 sm:p-6">
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