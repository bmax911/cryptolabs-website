
import React from 'react';
import ThemeToggleButton from './ThemeToggleButton';
import { FaUserCircle, FaBars } from 'react-icons/fa';

const TopNav = ({ user, onMenuClick }) => (
  <header className="flex h-16 items-center gap-4 border-b bg-white px-4 dark:bg-slate-950 md:px-6">
    {/* Hamburger for mobile */}
    <button
      className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      onClick={onMenuClick}
      aria-label="Open sidebar menu"
    >
      <FaBars className="h-6 w-6" />
    </button>
    <div className="w-full flex-1">
      {/* Search bar can go here */}
    </div>
    <div className="flex items-center gap-4">
      <ThemeToggleButton />
      <div className="flex items-center gap-2">
        <FaUserCircle className="h-8 w-8 text-slate-500" />
        <div className="text-sm">
          <div className="font-medium">{user?.user_metadata?.full_name || 'User'}</div>
          <div className="text-xs text-slate-500">{user?.email}</div>
        </div>
      </div>
    </div>
  </header>
);

export default TopNav;