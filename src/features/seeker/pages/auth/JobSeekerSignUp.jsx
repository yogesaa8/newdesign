import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiBriefcase } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useAuthStore } from "../../../../store";

const JobSeekerSignUp = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);

  const passwordRules = {
    minLength: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const isPasswordValid = Object.values(passwordRules).every(Boolean);

  const handleSignup = (e) => {
    e.preventDefault();

    if (!isPasswordValid) {
      alert("Password does not meet all requirements");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    navigate("/job-seeker/login");
  };

  const handleGoogleSignup = () => {
    setAuth({
      role: "seeker",
      user: {
        name: "Google User",
        email: "seeker.google@example.com",
      },
    });

    navigate("/job-seeker/dashboard");
  };

  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-slate-50">
      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center px-16 xl:px-24 relative">
        <div className="absolute top-12 left-16 flex items-center gap-2">
          <div className="p-2 rounded-xl">
            <FiBriefcase size={28} />
          </div>
          <span className="text-2xl font-bold tracking-tight">JobPortal</span>
        </div>

        <div className="space-y-6">
          <h1 className="text-6xl xl:text-7xl font-extrabold tracking-tight">
            Welcome Back!
          </h1>

          <h2 className="text-2xl font-semibold opacity-90">
            Start building your dream career today.
          </h2>

          <p className="max-w-md text-lg opacity-70 leading-relaxed">
            Create your profile, discover top opportunities, connect with
            recruiters, and take the next step toward your professional goals.
          </p>
        </div>

        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-0 w-64 h-64 rounded-full blur-3xl"></div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end">
        <div className="w-full h-full lg:h-[95%] lg:rounded p-8 sm:p-12 xl:p-20 flex flex-col justify-center shadow-2xl relative">
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

            {/* Form Heading */}
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold mb-3">Create Account</h2>
              <p className="text-sm">Join us and start your journey today.</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-5">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full border border-slate-300 py-4 px-8 outline-none focus:ring-1 transition-all "
                  required
                />

                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full border border-slate-300 py-4 px-8 outline-none focus:ring-1 transition-all"
                  required
                />
              </div>

              {/* Email */}
              <input
                type="email"
                placeholder="Email Address"
                className="w-full border border-slate-300 py-4 px-8 outline-none focus:ring-1 transition-all"
                required
              />

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
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

              {/* Password Validation */}
              {isPasswordFocused && password && (
                <div className="text-sm space-y-1 mt-2">
                  <p
                    className={
                      passwordRules.minLength
                        ? "text-green-600"
                        : "text-red-500"
                    }
                  >
                    {passwordRules.minLength ? "✓" : "✗"} Minimum 8 characters
                  </p>
                  <p
                    className={
                      passwordRules.uppercase
                        ? "text-green-600"
                        : "text-red-500"
                    }
                  >
                    {passwordRules.uppercase ? "✓" : "✗"} At least 1 uppercase
                    letter
                  </p>
                  <p
                    className={
                      passwordRules.lowercase
                        ? "text-green-600"
                        : "text-red-500"
                    }
                  >
                    {passwordRules.lowercase ? "✓" : "✗"} At least 1 lowercase
                    letter
                  </p>
                  <p
                    className={
                      passwordRules.number ? "text-green-600" : "text-red-500"
                    }
                  >
                    {passwordRules.number ? "✓" : "✗"} At least 1 number
                  </p>
                  <p
                    className={
                      passwordRules.specialChar
                        ? "text-green-600"
                        : "text-red-500"
                    }
                  >
                    {passwordRules.specialChar ? "✓" : "✗"} At least 1 special
                    character
                  </p>
                </div>
              )}

              {/* Confirm Password */}
              <div className="relative">
                <input
                  type={showRetypePassword ? "text" : "password"}
                  placeholder="Retype Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => setIsConfirmPasswordFocused(true)}
                  onBlur={() => setIsConfirmPasswordFocused(false)}
                  className="w-full border border-slate-300 py-4 px-8 outline-none focus:ring-1 transition-all"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowRetypePassword(!showRetypePassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-xl text-slate-500 transition hover:text-orange-600 cursor-pointer"
                >
                  {showRetypePassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              {/* Password Match */}
              {isConfirmPasswordFocused && confirmPassword && (
                <p
                  className={`text-sm mt-2 font-medium ${
                    password === confirmPassword
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {password === confirmPassword
                    ? "✓ Passwords match"
                    : "✗ Passwords do not match"}
                </p>
              )}

              {/* Terms */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  className="w-4 h-4 accent-orange-600 cursor-pointer"
                />
                <p className="text-sm">
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="font-medium underline text-orange-600 transition hover:text-orange-700"
                  >
                    Terms & Conditions
                  </Link>
                </p>
              </label>

              {/* Button */}
              <button
                type="submit"
                className="w-full py-4 font-bold bg-orange-600 hover:bg-orange-700 text-white shadow-md transition-all cursor-pointer"
              >
                Sign Up
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
                  onClick={handleGoogleSignup}
                  className="flex items-center justify-center gap-2 border border-slate-300 py-3 px-4 text-sm font-semibold transition-all hover:bg-slate-50 cursor-pointer"
                >
                  <FcGoogle size={20} /> Continue with Google
                </button>
              </div>

              {/* Login */}
              <div className="mt-8 text-center">
                <p className="text-sm">
                  Already have an account?{" "}
                  <Link
                    to="/job-seeker/login"
                    className="font-bold transition-colors hover:text-orange-600"
                  >
                    Login
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

export default JobSeekerSignUp;
