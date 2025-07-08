import React from 'react';
import { FaHome, FaMoneyBillWave, FaUserFriends, FaUser, FaChartLine, FaSignOutAlt } from 'react-icons/fa';
// import Logo from './Logo';
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



import { useState } from 'react';

const Sidebar = ({ onLogout, open, setOpen }) => {
  // Collapsible state for desktop
  const [collapsed, setCollapsed] = useState(false);

  // Sidebar width classes
  const sidebarWidth = collapsed ? 'w-16 md:w-16 lg:w-20' : 'w-64 md:w-[220px] lg:w-[280px]';
  // Only animate slide for mobile (md:hidden), always static on desktop
  const sidebarTranslate = open ? 'translate-x-0' : '-translate-x-full';

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 md:hidden ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setOpen(false)}
      />
      {/* Sidebar */}
      <aside
        className={`fixed z-[100] top-0 left-0 h-full bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 shadow-2xl
          transition-transform duration-500 ease-in-out will-change-transform
          ${sidebarWidth} ${sidebarTranslate}
          md:static md:translate-x-0 md:block`}
        style={{ boxShadow: open ? '0 8px 32px 0 rgba(31, 38, 135, 0.37)' : 'none' }}
      >
        <div className="flex h-16 items-center border-b px-2 md:px-4 lg:px-6 justify-between">
          <div className="flex items-center gap-2">
            {/* Logo removed from Sidebar */}
          </div>
          {/* Close button (mobile) */}
          <button
            className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {/* Collapse/Expand button (desktop) moved below header */}
        <div className="hidden md:flex justify-end px-2 md:px-4 lg:px-6 py-2 border-b border-slate-200 dark:border-slate-800">
          <button
            className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setCollapsed((c) => !c)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            )}
          </button>
        </div>
        <div className="flex-1 h-[calc(100vh-4rem)] overflow-y-auto p-2 md:p-4">
          <nav className="grid items-start gap-1 font-medium">
            <NavLink to="/dashboard" icon={<FaHome className="h-5 w-5" />}>{!collapsed && 'Dashboard'}</NavLink>
            <NavLink to="/cashback-program" icon={<FaMoneyBillWave className="h-5 w-5" />}>{!collapsed && 'Cashback'}</NavLink>
            <NavLink to="/profile" icon={<FaUser className="h-5 w-5" />}>{!collapsed && 'Profile'}</NavLink>
            <NavLink to="/research" icon={<FaChartLine className="h-5 w-5" />}>{!collapsed && 'Research'}</NavLink>
          </nav>
        </div>
        <div className="mt-auto p-2 md:p-4">
           <button
              onClick={onLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-slate-700 transition-all hover:bg-red-100 hover:text-red-700 dark:text-slate-300 dark:hover:bg-red-900/50 dark:hover:text-red-400 justify-center md:justify-start"
            >
             <FaSignOutAlt className="h-5 w-5" />
             {!collapsed && 'Logout'}
           </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;