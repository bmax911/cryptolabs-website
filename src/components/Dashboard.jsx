import React from 'react';
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

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar onLogout={handleLogout} />
      <div className="flex flex-col">
        <TopNav user={user} />
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