import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, MailCheck } from "lucide-react";
import {
  AuthAlert,
  AuthButton,
  AuthFooterText,
  AuthHeader,
  AuthInput,
  AuthShell,
} from "../../../auth/AuthUI";
import { authLinkClass } from "../../../auth/authConstants";

const CompanyForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (event) => {
    setEmail(event.target.value);
    if (error) setError("");
  };

  const validateForm = () => {
    if (!email.trim()) {
      setError("Registered email address is required.");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setIsSuccess(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell audience="company" mode="login">
      <AuthHeader
        eyebrow="Employer recovery"
        title={isSuccess ? "Check your email." : "Recover your company account."}
        description={
          isSuccess
            ? "Use the reset link we sent to your registered employer email."
            : "Enter your registered work email and we will send reset instructions."
        }
      />

      {isSuccess ? (
        <div className="space-y-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-green-100 bg-green-50 text-green-700">
            <MailCheck className="h-8 w-8" />
          </div>
          <p className="text-sm leading-6 text-[#6F6F76]">
            We sent password reset instructions to{" "}
            <span className="font-semibold text-[#0A0A0A]">{email}</span>.
          </p>
          <button
            type="button"
            onClick={() => {
              setIsSuccess(false);
              setEmail("");
            }}
            className={authLinkClass}
          >
            Try another email
          </button>
          <Link
            to="/company/login"
            className="inline-flex w-full items-center justify-center gap-2 rounded-[8px] border border-[#EADFD9] bg-white px-4 py-3 text-sm font-semibold text-[#0A0A0A] transition hover:bg-[#F7F5F2]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to sign in
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {error && <AuthAlert>{error}</AuthAlert>}

          <AuthInput
            label="Registered work email"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            error={error}
            autoComplete="email"
          />

          <AuthButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send reset link"}
            {!isSubmitting && <ArrowRight className="h-4 w-4" />}
          </AuthButton>

          <AuthFooterText>
            Remember your password?{" "}
            <Link to="/company/login" className={authLinkClass}>
              Sign in
            </Link>
          </AuthFooterText>
        </form>
      )}
    </AuthShell>
  );
};

export default CompanyForgotPassword;
