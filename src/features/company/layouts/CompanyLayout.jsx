import React from 'react';
import { Outlet } from 'react-router-dom';
import CompanySidebar from './CompanySidebar';
import CompanyHeader from './CompanyHeader';
import Breadcrumb from '../../../components/ui/Breadcrumb';

const CompanyLayout = () => {
  return (
    <div className="flex min-h-screen bg-cp-background">
      {/* Sidebar */}
      <CompanySidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <CompanyHeader />

        <div className="px-8 py-4 bg-surface border-b border-outline-variant/20">
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
