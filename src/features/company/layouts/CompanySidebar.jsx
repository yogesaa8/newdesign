import React from "react";
import { Link, useLocation } from "react-router-dom";

const CompanySidebar = ({ sidebarOpen }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { icon: "dashboard", label: "Dashboard", path: "/company/dashboard" },
    { icon: "work", label: "Jobs", path: "/company/jobs" },
    { icon: "add", label: "Post a Job", path: "/company/jobs/new" },
    { icon: "groups", label: "Applicants", path: "/company/applicants" },
  ];

  const bottomNavItems = [
    { icon: "business", label: "Company Profile", path: "/company/profile" },
    {
      icon: "security",
      label: "Security Settings",
      path: "/company/settings/security",
    },
  ];

  return (
    <>
      {/* Mobile Overlay Background */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden"
          onClick={() => {}} // Handled by parent layout usually
        ></div>
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50 flex h-screen w-72 flex-col
          border-r border-slate-200 bg-white p-5 shadow-xl
          transition-transform duration-300 ease-in-out
          md:sticky md:top-0 md:z-30 md:shadow-sm
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          
          /* 
            Responsive Desktop Width handling: 
            Default full width (w-72) for mobile, 
            On desktop we will use group/container classes in parent, 
            but to keep it self contained we switch widths based on sibling state or use pure css. 
            Since parent manages sidebarOpen, we apply mini class directly.
          */
          ${!sidebarOpen ? "md:w-20 md:px-3" : "md:w-72 md:px-5"}
        `}
      >
        {/* Logo Section */}
        <div
          className={`mb-6 border-b border-slate-100 py-4 ${!sidebarOpen ? "md:px-2 md:text-center" : "px-3"}`}
        >
          <h1
            className={`text-2xl font-extrabold text-orange-600 tracking-tight ${!sidebarOpen ? "md:text-lg" : ""}`}
          >
            {sidebarOpen ? "RecruitPro" : "RP"}
          </h1>
          <p
            className={`text-sm text-slate-500 font-medium ${!sidebarOpen ? "md:hidden" : ""}`}
          >
            Enterprise Hub
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col gap-2 overflow-y-auto overflow-x-hidden">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              title={!sidebarOpen ? item.label : ""} // Tooltip for mini sidebar
              className={`
                flex items-center gap-3 rounded-lg px-4 py-3 font-medium
                transition-all duration-200
                ${!sidebarOpen ? "md:justify-center md:px-2" : ""}
                ${
                  isActive(item.path)
                    ? "bg-orange-500 text-white shadow-md"
                    : "text-slate-700 hover:bg-orange-50 hover:text-orange-600"
                }
              `}
            >
              <span className="material-symbols-outlined text-[20px] flex-shrink-0">
                {item.icon}
              </span>
              <span
                className={`whitespace-nowrap ${!sidebarOpen ? "md:hidden" : ""}`}
              >
                {item.label}
              </span>
            </Link>
          ))}

          {/* Divider */}
          <div className="my-5 border-t border-slate-100"></div>

          {/* Bottom Nav */}
          {bottomNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              title={!sidebarOpen ? item.label : ""} // Tooltip for mini sidebar
              className={`
                flex items-center gap-3 rounded-lg px-4 py-3 font-medium
                transition-all duration-200
                ${!sidebarOpen ? "md:justify-center md:px-2" : ""}
                ${
                  isActive(item.path)
                    ? "bg-orange-500 text-white shadow-md"
                    : "text-slate-700 hover:bg-orange-50 hover:text-orange-600"
                }
              `}
            >
              <span className="material-symbols-outlined text-[20px] flex-shrink-0">
                {item.icon}
              </span>
              <span
                className={`whitespace-nowrap ${!sidebarOpen ? "md:hidden" : ""}`}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Logout (Hidden in mini desktop mode to prevent clutter, accessible via header profile dropdown) */}
        <div
          className={`mt-auto border-t border-slate-100 pt-5 ${!sidebarOpen ? "md:hidden" : ""}`}
        >
          <Link
            to="/company/login"
            className="flex items-center gap-3 rounded-lg px-4 py-3 font-medium text-red-500 transition-all hover:bg-red-50"
          >
            <span className="material-symbols-outlined flex-shrink-0">
              logout
            </span>
            <span className="whitespace-nowrap">Logout</span>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default CompanySidebar;
