import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = ({ navigate }) => {
  const { user } = useAuth();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Account Settings</h1>
            <p className="mt-1 text-slate-500">Manage your personal information and account preferences.</p>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Cover Accent */}
          <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700"></div>

          <div className="px-8 pb-8">
            {/* Avatar Placeholder */}
            <div className="relative -mt-12 mb-6">
              <div className="inline-flex items-center justify-center h-24 w-24 rounded-2xl bg-white p-1 shadow-md">
                <div className="h-full w-full rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 text-3xl font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              <div className="sm:col-span-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                <p className="mt-1 text-lg font-medium text-slate-900">{user.name}</p>
              </div>

              <div className="sm:col-span-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                <p className="mt-1 text-lg font-medium text-slate-900">{user.email}</p>
              </div>

              <div className="sm:col-span-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Account Role</label>
                <div className="mt-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-50 text-indigo-700 border border-indigo-100 capitalize">
                    {user.role}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 flex justify-end">
            <button 
              onClick={() => {/* Add functionality later if needed */}}
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              Update Profile Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;