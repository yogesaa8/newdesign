import React from "react";
import { FiBriefcase } from "react-icons/fi";

const AuthLayout = ({ children, title, subtitle, description }) => {
  return (
    <div className="flex min-h-screen w-full bg-primary overflow-hidden">
      {/* Left Side: Branding & Info (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center px-16 xl:px-24 text-white relative">
        <div className="absolute top-12 left-16 flex items-center gap-2">
          <div className="bg-white/80 p-2 rounded-xl">
            <FiBriefcase className="text-white" size={28} />
          </div>
          <span className="text-2xl font-bold tracking-tight">JobPortal</span>
        </div>

        <div className="space-y-6">
          <h1 className="text-6xl xl:text-7xl font-extrabold tracking-tight">
            Hey, Hello!
          </h1>
          <h2 className="text-2xl font-semibold opacity-90">
            Join The Waitlist For The Design System!
          </h2>
          <p className="max-w-md text-lg opacity-70 leading-relaxed">
            We provide all the advantages that can simplify all your financial
            transactions without any further requirements
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>
      </div>

      {/* Right Side: Auth Card Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end bg-primary">
        <div className="w-full h-full lg:h-[95%] lg:rounded-l-[4rem] bg-white dark:bg-boxdark p-8 sm:p-12 xl:p-20 flex flex-col justify-center shadow-2xl relative">
          <div className="max-w-md mx-auto w-full">
            {/* Mobile Logo */}
            <div className="lg:hidden flex justify-center mb-8">
              <div className="flex items-center gap-2">
                <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
                  <FiBriefcase className="text-white" size={24} />
                </div>
                <span className="text-primary text-2xl font-bold tracking-tight">
                  JobPortal
                </span>
              </div>
            </div>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
