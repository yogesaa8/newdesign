import { Link, useNavigate } from "react-router-dom";
import {
  AuthButton,
  AuthFooterText,
  AuthHeader,
  AuthInput,
  AuthShell,
} from "../../../auth/AuthUI";
import { authLinkClass } from "../../../auth/authConstants";

const JobSeekerResetPassword = () => {
  const navigate = useNavigate();

  const handleReset = (event) => {
    event.preventDefault();
    navigate("/seeker/verify-otp");
  };

  return (
    <AuthShell audience="seeker" mode="login">
      <AuthHeader
        eyebrow="Password reset"
        title="Recover your seeker account."
        description="Enter your registered email. We will send an OTP so you can continue securely."
      />

      <form onSubmit={handleReset} className="space-y-5">
        <AuthInput
          label="Email address"
          type="email"
          name="email"
          autoComplete="email"
          required
        />

        <AuthButton type="submit">Send OTP</AuthButton>

        <AuthFooterText>
          Remember your password?{" "}
          <Link to="/seeker/login" className={authLinkClass}>
            Sign in
          </Link>
        </AuthFooterText>
      </form>
    </AuthShell>
  );
};

export default JobSeekerResetPassword;
