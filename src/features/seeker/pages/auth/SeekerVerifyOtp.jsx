import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiBriefcase, FiCheckCircle, FiShield } from "react-icons/fi";
import { useAuthStore } from "../../../../store";

const OTP_LENGTH = 6;

const SeekerVerifyOtp = () => {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [resendMessage, setResendMessage] = useState("");

  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const navigate = useNavigate();

  const {
    error,
    isLoading,
    pendingVerification,
    resendSeekerOtp,
    verifySeekerOtp,
    clearError,
  } = useAuthStore();

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);

    setOtp(newOtp);
    clearError();
    setResendMessage("");

    if (value && index < OTP_LENGTH - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    const otpValue = otp.join("");

    if (otpValue.length !== OTP_LENGTH) {
      alert(`Please enter a ${OTP_LENGTH}-digit code.`);
      return;
    }

    try {
      await verifySeekerOtp(otpValue);
      navigate("/seeker/dashboard");
    } catch {
      // Store error is shown in the form.
    }
  };

  const handleResendOtp = async () => {
    try {
      await resendSeekerOtp();
      setResendMessage("OTP sent again to your email.");
    } catch {
      setResendMessage("");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-56px)] w-full overflow-hidden bg-slate-50">
      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center px-16 xl:px-24 relative">
        {/* Logo */}
        {/* <div className="absolute top-12 left-16 flex items-center gap-2">
          <div className="p-2 rounded-xl">
            <FiBriefcase size={28} />
          </div>
          <span className="text-2xl font-bold tracking-tight">JobPortal</span>
        </div> */}

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
            {/* <div className="lg:hidden flex justify-center mb-8">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl shadow-lg">
                  <FiBriefcase size={24} />
                </div>
                <span className="text-2xl font-bold tracking-tight">
                  JobPortal
                </span>
              </div>
            </div> */}

            {/* Heading */}
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold mb-3">Verify OTP</h2>
              <p className="text-sm px-4 text-slate-500">
                Enter the {OTP_LENGTH}-digit code sent to{" "}
                {pendingVerification?.user?.email || "your email"}.
              </p>
            </div>

            {error && (
              <div className="mb-5 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {resendMessage && (
              <div className="mb-5 border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {resendMessage}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleVerify}>
              <div className="mb-10 flex justify-center gap-2 sm:gap-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    value={digit}
                    ref={inputRefs[index]}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="h-12 w-12 border-0 border-b-2 border-slate-300 bg-transparent text-center text-xl font-bold outline-none transition-all focus:border-orange-600 sm:h-16 sm:w-16 sm:text-2xl"
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full p-4 font-bold transition-all shadow-lg bg-orange-600 hover:bg-orange-700 text-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? "Verifying..." : "Verify Code"}
              </button>

              <div className="mt-8 text-center">
                <p className="text-sm">
                  Didn't receive code?{" "}
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={isLoading}
                    className="font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    Resend Code
                  </button>
                </p>
              </div>

              <div className="mt-6 text-center">
                <Link
                  to="/seeker/login"
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
