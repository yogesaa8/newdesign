import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import useSEO from "./useSEO";

const NoindexRouteLayout = ({ title, description } = {}) => {
  const location = useLocation();
  const seoElement = useSEO({
    title: title || "FirstJobIndia",
    description: description || "Private FirstJobIndia page.",
    path: location.pathname,
    noindex: true,
  });
  return (
    <>
      {seoElement}
      <Outlet />
    </>
  );
};

export default NoindexRouteLayout;
