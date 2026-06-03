import React, { useState } from 'react';

const SecuritySettings = () => {
  const [formData, setFormData] = useState({
    firstName: 'Alexander',
    lastName: 'Henderson',
    email: 'a.henderson@recruitpro.com',
    currentPassword: '',
    newPassword: '',
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushAlerts: false,
    systemAlerts: true,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationToggle = (type) => {
    setNotifications(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    console.log('Updating profile:', formData);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    console.log('Changing password');
  };

  const handleDeactivate = () => {
    if (window.confirm('Are you sure you want to deactivate your account? All data will be archived for 30 days.')) {
      console.log('Deactivating account');
    }
  };

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-5xl mx-auto p-6 md:p-12">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight mb-2">
            Security Settings
          </h1>
          <p className="text-outline font-body">
            Manage your enterprise account credentials and communication preferences.
          </p>
        </div>

        {/* Bento Grid Layout for Settings */}
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {/* Account Information (Large Card) */}
          <div className="col-span-12 lg:col-span-7 bg-surface-container-lowest p-6 md:p-10 rounded-xl shadow-[0px_12px_32px_-4px_rgba(13,28,46,0.06)]">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">person</span>
              </div>
              <h2 className="text-xl font-bold">Account Information</h2>
            </div>
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-outline uppercase tracking-wider">
                    First Name
                  </label>
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-surface-container-low border-none rounded-lg p-3 font-body focus:ring-2 focus:ring-primary-container transition-all outline-none"
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-outline uppercase tracking-wider">
                    Last Name
                  </label>
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-surface-container-low border-none rounded-lg p-3 font-body focus:ring-2 focus:ring-primary-container transition-all outline-none"
                    type="text"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-outline uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-surface-container-low border-none rounded-lg p-3 font-body focus:ring-2 focus:ring-primary-container transition-all outline-none"
                  type="email"
                />
              </div>
              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-6 py-2.5 rounded-lg font-semibold text-sm shadow-md hover:scale-105 transition-all"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>

          {/* Password Management (Action Card) */}
          <div className="col-span-12 lg:col-span-5 bg-surface-container-lowest p-6 md:p-10 rounded-xl shadow-[0px_12px_32px_-4px_rgba(13,28,46,0.06)]">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined">lock_reset</span>
              </div>
              <h2 className="text-xl font-bold">Password Management</h2>
            </div>
            <form onSubmit={handleChangePassword} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-outline uppercase tracking-wider">
                  Current Password
                </label>
                <input
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  className="w-full bg-surface-container-low border-none rounded-lg p-3 font-body focus:ring-2 focus:ring-primary-container transition-all outline-none"
                  placeholder="••••••••"
                  type="password"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-outline uppercase tracking-wider">
                  New Password
                </label>
                <input
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="w-full bg-surface-container-low border-none rounded-lg p-3 font-body focus:ring-2 focus:ring-primary-container transition-all outline-none"
                  placeholder="••••••••"
                  type="password"
                />
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-surface-container-high text-on-secondary-container px-6 py-3 rounded-lg font-semibold text-sm hover:bg-surface-container-highest transition-all"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>

          {/* Notification Preferences (Full Width Horizontal Glass Card) */}
          <div className="col-span-12 bg-white/60 backdrop-blur-md p-6 md:p-10 rounded-xl shadow-[0px_12px_32px_-4px_rgba(13,28,46,0.04)] border-outline-variant/10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="max-w-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary-container flex items-center justify-center text-on-primary">
                    <span className="material-symbols-outlined">notifications_active</span>
                  </div>
                  <h2 className="text-xl font-bold">Notifications</h2>
                </div>
                <p className="text-outline text-sm leading-relaxed">
                  Choose how you want to be informed about new applicants, portal messages, and system updates.
                </p>
              </div>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Email Toggle */}
                <div className="bg-white p-6 rounded-xl flex items-center justify-between group hover:shadow-lg transition-all duration-300">
                  <div>
                    <p className="font-bold text-on-surface">Email Alerts</p>
                    <p className="text-xs text-outline">Application updates</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.emailAlerts}
                      onChange={() => handleNotificationToggle('emailAlerts')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-outline/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-outline-variant after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                {/* Push Toggle */}
                <div className="bg-white p-6 rounded-xl flex items-center justify-between group hover:shadow-lg transition-all duration-300">
                  <div>
                    <p className="font-bold text-on-surface">Push Alerts</p>
                    <p className="text-xs text-outline">Direct messages</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.pushAlerts}
                      onChange={() => handleNotificationToggle('pushAlerts')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-outline/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-outline-variant after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                {/* Platform Toggle */}
                <div className="bg-white p-6 rounded-xl flex items-center justify-between group hover:shadow-lg transition-all duration-300">
                  <div>
                    <p className="font-bold text-on-surface">System Alerts</p>
                    <p className="text-xs text-outline">Maintenance &amp; policy</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.systemAlerts}
                      onChange={() => handleNotificationToggle('systemAlerts')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-outline/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-outline-variant after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Danger Zone Section */}
          <div className="col-span-12 mt-8 p-6 md:p-10 border-2 border-dashed border-error-container rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-error font-bold text-lg mb-1">Deactivate Account</h3>
              <p className="text-outline text-sm">
                Once you deactivate your enterprise portal, all data is archived for 30 days.
              </p>
            </div>
            <button
              onClick={handleDeactivate}
              className="px-6 py-2.5 rounded-lg border-2 border-error text-error font-bold text-sm hover:bg-error-container/20 transition-all whitespace-nowrap"
            >
              Deactivate
            </button>
          </div>
        </div>
      </div>

      {/* Footer Metric Row */}
      <footer className="max-w-5xl mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row justify-between items-center gap-4 opacity-40">
        <div className="text-xs font-medium tracking-widest uppercase text-outline">
          RecruitPro Employer Portal v4.2.0
        </div>
        <div className="flex gap-6">
          <span className="text-xs font-medium uppercase tracking-widest text-outline cursor-pointer hover:opacity-70">
            Privacy Policy
          </span>
          <span className="text-xs font-medium uppercase tracking-widest text-outline cursor-pointer hover:opacity-70">
            Terms of Service
          </span>
        </div>
      </footer>
    </div>
  );
};

export default SecuritySettings;