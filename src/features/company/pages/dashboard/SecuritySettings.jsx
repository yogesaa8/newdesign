import React, { useState } from "react";

const SecuritySettings = () => {
  const [formData, setFormData] = useState({
    firstName: "Alexander",
    lastName: "Henderson",
    email: "a.henderson@recruitpro.com",
    currentPassword: "",
    newPassword: "",
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushAlerts: false,
    systemAlerts: true,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNotificationToggle = (type) => {
    setNotifications((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    console.log("Updating profile:", formData);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    console.log("Changing password");
  };

  const handleDeactivate = () => {
    if (
      window.confirm(
        "Are you sure you want to deactivate your account? All data will be archived for 30 days.",
      )
    ) {
      console.log("Deactivating account");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-5xl p-6 md:p-12">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-slate-800 md:text-4xl">
            Security Settings
          </h1>
          <p className="font-body text-slate-500">
            Manage your enterprise account credentials and communication
            preferences.
          </p>
        </div>

        {/* Bento Grid Layout for Settings */}
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {/* Account Information (Large Card) */}
          <div className="col-span-12 rounded border border-slate-200 bg-white p-6 shadow-sm lg:col-span-7 md:p-10">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-orange-50 text-orange-600">
                <span className="material-symbols-outlined">person</span>
              </div>
              <h2 className="text-xl font-bold text-slate-800">
                Account Information
              </h2>
            </div>
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    First Name
                  </label>
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full rounded border border-slate-200 bg-slate-50 p-3 font-body text-slate-800 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-1 focus:ring-orange-400"
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Last Name
                  </label>
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full rounded border border-slate-200 bg-slate-50 p-3 font-body text-slate-800 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-1 focus:ring-orange-400"
                    type="text"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Email Address
                </label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded border border-slate-200 bg-slate-50 p-3 font-body text-slate-800 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-1 focus:ring-orange-400"
                  type="email"
                />
              </div>
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="rounded bg-orange-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-orange-700 hover:shadow-lg"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>

          {/* Password Management (Action Card) */}
          <div className="col-span-12 rounded border border-slate-200 bg-white p-6 shadow-sm lg:col-span-5 md:p-10">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-orange-50 text-orange-600">
                <span className="material-symbols-outlined">lock_reset</span>
              </div>
              <h2 className="text-xl font-bold text-slate-800">
                Password Management
              </h2>
            </div>
            <form onSubmit={handleChangePassword} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Current Password
                </label>
                <input
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  className="w-full rounded border border-slate-200 bg-slate-50 p-3 font-body text-slate-800 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-1 focus:ring-orange-400"
                  placeholder="••••••••"
                  type="password"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  New Password
                </label>
                <input
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="w-full rounded border border-slate-200 bg-slate-50 p-3 font-body text-slate-800 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-1 focus:ring-orange-400"
                  placeholder="••••••••"
                  type="password"
                />
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full rounded border border-slate-200 bg-slate-50 px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-100 hover:text-slate-800"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>

          {/* Notification Preferences (Full Width Horizontal Glass Card) */}
          <div className="col-span-12 rounded border border-slate-200 bg-slate-50 p-6 shadow-sm backdrop-blur-md md:p-10">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div className="max-w-48">
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded bg-orange-50 text-orange-600">
                    <span className="material-symbols-outlined">
                      notifications_active
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">
                    Notifications
                  </h2>
                </div>
                <p className="text-sm leading-relaxed text-slate-500">
                  Choose how you want to be informed about new applicants,
                  portal messages, and system updates.
                </p>
              </div>
              <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-3">
                {/* Email Toggle */}
                <div className="flex items-center justify-between rounded border border-slate-200 bg-white p-6 transition-all duration-300 hover:shadow-md">
                  <div>
                    <p className="font-bold text-slate-800">Email Alerts</p>
                    <p className="text-xs text-slate-500">
                      Application updates
                    </p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={notifications.emailAlerts}
                      onChange={() => handleNotificationToggle("emailAlerts")}
                      className="sr-only peer"
                    />
                    <div className="h-6 w-11 rounded-full bg-slate-200 peer-checked:bg-orange-600 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-slate-200 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-focus:outline-none"></div>
                  </label>
                </div>

                {/* Push Toggle */}
                <div className="flex items-center justify-between rounded border border-slate-200 bg-white p-6 transition-all duration-300 hover:shadow-md">
                  <div>
                    <p className="font-bold text-slate-800">Push Alerts</p>
                    <p className="text-xs text-slate-500">Direct messages</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={notifications.pushAlerts}
                      onChange={() => handleNotificationToggle("pushAlerts")}
                      className="sr-only peer"
                    />
                    <div className="h-6 w-11 rounded-full bg-slate-200 peer-checked:bg-orange-600 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-slate-200 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-focus:outline-none"></div>
                  </label>
                </div>

                {/* Platform Toggle */}
                <div className="flex items-center justify-between rounded border border-slate-200 bg-white p-6 transition-all duration-300 hover:shadow-md">
                  <div>
                    <p className="font-bold text-slate-800">System Alerts</p>
                    <p className="text-xs text-slate-500">
                      Maintenance &amp; policy
                    </p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={notifications.systemAlerts}
                      onChange={() => handleNotificationToggle("systemAlerts")}
                      className="sr-only peer"
                    />
                    <div className="h-6 w-11 rounded-full bg-slate-200 peer-checked:bg-orange-600 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-slate-200 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-focus:outline-none"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Danger Zone Section */}
          <div className="col-span-12 mt-8 flex flex-col items-start justify-between gap-4 rounded border-2 border-dashed border-red-200 bg-red-50/30 p-6 md:flex-row md:items-center md:p-10">
            <div>
              <h3 className="mb-1 text-lg font-bold text-red-700">
                Deactivate Account
              </h3>
              <p className="text-sm text-red-500">
                Once you deactivate your enterprise portal, all data is archived
                for 30 days.
              </p>
            </div>
            <button
              onClick={handleDeactivate}
              className="whitespace-nowrap rounded border-2 border-red-300 bg-white px-6 py-2.5 text-sm font-bold text-red-600 transition-all hover:border-red-500 hover:bg-red-50"
            >
              Deactivate
            </button>
          </div>
        </div>
      </div>

      {/* Footer Metric Row */}
      <footer className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-12 opacity-40 md:flex-row md:px-12">
        <div className="text-xs font-medium uppercase tracking-widest text-slate-500">
          FirstJobIndia Employer Portal v4.2.0
        </div>
        <div className="flex gap-6">
          <span className="cursor-pointer text-xs font-medium uppercase tracking-widest text-slate-500 hover:opacity-70">
            Privacy Policy
          </span>
          <span className="cursor-pointer text-xs font-medium uppercase tracking-widest text-slate-500 hover:opacity-70">
            Terms of Service
          </span>
        </div>
      </footer>
    </div>
  );
};

export default SecuritySettings;
