import React, { useState } from "react";
import { BsGoogle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAuthStore } from "../../../../store";

const CompanySignupPage = () => {
  const navigate = useNavigate();

  const {
    setAuth,

    // Replace these names with your actual store API functions
    registerCompany,
    verifyCompanyOtp,
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
    company_website: "",

    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);

  const getPasswordStrength = (password) => {
    if (!password) return { level: 0, text: "", color: "" };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 1) return { level: 25, text: "Weak", color: "bg-red-500" };
    if (strength === 2)
      return { level: 50, text: "Fair", color: "bg-yellow-500" };
    if (strength === 3)
      return { level: 75, text: "Good", color: "bg-blue-500" };

    return { level: 100, text: "Strong", color: "bg-emerald-500" };
  };

  const pwdStrength = getPasswordStrength(formData.password);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

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

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    if (errors.api) {
      setErrors((prev) => ({ ...prev, api: "" }));
    }
  };

  const validateRegisterFields = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.phone_no.trim()) {
      newErrors.phone_no = "Phone number is required.";
    } else if (formData.phone_no.length !== 10) {
      newErrors.phone_no = "Phone number must be 10 digits.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms to continue.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOtp = () => {
    const newErrors = {};

    if (!formData.otp.trim()) {
      newErrors.otp = "OTP is required.";
    } else if (formData.otp.length !== 6) {
      newErrors.otp = "OTP must be 6 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateCompanyDetails = () => {
    const newErrors = {};

    if (!formData.company_name.trim()) {
      newErrors.company_name = "Company name is required.";
    }

    if (!formData.industry.trim()) {
      newErrors.industry = "Industry is required.";
    }

    if (!formData.company_size.trim()) {
      newErrors.company_size = "Company size is required.";
    }

    if (!formData.gstin.trim()) {
      newErrors.gstin = "GSTIN is required.";
    }

    if (!formData.company_website.trim()) {
      newErrors.company_website = "Company website is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = async () => {
    if (!validateRegisterFields()) return;

    setIsSendingOtp(true);

    try {
      const registerPayload = {
        email: formData.email,
        phone_no: formData.phone_no,
        password: formData.password,
      };

      console.log("Register API Payload:", registerPayload);

      // Register API call: this should send OTP to email/phone
      if (registerCompany) {
        await registerCompany(registerPayload);
      }

      setOtpSent(true);
    } catch (error) {
      setErrors({
        api: error?.message || "Unable to send OTP. Please try again.",
      });
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otpSent) {
      setErrors({ otp: "Please send OTP first." });
      return;
    }

    if (!validateOtp()) return;

    setIsVerifyingOtp(true);

    try {
      const verifyOtpPayload = {
        email: formData.email,
        otp: formData.otp,
      };

      console.log("Verify OTP API Payload:", verifyOtpPayload);

      // OTP verify API call
      if (verifyCompanyOtp) {
        await verifyCompanyOtp(verifyOtpPayload);
      }

      setStep(2);
      setErrors({});
    } catch (error) {
      setErrors({
        api: error?.message || "Invalid OTP. Please try again.",
      });
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleSubmitCompanyDetails = async (e) => {
    e.preventDefault();

    if (!validateCompanyDetails()) return;

    setIsSubmittingProfile(true);

    try {
      const companyDetailsPayload = {
        company_name: formData.company_name,
        industry: formData.industry,
        company_size: formData.company_size,
        gstin: formData.gstin,
        company_website: formData.company_website,
      };

      console.log("Company Details API Payload:", companyDetailsPayload);

      // Second API call
      if (completeCompanyProfile) {
        await completeCompanyProfile(companyDetailsPayload);
      }

      alert(
        "Company details submitted successfully. Your account will be created after approval.",
      );

      navigate("/company/login");
    } catch (error) {
      setErrors({
        api: error?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmittingProfile(false);
    }
  };

  const handleGoogleSignup = () => {
    setAuth({
      role: "company",
      user: {
        name: formData.company_name || "RecruitPro Company",
        email: formData.email || "company.google@example.com",
      },
    });

    navigate("/company/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
        <div className="hidden lg:block space-y-8">
          <div>
            <div className="flex items-center gap-2 font-bold mb-4">
              <span className="px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-600 font-medium">
                RecruitPro
              </span>
            </div>

            <h1 className="text-5xl font-extrabold tracking-tight leading-tight text-slate-900">
              Scale your team with{" "}
              <span className="text-orange-600">Architectural Precision.</span>
            </h1>

            <p className="text-xl mt-6 max-w-md text-slate-600">
              Join{" "}
              <span className="text-emerald-500 font-semibold">2,500+</span>{" "}
              enterprise teams using our portal to discover, interview, and hire
              top-tier global talent.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 rounded shadow-sm bg-white border border-slate-200">
              <span className="text-4xl mb-3 text-orange-600 block">👥</span>
              <h3 className="font-bold text-lg text-slate-900">Talent Pool</h3>
              <p className="text-sm mt-2 text-slate-600">
                Access a curated network of over 1.2M qualified professionals.
              </p>
            </div>

            <div className="p-6 rounded shadow-sm bg-white border border-slate-200">
              <span className="text-4xl mb-3 text-orange-600 block">📊</span>
              <h3 className="font-bold text-lg text-slate-900">
                Smart Insights
              </h3>
              <p className="text-sm mt-2 text-slate-600">
                Data-driven reports to optimize your hiring funnel velocity.
              </p>
            </div>
          </div>

          <div className="p-6 rounded shadow-sm bg-white border border-slate-200 flex gap-4">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAl3l-J04KKwSMMx5_NlvS1c1qk1srNaMcYp1vlA78ZqQjbTAbcm8CQ1URaj9MWurif9i219-VHeYlJHZIbr7zrYLDHhm5s0oL8Jp1s4go2zpa_ReWg10oQOLueKNIcXFfciYhxj3ZVSgc8tE5dIGM4JA690YtIX64anMZdn5nzEN0cG199pLfD0IIXAON-yMK28pdeMDFqvkSJX5mm3XqEUHqj8TDR2dEOjVVjlDo-Tyj0D-wvl3sakZM49mMyd9Vky1PX2IsL7f8A"
              alt="Sarah Chen"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="text-sm italic text-slate-600">
                "RecruitPro transformed our hiring process from a mess of
                spreadsheets to a streamlined, high-performance engine."
              </p>
              <p className="text-xs font-bold mt-3 text-slate-900">
                — Sarah Chen, Head of Talent at NexaFlow
              </p>
            </div>
          </div>
        </div>

        <div className="rounded shadow-xl p-10 bg-white border border-slate-200">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-slate-900">
              Create Employer Account
            </h2>

            <p className="mt-2 inline-block px-3 py-1 rounded-full text-sm bg-orange-50 text-orange-600 font-medium">
              Step {step} of 2:{" "}
              {step === 1 ? "Account Verification" : "Company Details"}
            </p>
          </div>

          {errors.api && (
            <div className="mb-4 p-3 rounded bg-red-50 border border-red-200 text-sm text-red-600">
              {errors.api}
            </div>
          )}

          {step === 1 && (
            <form onSubmit={handleVerifyOtp} className="space-y-6" noValidate>
              <FloatingInput
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />

              <FloatingInput
                label="Phone Number"
                name="phone_no"
                type="tel"
                value={formData.phone_no}
                onChange={handleChange}
                error={errors.phone_no}
              />

              <FloatingInput
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />

              {formData.password && (
                <div className="-mt-3">
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${pwdStrength.color} rounded-full transition-all duration-300`}
                      style={{ width: `${pwdStrength.level}%` }}
                    ></div>
                  </div>

                  <p
                    className={`text-xs mt-1 ${
                      pwdStrength.level <= 25
                        ? "text-red-500"
                        : pwdStrength.level <= 50
                          ? "text-yellow-600"
                          : pwdStrength.level <= 75
                            ? "text-blue-500"
                            : "text-emerald-500"
                    }`}
                  >
                    {pwdStrength.text}
                  </p>
                </div>
              )}

              <div>
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <FloatingInput
                      label="Enter OTP"
                      name="otp"
                      type="text"
                      value={formData.otp}
                      onChange={handleChange}
                      error={errors.otp}
                    />
                  </div>

                  {/* Vertical Line */}
                  <div className="mt-4 h-12 w-px bg-gray-300"></div>

                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={isSendingOtp}
                    className="mt-3 whitespace-nowrap px-5 py-3 text-sm font-bold text-orange-500 hover:text-orange-700 border-b border-gray-300 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSendingOtp
                      ? "Sending..."
                      : otpSent
                        ? "Resend OTP"
                        : "Send OTP"}
                  </button>
                </div>

                {otpSent && (
                  <p className="mt-2 text-xs text-green-600">
                    OTP sent successfully. Please check your email/phone.
                  </p>
                )}
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="w-5 h-5 mt-0.5 accent-orange-600 cursor-pointer"
                />

                <label htmlFor="terms" className="text-sm text-slate-600">
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="underline text-orange-600 transition hover:text-orange-700"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy-policy"
                    className="underline text-orange-600 transition hover:text-orange-700"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {errors.agreeTerms && (
                <p className="text-sm text-red-500 -mt-4">
                  {errors.agreeTerms}
                </p>
              )}

              {otpSent && (
                <button
                  type="submit"
                  disabled={isVerifyingOtp}
                  className="w-full py-4 font-bold flex items-center justify-center gap-2 transition-all bg-orange-600 hover:bg-orange-700 text-white shadow-md cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isVerifyingOtp ? "Verifying..." : "Verify OTP"}
                  {!isVerifyingOtp && <ArrowRight size={18} />}
                </button>
              )}

              <AuthFooter handleGoogleSignup={handleGoogleSignup} />
            </form>
          )}

          {step === 2 && (
            <form
              onSubmit={handleSubmitCompanyDetails}
              className="space-y-6"
              noValidate
            >
              <div className="rounded border border-orange-200 bg-orange-50 p-4 text-sm text-orange-700">
                Please fill accurate details. After approval your account will
                be created.
              </div>

              <FloatingInput
                label="Company Name"
                name="company_name"
                type="text"
                value={formData.company_name}
                onChange={handleChange}
                error={errors.company_name}
              />

              <FloatingSelect
                label="Industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                error={errors.industry}
              >
                <option value=""></option>
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Finance">Finance</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Retail">Retail</option>
                <option value="Education">Education</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Other">Other</option>
              </FloatingSelect>

              <FloatingSelect
                label="Company Size"
                name="company_size"
                value={formData.company_size}
                onChange={handleChange}
                error={errors.company_size}
              >
                <option value=""></option>
                <option value="1-10">1-10 Employees</option>
                <option value="11-50">11-50 Employees</option>
                <option value="51-200">51-200 Employees</option>
                <option value="201-500">201-500 Employees</option>
                <option value="501-1000">501-1000 Employees</option>
                <option value="1000+">1000+ Employees</option>
              </FloatingSelect>

              <FloatingInput
                label="GSTIN"
                name="gstin"
                type="text"
                value={formData.gstin}
                onChange={handleChange}
                error={errors.gstin}
              />

              <FloatingInput
                label="Company Website"
                name="company_website"
                type="url"
                value={formData.company_website}
                onChange={handleChange}
                error={errors.company_website}
              />

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full py-4 font-bold border border-slate-300 text-slate-700 transition-all hover:bg-slate-50 cursor-pointer"
                >
                  Back
                </button>

                <button
                  type="submit"
                  disabled={isSubmittingProfile}
                  className="w-full py-4 font-bold flex items-center justify-center gap-2 transition-all bg-orange-600 hover:bg-orange-700 text-white shadow-md cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmittingProfile ? "Submitting..." : "Submit Details"}
                  {!isSubmittingProfile && <ArrowRight size={18} />}
                </button>
              </div>

              <p className="text-center text-sm text-slate-600">
                Already using RecruitPro?{" "}
                <Link
                  to="/company/login"
                  className="font-bold text-orange-600 hover:text-orange-700"
                >
                  Log in to your hub
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const FloatingInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  error,
}) => {
  return (
    <div>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder=" "
          className={`peer w-full border-0 border-b bg-transparent px-0 pb-3 pt-6 text-sm outline-none transition-all ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-slate-300 focus:border-orange-600"
          }`}
        />

        <label
          className={`pointer-events-none absolute left-0 top-5 text-sm transition-all duration-200 peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs ${
            error
              ? "text-red-500 peer-focus:text-red-500"
              : "text-slate-500 peer-focus:text-orange-600"
          }`}
        >
          {label}
        </label>
      </div>

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

const FloatingSelect = ({ label, name, value, onChange, error, children }) => {
  return (
    <div>
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`peer w-full border-0 border-b bg-transparent px-0 pb-3 pt-6 text-sm outline-none transition-all ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-slate-300 focus:border-orange-600"
          }`}
        >
          {children}
        </select>

        <label
          className={`pointer-events-none absolute left-0 top-0 text-xs transition-all duration-200 ${
            error ? "text-red-500" : "text-slate-500 peer-focus:text-orange-600"
          }`}
        >
          {label}
        </label>
      </div>

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

const AuthFooter = ({ handleGoogleSignup }) => {
  return (
    <>
      <div className="relative flex items-center justify-center py-2">
        <div className="absolute inset-0 flex items-center gap-3">
          <span className="border-t w-full"></span>
          <span className="text-sm text-slate-400">OR</span>
          <span className="border-t w-full"></span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleGoogleSignup}
        className="flex w-full items-center justify-center gap-2 border border-slate-300 py-3 rounded text-sm font-semibold transition hover:bg-slate-50 cursor-pointer"
      >
        <BsGoogle className="h-5 w-5" />
        Continue with Google
      </button>

      <p className="text-center text-sm text-slate-600">
        Already using RecruitPro?{" "}
        <Link
          to="/company/login"
          className="font-bold text-orange-600 hover:text-orange-700"
        >
          Log in to your hub
        </Link>
      </p>
    </>
  );
};

export default CompanySignupPage;
