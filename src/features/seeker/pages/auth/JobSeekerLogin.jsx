import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiCheckCircle } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useAuthStore } from "../../../../store";

const FloatingInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  required = true,
  children,
  autoComplete,
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
        autoComplete={autoComplete}
        className="peer w-full border-0 border-b border-slate-300 bg-transparent px-0 pb-3 pt-6 text-sm outline-none transition-all focus:border-orange-600"
      />

      <label className="pointer-events-none absolute left-0 top-5 text-sm text-slate-500 transition-all duration-200 peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-orange-600 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
        {label}
      </label>

      {children}
    </div>
  );
};

const JobSeekerLogin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const navigate = useNavigate();
  const { error, isLoading, loginSeeker, setAuth, clearError } = useAuthStore();

  const handleChange = (e) => {
    clearError();

    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await loginSeeker(formData);
      navigate("/seeker/dashboard/profile");
    } catch {
      // Store error is shown in the form.
    }
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

    navigate("/seeker/dashboard/profile");
  };

  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-slate-50">
      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center px-16 xl:px-24 relative">
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

        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-0 w-64 h-64 rounded-full blur-3xl"></div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end">
        <div className="w-full h-full lg:h-[90%] p-8 sm:p-12 xl:p-20 flex flex-col justify-center shadow-2xl relative">
          <div className="max-w-md mx-auto w-full">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold mb-3">Welcome Seeker</h2>
              <p className="text-sm">
                Log in to continue your job search journey.
              </p>
            </div>

            {error && (
              <div className="mb-5 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <FloatingInput
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="off"
              />

              <div className="space-y-2">
                <FloatingInput
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                >
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-xl text-slate-500 transition hover:text-orange-600 cursor-pointer"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </FloatingInput>

                <div className="text-right">
                  <Link
                    to="/seeker/reset-password"
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

              <button
                type="submit"
                disabled={isLoading}
                className="w-full p-4 font-bold transition-all shadow-lg bg-orange-600 hover:bg-orange-700 text-white cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>

              <div className="relative flex items-center justify-center py-4">
                <div className="absolute inset-0 flex items-center gap-3">
                  <span className="border-t w-full"></span>
                  <span className="text-sm">OR</span>
                  <span className="border-t w-full"></span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="flex items-center justify-center gap-2 border border-slate-300 py-3 px-4 text-sm font-semibold transition-all hover:bg-slate-50 cursor-pointer"
                >
                  <FcGoogle size={20} /> Continue with Google
                </button>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm">
                  Don't have an account?{" "}
                  <Link
                    to="/seeker/signup"
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
