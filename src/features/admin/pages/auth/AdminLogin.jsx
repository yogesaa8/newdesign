import React, { useState } from "react";
import toast from "@/lib/toast";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
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
      toast.error("Please fill all fields.");
      return;
    }

    setAuth({
      role: "admin",
      user: {
        name: "Admin User",
        email: formData.email,
      },
      remember: true,
    });

    navigate("/admin/dashboard", { replace: true });
    toast.success("Signed in successfully.");
  };

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded border border-white/10 bg-white shadow-2xl lg:grid-cols-2">
          <div className="hidden bg-slate-900 p-12 lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded bg-indigo-500/10 text-indigo-400">
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
              {[
                "Role-based access",
                "Company approvals",
                "Platform reports",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 text-slate-900 sm:p-12">
            <div className="mx-auto max-w-md">
              <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                  Admin Login
                </p>

                <h2 className="mt-2 text-3xl font-extrabold">Welcome back</h2>

                <p className="mt-2 text-sm text-slate-500">
                  Sign in to continue to the admin dashboard.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <FloatingInput
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />

                <FloatingInput
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                >
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-indigo-600 cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </FloatingInput>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 py-3.5 font-semibold text-white shadow-md transition hover:bg-indigo-700 cursor-pointer"
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

const FloatingInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  required = true,
  children,
}) => {
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        required={required}
        className="peer w-full border-0 border-b border-slate-300 bg-transparent px-0 pb-3 pt-6 text-sm outline-none transition-all focus:border-indigo-600"
      />

      <label className="pointer-events-none absolute left-0 top-5 text-sm text-slate-500 transition-all duration-200 peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-indigo-600 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
        {label}
      </label>

      {children}
    </div>
  );
};

export default AdminLogin;
