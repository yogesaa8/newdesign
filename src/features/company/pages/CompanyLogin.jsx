import React from "react";
import { Mail, Lock, Eye } from 'lucide-react';
import { Link } from "react-router-dom";
import { BsGoogle } from "react-icons/bs";

const CompanyLogin = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6FAFE] via-[#BDDDFC] to-[#88BDF2] flex items-center justify-center p-6">
      <div className="max-w-4xl w-full flex flex-col lg:flex-row items-center gap-12">
        {/* Left - Form */}
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center">
              <span className="text-white text-3xl font-bold">📊</span>
            </div>
            <h1 className="text-3xl font-semibold mt-4 text-on-surface">RecruitPro</h1>
            <p className="text-outline text-sm">Enterprise Hub Login</p>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-1 text-on-surface">Welcome back</h2>
              <p className="text-outline text-sm">
                Enter your credentials to access your employer portal
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-outline" />
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full pl-11 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-2xl focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium text-on-surface-variant">
                  Password
                </label>
                <a href="#" className="text-primary text-sm hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-outline" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3 bg-surface-container-low border border-outline-variant rounded-2xl focus:outline-none focus:border-primary"
                />
                <Eye className="absolute right-4 top-3.5 h-5 w-5 text-outline cursor-pointer" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 accent-primary" />
              <span className="text-sm text-outline">Keep me logged in</span>
            </div>

            <button className="w-full bg-primary hover:bg-primary-container text-white py-3.5 rounded-2xl font-medium flex items-center justify-center gap-2 transition">
              Sign In →
            </button>

            <div className="text-center text-xs text-outline">
              OR CONTINUE WITH
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 border border-outline-variant hover:border-outline py-3 rounded-2xl transition text-on-surface-variant">
                <BsGoogle className="h-5 w-5" />
                Google
              </button>
              <button className="flex items-center justify-center gap-2 border border-outline-variant hover:border-outline py-3 rounded-2xl transition text-on-surface-variant">
                SSO
              </button>
            </div>

            <div className="text-center text-sm pt-4 text-outline">
              New to RecruitPro?{" "}
              <Link to="/company" className="text-primary font-medium hover:underline">
                Sign Up your company
              </Link>
            </div>
          </div>

          <div className="flex justify-center gap-6 text-xs text-outline mt-10">
            <a href="#" className="hover:text-on-surface-variant">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-on-surface-variant">
              Terms of Service
            </a>
            <a href="#" className="hover:text-on-surface-variant">
              Contact Support
            </a>
          </div>
          <p className="text-center text-[10px] text-outline mt-6">
            © 2024 RecruitPro Enterprise
          </p>
        </div>

        {/* Right - Decorative */}
        <div className="hidden lg:block relative w-80">
          <div className="-rotate-12 translate-x-8 shadow-2xl rounded-3xl overflow-hidden">
            <img
              src="https://picsum.photos/id/1015/600/400"
              alt="Office"
              className="rounded-3xl"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-white p-5 rounded-3xl shadow-xl max-w-[240px]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-primary/10 rounded-2xl flex items-center justify-center">
                ⚡
              </div>
              <p className="text-sm font-medium leading-tight text-on-surface">
                Scale your team with the precision of AI-driven talent search.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyLogin;
