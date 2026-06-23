import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, GraduationCap } from "lucide-react";
import {
  AuthButton,
  AuthFooterText,
  AuthHeader,
  AuthInput,
  AuthShell,
} from "../../auth/AuthUI";
import { authLinkClass } from "../../auth/authConstants";

const InstituteLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/institute/dashboard");
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

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <AuthInput
          label="Institute email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          placeholder="admin@institute.edu"
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

          <div className="text-right">
            <Link to="/institute/signup" className={authLinkClass}>
              Request institute access
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
          Remember this institute
        </label>

        <AuthButton type="submit">
          Sign in to dashboard
          <ArrowRight className="h-4 w-4" />
        </AuthButton>

        <AuthFooterText>
          New institute partner?{" "}
          <Link to="/institute/signup" className={authLinkClass}>
            Create institute account
          </Link>
        </AuthFooterText>
      </form>
    </AuthShell>
  );
};

export default InstituteLogin;
