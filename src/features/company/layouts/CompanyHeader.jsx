import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { useAuthStore } from "../../../store";

const pickFirst = (...values) =>
  values.find((value) => typeof value === "string" && value.trim())?.trim();

const getCompanyProfile = (user) => {
  const company = user?.company ?? {};
  const profile = user?.profile ?? {};
  const name = pickFirst(
    company?.company_name,
    company?.companyName,
    company?.name,
    user?.company_name,
    user?.companyName,
    user?.name,
    user?.full_name,
    profile?.company_name,
    profile?.companyName,
    profile?.name,
    user?.email,
    "Company"
  );

  return {
    name,
    email: pickFirst(user?.email, company?.email, profile?.email, ""),
    role: pickFirst(
      user?.designation,
      user?.position,
      user?.contact_designation,
      company?.contact_designation,
      profile?.designation,
      "Recruiter"
    ),
    avatar: pickFirst(
      company?.logo,
      company?.logo_url,
      company?.logoUrl,
      user?.logo,
      user?.logo_url,
      user?.avatar,
      user?.avatar_url,
      user?.profile_picture,
      profile?.logo,
      profile?.avatar,
      profile?.profile_picture
    ),
    initial: name.charAt(0).toUpperCase(),
  };
};

const CompanyHeader = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const { user, logout } = useAuthStore();
  const profile = getCompanyProfile(user);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/company/login");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8">
        {/* Desktop hamburger (To toggle desktop mini sidebar) */}
        <button
          className="hidden rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 md:block"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          <FiMenu size={20} />
        </button>

        {/* Mobile hamburger (To toggle mobile full sidebar overlay) */}
        <button
          className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          <FiMenu size={20} />
        </button>

        {/* Search Bar */}
        <div className="hidden max-w-md flex-1 items-center gap-4 sm:flex">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              search
            </span>
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-1 focus:ring-orange-400"
            />
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="ml-auto flex items-center gap-2 md:gap-4">
          <button className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="hidden rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 sm:block">
            <span className="material-symbols-outlined">chat_bubble</span>
          </button>
          <button className="hidden rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 sm:block">
            <span className="material-symbols-outlined">help</span>
          </button>

          {/* User Profile Dropdown */}
          <div className="relative ml-2 md:ml-4" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 rounded-lg border-l border-slate-200 pl-3 transition-colors hover:bg-slate-50 md:pl-4"
            >
              <div className="hidden text-right lg:block">
                <p className="text-sm font-semibold text-slate-800">
                  {profile.name}
                </p>
                <p className="text-xs text-slate-500">{profile.role}</p>
              </div>
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="h-9 w-9 rounded-full border-2 border-white object-cover shadow-sm md:h-10 md:w-10"
                />
              ) : (
                <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-orange-100 text-sm font-bold text-orange-700 shadow-sm md:h-10 md:w-10">
                  {profile.initial}
                </span>
              )}
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
                <div className="border-b border-slate-100 px-4 py-3 lg:hidden">
                  <p className="text-sm font-semibold text-slate-800">
                    {profile.name}
                  </p>
                  <p className="text-xs text-slate-500">{profile.email}</p>
                </div>
                <div className="p-2">
                  <Link
                    to="/company/profile"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-orange-600"
                  >
                    <span className="material-symbols-outlined text-lg text-slate-400">
                      person
                    </span>
                    My Profile
                  </Link>
                  <Link
                    to="/company/settings/security"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-orange-600"
                  >
                    <span className="material-symbols-outlined text-lg text-slate-400">
                      settings
                    </span>
                    Settings
                  </Link>
                </div>
                <div className="border-t border-slate-100 p-2">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
                  >
                    <span className="material-symbols-outlined text-lg">
                      logout
                    </span>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default CompanyHeader;
