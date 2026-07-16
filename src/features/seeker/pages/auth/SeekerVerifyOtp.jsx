import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AuthAlert,
  AuthButton,
  AuthHeader,
  AuthShell,
} from "../../../auth/AuthUI";
import { authLinkClass } from "../../../auth/authConstants";
import { useAuthStore } from "../../../../store";

const OTP_LENGTH = 6;

const SeekerVerifyOtp = () => {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [resendMessage, setResendMessage] = useState("");
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const {
    error,
    isLoading,
    pendingVerification,
    resendSeekerOtp,
    verifySeekerOtp,
    clearError,
  } = useAuthStore();

  const handleChange = (event, index) => {
    const value = event.target.value;
    if (!/^\d*$/.test(value)) return;

    const nextOtp = [...otp];
    nextOtp[index] = value.substring(value.length - 1);
    setOtp(nextOtp);
    clearError();
    setResendMessage("");

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (event) => {
    event.preventDefault();
    const otpValue = otp.join("");

    if (otpValue.length !== OTP_LENGTH) {
      setResendMessage("");
      return;
    }

    try {
      await verifySeekerOtp(otpValue);
      navigate("/seeker/dashboard", { replace: true });
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
    <AuthShell audience="seeker" mode="signup">
      <AuthHeader
        eyebrow="Email verification"
        title="Enter your OTP."
        description={`We sent a ${OTP_LENGTH}-digit code to ${
          pendingVerification?.user?.email || "your email"
        }.`}
      />

      <div className="space-y-5">
        {error && <AuthAlert>{error}</AuthAlert>}
        {resendMessage && <AuthAlert type="success">{resendMessage}</AuthAlert>}

        <form onSubmit={handleVerify} className="space-y-6">
          <div className="flex justify-center gap-2 sm:gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                ref={(element) => {
                  inputRefs.current[index] = element;
                }}
                onChange={(event) => handleChange(event, index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                className={`h-12 w-11 rounded-lg border text-center text-xl font-bold outline-none transition sm:h-14 sm:w-12
                  focus:border-[var(--auth-accent)] focus:ring-2 focus:ring-[var(--auth-ring)]
                  ${error
                    ? "border-error bg-error-bg text-error"
                    : digit
                    ? "border-[var(--auth-accent)] bg-sk-surface text-[var(--auth-accent)]"
                    : "border-n-200 bg-white text-n-900"
                  }`}
              />
            ))}
          </div>

          <AuthButton
            type="submit"
            disabled={isLoading || otp.join("").length !== OTP_LENGTH}
          >
            {isLoading ? "Verifying..." : "Verify code"}
          </AuthButton>
        </form>

        <p className="text-center text-sm text-n-500">
          Did not receive it?{" "}
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={isLoading}
            className={authLinkClass}
          >
            Resend code
          </button>
        </p>

        <p className="text-center">
          <Link to="/seeker/login" className={authLinkClass}>
            Back to sign in
          </Link>
        </p>
      </div>
    </AuthShell>
  );
};

export default SeekerVerifyOtp;
