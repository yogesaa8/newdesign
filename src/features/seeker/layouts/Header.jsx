import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store";
import {
  FiSearch,
  FiBell,
  FiUser,
  FiSettings,
  FiHelpCircle,
  FiLogOut,
  FiMenu,
} from "react-icons/fi";

const pickFirst = (...values) =>
  values.find((value) => typeof value === "string" && value.trim())?.trim();

const getSeekerProfile = (user) => {
  const profile = user?.profile ?? {};
  const name = pickFirst(
    user?.name,
    user?.full_name,
    user?.fullName,
    profile?.name,
    profile?.full_name,
    profile?.fullName,
    user?.email,
    "Job Seeker"
  );

  return {
    name,
    email: pickFirst(user?.email, profile?.email, ""),
    position: pickFirst(
      user?.position,
      user?.designation,
      profile?.position,
      profile?.designation,
      profile?.headline,
      "Job Seeker"
    ),
    avatar: pickFirst(
      user?.avatar,
      user?.avatar_url,
      user?.profile_picture,
      user?.profilePicture,
      profile?.avatar,
      profile?.avatar_url,
      profile?.profile_picture,
      profile?.profilePicture
    ),
    initial: name.charAt(0).toUpperCase(),
  };
};

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const profile = getSeekerProfile(user);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
    navigate("/seeker/login");
  };

  const trigger = useRef(null);
  const dropdown = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (
        dropdown.current &&
        !dropdown.current.contains(target) &&
        trigger.current &&
        !trigger.current.contains(target)
      ) {
        setDropdownOpen(false);
      }

      if (notifRef.current && !notifRef.current.contains(target)) {
        setNotifOpen(false);
      }
    };

    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#EADFD9] bg-white/90 backdrop-blur-md">
      <div className="flex items-center justify-between px-4 py-4 md:px-6 xl:px-10">
        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="lg:hidden p-2 rounded-[8px] border border-[#EADFD9] hover:bg-[#F7F5F2] transition"
          >
            <FiMenu size={20} />
          </button>

          {/* Search */}
          <div className="hidden md:block">
            <div className="relative">
              <FiSearch
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8690]"
              />

              <input
                type="text"
                placeholder="Search jobs, companies..."
                className="w-72 xl:w-96 rounded-[8px] border border-[#EADFD9] bg-[#F7F5F2] py-3 pl-11 pr-16 text-sm outline-none focus:border-[#8500FA] focus:bg-white transition"
              />

              <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-1 rounded-lg border border-[#EADFD9] px-2 py-1 text-xs text-[#8A8690]">
                <span>⌘</span>
                <span>K</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Dark Mode */}
          {/* <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex h-10 w-10 items-center justify-center rounded-[8px] border border-[#EADFD9] hover:bg-[#F7F5F2] transition"
          >
            {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button> */}

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative flex h-10 w-10 items-center justify-center rounded-[8px] border border-[#EADFD9] hover:bg-[#F7F5F2] transition"
            >
              <FiBell size={18} />

              <span className="absolute right-2 top-2 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500"></span>
              </span>
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-3 w-80 rounded-[8px] border border-[#EADFD9] bg-white shadow-xl">
                <div className="border-b px-5 py-4">
                  <h4 className="font-semibold">Notifications</h4>
                </div>

                <div className="p-4 space-y-4">
                  <div className="rounded-[8px] bg-[#F7F5F2] p-3">
                    <p className="text-sm font-medium">
                      New job alert matched your profile
                    </p>
                    <span className="text-xs text-[#6F6F76]">2 min ago</span>
                  </div>

                  <div className="rounded-[8px] bg-[#F7F5F2] p-3">
                    <p className="text-sm font-medium">
                      Recruiter viewed your profile
                    </p>
                    <span className="text-xs text-[#6F6F76]">1 hour ago</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              ref={trigger}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 rounded-[8px] p-1.5 hover:bg-[#F7F5F2] transition"
            >
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="h-11 w-11 rounded-[8px] object-cover"
                />
              ) : (
                <span className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-[#FFF1E9] text-sm font-bold text-[#C84F1F]">
                  {profile.initial}
                </span>
              )}

              {/* <div className="hidden lg:block text-left">
                <p className="text-sm font-semibold text-[#0A0A0A]">
                  {profile.name}
                </p>
                <p className="text-xs text-[#6F6F76]">{profile.position}</p>
              </div> */}

              {/* <FiChevronDown
                size={18}
                className={`transition ${dropdownOpen ? "rotate-180" : ""}`}
              /> */}
            </button>

            {dropdownOpen && (
              <div
                ref={dropdown}
                className="absolute right-0 mt-3 w-72 overflow-hidden rounded-[8px] border border-[#EADFD9] bg-white shadow-xl"
              >
                <div className="border-b border-[#D8C9C0] px-5 py-4">
                  <h4 className="font-semibold">{profile.name}</h4>
                  <p className="text-sm text-[#6F6F76]">{profile.email}</p>
                </div>

                <div className="p-3 space-y-1">
                  <Link
                    to="/seeker/dashboard/profile"
                    className="flex items-center gap-3 rounded-[8px] px-3 py-3 hover:bg-[#F7F5F2]"
                  >
                    <FiUser size={18} />
                    My Profile
                  </Link>

                  <Link
                    to="/seeker/dashboard/settings"
                    className="flex items-center gap-3 rounded-[8px] px-3 py-3 hover:bg-[#F7F5F2]"
                  >
                    <FiSettings size={18} />
                    Account Settings
                  </Link>

                  <Link
                    to="/seeker/dashboard/support"
                    className="flex items-center gap-3 rounded-[8px] px-3 py-3 hover:bg-[#F7F5F2]"
                  >
                    <FiHelpCircle size={18} />
                    Support
                  </Link>
                </div>

                <div className="border-t border-[#D8C9C0] p-3">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-[8px] px-3 py-3 text-red-600 hover:bg-red-50"
                  >
                    <FiLogOut size={18} />
                    Sign Out
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

export default Header;
