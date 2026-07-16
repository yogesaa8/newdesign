import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import MasterHeader from "../../../components/layout/MasterHeader";

const authPaths = [
  "/seeker/login",
  "/seeker/signup",
  "/seeker/reset-password",
  "/seeker/verify-otp",
  "/company/login",
  "/company/signup",
  "/company/reset-password",
  "/institute/login",
  "/admin/login",
];

const PublicLayout = () => {
  const { pathname } = useLocation();
  const showHeader = !authPaths.includes(pathname);

  return (
    <>
      {showHeader && <MasterHeader />}
      <Outlet />
    </>
  );
};

export default PublicLayout;
