import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const CompanyHeader = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const tabs = [
    { label: 'Overview', path: '/company-dashboard' },
    { label: 'Post a Job', path: '/company-post-job' },
  ];

  return (
    <header className="bg-white border-b border-outline-variant sticky top-0 z-40">
      <div className="flex items-center justify-between px-8 py-4">
        {/* Search Bar */}
        <div className="flex items-center gap-4 flex-1 max-w-md">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
              search
            </span>
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-lg text-sm focus:ring-2 focus:ring-cp-primary/20 outline-none"
            />
          </div>
        </div>

        {/* Top Navigation Tabs */}
        <nav className="flex items-center gap-8">
          {tabs.map((tab) => (
            <Link
              key={tab.path}
              to={tab.path}
              className={`text-sm font-medium pb-1 transition-colors ${
                isActive(tab.path)
                  ? 'text-cp-primary border-b-2 border-cp-primary'
                  : 'text-on-surface-variant hover:text-cp-primary'
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </nav>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-surface-container rounded-lg transition-colors">
            <span className="material-symbols-outlined text-on-surface-variant">
              notifications
            </span>
          </button>
          <button className="p-2 hover:bg-surface-container rounded-lg transition-colors">
            <span className="material-symbols-outlined text-on-surface-variant">
              chat_bubble
            </span>
          </button>
          <button className="p-2 hover:bg-surface-container rounded-lg transition-colors">
            <span className="material-symbols-outlined text-on-surface-variant">
              help
            </span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 ml-4 pl-4 border-l border-outline-variant">
            <div className="text-right">
              <p className="text-sm font-semibold text-on-surface">Alex Sterling</p>
              <p className="text-xs text-outline">Recruiter</p>
            </div>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKC5Rto4K9DF-gIwYT6OX5lnYSfJ3KSAE8KWzojvSDThPKoAPZzvZuwTBVcH4uEE8-bwUskyetEfxw-f2_bChT3B5GzbEPfYtPKiJkAkJMtX01DuB_ZYw4X6YHE1oldfK-it7vhZp5ByY_CCAFo5Qb08zkT2A5A66c8cAHXbZ8wI-js12p9hka4nhAsKWCx_eJrTT1H1a5i385y0xCiDTG6w8wGRCW9feBPB0S33TOGYkQ9xyD42Px9WCwHFm9P-Azl_nTon4t7hiw"
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default CompanyHeader;
