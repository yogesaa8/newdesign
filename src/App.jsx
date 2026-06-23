import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./components/layout/ScrollToTop";
import Banner from "./components/layout/Banner";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store";

const App = () => {
  const initAuth = useAuthStore((state) => state.initAuth);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Banner />
          <ScrollToTop />

          <div className="flex-1 flex flex-col">
            <AppRoutes />
          </div>
        </div>
      </BrowserRouter>
      <Toaster
        position="top-right"
        containerStyle={{
          zIndex: 2147483647,
        }}
      />
    </>
  );
};

export default App;
