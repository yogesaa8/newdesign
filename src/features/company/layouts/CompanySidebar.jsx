import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store";

const primaryNav = [
  { icon: "dashboard", label: "Dashboard", path: "/company/dashboard" },
  { icon: "work", label: "Jobs", path: "/company/jobs" },
  { icon: "add", label: "Post job", path: "/company/jobs/new" },
];

const accountNav = [
  { icon: "business", label: "Profile", path: "/company/profile" },
  { icon: "security", label: "Security", path: "/company/settings/security" },
];

const CompanySidebar = ({ sidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const isActive = (path) => {
    if (path === "/company/jobs") {
      return (
        location.pathname === path ||
        (location.pathname.startsWith(`${path}/`) &&
          location.pathname !== "/company/jobs/new")
      );
    }

    return location.pathname === path;
  };

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  const navLinkClass = (path) =>
    `flex items-center gap-3 rounded-[8px] px-3 py-2.5 text-sm font-semibold transition-colors ${
      isActive(path)
        ? "bg-[#111114] text-white"
        : "text-[#4F4D55] hover:bg-[#F7F5F2] hover:text-[#111114]"
    }`;

  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-dvh w-72 flex-col border-r border-[#E7DDD6] bg-white px-4 py-5 transition-transform duration-300 md:sticky md:z-30 md:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <Link to="/company/dashboard" className="mb-6 flex items-center gap-3 px-2">
        <img
          src="/images/logos/fji_orange.png"
          alt="FirstJobIndia"
          className="h-8 w-8 object-contain"
        />
        <div className="leading-tight">
          <p className="text-base font-extrabold tracking-tight">
            <span className="text-[#FF6B35]">First</span>
            <span className="text-[#111114]">Job</span>
            <span className="text-[#FF6B35]">India</span>
          </p>
          <p className="text-xs font-medium text-[#77737D]">Employer</p>
        </div>
      </Link>

      <nav className="flex flex-1 flex-col gap-1">
        {primaryNav.map((item) => (
          <Link key={item.path} to={item.path} className={navLinkClass(item.path)}>
            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
            {item.label}
          </Link>
        ))}

        <div className="my-4 h-px bg-[#EFE7E1]" />

        {accountNav.map((item) => (
          <Link key={item.path} to={item.path} className={navLinkClass(item.path)}>
            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-4 flex items-center gap-3 rounded-[8px] px-3 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
      >
        <span className="material-symbols-outlined text-[20px]">logout</span>
        Logout
      </button>
    </aside>
  );
};

export default CompanySidebar;
