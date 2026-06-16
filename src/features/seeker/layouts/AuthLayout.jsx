import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-[#FFF7F3]">
      {/* Left Side: Branding & Info (Hidden on mobile) */}
      <div className="relative hidden w-1/2 flex-col justify-center bg-[#F7F5F2] px-16 text-[#0A0A0A] lg:flex xl:px-24">
        <div className="absolute top-12 left-16 flex items-center gap-2">
          <div className="bg-white/80 p-2 rounded-[8px]">
            <img
              src="/images/logos/fji_orange.png"
              alt="FirstJobIndia"
              className="h-7 w-7 object-contain"
            />
          </div>
          <span className="text-2xl font-bold tracking-tight">
            <span>First</span>
            <span className="text-[#FF6B35]">Job</span>
            <span>India</span>
          </span>
        </div>

        <div className="space-y-6">
          <h1 className="text-6xl xl:text-7xl font-extrabold tracking-tight">
            Hey, Hello!
          </h1>
          <h2 className="text-2xl font-semibold text-[#0A0A0A]">
            Join The Waitlist For The Design System!
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-[#6F6F76]">
            We provide all the advantages that can simplify all your financial
            transactions without any further requirements
          </p>
        </div>
      </div>

      {/* Right Side: Auth Card Container */}
      <div className="flex w-full items-center justify-center bg-[#FFF7F3] lg:w-1/2 lg:justify-end">
        <div className="relative flex h-full w-full flex-col justify-center bg-white p-8 shadow-2xl sm:p-12 lg:h-[95%] lg:rounded-l-[8px] xl:p-20">
          <div className="max-w-md mx-auto w-full">
            {/* Mobile Logo */}
            <div className="lg:hidden flex justify-center mb-8">
              <div className="flex items-center gap-2">
                <div className="rounded-[8px] bg-[#FFF1E9] p-2 shadow-lg shadow-[#FF6B35]/10">
                  <img
                    src="/images/logos/fji_orange.png"
                    alt="FirstJobIndia"
                    className="h-6 w-6 object-contain"
                  />
                </div>
                <span className="text-2xl font-bold tracking-tight text-[#0A0A0A]">
                  <span>First</span>
                  <span className="text-[#FF6B35]">Job</span>
                  <span>India</span>
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
