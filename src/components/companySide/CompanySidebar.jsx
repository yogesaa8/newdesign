import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const CompanySidebar = () => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  const navItems = [
    { icon: 'dashboard', label: 'Dashboard', path: '/company-dashboard' },
    { icon: 'work', label: 'Jobs', path: '/company-jobs' },
    { icon: 'groups', label: 'Applicants', path: '/company-applicants' },
    { icon: 'person_search', label: 'Talent Search', path: '/company-talent' },
    { icon: 'chat', label: 'Inbox', path: '/company-inbox' },
    
  ];

  const bottomNavItems = [
    { icon: 'business', label: 'Company Profile', path: '/company-profile' },
    { icon: 'security', label: 'Security Settings', path: '/company-security' },
    { icon: 'settings', label: 'Settings', path: '/company-settings' },
  ];

  return (
    <aside className="h-screen sticky top-0 left-0 w-64 bg-[#eff4ff] dark:bg-slate-900 flex flex-col p-4 gap-2 font-['Manrope'] font-medium antialiased hidden md:flex">
      {/* Logo Section */}
      <div className="px-2 py-4 mb-4">
        <span className="text-xl font-extrabold tracking-tight text-[#0d1c2e] dark:text-white">
          RecruitPro
        </span>
        <p className="text-xs text-[#737686] font-medium">Enterprise Hub</p>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 flex flex-col gap-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 scale-95 active:scale-100 ${
              isActive(item.path)
                ? 'bg-white dark:bg-slate-800 text-[#2563eb] dark:text-blue-400 shadow-sm'
                : 'text-[#0d1c2e]/60 dark:text-slate-400 hover:text-[#2563eb] hover:bg-white/50 dark:hover:bg-slate-800/50'
            }`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}

        {/* Divider */}
        <div className="my-4 border-t border-[#c3c6d7]/30"></div>

        {/* Bottom Navigation */}
        {bottomNavItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 scale-95 active:scale-100 ${
              isActive(item.path)
                ? 'bg-white dark:bg-slate-800 text-[#2563eb] dark:text-blue-400 shadow-sm'
                : 'text-[#0d1c2e]/60 dark:text-slate-400 hover:text-[#2563eb] hover:bg-white/50 dark:hover:bg-slate-800/50'
            }`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="mt-auto pt-4 border-t border-[#c3c6d7]/30">
        <Link
          to="/company-login"
          className="flex items-center gap-3 px-3 py-2 text-[#0d1c2e]/60 dark:text-slate-400 hover:text-[#2563eb] transition-all duration-200"
        >
          <span className="material-symbols-outlined">logout</span>
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
};

export default CompanySidebar;