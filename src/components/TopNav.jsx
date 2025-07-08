import React from 'react';
import ThemeToggleButton from './ThemeToggleButton';
import { FaUserCircle } from 'react-icons/fa';

const TopNav = ({ user }) => (
  <header className="flex h-16 items-center gap-4 border-b bg-white px-4 dark:bg-slate-950 md:px-6">
    {/* Mobile nav can go here if needed */}
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