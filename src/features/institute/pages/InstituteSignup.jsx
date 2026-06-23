import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Building2, CheckCircle2 } from "lucide-react";
import {
  AuthButton,
  AuthFooterText,
  AuthHeader,
  AuthInput,
  AuthSelect,
  AuthShell,
} from "../../auth/AuthUI";
import { authLinkClass } from "../../auth/authConstants";
import { useAuthStore } from "../../../store";

const InstituteSignup = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [formData, setFormData] = useState({
    instituteName: "",
    instituteType: "",
    contactName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
    updates: true,
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
    setAuth({
      role: "institute",
      user: {
        name: formData.instituteName || "Institute Partner",
        email: formData.email,
        instituteName: formData.instituteName,
      },
      accessToken: "institute-local-session",
      remember: true,
    });
    navigate("/institute/dashboard", { replace: true });
  };

  return (
    <AuthShell audience="institute" mode="signup">
      <div className="mb-5 rounded-[8px] border border-violet-100 bg-violet-50 px-4 py-3 text-sm font-semibold text-violet-700">
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4" />
          Drone training institute network
        </div>
      </div>

      <AuthHeader
        eyebrow="Create institute account"
        title="Set up your partner workspace."
        description="Add basic institute details for a mock onboarding flow. No backend connection is used on this screen."
      />

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <AuthInput
          label="Institute name"
          name="instituteName"
          type="text"
          value={formData.instituteName}
          onChange={handleChange}
          placeholder="Arcanum Academic Partner Institute"
        />

        <AuthSelect
          label="Institute type"
          name="instituteType"
          value={formData.instituteType}
          onChange={handleChange}
        >
          <option value="">Select type</option>
          <option value="college">College</option>
          <option value="university">University</option>
          <option value="training-center">Training center</option>
          <option value="skill-partner">Skill development partner</option>
        </AuthSelect>

        <div className="grid gap-4 sm:grid-cols-2">
          <AuthInput
            label="Contact person"
            name="contactName"
            type="text"
            value={formData.contactName}
            onChange={handleChange}
            placeholder="Program coordinator"
          />
          <AuthInput
            label="City"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleChange}
            placeholder="Gurugram"
          />
        </div>

        <AuthInput
          label="Institute email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          placeholder="admin@institute.edu"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <AuthInput
            label="Phone number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            autoComplete="tel"
            placeholder="+91 98765 43210"
          />
          <AuthInput
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            placeholder="Create password"
          />
        </div>

        <label className="flex items-start gap-3 rounded-[8px] border border-[#EADFD9] bg-[#F7F5F2] p-3 text-sm leading-6 text-[#6F6F76]">
          <input
            type="checkbox"
            name="updates"
            checked={formData.updates}
            onChange={handleChange}
            className="mt-1 h-4 w-4 accent-[var(--auth-accent)]"
          />
          <span>
            Share program updates, batch performance summaries, and training
            coordination notes with this institute account.
          </span>
        </label>

        <AuthButton type="submit">
          Create mock workspace
          <ArrowRight className="h-4 w-4" />
        </AuthButton>

        <div className="rounded-[8px] border border-green-100 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Static preview only. Submitting opens the mock dashboard.
          </div>
        </div>

        <AuthFooterText>
          Already registered?{" "}
          <Link to="/institute/login" className={authLinkClass}>
            Sign in
          </Link>
        </AuthFooterText>
      </form>
    </AuthShell>
  );
};

export default InstituteSignup;
