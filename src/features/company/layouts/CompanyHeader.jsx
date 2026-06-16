import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { useAuthStore } from "../../../store";

const pickFirst = (...values) =>
  values.find((value) => typeof value === "string" && value.trim())?.trim();

const pickName = (...values) =>
  values
    .find(
      (value) =>
        typeof value === "string" && value.trim() && !value.trim().includes("@")
    )
    ?.trim();

const getCompanyProfile = (user) => {
  const company = user?.company ?? {};
  const profile = user?.profile ?? {};
  const recruiterName = pickName(
    [user?.first_name, user?.last_name].filter(Boolean).join(" "),
    [profile?.first_name, profile?.last_name].filter(Boolean).join(" "),
    profile?.full_name,
    profile?.name,
    user?.full_name,
    user?.name,
    company?.contact_person
  );
  const name = pickFirst(
    recruiterName,
    company?.company_name,
    company?.companyName,
    company?.name,
    user?.company_name,
    user?.companyName,
    profile?.company_name,
    profile?.companyName,
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
    <header className="sticky top-0 z-40 border-b border-[#E7DDD6] bg-white/90 backdrop-blur-md">
      <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-8">
        <button
          className="rounded-[8px] border border-[#E7DDD6] bg-white p-2 text-[#4F4D55] transition-colors hover:bg-[#F7F5F2] md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          <FiMenu size={20} />
        </button>

        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#111114]">Employer workspace</p>
          <p className="hidden text-xs text-[#77737D] sm:block">
            Jobs, applicants, profile, and security.
          </p>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 rounded-[8px] border border-[#E7DDD6] bg-white px-2 py-1.5 transition-colors hover:bg-[#F7F5F2] md:px-3"
            >
              <div className="hidden text-right lg:block">
                <p className="max-w-44 truncate text-sm font-semibold text-[#111114]">
                  {profile.name}
                </p>
                <p className="text-xs text-[#77737D]">{profile.role}</p>
              </div>
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="h-9 w-9 rounded-[8px] object-cover"
                />
              ) : (
                <span className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-[#F1E7FF] text-sm font-bold text-[#8500FA]">
                  {profile.initial}
                </span>
              )}
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-[8px] border border-[#E7DDD6] bg-white shadow-[0_18px_45px_rgba(17,17,20,0.08)]">
                <div className="border-b border-[#EFE7E1] px-4 py-3 lg:hidden">
                  <p className="text-sm font-semibold text-[#111114]">
                    {profile.name}
                  </p>
                  <p className="truncate text-xs text-[#77737D]">{profile.role}</p>
                </div>
                <div className="p-2">
                  <Link
                    to="/company/profile"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex w-full items-center gap-3 rounded-[8px] px-3 py-2.5 text-sm font-medium text-[#4F4D55] transition-colors hover:bg-[#F7F5F2] hover:text-[#111114]"
                  >
                    <span className="material-symbols-outlined text-lg text-[#8A8690]">
                      person
                    </span>
                    Company profile
                  </Link>
                  <Link
                    to="/company/settings/security"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex w-full items-center gap-3 rounded-[8px] px-3 py-2.5 text-sm font-medium text-[#4F4D55] transition-colors hover:bg-[#F7F5F2] hover:text-[#111114]"
                  >
                    <span className="material-symbols-outlined text-lg text-[#8A8690]">
                      settings
                    </span>
                    Settings
                  </Link>
                </div>
                <div className="border-t border-[#EFE7E1] p-2">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-[8px] px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
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
