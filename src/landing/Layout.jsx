import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../common/Footer";

const Layout = () => {
  return (
    <>      
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
