import React, { useState } from 'react';
import Breadcrumb from '../components/ui/Breadcrumb';
import { FiUser, FiLock, FiBell, FiEye, FiEyeOff, FiGlobe, FiShield, FiAlertTriangle, FiTrash2 } from 'react-icons/fi';

const Settings = () => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleDeleteAccount = (e) => {
    e.preventDefault();
    if (window.confirm('PERMANENTLY DELETE ACCOUNT? This action cannot be undone.')) {
      alert('Account scheduled for deletion. You will be logged out.');
    }
  };

  return (
    <>
      <Breadcrumb pageName="Account Settings" />

      <div className="grid grid-cols-1 gap-6">
        {/* Personal Information */}
        <div className="rounded-2xl border border-stroke bg-white shadow-sm dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
             <h3 className="font-medium text-black dark:text-white flex items-center gap-2">
                <FiUser size={20} /> Personal Information
             </h3>
          </div>
          <div className="p-7">
             <form action="#">
                <div className="mb-5.5 grid grid-cols-1 md:grid-cols-2 gap-5.5">
                   <div>
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">Full Name</label>
                      <input type="text" className="w-full rounded-xl border border-stroke bg-bg-soft dark:bg-primary/5 py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:text-white" defaultValue="Musharof Chowdhury" />
                   </div>
                   <div>
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">Email Address</label>
                      <input type="email" className="w-full rounded-xl border border-stroke bg-bg-soft dark:bg-primary/5 py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:text-white" defaultValue="musharof@example.com" />
                   </div>
                </div>
                <div className="mb-5.5">
                   <label className="mb-3 block text-sm font-medium text-black dark:text-white">Bio</label>
                   <textarea rows="4" className="w-full rounded-xl border border-stroke bg-bg-soft dark:bg-primary/5 py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:text-white" defaultValue="Passionate Full Stack Developer with 5+ years of experience..."></textarea>
                </div>
                <div className="flex justify-end gap-4.5">
                   <button className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white" type="button">Cancel</button>
                   <button className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90" type="submit">Save Changes</button>
                </div>
             </form>
          </div>
        </div>

        {/* Security Settings */}
        <div className="rounded-2xl border border-stroke bg-white shadow-sm dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
             <h3 className="font-medium text-black dark:text-white flex items-center gap-2">
                <FiLock size={20} /> Security Settings
             </h3>
          </div>
          <div className="p-7">
             <form action="#">
                <div className="mb-5.5">
                   <label className="mb-3 block text-sm font-medium text-black dark:text-white">Current Password</label>
                   <div className="relative">
                      <input 
                        type={showCurrentPassword ? "text" : "password"} 
                        placeholder="Enter current password" 
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:text-white dark:bg-boxdark" 
                      />
                      <button 
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-4 top-4 text-bodydark2 hover:text-primary transition-colors"
                      >
                         {showCurrentPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                      </button>
                   </div>
                </div>
                <div className="mb-5.5">
                   <label className="mb-3 block text-sm font-medium text-black dark:text-white">New Password</label>
                   <div className="relative">
                      <input 
                        type={showNewPassword ? "text" : "password"} 
                        placeholder="Enter new password" 
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white" 
                      />
                      <button 
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-4 top-4 text-bodydark2 hover:text-primary transition-colors"
                      >
                         {showNewPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                      </button>
                   </div>
                </div>
                <div className="mb-5.5 flex items-center justify-between p-4 rounded bg-meta-2 dark:bg-meta-4">
                   <div className="flex items-center gap-3">
                      <FiShield className="text-primary" />
                      <div>
                         <p className="font-bold text-black dark:text-primary text-sm">Two-Factor Authentication</p>
                         <p className="text-xs">Add an extra layer of security to your account.</p>
                      </div>
                   </div>
                   <button type="button" className="text-primary text-sm font-bold">Enable</button>
                </div>
                <div className="flex justify-end gap-4.5">
                   <button className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90" type="submit">Update Password</button>
                </div>
             </form>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="rounded-2xl border border-danger/20 bg-white shadow-sm dark:bg-boxdark overflow-hidden">
          <div className="border-b border-danger/20 py-4 px-7 bg-danger/5">
             <h3 className="font-medium text-danger flex items-center gap-2">
                <FiAlertTriangle size={20} /> Danger Zone
             </h3>
          </div>
          <div className="p-7">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                   <h4 className="font-bold text-black dark:text-white mb-1">Delete Account</h4>
                   <p className="text-sm text-body">Once you delete your account, there is no going back. Please be certain.</p>
                </div>
                {!showDeleteConfirm ? (
                   <button 
                     onClick={() => setShowDeleteConfirm(true)}
                     className="flex items-center justify-center gap-2 rounded bg-danger py-2 px-6 font-medium text-white hover:bg-opacity-90 whitespace-nowrap"
                   >
                      <FiTrash2 /> Delete My Account
                   </button>
                ) : (
                   <div className="flex flex-col gap-3">
                      <p className="text-xs font-bold text-danger text-center">Are you absolutely sure?</p>
                      <div className="flex gap-2">
                         <button 
                           onClick={() => setShowDeleteConfirm(false)}
                           className="flex-1 rounded border border-stroke py-2 px-4 text-sm font-medium hover:shadow-1 dark:border-strokedark"
                         >
                            Cancel
                         </button>
                         <button 
                           onClick={handleDeleteAccount}
                           className="flex-1 rounded bg-danger py-2 px-4 text-sm font-medium text-white hover:bg-opacity-90"
                         >
                            Yes, Delete
                         </button>
                      </div>
                   </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
