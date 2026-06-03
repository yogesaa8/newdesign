import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../../store";
import { adminTabs } from "./adminDashboardData";
import AdminHeader from "./components/AdminHeader";
import AdminPasswordTab from "./components/AdminPasswordTab";
import AdminProfileTab from "./components/AdminProfileTab";
import AdminSidebar from "./components/AdminSidebar";
import ApprovalsTab from "./components/ApprovalsTab";
import MobileAdminNav from "./components/MobileAdminNav";
import OverviewTab from "./components/OverviewTab";
import PlaceholderTab from "./components/PlaceholderTab";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { clearAuth } = useAuthStore();
  const [activeTab, setActiveTab] = useState("overview");

  const handleLogout = () => {
    clearAuth();
    navigate("/admin/login");
  };

  return (
    <div className="flex h-screen font-sans bg-slate-50">
      <AdminSidebar
        activeTab={activeTab}
        tabs={adminTabs}
        onLogout={handleLogout}
        onTabChange={setActiveTab}
      />

      <main className="flex-1 overflow-y-auto p-6 pb-24 md:p-8 md:pb-8">
        <AdminHeader activeTab={activeTab} />

        {activeTab === "overview" && <OverviewTab onTabChange={setActiveTab} />}
        {activeTab === "approvals" && <ApprovalsTab />}
        {activeTab === "profile" && (
          <AdminProfileTab onPasswordClick={() => setActiveTab("password")} />
        )}
        {activeTab === "password" && <AdminPasswordTab />}
        {!["overview", "approvals", "profile", "password"].includes(
          activeTab,
        ) && (
          <PlaceholderTab activeTab={activeTab} />
        )}
      </main>

      <MobileAdminNav
        activeTab={activeTab}
        tabs={adminTabs}
        onTabChange={setActiveTab}
      />
    </div>
  );
}
