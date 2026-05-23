import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useAuthStore } from "../../../../store";

const FloatingInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  required = true,
  minLength,
  children,
  onFocus,
  onBlur,
}) => {
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder=" "
        minLength={minLength}
        required={required}
        className="peer w-full border-0 border-b border-slate-300 bg-transparent px-0 pb-3 pt-6 text-sm outline-none transition-all focus:border-orange-600"
      />

      <label className="pointer-events-none absolute left-0 top-5 text-sm text-slate-500 transition-all duration-200 peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-orange-600 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
        {label}
      </label>

      {children}
    </div>
  );
};

const JobSeekerSignUp = () => {
  const navigate = useNavigate();
  const { error, isLoading, registerSeeker, setAuth, clearError } =
    useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    phone_no: "",
    password: "",
    confirmPassword: "",
  });

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);

  const passwordRules = {
    minLength: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
  };

  const isPasswordValid = Object.values(passwordRules).every(Boolean);

  const handleChange = (e) => {
    clearError();

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "phone_no" ? value.replace(/\D/g, "").slice(0, 10) : value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!isPasswordValid) {
      alert("Password does not meet all requirements");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const payload = {
      email: formData.email,
      phone_no: formData.phone_no,
      password: formData.password,
    };

    try {
      await registerSeeker(payload);
      navigate("/seeker/verify-otp");
    } catch {
      // Store error is shown in the form.
    }
  };

  const handleGoogleSignup = () => {
    setAuth({
      role: "seeker",
      user: {
        name: "Google User",
        email: "seeker.google@example.com",
      },
    });

    navigate("/seeker/dashboard/profile");
  };

  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-slate-50">
      <div className="hidden lg:flex w-1/2 flex-col justify-center px-16 xl:px-24 relative">
        <div className="space-y-6">
          <h1 className="text-6xl xl:text-7xl font-extrabold tracking-tight">
            Welcome Seeker!
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

      <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end">
        <div className="w-full h-full lg:h-[95%] lg:rounded p-8 sm:p-12 xl:p-20 flex flex-col justify-center shadow-2xl relative">
          <div className="max-w-md mx-auto w-full">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold mb-3">Create Account</h2>
              <p className="text-sm">Join us and start your journey today.</p>
            </div>

            {error && (
              <div className="mb-5 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-5">
              <FloatingInput
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

              <FloatingInput
                label="Phone Number"
                type="tel"
                name="phone_no"
                value={formData.phone_no}
                onChange={handleChange}
                minLength="10"
              />

              <FloatingInput
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
              >
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-xl text-slate-500 transition hover:text-orange-600 cursor-pointer"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </FloatingInput>

              {isPasswordFocused && formData.password && (
                <div className="text-sm space-y-1 mt-2">
                  <PasswordRule valid={passwordRules.minLength}>
                    Minimum 8 characters
                  </PasswordRule>
                  <PasswordRule valid={passwordRules.uppercase}>
                    At least 1 uppercase letter
                  </PasswordRule>
                  <PasswordRule valid={passwordRules.lowercase}>
                    At least 1 lowercase letter
                  </PasswordRule>
                  <PasswordRule valid={passwordRules.number}>
                    At least 1 number
                  </PasswordRule>
                  <PasswordRule valid={passwordRules.specialChar}>
                    At least 1 special character
                  </PasswordRule>
                </div>
              )}

              <FloatingInput
                label="Retype Password"
                type={showRetypePassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onFocus={() => setIsConfirmPasswordFocused(true)}
                onBlur={() => setIsConfirmPasswordFocused(false)}
              >
                <button
                  type="button"
                  onClick={() => setShowRetypePassword(!showRetypePassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-xl text-slate-500 transition hover:text-orange-600 cursor-pointer"
                >
                  {showRetypePassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </FloatingInput>

              {isConfirmPasswordFocused && formData.confirmPassword && (
                <p
                  className={`text-sm mt-2 font-medium ${
                    formData.password === formData.confirmPassword
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {formData.password === formData.confirmPassword
                    ? "Passwords match"
                    : "X Passwords do not match"}
                </p>
              )}

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

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 font-bold bg-orange-600 hover:bg-orange-700 text-white shadow-md transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? "Sending OTP..." : "Sign Up"}
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
                  onClick={handleGoogleSignup}
                  className="flex items-center justify-center gap-2 border border-slate-300 py-3 px-4 text-sm font-semibold transition-all hover:bg-slate-50 cursor-pointer"
                >
                  <FcGoogle size={20} /> Continue with Google
                </button>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm">
                  Already have an account?{" "}
                  <Link
                    to="/seeker/login"
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

const PasswordRule = ({ valid, children }) => (
  <p className={valid ? "text-green-600" : "text-red-500"}>
    {valid ? "" : "X"} {children}
  </p>
);

export default JobSeekerSignUp;
