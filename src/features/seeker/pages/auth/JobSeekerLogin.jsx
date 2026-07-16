import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "../../../../store";
import { getRememberedLogin, saveRememberedLogin } from "../../../../lib/rememberedLogin";
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

const JobSeekerLogin = () => {
  const rememberedLogin = getRememberedLogin("seeker");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: rememberedLogin.email || "",
    password: "",
    remember: rememberedLogin.remember || false,
  });

  const navigate = useNavigate();
  const { error, isLoading, loginSeeker, continueWithGoogle, clearError } =
    useAuthStore();

  const handleChange = (event) => {
    clearError();
    const { name, value, checked, type } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await loginSeeker({
        email: formData.email.trim(),
        password: formData.password,
        remember: formData.remember,
      });
      saveRememberedLogin("seeker", formData.email.trim(), formData.remember);
      navigate("/jobs", { replace: true });
    } catch {
      // Store error is shown in the form.
    }
  };

  const handleGoogleLogin = async (idToken) => {
    try {
      await continueWithGoogle({
        idToken,
        userType: "seeker",
        remember: formData.remember,
      });
      saveRememberedLogin("seeker", formData.email.trim(), formData.remember);
      navigate("/jobs", { replace: true });
    } catch {
      // Store error is shown in the form.
    }
  };

  return (
    <AuthShell audience="seeker" mode="login">
      <AuthHeader
        eyebrow="Seeker sign in"
        title="Continue your job search."
        description="Access saved jobs, applications, documents, and profile updates."
      />

      {error && <AuthAlert>{error}</AuthAlert>}

      <form onSubmit={handleLogin} className="mt-6 space-y-5">
        <AuthInput
          label="Email address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          required
        />

        <div className="space-y-2">
          <AuthInput
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
          >
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-n-400 transition hover:text-[var(--auth-accent)]"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </AuthInput>

          <div className="text-right">
            <Link to="/seeker/reset-password" className={authLinkClass}>
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
          <Link to="/seeker/signup" className={authLinkClass}>
            Create seeker account
          </Link>
        </AuthFooterText>
      </form>
    </AuthShell>
  );
};

export default JobSeekerLogin;
