import { useNavigate } from "react-router-dom";
import { useAdminStore, useAuthStore } from "../../../../store";
import { adminTabs } from "./adminDashboardData";
import AdminHeader from "./components/AdminHeader";
import CompanyManagementTab from "./components/CompanyManagementTab";
import InstituteManagementTab from "./components/InstituteManagementTab";
import AdminProfileTab from "./components/AdminProfileTab";
import AdminSidebar from "./components/AdminSidebar";
import MobileAdminNav from "./components/MobileAdminNav";
import OverviewTab from "./components/OverviewTab";
import PlaceholderTab from "./components/PlaceholderTab";
import useSEO from "@/seo/useSEO";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { clearAuth } = useAuthStore();
  const { activeTab, setActiveTab } = useAdminStore();

  const handleLogout = () => {
    clearAuth();
    navigate("/", { replace: true });
  };

  const seoElement = useSEO({
    title: "Admin Dashboard | FirstJobIndia",
    description: "Private FirstJobIndia admin dashboard.",
    path: "/admin/dashboard",
    noindex: true,
  });

  return (
    <div className="fixed inset-0 z-40 flex overflow-hidden font-sans bg-n-50">
      {seoElement}
      <AdminSidebar
        activeTab={activeTab}
        tabs={adminTabs}
        onLogout={handleLogout}
        onTabChange={setActiveTab}
      />

      <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden p-6 pb-24 md:p-8 md:pb-8">
        <AdminHeader activeTab={activeTab} />

        {activeTab === "overview" && <OverviewTab onTabChange={setActiveTab} />}
        {activeTab === "companies" && <CompanyManagementTab />}
        {activeTab === "institutes" && <InstituteManagementTab />}
        {activeTab === "profile" && <AdminProfileTab />}
        {!["overview", "companies", "institutes", "profile"].includes(
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
