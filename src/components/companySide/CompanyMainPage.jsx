import React from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoMdBusiness } from "react-icons/io";
import { AiTwotoneMail } from "react-icons/ai";
import { LiaIndustrySolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CompanyMainPage = () => {
  return (
    <div className="bg-surface-container-low min-h-screen flex items-center justify-center p-6">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side */}
        <div className="hidden lg:block space-y-8">
          <div>
            <div className="flex items-center gap-2 text-primary font-bold mb-4">
              <span className="text-xl">RecruitPro</span>
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight leading-tight">
              Scale your team with{" "}
              <span className="text-primary">Architectural Precision.</span>
            </h1>
            <p className="text-xl text-on-surface-variant mt-6 max-w-md">
              Join 2,500+ enterprise teams using our portal to discover,
              interview, and hire top-tier global talent.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <span className="material-symbols-outlined text-primary text-4xl mb-3">
                groups
              </span>
              <h3 className="font-bold text-lg">Talent Pool</h3>
              <p className="text-sm text-on-surface-variant mt-2">
                Access a curated network of over 1.2M qualified professionals.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <span className="material-symbols-outlined text-orange-600 text-4xl mb-3">
                analytics
              </span>
              <h3 className="font-bold text-lg">Smart Insights</h3>
              <p className="text-sm text-on-surface-variant mt-2">
                Data-driven reports to optimize your hiring funnel velocity.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm flex gap-4">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAl3l-J04KKwSMMx5_NlvS1c1qk1srNaMcYp1vlA78ZqQjbTAbcm8CQ1URaj9MWurif9i219-VHeYlJHZIbr7zrYLDHhm5s0oL8Jp1s4go2zpa_ReWg10oQOLueKNIcXFfciYhxj3ZVSgc8tE5dIGM4JA690YtIX64anMZdn5nzEN0cG199pLfD0IIXAON-yMK28pdeMDFqvkSJX5mm3XqEUHqj8TDR2dEOjVVjlDo-Tyj0D-wvl3sakZM49mMyd9Vky1PX2IsL7f8A"
              alt="Sarah Chen"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="text-sm italic text-on-surface-variant">
                "RecruitPro transformed our hiring process from a mess of
                spreadsheets to a streamlined, high-performance engine."
              </p>
              <p className="text-xs font-bold mt-3">
                — Sarah Chen, Head of Talent at NexaFlow
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="bg-white rounded-3xl shadow-xl p-10">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold">Create Employer Account</h2>
            <p className="text-outline mt-1">Step 1 of 2: Company Profile</p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-on-surface-variant mb-1.5">
                Company Name
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                  <IoMdBusiness />
                </span>
                <input
                  type="text"
                  placeholder="Acme Corp"
                  autoComplete="false"
                  className="w-full pl-12 py-3.5 bg-surface-container-low border border-transparent focus:border-primary/30 rounded-2xl focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-on-surface-variant mb-1.5">
                Contact Email
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                  <AiTwotoneMail />
                </span>
                <input
                  type="email"
                  autoComplete="false"
                  placeholder="hiring@company.com"
                  className="w-full pl-12 py-3.5 bg-surface-container-low border border-transparent focus:border-primary/30 rounded-2xl focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-on-surface-variant mb-1.5">
                  Industry
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                    <LiaIndustrySolid />
                  </span>
                  <select className="w-full pl-12 py-3.5 bg-surface-container-low border border-transparent focus:border-primary/30 rounded-2xl focus:outline-none appearance-none">
                    <option>Technology</option>
                    <option>Healthcare</option>
                    <option>Finance</option>
                    <option>Manufacturing</option>
                    <option>Retail</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-on-surface-variant mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                    <RiLockPasswordLine />{" "}
                  </span>
                  <input
                    autoComplete="false"
                    type="password"
                    placeholder="••••••••"
                    className="w-full pl-12 py-3.5 bg-surface-container-low border border-transparent focus:border-primary/30 rounded-2xl focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="terms"
                className="w-5 h-5 accent-primary"
              />
              <label htmlFor="terms" className="text-sm text-on-surface-variant">
                I agree to the{" "}
                <span className="text-primary underline">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-primary underline">Privacy Policy</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-primary hover:bg-primary-container text-on-primary font-bold rounded-2xl flex items-center justify-center gap-2 transition-all"
            >
              Create Account
              <ArrowRight />
            </button>

            <p className="text-center text-sm text-on-surface-variant">
              Already using RecruitPro?{" "}
              <Link to='/company-login' className="text-primary font-bold">
                Log in to your hub
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyMainPage;
