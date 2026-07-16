import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import CompanySidebar from "./CompanySidebar";
import CompanyHeader from "./CompanyHeader";
import Breadcrumb from "../../../components/ui/Breadcrumb";
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
    <div className="flex min-h-screen bg-n-50 text-n-900">
      {seoElement}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <CompanySidebar sidebarOpen={sidebarOpen} />

      <div className="flex min-w-0 flex-1 flex-col">
        <CompanyHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="border-b border-n-200 bg-white px-4 py-3 md:px-8">
          <Breadcrumb showTitle={false} />
        </div>

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CompanyLayout;
