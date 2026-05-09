import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const sections = [
  {
    title: "Use of the Platform",
    body: "HireLaunch helps job seekers discover opportunities and helps companies manage hiring activity. You agree to use the platform only for lawful hiring, recruiting, career, and account-management purposes.",
  },
  {
    title: "Account Responsibilities",
    body: "You are responsible for keeping your login details secure, maintaining accurate profile or company information, and notifying us if you believe your account has been accessed without permission.",
  },
  {
    title: "Job Posts and Applications",
    body: "Companies are responsible for the accuracy of job posts, screening criteria, and communication with applicants. Job seekers are responsible for the accuracy of resumes, applications, and profile details they submit.",
  },
  {
    title: "Acceptable Conduct",
    body: "Do not submit misleading information, scrape platform data, interfere with service security, impersonate another person or company, or use the platform to send spam, scams, or discriminatory content.",
  },
  {
    title: "Content Ownership",
    body: "You retain ownership of content you provide. By submitting content, you allow HireLaunch to host, process, display, and share it as needed to provide the services you request.",
  },
  {
    title: "Service Changes",
    body: "We may update features, eligibility rules, or these terms from time to time. Continued use of the platform after changes means you accept the updated terms.",
  },
];

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <Link to="/" className="text-xl font-extrabold text-slate-900">
            HireLaunch
          </Link>
          <Link
            to="/seeker/login"
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
            Terms & Conditions
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
            Last updated: May 7, 2026. These terms explain the basic rules for
            using HireLaunch as a job seeker, employer, recruiter, or visitor.
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
          <h2 className="text-xl font-bold">Questions</h2>
          <p className="mt-3 leading-7 text-slate-700">
            For questions about these terms, contact the HireLaunch support team
            through the support page or your account dashboard.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TermsConditions;
