import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import CompanySidebar from './CompanySidebar';
import CompanyHeader from './CompanyHeader';
import Breadcrumb from '../../../components/ui/Breadcrumb';

const CompanyLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <CompanySidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <CompanyHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="px-4 md:px-8 py-4 bg-surface border-b border-outline-variant/20">
          <Breadcrumb showTitle={false} />
        </div>

        {/* Page Content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CompanyLayout;
