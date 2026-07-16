import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store";

const primaryNav = [
  { icon: "dashboard", label: "Overview", path: "/company/dashboard" },
  { icon: "work", label: "My Jobs", path: "/company/jobs" },
  { icon: "add_circle", label: "Post a Job", path: "/company/jobs/new" },
];

const accountNav = [
  { icon: "business", label: "Company Profile", path: "/company/profile" },
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
    `flex items-center gap-3 rounded-xl mx-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
      isActive(path)
        ? "bg-co-primary text-white"
        : "text-n-400 hover:bg-white/5 hover:text-white"
    }`;

  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-dvh w-64 flex-col border-r border-white/10 bg-n-800 px-2 py-5 transition-transform duration-300 md:sticky md:z-30 md:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Logo */}
      <Link to="/company/dashboard" className="mb-6 flex items-center gap-3 px-4">
        <img
          src="/images/logos/fji_orange.png"
          alt="FirstJobIndia"
          className="h-8 w-8 object-contain"
        />
        <div className="leading-tight">
          <p className="text-base font-extrabold tracking-tight text-white">
            First<span className="text-sk-primary">Job</span>India
          </p>
          <p className="text-xs font-medium text-n-400">Employer</p>
        </div>
      </Link>

      {/* Plan badge */}
      <div className="mx-4 mb-4 rounded-lg bg-white/5 px-3 py-2">
        <p className="text-xs font-semibold text-n-400">Starter Plan</p>
        <button className="mt-1 text-xs font-bold text-co-primary hover:underline">
          Upgrade →
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5">
        {primaryNav.map((item) => (
          <Link key={item.path} to={item.path} className={navLinkClass(item.path)}>
            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
            {item.label}
          </Link>
        ))}

        <div className="my-3 mx-4 h-px bg-white/10" />

        {accountNav.map((item) => (
          <Link key={item.path} to={item.path} className={navLinkClass(item.path)}>
            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-white/10 pt-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl mx-2 px-3 py-2.5 text-sm font-semibold text-red-400 transition-colors hover:bg-white/5 hover:text-red-300"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default CompanySidebar;
