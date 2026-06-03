import React, { useState } from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CompanyForgotPassword = () => {
  // States for form handling
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle input change & clear errors
  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  // Form Validation
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

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulating API Call to send reset link
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Password reset link sent to: ", email);
      setIsSuccess(true);
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side */}
        <div className="hidden lg:block space-y-8">
          <div>
            <div className="flex items-center gap-2 font-bold mb-4">
              <span className="px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-600 font-medium">
                RecruitPro
              </span>
            </div>

            <h1 className="text-5xl font-extrabold tracking-tight leading-tight text-slate-900">
              Regain access with{" "}
              <span className="text-orange-600">Secure Recovery.</span>
            </h1>

            <p className="text-xl mt-6 max-w-md text-slate-600">
              We prioritize your security. A single-click verification link will
              be sent to your registered employer dashboard email to safely
              reset your credentials.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 rounded shadow-sm bg-white border border-slate-200">
              <span className="text-4xl mb-3 text-orange-600 block">🔐</span>
              <h3 className="font-bold text-lg text-slate-900">
                End-to-End Encrypted
              </h3>
              <p className="text-sm mt-2 text-slate-600">
                Reset links are cryptographically secured and expire in 15
                minutes.
              </p>
            </div>

            <div className="p-6 rounded shadow-sm bg-white border border-slate-200">
              <span className="text-4xl mb-3 text-orange-600 block">⚡</span>
              <h3 className="font-bold text-lg text-slate-900">
                Instant Recovery
              </h3>
              <p className="text-sm mt-2 text-slate-600">
                No waiting on support tickets. Get back into your hiring hub
                instantly.
              </p>
            </div>
          </div>

          <div className="p-6 rounded shadow-sm bg-white border border-slate-200 flex gap-4">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAl3l-J04KKwSMMx5_NlvS1c1qk1srNaMcYp1vlA78ZqQjbTAbcm8CQ1URaj9MWurif9i219-VHeYlJHZIbr7zrYLDHhm5s0oL8Jp1s4go2zpa_ReWg10oQOLueKNIcXFfciYhxj3ZVSgc8tE5dIGM4JA690YtIX64anMZdn5nzEN0cG199pLfD0IIXAON-yMK28pdeMDFqvkSJX5mm3XqEUHqj8TDR2dEOjVVjlDo-Tyj0D-wvl3sakZM49mMyd9Vky1PX2IsL7f8A"
              alt="Sarah Chen"
              className="w-12 h-12 rounded-full object-cover"
            />

            <div>
              <p className="text-sm italic text-slate-600">
                "Accidentally locked myself out before a major interview push.
                The recovery link saved me in seconds. Absolute lifesaver."
              </p>

              <p className="text-xs font-bold mt-3 text-slate-900">
                — Sarah Chen, Head of Talent at NexaFlow
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="rounded shadow-xl p-10 bg-white border border-slate-200">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-slate-900">
              Forgot Password?
            </h2>

            <p className="mt-2 inline-block px-3 py-1 rounded-full text-sm bg-orange-50 text-orange-600 font-medium">
              Employer Account Recovery
            </p>
          </div>

          {/* Success State UI */}
          {isSuccess ? (
            <div className="text-center space-y-6 py-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                <RiLockPasswordLine className="text-3xl text-emerald-600" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Check Your Email
                </h3>

                <p className="text-sm text-slate-600 mt-2">
                  We’ve sent a password reset link to:
                  <br />
                  <span className="font-bold text-slate-900">{email}</span>
                </p>
              </div>

              <p className="text-xs text-slate-500">
                Didn’t receive the email? Check your spam folder or{" "}
                <button
                  onClick={() => {
                    setIsSuccess(false);
                    setEmail("");
                  }}
                  className="text-orange-600 font-bold hover:underline"
                >
                  try again
                </button>
                .
              </p>

              <Link
                to="/company/login"
                className="mt-4 w-full py-4 font-bold flex items-center justify-center gap-2 transition-all border-2 border-slate-200 hover:border-slate-300 text-slate-700 shadow-sm"
              >
                <IoMdArrowRoundBack size={18} />
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <p className="text-sm text-slate-600">
                Enter the email address associated with your employer account,
                and we’ll send you a link to reset your password.
              </p>

              <FloatingInput
                label="Registered Email"
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                error={error}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 font-bold flex items-center justify-center gap-2 transition-all bg-orange-600 hover:bg-orange-700 text-white shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>

                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending Link...
                  </>
                ) : (
                  <>
                    Send Reset Link
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              <p className="text-center text-sm text-slate-600">
                Remembered your password?{" "}
                <Link
                  to="/company/login"
                  className="font-bold text-orange-600 hover:text-orange-700"
                >
                  Log in to your hub
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const FloatingInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  error,
}) => {
  return (
    <div>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder=" "
          className={`peer w-full border-0 border-b bg-transparent px-0 pb-3 pt-6 text-sm outline-none transition-all ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-slate-300 focus:border-orange-600"
          }`}
        />

        <label
          className={`pointer-events-none absolute left-0 top-5 text-sm transition-all duration-200 peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs ${
            error
              ? "text-red-500 peer-focus:text-red-500"
              : "text-slate-500 peer-focus:text-orange-600"
          }`}
        >
          {label}
        </label>
      </div>

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default CompanyForgotPassword;
