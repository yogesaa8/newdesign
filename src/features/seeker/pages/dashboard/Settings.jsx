import React, { useState } from "react";
import toast from "@/lib/toast";
import {
  FiUser,
  FiLock,
  FiEye,
  FiEyeOff,
  FiShield,
  FiAlertTriangle,
  FiTrash2,
} from "react-icons/fi";
import Breadcrumb from "../../../../components/ui/Breadcrumb";

const INPUT_CLASS =
  "w-full rounded-lg border border-n-200 bg-n-50 px-4 py-3 text-sm text-n-900 outline-none placeholder:text-n-400 transition focus:border-sk-primary focus:ring-2 focus:ring-sk-primary/10";
const LABEL_CLASS = "mb-2 block text-sm font-medium text-n-700";

const Settings = () => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleDeleteAccount = (e) => {
    e.preventDefault();
    if (window.confirm("PERMANENTLY DELETE ACCOUNT? This action cannot be undone.")) {
      toast.success("Account scheduled for deletion. You will be logged out.");
    }
  };

  return (
    <>
      <Breadcrumb pageName="Account Settings" />

      <div className="grid grid-cols-1 gap-6">
        {/* Personal Information */}
        <div className="overflow-hidden rounded-xl border border-n-200 bg-white shadow-sm">
          <div className="border-b border-n-100 px-6 py-4">
            <h3 className="flex items-center gap-2 text-base font-semibold text-n-900">
              <FiUser size={18} className="text-sk-primary" />
              Personal Information
            </h3>
          </div>

          <div className="p-6">
            <form>
              <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className={LABEL_CLASS}>Full Name</label>
                  <input
                    type="text"
                    defaultValue="Musharof Chowdhury"
                    className={INPUT_CLASS}
                  />
                </div>
                <div>
                  <label className={LABEL_CLASS}>Email Address</label>
                  <input
                    type="email"
                    defaultValue="musharof@example.com"
                    className={INPUT_CLASS}
                  />
                </div>
              </div>

              <div className="mb-5">
                <label className={LABEL_CLASS}>Bio</label>
                <textarea
                  rows="4"
                  defaultValue="Passionate Full Stack Developer with 5+ years of experience..."
                  className={`${INPUT_CLASS} resize-none`}
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="rounded-lg border border-n-200 bg-white px-5 py-2 text-sm font-medium text-n-700 transition hover:bg-n-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-sk-primary px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-sk-hover"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Security */}
        <div className="overflow-hidden rounded-xl border border-n-200 bg-white shadow-sm">
          <div className="border-b border-n-100 px-6 py-4">
            <h3 className="flex items-center gap-2 text-base font-semibold text-n-900">
              <FiLock size={18} className="text-sk-primary" />
              Security Settings
            </h3>
          </div>

          <div className="p-6">
            <form>
              <div className="mb-5">
                <label className={LABEL_CLASS}>Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Enter current password"
                    className={INPUT_CLASS}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-4 top-3.5 text-n-400 transition hover:text-sk-primary"
                  >
                    {showCurrentPassword ? <FiEyeOff size={17} /> : <FiEye size={17} />}
                  </button>
                </div>
              </div>

              <div className="mb-5">
                <label className={LABEL_CLASS}>New Password</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    className={INPUT_CLASS}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-3.5 text-n-400 transition hover:text-sk-primary"
                  >
                    {showNewPassword ? <FiEyeOff size={17} /> : <FiEye size={17} />}
                  </button>
                </div>
              </div>

              {/* 2FA row */}
              <div className="mb-6 flex items-center justify-between rounded-xl border border-n-200 bg-n-50 p-4">
                <div className="flex items-center gap-3">
                  <FiShield className="text-sk-primary shrink-0" size={18} />
                  <div>
                    <p className="text-sm font-bold text-n-900">Two-Factor Authentication</p>
                    <p className="text-xs text-n-500">Add an extra layer of security to your account.</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="rounded-lg bg-sk-surface px-4 py-2 text-sm font-semibold text-sk-primary transition hover:bg-sk-border"
                >
                  Enable
                </button>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="rounded-lg bg-sk-primary px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-sk-hover"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="overflow-hidden rounded-xl border border-error/20 bg-white shadow-sm">
          <div className="border-b border-error/10 px-6 py-4">
            <h3 className="flex items-center gap-2 text-base font-semibold text-error">
              <FiAlertTriangle size={18} />
              Danger Zone
            </h3>
          </div>

          <div className="p-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h4 className="mb-1 font-bold text-n-900">Delete Account</h4>
                <p className="text-sm text-n-500">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
              </div>

              {!showDeleteConfirm ? (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-error px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
                >
                  <FiTrash2 size={15} />
                  Delete My Account
                </button>
              ) : (
                <div className="flex flex-col gap-3">
                  <p className="text-center text-xs font-bold text-error">Are you absolutely sure?</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="flex-1 rounded-lg border border-n-200 px-4 py-2 text-sm font-medium text-n-700 transition hover:bg-n-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeleteAccount}
                      className="flex-1 rounded-lg bg-error px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
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
