import React from "react";
import { Outlet } from "react-router-dom";
import MainLayout from "./MainLayout";

const DashboardLayout = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default DashboardLayout;
