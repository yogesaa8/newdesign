import React from "react";
import { Mail, Lock, Eye } from 'lucide-react';
import { Link } from "react-router-dom";
import { BsGoogle } from "react-icons/bs";

const CompanyLogin = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full flex flex-col lg:flex-row items-center gap-12">
        {/* Left - Form */}
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center">
              <span className="text-white text-3xl font-bold">📊</span>
            </div>
            <h1 className="text-3xl font-semibold mt-4">RecruitPro</h1>
            <p className="text-gray-500 text-sm">Enterprise Hub Login</p>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-1">Welcome back</h2>
              <p className="text-gray-600 text-sm">
                Enter your credentials to access your employer portal
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <a href="#" className="text-blue-600 text-sm hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500"
                />
                <Eye className="absolute right-4 top-3.5 h-5 w-5 text-gray-400 cursor-pointer" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 accent-blue-600" />
              <span className="text-sm text-gray-600">Keep me logged in</span>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-2xl font-medium flex items-center justify-center gap-2 transition">
              Sign In →
            </button>

            <div className="text-center text-xs text-gray-400">
              OR CONTINUE WITH
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 border border-gray-200 hover:border-gray-300 py-3 rounded-2xl transition">
                <BsGoogle className="h-5 w-5" />
                Google
              </button>
              <button className="flex items-center justify-center gap-2 border border-gray-200 hover:border-gray-300 py-3 rounded-2xl transition">
                SSO
              </button>
            </div>

            <div className="text-center text-sm pt-4">
              New to RecruitPro?{" "}
              <Link to="/company" className="text-blue-600 font-medium hover:underline">
                Sign Up your company
              </Link>
            </div>
          </div>

          <div className="flex justify-center gap-6 text-xs text-gray-400 mt-10">
            <a href="#" className="hover:text-gray-600">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-600">
              Terms of Service
            </a>
            <a href="#" className="hover:text-gray-600">
              Contact Support
            </a>
          </div>
          <p className="text-center text-[10px] text-gray-400 mt-6">
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
              <div className="w-9 h-9 bg-blue-100 rounded-2xl flex items-center justify-center">
                ⚡
              </div>
              <p className="text-sm font-medium leading-tight">
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
