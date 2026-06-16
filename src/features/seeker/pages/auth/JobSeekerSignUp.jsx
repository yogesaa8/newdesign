import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, Eye, EyeOff, X } from "lucide-react";
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

const PasswordRule = ({ valid, children }) => (
  <p
    className={`flex items-center gap-2 text-sm ${
      valid ? "text-green-700" : "text-[#6F6F76]"
    }`}
  >
    {valid ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
    {children}
  </p>
);

const JobSeekerSignUp = () => {
  const navigate = useNavigate();
  const { error, isLoading, registerSeeker, continueWithGoogle, clearError } =
    useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    phone_no: "",
    password: "",
    confirmPassword: "",
  });

  const passwordRules = {
    minLength: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
  };
  const isPasswordValid = Object.values(passwordRules).every(Boolean);
  const passwordsMatch =
    formData.confirmPassword && formData.password === formData.confirmPassword;

  const handleChange = (event) => {
    clearError();
    setFormError("");
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "phone_no" ? value.replace(/\D/g, "").slice(0, 10) : value,
    }));
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    if (!isPasswordValid) {
      setFormError("Please complete the password requirements.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    try {
      await registerSeeker({
        email: formData.email,
        phone_no: formData.phone_no,
        password: formData.password,
      });
      navigate("/seeker/verify-otp");
    } catch {
      // Store error is shown in the form.
    }
  };

  const handleGoogleSignup = async (idToken) => {
    try {
      await continueWithGoogle({
        idToken,
        userType: "seeker",
      });
      navigate("/seeker/dashboard/profile");
    } catch {
      // Store error is shown in the form.
    }
  };

  return (
    <AuthShell audience="seeker" mode="signup">
      <AuthHeader
        eyebrow="Create seeker account"
        title="Start applying faster."
        description="Create your account, verify your email, and complete your fresher profile."
      />

      {(error || formError) && <AuthAlert>{error || formError}</AuthAlert>}

      <form onSubmit={handleSignup} className="mt-6 space-y-5">
        <AuthInput
          label="Email address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          required
        />

        <AuthInput
          label="Phone number"
          type="tel"
          name="phone_no"
          value={formData.phone_no}
          onChange={handleChange}
          minLength="10"
          autoComplete="tel"
          required
        />

        <AuthInput
          label="Password"
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="new-password"
          required
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

        {formData.password && (
          <div className="rounded-[8px] border border-[#EADFD9] bg-[#F7F5F2] p-4">
            <div className="space-y-2">
              <PasswordRule valid={passwordRules.minLength}>
                Minimum 8 characters
              </PasswordRule>
              <PasswordRule valid={passwordRules.uppercase}>
                One uppercase letter
              </PasswordRule>
              <PasswordRule valid={passwordRules.lowercase}>
                One lowercase letter
              </PasswordRule>
              <PasswordRule valid={passwordRules.number}>One number</PasswordRule>
              <PasswordRule valid={passwordRules.specialChar}>
                One special character
              </PasswordRule>
            </div>
          </div>
        )}

        <AuthInput
          label="Confirm password"
          type={showRetypePassword ? "text" : "password"}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          autoComplete="new-password"
          required
        >
          <button
            type="button"
            onClick={() => setShowRetypePassword((value) => !value)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6F6F76] transition hover:text-[#8500FA]"
            aria-label={showRetypePassword ? "Hide password" : "Show password"}
          >
            {showRetypePassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </AuthInput>

        {formData.confirmPassword && (
          <p
            className={`text-sm font-medium ${
              passwordsMatch ? "text-green-700" : "text-red-600"
            }`}
          >
            {passwordsMatch ? "Passwords match" : "Passwords do not match"}
          </p>
        )}

        <label className="flex items-start gap-3 text-sm leading-6 text-[#6F6F76]">
          <input
            type="checkbox"
            required
            className="mt-1 h-4 w-4 accent-[var(--auth-accent)]"
          />
          <span>
            I agree to the{" "}
            <Link to="/terms" className={authLinkClass}>
              Terms & Conditions
            </Link>
          </span>
        </label>

        <AuthButton type="submit" disabled={isLoading}>
          {isLoading ? "Sending OTP..." : "Create account"}
        </AuthButton>

        <AuthDivider />

        <GoogleOAuthButton
          disabled={isLoading}
          onCredential={handleGoogleSignup}
          text="signup_with"
        />

        <AuthFooterText>
          Already have an account?{" "}
          <Link to="/seeker/login" className={authLinkClass}>
            Sign in
          </Link>
        </AuthFooterText>
      </form>
    </AuthShell>
  );
};

export default JobSeekerSignUp;
