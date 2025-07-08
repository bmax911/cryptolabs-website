import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FaUserCircle, FaKey, FaShieldAlt, FaTrash, FaCheckCircle, FaEnvelope } from 'react-icons/fa';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [showDelete, setShowDelete] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [show2FA, setShow2FA] = useState(false);

  // Placeholder handlers
  const handleDeleteAccount = () => {
    // TODO: Implement delete account logic
    alert('Account deletion is not implemented in this demo.');
  };
  const handleChangePassword = () => {
    // TODO: Implement change password logic
    alert('Change password is not implemented in this demo.');
  };
  const handleEnable2FA = () => {
    // TODO: Implement 2FA logic
    alert('2FA setup is not implemented in this demo.');
  };

  return (
    <div className="max-w-xl mx-auto p-0 sm:p-6 animate-fade-in">
      {/* Avatar */}
      <div className="flex flex-col items-center -mt-12 mb-6">
        <div className="relative">
          <div className="h-24 w-24 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center shadow-lg border-4 border-white dark:border-slate-900 text-blue-600 dark:text-blue-400 text-6xl">
            {user?.user_metadata?.avatar_url ? (
              <img src={user.user_metadata.avatar_url} alt="Avatar" className="h-24 w-24 rounded-full object-cover" />
            ) : (
              <FaUserCircle className="h-20 w-20" />
            )}
          </div>
          <span className="absolute bottom-0 right-0 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full h-6 w-6 flex items-center justify-center">
            <FaCheckCircle className="text-white h-4 w-4" />
          </span>
        </div>
        <div className="mt-3 text-center">
          <div className="text-xl font-bold">{user?.user_metadata?.full_name || 'N/A'}</div>
          <div className="text-slate-500 dark:text-slate-400 text-sm">{user?.email}</div>
        </div>
      </div>

      {/* Card: User Info */}
      <div className="card mb-6 transition-shadow duration-300 hover:shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <FaUserCircle className="text-blue-500 dark:text-blue-400 h-5 w-5" />
          <h2 className="text-lg font-semibold">User Information</h2>
        </div>
        <div className="space-y-1 text-base">
          <div><span className="font-medium">Name:</span> {user?.user_metadata?.full_name || 'N/A'}</div>
          <div><span className="font-medium">Email:</span> {user?.email}</div>
          <div><span className="font-medium">Plan:</span> Free (Demo)</div>
        </div>
      </div>

      {/* Card: Account Actions */}
      <div className="card mb-6 transition-shadow duration-300 hover:shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <FaKey className="text-blue-500 dark:text-blue-400 h-5 w-5" />
          <h2 className="text-lg font-semibold">Account Actions</h2>
        </div>
        <button
          className="flex items-center gap-2 w-full mb-2 rounded bg-blue-600 text-white py-2 font-semibold hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => setShowChangePassword((v) => !v)}
        >
          <FaEnvelope className="h-4 w-4" /> Change Password
        </button>
        <div className={`transition-all duration-300 ${showChangePassword ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}> 
          {showChangePassword && (
            <div className="mb-2 p-3 bg-slate-50 dark:bg-slate-800 rounded flex items-center gap-2">
              <button className="text-blue-600 underline flex items-center gap-1" onClick={handleChangePassword}>
                <FaEnvelope className="h-4 w-4" /> Send password reset email
              </button>
            </div>
          )}
        </div>
        <button
          className="flex items-center gap-2 w-full mb-2 rounded bg-green-600 text-white py-2 font-semibold hover:bg-green-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400"
          onClick={() => setShow2FA((v) => !v)}
        >
          <FaShieldAlt className="h-4 w-4" /> {show2FA ? 'Hide 2FA Options' : 'Enable 2FA'}
        </button>
        <div className={`transition-all duration-300 ${show2FA ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}> 
          {show2FA && (
            <div className="mb-2 p-3 bg-slate-50 dark:bg-slate-800 rounded flex items-center gap-2">
              <button className="text-green-600 underline flex items-center gap-1" onClick={handleEnable2FA}>
                <FaShieldAlt className="h-4 w-4" /> Set up 2FA (TOTP)
              </button>
            </div>
          )}
        </div>
        <button
          className="flex items-center gap-2 w-full rounded bg-red-600 text-white py-2 font-semibold hover:bg-red-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
          onClick={() => setShowDelete((v) => !v)}
        >
          <FaTrash className="h-4 w-4" /> Delete Account
        </button>
        <div className={`transition-all duration-300 ${showDelete ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}> 
          {showDelete && (
            <div className="mt-2 p-3 bg-red-50 dark:bg-red-900/30 rounded flex flex-col items-start">
              <p className="mb-2 text-red-700 dark:text-red-300">Are you sure? This action cannot be undone.</p>
              <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-all duration-200" onClick={handleDeleteAccount}>Confirm Delete</button>
            </div>
          )}
        </div>
      </div>

      {/* Card: Plan Usage */}
      <div className="card mb-6 transition-shadow duration-300 hover:shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <FaCheckCircle className="text-blue-500 dark:text-blue-400 h-5 w-5" />
          <h2 className="text-lg font-semibold">Plan Usage</h2>
        </div>
        <div className="space-y-1 text-base mb-2">
          <div><span className="font-medium">Current Plan:</span> Free</div>
          <div><span className="font-medium">Usage:</span> Unlimited (Demo)</div>
        </div>
        {/* Progress bar (static for demo) */}
        <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-3 mt-2 overflow-hidden">
          <div className="bg-blue-500 h-3 rounded-full transition-all duration-700" style={{ width: '100%' }} />
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">100% of plan usage (Demo)</div>
      </div>
    </div>
  );
};

export default ProfilePage;
