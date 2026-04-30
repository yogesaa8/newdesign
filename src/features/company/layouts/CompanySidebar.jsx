import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const CompanySidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { icon: 'dashboard', label: 'Dashboard', path: '/company-dashboard' },
    { icon: 'work', label: 'Jobs', path: '/company-jobs' },
    { icon: 'add', label: 'Post a Job', path: '/company-post-job' },
    { icon: 'groups', label: 'Applicants', path: '/company-applicants' },
  ];

  const bottomNavItems = [
    { icon: 'business', label: 'Company Profile', path: '/company-profile' },
    { icon: 'security', label: 'Security Settings', path: '/company-security' },
  ];

  return (
    <aside className="h-screen sticky top-0 left-0 w-64 bg-surface-container-low dark:bg-inverse-surface flex flex-col p-4 gap-2 font-headline font-medium antialiased hidden md:flex">
      {/* Logo Section */}
      <div className="px-2 py-4 mb-4">
        <span className="text-xl font-extrabold tracking-tight text-on-surface dark:text-white">
          RecruitPro
        </span>
        <p className="text-xs text-outline font-medium">Enterprise Hub</p>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 flex flex-col gap-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 scale-95 active:scale-100 ${
              isActive(item.path)
                ? 'bg-white dark:bg-on-surface-variant/20 text-primary dark:text-primary shadow-sm'
                : 'text-on-surface/60 dark:text-outline hover:text-primary hover:bg-white/50 dark:hover:bg-on-surface-variant/10'
            }`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}

        {/* Divider */}
        <div className="my-4 border-t border-outline-variant/30"></div>

        {/* Bottom Navigation */}
        {bottomNavItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 scale-95 active:scale-100 ${
              isActive(item.path)
                ? 'bg-white dark:bg-on-surface-variant/20 text-primary dark:text-primary shadow-sm'
                : 'text-on-surface/60 dark:text-outline hover:text-primary hover:bg-white/50 dark:hover:bg-on-surface-variant/10'
            }`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="mt-auto pt-4 border-t border-outline-variant/30">
        <Link
          to="/company-login"
          className="flex items-center gap-3 px-3 py-2 text-on-surface/60 dark:text-outline hover:text-primary transition-all duration-200"
        >
          <span className="material-symbols-outlined">logout</span>
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
};

export default CompanySidebar;
