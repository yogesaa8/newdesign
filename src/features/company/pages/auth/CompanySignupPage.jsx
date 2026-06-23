import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useAuthStore } from "../../../../store";
import GoogleOAuthButton from "../../../../components/auth/GoogleOAuthButton";
import {
  AuthAlert,
  AuthButton,
  AuthDivider,
  AuthFooterText,
  AuthHeader,
  AuthInput,
  AuthSelect,
  AuthShell,
} from "../../../auth/AuthUI";
import { authLinkClass } from "../../../auth/authConstants";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  "https://nodebackend-smx3.onrender.com/api/v1"
).replace(/\/$/, "");

const CompanySignupPage = () => {
  const navigate = useNavigate();
  const {
    isLoading,
    error: storeError,
    clearError,
    continueWithGoogle,
    registerCompany,
    verifyCompanyOtp,
    resendCompanyOtp,
    completeCompanyProfile,
  } = useAuthStore();

  const [step, setStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone_no: "",
    password: "",
    otp: "",
    company_name: "",
    industry: "",
    company_size: "",
    gstin: "",
    website: "",
    location_id: "",
    location_name: "",
    contact_person: "",
    contact_designation: "",
    agreeTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const [locationResults, setLocationResults] = useState([]);
  const [isSearchingLocations, setIsSearchingLocations] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const locationRef = useRef(null);

  useEffect(() => {
    if (locationSearch.length < 2) {
      return undefined;
    }

    const timer = setTimeout(async () => {
      setIsSearchingLocations(true);
      try {
        const res = await fetch(
          `${API_BASE_URL}/locations?search=${encodeURIComponent(locationSearch)}`,
        );
        const data = await res.json();
        const list =
          data?.data ?? data?.locations ?? (Array.isArray(data) ? data : []);
        setLocationResults(list);
      } catch {
        setLocationResults([]);
      } finally {
        setIsSearchingLocations(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [locationSearch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setShowLocationDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const passwordStrength = (() => {
    const password = formData.password;
    if (!password) return { level: 0, text: "", className: "bg-[#EADFD9]" };
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    if (strength <= 1) return { level: 25, text: "Weak", className: "bg-red-500" };
    if (strength === 2) return { level: 50, text: "Fair", className: "bg-yellow-500" };
    if (strength === 3) return { level: 75, text: "Good", className: "bg-[#8500FA]" };
    return { level: 100, text: "Strong", className: "bg-green-600" };
  })();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    clearError();
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "phone_no"
          ? value.replace(/\D/g, "").slice(0, 10)
          : name === "otp"
            ? value.replace(/\D/g, "").slice(0, 6)
            : type === "checkbox"
              ? checked
              : value,
    }));

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (errors.api) setErrors((prev) => ({ ...prev, api: "" }));
  };

  const handleLocationSelect = (loc) => {
    const displayName =
      [loc.city, loc.state].filter(Boolean).join(", ") || loc.name || loc.id;
    setFormData((prev) => ({
      ...prev,
      location_id: loc.id,
      location_name: displayName,
    }));
    setLocationSearch(displayName);
    setShowLocationDropdown(false);
    if (errors.location_id) setErrors((prev) => ({ ...prev, location_id: "" }));
  };

  const handleLocationSearchChange = (event) => {
    const value = event.target.value;
    setLocationSearch(value);
    setShowLocationDropdown(true);
    if (value.length < 2) {
      setLocationResults([]);
      setShowLocationDropdown(false);
    }
    if (!value) {
      setFormData((prev) => ({ ...prev, location_id: "", location_name: "" }));
    }
  };

  const validateRegisterFields = () => {
    const nextErrors = {};
    if (!formData.email.trim()) nextErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!formData.phone_no.trim()) nextErrors.phone_no = "Phone number is required.";
    else if (formData.phone_no.length !== 10) {
      nextErrors.phone_no = "Phone number must be 10 digits.";
    }
    if (!formData.password) nextErrors.password = "Password is required.";
    else if (formData.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }
    if (!formData.agreeTerms) {
      nextErrors.agreeTerms = "You must agree to the terms to continue.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateOtp = () => {
    const nextErrors = {};
    if (!formData.otp.trim()) nextErrors.otp = "OTP is required.";
    else if (formData.otp.length !== 6) nextErrors.otp = "OTP must be 6 digits.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateCompanyDetails = () => {
    const nextErrors = {};
    if (!formData.company_name.trim()) nextErrors.company_name = "Company name is required.";
    if (!formData.industry.trim()) nextErrors.industry = "Industry is required.";
    if (!formData.company_size.trim()) nextErrors.company_size = "Company size is required.";
    if (!formData.location_id) nextErrors.location_id = "Location is required.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSendOtp = async () => {
    if (!validateRegisterFields()) return;
    setIsSendingOtp(true);
    try {
      if (otpSent) {
        await resendCompanyOtp();
      } else {
        await registerCompany({
          email: formData.email,
          phone_no: formData.phone_no,
          password: formData.password,
        });
      }
      setOtpSent(true);
    } catch (err) {
      setErrors({ api: err?.message || "Unable to send OTP. Please try again." });
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async (event) => {
    event.preventDefault();
    if (!otpSent) {
      setErrors({ otp: "Please send OTP first." });
      return;
    }
    if (!validateOtp()) return;
    setIsVerifyingOtp(true);
    try {
      await verifyCompanyOtp(formData.otp);
      setStep(2);
      setErrors({});
    } catch (err) {
      setErrors({ api: err?.message || "Invalid OTP. Please try again." });
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleSubmitCompanyDetails = async (event) => {
    event.preventDefault();
    if (!validateCompanyDetails()) return;
    setIsSubmittingProfile(true);
    try {
      const payload = {
        company_name: formData.company_name,
        industry: formData.industry,
        company_size: formData.company_size,
        location_id: formData.location_id,
      };
      if (formData.gstin.trim()) payload.gstin = formData.gstin.trim();
      if (formData.website.trim()) payload.website = formData.website.trim();
      if (formData.contact_person.trim()) payload.contact_person = formData.contact_person.trim();
      if (formData.contact_designation.trim()) {
        payload.contact_designation = formData.contact_designation.trim();
      }

      await completeCompanyProfile(payload);
      setStep(3);
    } catch (err) {
      setErrors({ api: err?.message || "Something went wrong. Please try again." });
    } finally {
      setIsSubmittingProfile(false);
    }
  };

  const handleGoogleSignup = async (idToken) => {
    try {
      await continueWithGoogle({
        idToken,
        userType: "company",
      });
      navigate("/company/profile", { replace: true });
    } catch (err) {
      setErrors({ api: err?.message || "Unable to continue with Google." });
    }
  };

  const apiError = errors.api || storeError;

  return (
    <AuthShell audience="company" mode="signup">
      {step < 3 && (
        <AuthHeader
          eyebrow="Create employer account"
          title={step === 1 ? "Verify your work email." : "Add company details."}
          description={
            step === 1
              ? "Create a secure employer login before adding your hiring profile."
              : "Accurate details help us keep fresher jobs verified and trustworthy."
          }
        />
      )}

      {apiError && step < 3 && <AuthAlert>{apiError}</AuthAlert>}

      {step === 1 && (
        <form onSubmit={handleVerifyOtp} className="mt-6 space-y-5" noValidate>
          <AuthInput
            label="Work email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            autoComplete="email"
          />

          <AuthInput
            label="Phone number"
            name="phone_no"
            type="tel"
            value={formData.phone_no}
            onChange={handleChange}
            error={errors.phone_no}
            autoComplete="tel"
          />

          <AuthInput
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            autoComplete="new-password"
          />

          {formData.password && (
            <div>
              <div className="h-1.5 overflow-hidden rounded-full bg-[#EADFD9]">
                <div
                  className={`h-full rounded-full transition-all ${passwordStrength.className}`}
                  style={{ width: `${passwordStrength.level}%` }}
                />
              </div>
              <p className="mt-1 text-xs font-medium text-[#6F6F76]">
                Password strength: {passwordStrength.text}
              </p>
            </div>
          )}

          <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
            <AuthInput
              label="OTP"
              name="otp"
              type="text"
              value={formData.otp}
              onChange={handleChange}
              error={errors.otp}
              inputMode="numeric"
            />
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={isSendingOtp || isLoading}
              className="rounded-[8px] border border-[#EADFD9] bg-white px-4 py-3 text-sm font-semibold text-[#8500FA] transition hover:bg-[#F7F5F2] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSendingOtp ? "Sending..." : otpSent ? "Resend OTP" : "Send OTP"}
            </button>
          </div>

          {otpSent && (
            <AuthAlert type="success">
              OTP sent successfully. Please check your email.
            </AuthAlert>
          )}

          <label className="flex items-start gap-3 text-sm leading-6 text-[#6F6F76]">
            <input
              type="checkbox"
              id="terms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="mt-1 h-4 w-4 accent-[var(--auth-accent)]"
            />
            <span>
              I agree to the{" "}
              <Link to="/terms" className={authLinkClass}>
                Terms
              </Link>{" "}
              and{" "}
              <Link to="/privacy-policy" className={authLinkClass}>
                Privacy Policy
              </Link>
            </span>
          </label>
          {errors.agreeTerms && (
            <p className="text-sm text-red-600">{errors.agreeTerms}</p>
          )}

          {otpSent && (
            <AuthButton type="submit" disabled={isVerifyingOtp || isLoading}>
              {isVerifyingOtp || isLoading ? "Verifying..." : "Verify OTP"}
              {!(isVerifyingOtp || isLoading) && <ArrowRight className="h-4 w-4" />}
            </AuthButton>
          )}

          <AuthDivider />
          <GoogleOAuthButton onCredential={handleGoogleSignup} text="signup_with" />

          <AuthFooterText>
            Already using FirstJobIndia?{" "}
            <Link to="/company/login" className={authLinkClass}>
              Sign in
            </Link>
          </AuthFooterText>
        </form>
      )}

      {step === 2 && (
        <form
          onSubmit={handleSubmitCompanyDetails}
          className="mt-6 space-y-5"
          noValidate
        >
          <AuthAlert type="success">
            Please use accurate details. Your company account may be reviewed
            before activation.
          </AuthAlert>

          <AuthInput
            label="Company name"
            name="company_name"
            type="text"
            value={formData.company_name}
            onChange={handleChange}
            error={errors.company_name}
          />

          <AuthSelect
            label="Industry"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            error={errors.industry}
          >
            <option value="">Select industry</option>
            <option value="Technology">Technology</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Finance">Finance</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Retail">Retail</option>
            <option value="Education">Education</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Other">Other</option>
          </AuthSelect>

          <AuthSelect
            label="Company size"
            name="company_size"
            value={formData.company_size}
            onChange={handleChange}
            error={errors.company_size}
          >
            <option value="">Select size</option>
            <option value="1-10">1-10 employees</option>
            <option value="11-50">11-50 employees</option>
            <option value="51-200">51-200 employees</option>
            <option value="201-1000">201-1000 employees</option>
            <option value="1000+">1000+ employees</option>
          </AuthSelect>

          <div ref={locationRef} className="relative">
            <AuthInput
              label="City / location"
              type="text"
              value={locationSearch}
              onChange={handleLocationSearchChange}
              onFocus={() =>
                locationSearch.length >= 2 && setShowLocationDropdown(true)
              }
              error={errors.location_id}
            />
            {isSearchingLocations && (
              <span className="absolute right-3 top-10 text-xs text-[#9F9FA9]">
                Searching...
              </span>
            )}
            {showLocationDropdown && locationResults.length > 0 && (
              <ul className="absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-[8px] border border-[#EADFD9] bg-white shadow-sm">
                {locationResults.map((loc) => (
                  <li
                    key={loc.id}
                    onMouseDown={() => handleLocationSelect(loc)}
                    className="cursor-pointer px-4 py-2 text-sm text-[#0A0A0A] hover:bg-[#F7F5F2]"
                  >
                    {[loc.city, loc.state].filter(Boolean).join(", ") ||
                      loc.name ||
                      loc.id}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <AuthInput
            label="GSTIN (optional)"
            name="gstin"
            type="text"
            value={formData.gstin}
            onChange={handleChange}
            error={errors.gstin}
          />

          <AuthInput
            label="Company website (optional)"
            name="website"
            type="url"
            value={formData.website}
            onChange={handleChange}
            error={errors.website}
          />

          <AuthInput
            label="Contact person (optional)"
            name="contact_person"
            type="text"
            value={formData.contact_person}
            onChange={handleChange}
            error={errors.contact_person}
          />

          <AuthInput
            label="Contact designation (optional)"
            name="contact_designation"
            type="text"
            value={formData.contact_designation}
            onChange={handleChange}
            error={errors.contact_designation}
          />

          <div className="grid gap-3 sm:grid-cols-2">
            <AuthButton
              type="button"
              variant="secondary"
              onClick={() => setStep(1)}
            >
              Back
            </AuthButton>
            <AuthButton
              type="submit"
              disabled={isSubmittingProfile || isLoading}
            >
              {isSubmittingProfile || isLoading ? "Submitting..." : "Submit details"}
            </AuthButton>
          </div>
        </form>
      )}

      {step === 3 && (
        <div className="space-y-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-green-100 bg-green-50 text-green-700">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <AuthHeader
            title="Details submitted."
            description="Your company profile is under review. We will email you once the account is approved."
          />
          <Link
            to="/company/login"
            className="inline-flex w-full items-center justify-center gap-2 rounded-[8px] bg-[#FF6B35] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#FF9566]"
          >
            Go to sign in
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </AuthShell>
  );
};

export default CompanySignupPage;
