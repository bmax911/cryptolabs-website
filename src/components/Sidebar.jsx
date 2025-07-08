import React from 'react';
import { FaHome, FaMoneyBillWave, FaUserFriends, FaUser, FaChartLine, FaSignOutAlt } from 'react-icons/fa';
import Logo from './Logo';
import { Link, useLocation } from 'react-router-dom';

const NavLink = ({ to, icon, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-slate-700 transition-all hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-50 ${isActive ? 'bg-slate-100 dark:bg-slate-800' : ''}`}
    >
      {icon}
      {children}
    </Link>
  );
};

const Sidebar = ({ onLogout }) => (
  <aside className="hidden border-r bg-white dark:bg-slate-950 md:block">
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-16 items-center border-b px-6">
        <Link to="/" aria-label="Home">
          <Logo />
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <nav className="grid items-start gap-1 font-medium">
          <NavLink to="/dashboard" icon={<FaHome className="h-4 w-4" />}>Dashboard</NavLink>
          <NavLink to="/cashback-program" icon={<FaMoneyBillWave className="h-4 w-4" />}>Cashback</NavLink>
          <NavLink to="/profile" icon={<FaUser className="h-4 w-4" />}>Profile</NavLink>
          <NavLink to="/research" icon={<FaChartLine className="h-4 w-4" />}>Research</NavLink>
        </nav>
      </div>
      <div className="mt-auto p-4">
         <button
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-slate-700 transition-all hover:bg-red-100 hover:text-red-700 dark:text-slate-300 dark:hover:bg-red-900/50 dark:hover:text-red-400"
          >
           <FaSignOutAlt className="h-4 w-4" />
           Logout
         </button>
      </div>
    </div>
  </aside>
);

export default Sidebar;