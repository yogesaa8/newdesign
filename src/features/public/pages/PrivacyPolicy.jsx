import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

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
    <div className="fji-page">
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10">
          <Link
            to="/"
            className="fji-secondary-btn"
          >
            Back to home
          </Link>
          <p className="fji-kicker mt-8">
            Legal
          </p>
          <h1 className="fji-heading mt-3 text-4xl sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="fji-copy mt-4 max-w-3xl text-base">
            Last updated: May 7, 2026. This policy explains what information
            HireLaunch collects and how it is used across the job seeker and
            company experience.
          </p>
        </div>

        <div className="grid gap-5">
          {sections.map((section) => (
            <section
              key={section.title}
              className="fji-card p-6 transition hover:bg-[#F7F5F2]"
            >
              <h2 className="text-xl font-bold">{section.title}</h2>
              <p className="fji-copy mt-3">{section.body}</p>
            </section>
          ))}
        </div>

        <section className="fji-card-soft mt-8 p-6">
          <h2 className="text-xl font-bold">Contact</h2>
          <p className="mt-3 leading-7 text-[#6F6F76]">
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
