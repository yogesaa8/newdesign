import React from "react";
import { Outlet } from "react-router-dom";
import MainLayout from "./MainLayout";
import useSEO from "@/seo/useSEO";

const DashboardLayout = () => {
  const seoElement = useSEO({
    title: "Seeker Dashboard | FirstJobIndia",
    description: "Private FirstJobIndia seeker dashboard.",
    path: "/seeker/dashboard",
    noindex: true,
  });
  return (
    <MainLayout>
      {seoElement}
      <Outlet />
    </MainLayout>
  );
};

export default DashboardLayout;
