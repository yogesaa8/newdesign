import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../../store";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      alert("Please fill all fields");
      return;
    }

    setAuth({
      role: "admin",
      user: {
        name: "Admin User",
        email: formData.email,
      },
    });
    navigate("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded border border-white/10 bg-white shadow-2xl lg:grid-cols-2">
          <div className="hidden bg-slate-900 p-12 lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded bg-orange-500/10 text-orange-400">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h1 className="mt-8 text-4xl font-extrabold leading-tight">
                Admin Control Center
              </h1>
              <p className="mt-5 max-w-md text-sm leading-6 text-slate-300">
                Review companies, monitor platform health, and manage core
                activity from a dedicated administrator workspace.
              </p>
            </div>

            <div className="grid gap-4">
              {["Role-based access", "Company approvals", "Platform reports"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-200"
                  >
                    {item}
                  </div>
                ),
              )}
            </div>
          </div>

          <div className="bg-white p-8 text-slate-900 sm:p-12">
            <div className="mx-auto max-w-md">
              <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">
                  Admin Login
                </p>
                <h2 className="mt-2 text-3xl font-extrabold">
                  Welcome back
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Sign in to continue to the admin dashboard.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-slate-700">
                    Email Address
                  </span>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="admin@jobportal.com"
                      className="w-full border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-slate-700">
                    Password
                  </span>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full border border-slate-300 py-3 pl-11 pr-12 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </label>

                <button
                  type="submit"
                  className="w-full bg-orange-600 py-3.5 font-semibold text-white shadow-md transition hover:bg-orange-700"
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
