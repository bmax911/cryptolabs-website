import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

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
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-slate-900 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">User Information</h2>
        <div className="space-y-1">
          <div><span className="font-medium">Name:</span> {user?.user_metadata?.full_name || 'N/A'}</div>
          <div><span className="font-medium">Email:</span> {user?.email}</div>
          <div><span className="font-medium">Plan:</span> Free (Demo)</div>
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Account Actions</h2>
        <button
          className="block w-full mb-2 rounded bg-blue-600 text-white py-2 font-semibold hover:bg-blue-700"
          onClick={() => setShowChangePassword((v) => !v)}
        >
          Change Password
        </button>
        {showChangePassword && (
          <div className="mb-2 p-3 bg-slate-50 dark:bg-slate-800 rounded">
            <button className="text-blue-600 underline" onClick={handleChangePassword}>Send password reset email</button>
          </div>
        )}
        <button
          className="block w-full mb-2 rounded bg-green-600 text-white py-2 font-semibold hover:bg-green-700"
          onClick={() => setShow2FA((v) => !v)}
        >
          {show2FA ? 'Hide 2FA Options' : 'Enable 2FA'}
        </button>
        {show2FA && (
          <div className="mb-2 p-3 bg-slate-50 dark:bg-slate-800 rounded">
            <button className="text-green-600 underline" onClick={handleEnable2FA}>Set up 2FA (TOTP)</button>
          </div>
        )}
        <button
          className="block w-full rounded bg-red-600 text-white py-2 font-semibold hover:bg-red-700"
          onClick={() => setShowDelete((v) => !v)}
        >
          Delete Account
        </button>
        {showDelete && (
          <div className="mt-2 p-3 bg-red-50 dark:bg-red-900/30 rounded">
            <p className="mb-2 text-red-700 dark:text-red-300">Are you sure? This action cannot be undone.</p>
            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" onClick={handleDeleteAccount}>Confirm Delete</button>
          </div>
        )}
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Plan Usage</h2>
        <div className="space-y-1">
          <div><span className="font-medium">Current Plan:</span> Free</div>
          <div><span className="font-medium">Usage:</span> Unlimited (Demo)</div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
