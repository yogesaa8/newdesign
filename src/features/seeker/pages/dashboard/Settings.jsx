import React, { useState } from "react";
import toast from "react-hot-toast";
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

const Settings = () => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleDeleteAccount = (e) => {
    e.preventDefault();

    if (
      window.confirm(
        "PERMANENTLY DELETE ACCOUNT? This action cannot be undone.",
      )
    ) {
      toast.success("Account scheduled for deletion. You will be logged out.");
    }
  };

  return (
    <>
      <Breadcrumb pageName="Account Settings" />

      <div className="grid grid-cols-1 gap-6">
        {/* Personal Information */}
        <div className="overflow-hidden rounded border border-[#EADFD9] bg-white shadow-sm">
          <div className="border-b border-[#EADFD9] px-7 py-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-[#0A0A0A]">
              <FiUser size={20} className="text-[#FF6B35]" />
              Personal Information
            </h3>
          </div>

          <div className="p-7">
            <form>
              <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#4F4D55]">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Musharof Chowdhury"
                    className="w-full rounded border border-[#D8C9C0] bg-[#F7F5F2] px-4 py-3 text-sm outline-none transition focus:border-[#8500FA]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#4F4D55]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue="musharof@example.com"
                    className="w-full rounded border border-[#D8C9C0] bg-[#F7F5F2] px-4 py-3 text-sm outline-none transition focus:border-[#8500FA]"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-[#4F4D55]">
                  Bio
                </label>
                <textarea
                  rows="4"
                  defaultValue="Passionate Full Stack Developer with 5+ years of experience..."
                  className="w-full rounded border border-[#D8C9C0] bg-[#F7F5F2] px-4 py-3 text-sm outline-none transition focus:border-[#8500FA]"
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="rounded border border-[#D8C9C0] bg-white px-6 py-2 font-medium text-[#4F4D55] transition hover:border-[#FF9566] hover:text-[#FF6B35]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded bg-[#FF6B35] px-6 py-2 font-medium text-white shadow-md transition hover:bg-[#FF9566]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Security */}
        <div className="overflow-hidden rounded border border-[#EADFD9] bg-white shadow-sm">
          <div className="border-b border-[#EADFD9] px-7 py-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-[#0A0A0A]">
              <FiLock size={20} className="text-[#FF6B35]" />
              Security Settings
            </h3>
          </div>

          <div className="p-7">
            <form>
              {/* Current Password */}
              <div className="mb-5">
                <label className="mb-2 block text-sm font-medium text-[#4F4D55]">
                  Current Password
                </label>

                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Enter current password"
                    className="w-full rounded border border-[#D8C9C0] bg-[#F7F5F2] px-4 py-3 text-sm outline-none transition focus:border-[#8500FA]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-4 top-3.5 text-[#6F6F76] transition hover:text-[#FF6B35]"
                  >
                    {showCurrentPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="mb-5">
                <label className="mb-2 block text-sm font-medium text-[#4F4D55]">
                  New Password
                </label>

                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    className="w-full rounded border border-[#D8C9C0] bg-[#F7F5F2] px-4 py-3 text-sm outline-none transition focus:border-[#8500FA]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-3.5 text-[#6F6F76] transition hover:text-[#FF6B35]"
                  >
                    {showNewPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* 2FA */}
              <div className="mb-6 flex items-center justify-between rounded border border-[#EADFD9] bg-[#F7F5F2] p-4">
                <div className="flex items-center gap-3">
                  <FiShield className="text-[#FF6B35]" size={18} />

                  <div>
                    <p className="text-sm font-bold text-[#0A0A0A]">
                      Two-Factor Authentication
                    </p>
                    <p className="text-xs text-[#6F6F76]">
                      Add an extra layer of security to your account.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="rounded bg-[#FFF1E9] px-4 py-2 text-sm font-semibold text-[#C84F1F] transition hover:bg-orange-200"
                >
                  Enable
                </button>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="rounded bg-[#FF6B35] px-6 py-2 font-medium text-white shadow-md transition hover:bg-[#FF9566]"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="overflow-hidden rounded border border-red-200 bg-white shadow-sm">
          <div className="border-b border-red-100 px-7 py-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-red-600">
              <FiAlertTriangle size={20} />
              Danger Zone
            </h3>
          </div>

          <div className="p-7">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h4 className="mb-1 font-bold text-[#0A0A0A]">
                  Delete Account
                </h4>
                <p className="text-sm text-[#6F6F76]">
                  Once you delete your account, there is no going back. Please
                  be certain.
                </p>
              </div>

              {!showDeleteConfirm ? (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="whitespace-nowrap rounded bg-red-600 px-6 py-2 font-medium text-white transition hover:bg-red-700"
                >
                  <span className="flex items-center gap-2">
                    <FiTrash2 />
                    Delete My Account
                  </span>
                </button>
              ) : (
                <div className="flex flex-col gap-3">
                  <p className="text-center text-xs font-bold text-red-600">
                    Are you absolutely sure?
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="flex-1 rounded border border-[#D8C9C0] px-4 py-2 text-sm font-medium text-[#4F4D55] transition hover:border-[#C6AFFF]"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={handleDeleteAccount}
                      className="flex-1 rounded bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
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
