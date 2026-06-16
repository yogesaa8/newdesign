import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../../store";
import GoogleOAuthButton from "../../../../components/auth/GoogleOAuthButton";
import {
  AuthAlert,
  AuthButton,
  AuthDivider,
  AuthFooterText,
  AuthHeader,
  AuthInput,
  AuthShell,
} from "../../../auth/AuthUI";
import { authLinkClass } from "../../../auth/authConstants";

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

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    clearError();
    setFormErrors({});
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!formData.email.trim()) nextErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!formData.password) nextErrors.password = "Password is required.";
    setFormErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    try {
      await loginCompany(formData);
      navigate("/company/profile");
    } catch {
      // Store error is shown in the form.
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
      // Store error is shown in the form.
    }
  };

  return (
    <AuthShell audience="company" mode="login">
      <AuthHeader
        eyebrow="Employer sign in"
        title="Open your hiring workspace."
        description="Review applicants, manage company details, and continue fresher hiring."
      />

      {error && <AuthAlert>{error}</AuthAlert>}

      <form onSubmit={handleLogin} className="mt-6 space-y-5" noValidate>
        <AuthInput
          label="Work email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={formErrors.email}
          autoComplete="email"
        />

        <div className="space-y-2">
          <AuthInput
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={formErrors.password}
            autoComplete="current-password"
          >
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6F6F76] transition hover:text-[#8500FA]"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </AuthInput>

          <div className="text-right">
            <Link to="/company/reset-password" className={authLinkClass}>
              Forgot password?
            </Link>
          </div>
        </div>

        <label className="flex w-fit items-center gap-2 text-sm text-[#6F6F76]">
          <input
            type="checkbox"
            name="remember"
            checked={formData.remember}
            onChange={handleChange}
            className="h-4 w-4 accent-[var(--auth-accent)]"
          />
          Remember me
        </label>

        <AuthButton type="submit" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </AuthButton>

        <AuthDivider />

        <GoogleOAuthButton
          disabled={isLoading}
          onCredential={handleGoogleLogin}
          text="continue_with"
        />

        <AuthFooterText>
          New to FirstJobIndia?{" "}
          <Link to="/company/signup" className={authLinkClass}>
            Create company account
          </Link>
        </AuthFooterText>
      </form>
    </AuthShell>
  );
};

export default CompanyLogin;
