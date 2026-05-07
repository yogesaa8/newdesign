import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiBriefcase, FiCheckCircle, FiShield } from "react-icons/fi";

const SeekerVerifyOtp = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const otpValue = otp.join("");

    if (otpValue.length === 4) {
      navigate("/job-seeker/dashboard");
    } else {
      alert("Please enter a 4-digit code.");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-56px)] w-full overflow-hidden bg-slate-50">
      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center px-16 xl:px-24 relative">
        {/* Logo */}
        <div className="absolute top-12 left-16 flex items-center gap-2">
          <div className="p-2 rounded-xl">
            <FiBriefcase size={28} />
          </div>
          <span className="text-2xl font-bold tracking-tight">JobPortal</span>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <h1 className="text-6xl xl:text-7xl font-extrabold tracking-tight">
            Verify Access
          </h1>

          <h2 className="text-2xl font-semibold opacity-90">
            One final step before you continue.
          </h2>

          <p className="max-w-md text-lg opacity-70 leading-relaxed">
            We've sent a secure verification code to your email. Enter the OTP
            below to verify your identity and continue securely.
          </p>

          {/* Features */}
          <div className="space-y-4 pt-6">
            <div className="flex items-center gap-3">
              <FiCheckCircle className="text-green-600" size={20} />
              <span>Secure email verification</span>
            </div>

            <div className="flex items-center gap-3">
              <FiShield className="text-blue-600" size={20} />
              <span>Account protection enabled</span>
            </div>

            <div className="flex items-center gap-3">
              <FiCheckCircle className="text-green-600" size={20} />
              <span>Fast and secure authentication</span>
            </div>
          </div>
        </div>

        {/* Decorative blur */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-0 w-64 h-64 rounded-full blur-3xl"></div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end">
        <div className="w-full min-h-screen lg:min-h-0 lg:h-full lg:rounded-l-[4rem] p-8 sm:p-12 xl:p-16 flex flex-col justify-center shadow-2xl relative overflow-hidden">
          <div className="max-w-md mx-auto w-full">
            {/* Mobile Logo */}
            <div className="lg:hidden flex justify-center mb-8">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl shadow-lg">
                  <FiBriefcase size={24} />
                </div>
                <span className="text-2xl font-bold tracking-tight">
                  JobPortal
                </span>
              </div>
            </div>

            {/* Heading */}
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold mb-3">Verify OTP</h2>
              <p className="text-sm px-4 text-slate-500">
                Enter the 4-digit code sent to your email.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleVerify}>
              <div className="mb-10 flex justify-center gap-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={digit}
                    ref={inputRefs[index]}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="h-16 w-16 border border-slate-300 text-center text-2xl font-bold outline-none focus:ring-1 transition-all shadow-sm"
                  />
                ))}
              </div>

              <button
                type="submit"
                className="w-full p-4 font-bold transition-all shadow-lg bg-orange-600 hover:bg-orange-700 text-white"
              >
                Verify Code
              </button>

              <div className="mt-8 text-center">
                <p className="text-sm">
                  Didn't receive code?{" "}
                  <button type="button" className="font-bold transition-colors">
                    Resend Code
                  </button>
                </p>
              </div>

              <div className="mt-6 text-center">
                <Link
                  to="/job-seeker/login"
                  className="text-sm font-semibold transition-colors"
                >
                  Back to Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeekerVerifyOtp;
