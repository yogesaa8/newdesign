import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { BsGoogle } from "react-icons/bs";
import { useAuthStore } from "../../../../store";

const CompanyLogin = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const loginCompany = (email, remember) => {
    setAuth({
      role: "company",
      remember,
      user: {
        name: "RecruitPro Company",
        email,
      },
    });
    navigate("/company/dashboard");
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      alert("Please fill all fields");
      return;
    }

    loginCompany(formData.email, formData.remember);
  };

  const handleGoogleLogin = () => {
    loginCompany(formData.email || "company.google@example.com", formData.remember);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="max-w-5xl w-full flex flex-col lg:flex-row items-center gap-16">
        <div className="w-full max-w-md rounded shadow-xl border border-slate-200 bg-white p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center">
              <span className="text-3xl">RP</span>
            </div>

            <h1 className="text-3xl font-bold mt-4 text-slate-900">
              RecruitPro
            </h1>
            <p className="text-sm text-slate-500">Enterprise Hub Login</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-1 text-slate-900">
                Welcome back
              </h2>
              <p className="text-sm text-slate-500">
                Enter your credentials to access your employer portal
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  autoComplete="off"
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium text-slate-700">
                  Password
                </label>
                <Link
                  to="/company/reset-password"
                  className="text-sm text-orange-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  autoComplete="off"
                  className="w-full pl-11 pr-11 py-3 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-4 top-3.5 text-slate-400 transition hover:text-orange-600 cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
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
              className="w-full py-3.5 font-medium flex items-center justify-center gap-2 transition bg-orange-600 hover:bg-orange-700 text-white shadow-md cursor-pointer"
            >
              Sign In -&gt;
            </button>

            <div className="text-center text-xs text-slate-400">
              OR CONTINUE WITH
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex w-full items-center justify-center gap-2 border border-slate-300 py-3 rounded hover:bg-slate-50 transition cursor-pointer"
            >
              <BsGoogle className="h-5 w-5" />
              Continue with Google
            </button>

            <div className="text-center text-sm pt-4 text-slate-600">
              New to RecruitPro?{" "}
              <Link
                to="/company/signup"
                className="font-medium text-orange-600 hover:underline"
              >
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
              <h3 className="font-semibold text-slate-900">
                AI Candidate Matching
              </h3>
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

export default CompanyLogin;
