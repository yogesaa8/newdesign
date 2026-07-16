import {
  FiBell,
  FiBookmark,
  FiBriefcase,
  FiClock,
  FiFilePlus,
  FiHelpCircle,
  FiLayout,
  FiLogOut,
  FiMessageCircle,
  FiSettings,
  FiUser,
  FiX,
  FiLock,
  FiSearch,
  FiFileText,
} from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store";

const PROFILE_STRENGTH = 72;

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  const firstName = user?.name?.split(" ")[0] || user?.email?.split("@")[0] || "You";
  const initials = (user?.name || "Y").charAt(0).toUpperCase();

  const navItems = [
    { name: "Dashboard", icon: <FiLayout size={17} />, path: "/seeker/dashboard", end: true },
    { name: "Browse Jobs", icon: <FiSearch size={17} />, path: "/jobs" },
    { name: "Applications", icon: <FiBriefcase size={17} />, path: "/seeker/dashboard/applications", badge: "NEW" },
    { name: "Saved Jobs", icon: <FiBookmark size={17} />, path: "/seeker/dashboard/saved-jobs" },
    { name: "My Profile", icon: <FiUser size={17} />, path: "/seeker/dashboard/profile" },
    { name: "Resume Builder", icon: <FiFileText size={17} />, path: "/resume" },
  ];

  const lockedItems = [
    { name: "Interview Prep", icon: <FiClock size={17} /> },
    { name: "Skill Gap Analysis", icon: <FiSearch size={17} /> },
  ];

  const secondaryItems = [
    { name: "Job Alerts", icon: <FiBell size={17} />, path: "/seeker/dashboard/job-alerts" },
    { name: "Messages", icon: <FiMessageCircle size={17} />, path: "/seeker/dashboard/messages", badge: "5" },
    { name: "Documents", icon: <FiFilePlus size={17} />, path: "/seeker/dashboard/documents" },
  ];

  const bottomItems = [
    { name: "Settings", icon: <FiSettings size={17} />, path: "/seeker/dashboard/settings" },
    { name: "Support", icon: <FiHelpCircle size={17} />, path: "/seeker/dashboard/support" },
  ];

  const NavItem = ({ name, icon, path, end, badge }) => (
    <NavLink
      to={path}
      end={end}
      className={({ isActive }) =>
        `flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150
        ${isActive
          ? "bg-sk-surface text-sk-primary font-semibold"
          : "text-n-500 hover:text-n-900 hover:bg-n-50"
        }`
      }
    >
      <span className="flex items-center gap-3">
        {icon}
        {name}
      </span>
      {badge && (
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-sk-surface text-sk-primary">
          {badge}
        </span>
      )}
    </NavLink>
  );

  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-dvh w-64 flex-col bg-white border-r border-n-200 transition-transform duration-300 lg:static lg:h-auto lg:self-stretch lg:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      {/* Logo */}
      <div className="flex shrink-0 items-center justify-between px-5 py-5 border-b border-n-100">
        <NavLink to="/seeker/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sk-surface flex items-center justify-center">
            <img
              src="/images/logos/fji_orange.png"
              alt="FirstJobIndia"
              className="h-5 w-5 object-contain"
            />
          </div>
          <span className="text-base font-bold text-n-900">
            First<span className="text-sk-primary">Job</span>India
          </span>
        </NavLink>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden text-n-400 hover:text-n-900 p-1"
        >
          <FiX size={20} />
        </button>
      </div>

      {/* User + profile strength */}
      <div className="px-5 py-4 border-b border-n-100">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-sk-surface flex items-center justify-center font-bold text-sk-primary text-sm shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-sm text-n-900 truncate">{firstName}</p>
            <p className="text-xs text-n-400">Job Seeker</p>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-xs text-n-500">Profile strength</span>
            <span className="text-xs font-semibold text-sk-primary">{PROFILE_STRENGTH}%</span>
          </div>
          <div className="h-1.5 bg-n-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-sk-primary rounded-full transition-all"
              style={{ width: `${PROFILE_STRENGTH}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
        {navItems.map((item) => (
          <NavItem key={item.name} {...item} />
        ))}

        {/* Locked items */}
        <div className="border-t border-n-100 my-2 pt-2 space-y-0.5">
          {lockedItems.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-n-400 cursor-not-allowed select-none"
              title="Upgrade to Prime"
            >
              <span className="flex items-center gap-3">
                {item.icon}
                {item.name}
              </span>
              <FiLock size={13} className="text-n-400" />
            </div>
          ))}
        </div>

        <div className="border-t border-n-100 my-2 pt-2 space-y-0.5">
          {secondaryItems.map((item) => (
            <NavItem key={item.name} {...item} />
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="shrink-0 border-t border-n-100 px-3 py-3 space-y-0.5">
        {bottomItems.map((item) => (
          <NavItem key={item.name} {...item} />
        ))}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-error hover:bg-error-bg transition-colors"
        >
          <FiLogOut size={17} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
