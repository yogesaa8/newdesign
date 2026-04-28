import React from "react";
import { Link } from "react-router-dom";
import {
  FiBriefcase,
  FiCheckCircle,
  FiSearch,
  FiArrowRight,
  FiUsers,
  FiTrendingUp,
} from "react-icons/fi";

const Landing = () => {
  return (
    <div className="min-h-screen bg-bg-soft dark:bg-black-2 transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 z-999 w-full bg-white dark:bg-boxdark border-b border-stroke dark:border-strokedark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded-lg">
                <FiBriefcase className="text-white" size={24} />
              </div>
              <span className="text-primary text-2xl font-bold tracking-tight">
                JobPortal
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted">
              <a
                href="#features"
                className="hover:text-primary transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="hover:text-primary transition-colors"
              >
                Process
              </a>
              <a
                href="#testimonials"
                className="hover:text-primary transition-colors"
              >
                Success Stories
              </a>
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-sm font-semibold text-primary hover:text-secondary transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="rounded-full bg-primary py-2.5 px-6 text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:bg-secondary hover:shadow-secondary/20 transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-8 border border-primary/10">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              Join 50k+ professionals growing their careers
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-black dark:text-white sm:text-7xl leading-tight">
              Elevate Your Career with <br />
              <span className="text-primary italic">Smart Opportunities</span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-lg text-muted">
              A minimalist, AI-driven platform designed to connect top talent
              with industry leaders. Clean, modern, and focused on your growth.
            </p>
            <div className="mt-12 flex items-center justify-center gap-x-6">
              <div className="relative w-full max-w-2xl">
                <div className="flex items-center bg-white dark:bg-boxdark rounded-full p-2 shadow-2xl border border-stroke dark:border-strokedark focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                  <FiSearch className="ml-4 text-muted" size={20} />
                  <input
                    type="text"
                    placeholder="Search Job Title or Keywords..."
                    className="w-full bg-transparent px-4 py-3 outline-none text-black dark:text-white placeholder:text-muted/60"
                  />
                  <button className="rounded-full bg-primary py-3 px-10 text-white font-semibold hover:bg-secondary transition-all shadow-lg shadow-primary/20">
                    Search
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-16 flex flex-wrap justify-center gap-10 text-sm text-muted font-medium">
              <span className="flex items-center gap-2 border-r border-stroke dark:border-strokedark pr-10 last:border-0">
                <FiCheckCircle className="text-primary" /> Verified Companies
              </span>
              <span className="flex items-center gap-2 border-r border-stroke dark:border-strokedark pr-10 last:border-0">
                <FiCheckCircle className="text-primary" /> Premium Salary
                Insights
              </span>
              <span className="flex items-center gap-2 last:border-0">
                <FiCheckCircle className="text-primary" /> AI Interview Prep
              </span>
            </div>
          </div>
        </div>

        {/* Abstract Background elements */}
        <div className="absolute top-0 -z-10 h-full w-full overflow-hidden">
          <div className="absolute -top-[10%] -left-[10%] h-[500px] w-[500px] rounded-full bg-secondary/10 blur-[120px]"></div>
          <div className="absolute top-[20%] -right-[5%] h-[400px] w-[400px] rounded-full bg-primary/10 blur-[100px]"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[300px] w-[80%] bg-bg-soft blur-[80px] rounded-[100%]"></div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-black dark:text-white sm:text-4xl">
              Designed for the Modern Professional
            </h2>
            <p className="mt-4 text-muted">
              Minimal interface, maximum impact. Focus on what matters most.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-10 rounded-3xl bg-white dark:bg-boxdark border border-stroke dark:border-strokedark hover:border-primary/30 transition-all group">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white mb-8 group-hover:scale-110 transition-transform shadow-lg shadow-primary/20">
                <FiUsers size={32} />
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white mb-4">
                Elite Talent Network
              </h3>
              <p className="text-muted leading-relaxed text-sm">
                Join a curated pool of professionals and get noticed by top-tier
                global companies.
              </p>
            </div>
            <div className="p-10 rounded-3xl bg-white dark:bg-boxdark border border-stroke dark:border-strokedark hover:border-primary/30 transition-all group">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-white mb-8 group-hover:scale-110 transition-transform shadow-lg shadow-secondary/20">
                <FiTrendingUp size={32} />
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white mb-4">
                Smart Analytics
              </h3>
              <p className="text-muted leading-relaxed text-sm">
                Track your application progress and skill growth with beautiful,
                data-rich dashboards.
              </p>
            </div>
            <div className="p-10 rounded-3xl bg-white dark:bg-boxdark border border-stroke dark:border-strokedark hover:border-primary/30 transition-all group">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-muted text-white mb-8 group-hover:scale-110 transition-transform shadow-lg shadow-muted/20">
                <FiSearch size={32} />
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white mb-4">
                Discovery Engine
              </h3>
              <p className="text-muted leading-relaxed text-sm">
                Our AI engine matches your unique profile with the most relevant
                career opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modern CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[3rem] bg-primary px-8 py-20 text-center shadow-3xl">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-96 w-96 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-secondary/20 blur-3xl"></div>

            <h2 className="text-4xl font-bold text-white sm:text-5xl relative z-10">
              Your next chapter starts here.
            </h2>
            <p className="mx-auto mt-8 max-w-xl text-lg text-white/70 relative z-10 font-medium">
              Join a community of forward-thinkers and industry leaders. Minimal
              sign-up, maximum potential.
            </p>
            <div className="mt-12 flex justify-center relative z-10">
              <Link
                to="/signup"
                className="rounded-full bg-white px-10 py-5 text-primary font-bold hover:scale-105 hover:shadow-xl transition-all flex items-center gap-2"
              >
                Join Now <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stroke dark:border-strokedark py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="bg-primary/10 p-1.5 rounded-lg">
              <FiBriefcase className="text-primary" size={24} />
            </div>
            <span className="text-black dark:text-white text-xl font-bold tracking-tight">
              JobPortal
            </span>
          </div>
          <div className="flex justify-center gap-8 text-sm font-medium text-muted mb-8">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Cookies
            </a>
          </div>
          <p className="text-muted/60 text-xs">
            © 2024 JobPortal. Designed with precision and focus.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
