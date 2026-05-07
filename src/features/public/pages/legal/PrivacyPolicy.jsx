import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";

const sections = [
  {
    title: "Information We Collect",
    body: "We collect account details, profile information, resumes, applications, company details, job posts, support messages, and basic usage data needed to operate and improve HireLaunch.",
  },
  {
    title: "How We Use Information",
    body: "We use information to authenticate accounts, show relevant jobs, let employers review applicants, support users, secure the platform, and improve hiring and job-search workflows.",
  },
  {
    title: "Sharing Information",
    body: "Job seeker information may be shared with companies when a seeker applies or chooses to make profile details available. Company information may be shown to job seekers through public job posts and employer pages.",
  },
  {
    title: "Data Security",
    body: "We use reasonable technical and organizational safeguards to protect account and platform data. No online service can guarantee absolute security, so users should also protect their credentials.",
  },
  {
    title: "Your Choices",
    body: "You can update account details, manage profile visibility where available, unsubscribe from optional messages, and request help with account or data questions through support.",
  },
  {
    title: "Cookies and Remembered Login",
    body: "When you choose Remember me, we store limited authentication details in your browser so you can stay signed in on that device. You can clear this by logging out or clearing browser storage.",
  },
];

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <Link to="/" className="text-xl font-extrabold text-slate-900">
            HireLaunch
          </Link>
          <Link
            to="/job-seeker/login"
            className="rounded bg-orange-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-700 cursor-pointer"
          >
            Login
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10">
          <Link
            to="/"
            className="inline-flex rounded px-3 py-2 text-sm font-semibold text-orange-600 transition hover:bg-orange-50"
          >
            Back to home
          </Link>
          <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-orange-600">
            Legal
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
            Last updated: May 7, 2026. This policy explains what information
            HireLaunch collects and how it is used across the job seeker and
            company experience.
          </p>
        </div>

        <div className="grid gap-5">
          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded border border-slate-200 bg-white p-6 shadow-sm transition hover:bg-orange-50/40"
            >
              <h2 className="text-xl font-bold">{section.title}</h2>
              <p className="mt-3 leading-7 text-slate-600">{section.body}</p>
            </section>
          ))}
        </div>

        <section className="mt-8 rounded border border-orange-100 bg-orange-50 p-6">
          <h2 className="text-xl font-bold">Contact</h2>
          <p className="mt-3 leading-7 text-slate-700">
            For privacy questions or account-data requests, contact HireLaunch
            support from the public support page or your dashboard.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
