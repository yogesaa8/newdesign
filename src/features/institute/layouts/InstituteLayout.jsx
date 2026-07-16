import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../components/ui/Breadcrumb";
import MasterHeader from "../../../components/layout/MasterHeader";
import InstituteSidebar from "./InstituteSidebar";
import useSEO from "@/seo/useSEO";
import { useAuthStore } from "../../../store";

const InstituteLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const seoElement = useSEO({
    title: "Institute Dashboard | FirstJobIndia",
    description: "Private FirstJobIndia institute dashboard.",
    path: "/institute",
    noindex: true,
  });

  useEffect(() => {
    const handleExpiredSession = async () => {
      await logout();
      navigate("/institute/login", { replace: true });
    };

    window.addEventListener("institute-session-expired", handleExpiredSession);
    return () => {
      window.removeEventListener("institute-session-expired", handleExpiredSession);
    };
  }, [logout, navigate]);

  return (
    <div className="flex min-h-screen bg-n-50 text-n-900">
      {seoElement}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <InstituteSidebar sidebarOpen={sidebarOpen} />

      <div className="flex min-w-0 flex-1 flex-col">
        <MasterHeader
          sidebarOpen={sidebarOpen}
          onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
          showSidebarToggle
        />
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

export default InstituteLayout;
