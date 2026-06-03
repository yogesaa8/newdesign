import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../../store";
import GoogleOAuthButton from "../../../../components/auth/GoogleOAuthButton";

const CompanyLogin = () => {
  const navigate = useNavigate();
  const { error, isLoading, loginCompany, continueWithGoogle, clearError } =
    useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    clearError();
    setFormErrors({});
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email address.";
    if (!formData.password) newErrors.password = "Password is required.";
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await loginCompany(formData);
      navigate("/company/profile");
    } catch {
      // error displayed from store
    }
  };

  const handleGoogleLogin = async (idToken) => {
    try {
      await continueWithGoogle({
        idToken,
        userType: "company",
        remember: formData.remember,
      });
      navigate("/company/profile");
    } catch {
      // error displayed from store
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="max-w-5xl w-full flex flex-col lg:flex-row items-center gap-16">
        <div className="w-full max-w-md rounded shadow-xl border border-slate-200 bg-white p-8">
          <form onSubmit={handleLogin} className="space-y-6" noValidate>
            <div>
              <h2 className="text-2xl font-semibold mb-1 text-slate-900">
                Welcome back
              </h2>
              <p className="text-sm text-slate-500">
                Enter your credentials to access your employer portal
              </p>
            </div>

            {(error || formErrors.api) && (
              <div className="p-3 rounded bg-red-50 border border-red-200 text-sm text-red-600">
                {error || formErrors.api}
              </div>
            )}

            <div>
              <FloatingInput
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="off"
              />
              {formErrors.email && (
                <p className="text-sm text-red-500 mt-1">{formErrors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <div>
                <FloatingInput
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="off"
                >
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-orange-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </FloatingInput>
                {formErrors.password && (
                  <p className="text-sm text-red-500 mt-1">{formErrors.password}</p>
                )}
              </div>

              <div className="text-right">
                <Link
                  to="/company/reset-password"
                  className="text-sm text-orange-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <label className="flex w-fit items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                className="w-4 h-4 accent-orange-600 cursor-pointer"
              />
              <span className="text-sm text-slate-600">Remember me</span>
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 font-medium flex items-center justify-center gap-2 transition bg-orange-600 hover:bg-orange-700 text-white shadow-md cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign In →"}
            </button>

            <div className="text-center text-xs text-slate-400">
              OR CONTINUE WITH
            </div>

            <GoogleOAuthButton
              disabled={isLoading}
              onCredential={handleGoogleLogin}
              text="continue_with"
            />

            <div className="text-center text-sm pt-4 text-slate-600">
              New to RecruitPro?{" "}
              <Link to="/company/signup" className="font-medium text-orange-600 hover:underline">
                Sign Up your company
              </Link>
            </div>
          </form>
        </div>

        <div className="hidden lg:block max-w-md space-y-8">
          <div>
            <h2 className="text-5xl font-extrabold leading-tight text-slate-900">
              Hire smarter with{" "}
              <span className="text-orange-600">RecruitPro.</span>
            </h2>

            <p className="mt-6 text-lg text-slate-600 leading-8">
              Access a modern hiring workspace built for enterprise recruiters.
              Manage candidates, automate workflows, and scale your hiring
              operations from one centralized platform.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="bg-white border border-slate-200 rounded p-5 shadow-sm">
              <h3 className="font-semibold text-slate-900">AI Candidate Matching</h3>
              <p className="text-sm mt-2 text-slate-600">
                Automatically shortlist top candidates faster.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded p-5 shadow-sm">
              <h3 className="font-semibold text-slate-900">Hiring Analytics</h3>
              <p className="text-sm mt-2 text-slate-600">
                Measure funnel performance and optimize recruitment.
              </p>
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-100 rounded p-5">
            <p className="text-sm text-slate-700">
              Trusted by{" "}
              <span className="font-bold text-emerald-600">2,500+</span>{" "}
              enterprise teams worldwide.
            </p>
          </div>
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
  children,
  autoComplete,
}) => (
  <div className="relative">
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder=" "
      autoComplete={autoComplete}
      className="peer w-full border-0 border-b border-slate-300 bg-transparent px-0 pb-3 pt-6 text-sm outline-none transition-all focus:border-orange-600"
    />
    <label className="pointer-events-none absolute left-0 top-5 text-sm text-slate-500 transition-all duration-200 peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-orange-600 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
      {label}
    </label>
    {children}
  </div>
);

export default CompanyLogin;
