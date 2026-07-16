import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, GraduationCap } from "lucide-react";
import {
  AuthAlert,
  AuthButton,
  AuthHeader,
  AuthInput,
  AuthShell,
} from "../../auth/AuthUI";
import { useAuthStore } from "../../../store";
import { getRememberedLogin, saveRememberedLogin } from "../../../lib/rememberedLogin";

const InstituteLogin = () => {
  const navigate = useNavigate();
  const { clearError, error, isLoading, loginInstitute } = useAuthStore();
  const rememberedLogin = getRememberedLogin("institute");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: rememberedLogin.email || "",
    password: "",
    remember: rememberedLogin.remember || false,
  });

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    clearError();
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await loginInstitute({
        email: formData.email.trim(),
        password: formData.password,
        remember: formData.remember,
      });
      saveRememberedLogin("institute", formData.email.trim(), formData.remember);
      navigate("/institute/dashboard", { replace: true });
    } catch {
      // Store error is shown in the form.
    }
  };

  return (
    <AuthShell audience="institute" mode="login">
      <div className="mb-5 rounded-[8px] border border-violet-100 bg-violet-50 px-4 py-3 text-sm font-semibold text-violet-700">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-4 w-4" />
          Institute partner workspace
        </div>
      </div>

      <AuthHeader
        eyebrow="Institute sign in"
        title="Manage training programs."
        description="Open your institute workspace to review students, batches, courses, and incoming applications."
      />

      {error && <AuthAlert>{error}</AuthAlert>}

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <AuthInput
          label="Institute email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          placeholder="admin@institute.edu"
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
            placeholder="Enter password"
            required
          >
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6F6F76] transition hover:text-[#8500FA]"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </AuthInput>

        </div>

        <label className="flex w-fit items-center gap-2 text-sm text-[#6F6F76]">
          <input
            type="checkbox"
            name="remember"
            checked={formData.remember}
            onChange={handleChange}
            className="h-4 w-4 accent-[var(--auth-accent)]"
          />
          Remember this institute
        </label>

        <AuthButton type="submit" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in to dashboard"}
          {!isLoading && <ArrowRight className="h-4 w-4" />}
        </AuthButton>
      </form>
    </AuthShell>
  );
};

export default InstituteLogin;
