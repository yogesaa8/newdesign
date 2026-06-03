import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import CompanySidebar from './CompanySidebar';
import CompanyHeader from './CompanyHeader';
import Breadcrumb from '../../../components/ui/Breadcrumb';
import useSEO from "@/seo/useSEO";

const CompanyLayout = () => {
 const [sidebarOpen, setSidebarOpen] = useState(false);

 const seoElement = useSEO({
  title: "Company Dashboard | FirstJobIndia",
  description: "Private FirstJobIndia employer dashboard.",
  path: "/company",
  noindex: true,
 });

 return (
 <div className="flex min-h-screen">
 {seoElement}
 {/* Mobile sidebar backdrop */}
 {sidebarOpen && (
 <div
 className="fixed inset-0 z-40 md:hidden"
 onClick={() => setSidebarOpen(false)}
 />
 )}

 {/* Sidebar */}
 <CompanySidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

 {/* Main Content Area */}
 <div className="flex-1 flex flex-col min-w-0">
 {/* Header */}
 <CompanyHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

 <div className="px-4 md:px-8 py-4 border-b">
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
