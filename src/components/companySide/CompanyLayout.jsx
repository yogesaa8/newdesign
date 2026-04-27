import React from 'react';
import { Outlet } from 'react-router-dom';
import CompanySidebar from './CompanySidebar';
import CompanyHeader from './CompanyHeader';

const CompanyLayout = () => {
  return (
    <div className="flex min-h-screen bg-cp-background">
      {/* Sidebar */}
      <CompanySidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <CompanyHeader />
        
        {/* Page Content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CompanyLayout;