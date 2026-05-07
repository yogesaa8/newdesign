import React, { useState } from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoMdBusiness } from "react-icons/io";
import { AiTwotoneMail } from "react-icons/ai";
import { LiaIndustrySolid } from "react-icons/lia";
import { BsGoogle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAuthStore } from "../../../../store";

const CompanySignupPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    industry: "Technology",
    password: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Password Strength Checker
  const getPasswordStrength = (password) => {
    if (!password) return { level: 0, text: "", color: "" };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 1) return { level: 25, text: "Weak", color: "bg-red-500" };
    if (strength === 2) return { level: 50, text: "Fair", color: "bg-yellow-500" };
    if (strength === 3) return { level: 75, text: "Good", color: "bg-blue-500" };
    return { level: 100, text: "Strong", color: "bg-emerald-500" };
  };

  const pwdStrength = getPasswordStrength(formData.password);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error for the specific field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Form Validation Logic
  const validateForm = () => {
    const newErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Contact email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
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

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulating API Call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Account Creation Data: ", formData);
      alert("Account created successfully! (Check console for data)");
      // navigate('/step-2'); // Next step pe jaane ke liye ye use karein
    } catch (error) {
      setErrors({ api: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignup = () => {
    setAuth({
      role: "company",
      user: {
        name: formData.companyName || "RecruitPro Company",
        email: formData.email || "company.google@example.com",
      },
    });

    navigate("/company/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side */}
        <div className="hidden lg:block space-y-8">
          <div>
            <div className="flex items-center gap-2 font-bold mb-4 ">
              <span className="px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-600 font-medium">RecruitPro</span>
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

        {/* Right Side */}
        <div className="rounded shadow-xl p-10 bg-white border border-slate-200">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-slate-900">
              Create Employer Account
            </h2>
            <p className="mt-2 inline-block px-3 py-1 rounded-full text-sm bg-orange-50 text-orange-600 font-medium">
              Step 1 of 2: Company Profile
            </p>
          </div>

          {/* API Error Display */}
          {errors.api && (
            <div className="mb-4 p-3 rounded bg-red-50 border border-red-200 text-sm text-red-600">
              {errors.api}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <InputField
              label="Company Name"
              name="companyName"
              icon={<IoMdBusiness />}
              type="text"
              placeholder="Acme Corp"
              value={formData.companyName}
              onChange={handleChange}
              error={errors.companyName}
            />

            <InputField
              label="Contact Email"
              name="email"
              icon={<AiTwotoneMail />}
              type="email"
              placeholder="hiring@company.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1.5 text-slate-700">
                  Industry
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <LiaIndustrySolid />
                  </span>
                  <select 
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="w-full pl-10 py-3.5 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                  >
                    <option>Technology</option>
                    <option>Healthcare</option>
                    <option>Finance</option>
                    <option>Manufacturing</option>
                    <option>Retail</option>
                  </select>
                </div>
              </div>

              <div>
                <InputField
                  label="Password"
                  name="password"
                  icon={<RiLockPasswordLine />}
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                />
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${pwdStrength.color} rounded-full transition-all duration-300`}
                        style={{ width: `${pwdStrength.level}%` }}
                      ></div>
                    </div>
                    <p className={`text-xs mt-1 ${pwdStrength.level <= 25 ? 'text-red-500' : pwdStrength.level <= 50 ? 'text-yellow-600' : pwdStrength.level <= 75 ? 'text-blue-500' : 'text-emerald-500'}`}>
                      {pwdStrength.text}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="w-5 h-5 mt-0.5 accent-orange-600"
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
              <p className="text-sm text-red-500 -mt-4">{errors.agreeTerms}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 font-bold flex items-center justify-center gap-2 transition-all bg-orange-600 hover:bg-orange-700 text-white shadow-md cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight size={18} />
                </>
              )}
            </button>

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
          </form>
        </div>
      </div>
    </div>
  );
};

// Updated Input Field Component to handle functionality
const InputField = ({ label, name, icon, type, placeholder, value, onChange, error }) => (
  <div>
    <label className="block text-sm font-semibold mb-1.5 text-slate-700">
      {label}
    </label>
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
        {icon}
      </span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full pl-10 py-3 border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
          error ? "border-red-500 focus:ring-red-500" : "border-slate-300"
        }`}
      />
    </div>
    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
  </div>
);

export default CompanySignupPage;
