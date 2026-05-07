import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./components/layout/ScrollToTop";
import Banner from "./components/layout/Banner";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Banner />
        <ScrollToTop />

        <div className="flex-1 flex flex-col">
          <AppRoutes />
        </div>

        <Toaster />
      </div>
    </BrowserRouter>
  );
};

export default App;
