import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiBriefcase, FiCheckCircle } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useAuthStore } from "../../../../store";

const JobSeekerLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setAuth({
      role: "seeker",
      remember: formData.remember,
      user: {
        name: "Job Seeker",
        email: formData.email,
      },
    });

    navigate("/job-seeker/verify-otp");
  };

  const handleGoogleLogin = () => {
    setAuth({
      role: "seeker",
      remember: formData.remember,
      user: {
        name: "Google User",
        email: formData.email || "google.user@example.com",
      },
    });

    navigate("/job-seeker/dashboard");
  };

  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-slate-50">
      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center px-16 xl:px-24 relative">
        {/* Logo */}
        <div className="absolute top-12 left-16 flex items-center gap-2">
          <div className="p-2 rounded-xl">
            <FiBriefcase size={28} />
          </div>
          <span className="text-2xl font-bold tracking-tight">JobPortal</span>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <h1 className="text-6xl xl:text-7xl font-extrabold tracking-tight">
            Welcome Back!
          </h1>

          <h2 className="text-2xl font-semibold opacity-90">
            Continue your journey toward better opportunities.
          </h2>

          <p className="max-w-md text-lg opacity-70 leading-relaxed">
            Access your profile, manage applications, connect with recruiters,
            and explore jobs tailored to your skills.
          </p>

          {/* Feature Points */}
          <div className="space-y-4 pt-6">
            <div className="flex items-center gap-3">
              <FiCheckCircle className="text-green-600" size={20} />
              <span className="text-base">Track job applications easily</span>
            </div>

            <div className="flex items-center gap-3">
              <FiCheckCircle className="text-green-600" size={20} />
              <span className="text-base">Get matched with top recruiters</span>
            </div>

            <div className="flex items-center gap-3">
              <FiCheckCircle className="text-green-600" size={20} />
              <span className="text-base">
                Discover personalized job recommendations
              </span>
            </div>
          </div>
        </div>

        {/* Decorative blur circles */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-0 w-64 h-64 rounded-full blur-3xl"></div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end">
        <div className="w-full h-full lg:h-[90%] p-8 sm:p-12 xl:p-20 flex flex-col justify-center shadow-2xl relative">
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
              <h2 className="text-3xl font-extrabold mb-3">Welcome Back</h2>
              <p className="text-sm">
                Log in to continue your job search journey.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full border border-slate-300 py-4 px-8 outline-none focus:ring-1 transition-all"
                  required
                  autoComplete="off"
                />
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full border border-slate-300 py-4 px-8 outline-none focus:ring-1 transition-all"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-xl text-slate-500 transition hover:text-orange-600 cursor-pointer"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>

                <div className="text-right">
                  <Link
                    to="/job-seeker/reset-password"
                    className="text-xs font-semibold transition-colors hover:text-orange-600"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>

              <label className="flex w-fit items-center gap-2 text-sm text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="w-4 h-4 accent-orange-600 cursor-pointer"
                />
                Remember me
              </label>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full p-4 font-bold transition-all shadow-lg bg-orange-600 hover:bg-orange-700 text-white cursor-pointer"
              >
                Login
              </button>

              {/* Divider */}
              <div className="relative flex items-center justify-center py-4">
                <div className="absolute inset-0 flex items-center gap-3">
                  <span className="border-t w-full"></span>
                  <span className="text-sm">OR</span>
                  <span className="border-t w-full"></span>
                </div>
              </div>

              {/* Social */}
              <div className="grid grid-cols-1 gap-4">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="flex items-center justify-center gap-2 border border-slate-300 py-3 px-4 text-sm font-semibold transition-all hover:bg-slate-50 cursor-pointer"
                >
                  <FcGoogle size={20} /> Continue with Google
                </button>
              </div>

              {/* Signup */}
              <div className="mt-8 text-center">
                <p className="text-sm">
                  Don't have an account?{" "}
                  <Link
                    to="/job-seeker/signup"
                    className="font-bold transition-colors hover:text-orange-600"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerLogin;
