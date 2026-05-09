import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import jobsData from "../../data/jobsData.json";

const MapPinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-4 h-4 text-slate-400 inline-block mr-1"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
    />
  </svg>
);

const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-4 h-4 text-slate-400 inline-block mr-1"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const BriefcaseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-4 h-4 text-slate-400 inline-block mr-1"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
    />
  </svg>
);

const JobDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { jobId } = useParams();
  const allJobs = location.state?.allJobs?.length
    ? location.state.allJobs
    : jobsData;
  const job =
    location.state?.job ||
    allJobs.find((item) => String(item.id) === String(jobId));
  const isLoggedIn = false;

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: null,
    coverLetter: null,
    portfolio: "",
    question1: "",
    question2: "",
    question3: "",
  });

  const [activeTab, setActiveTab] = useState(0);

  const relatedJobs = useMemo(() => {
    if (!job) return [];

    return allJobs.filter((item) => item.id !== job.id).slice(0, 3);
  }, [allJobs, job]);

  if (!job)
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Job not found.
      </div>
    );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, resume: e.target.files[0] }));
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.resume) {
      setIsSuccess(true);
      setTimeout(() => {
        setShowApplyModal(false);
        setIsSuccess(false);
        setActiveTab(0);
        setFormData({
          name: "",
          email: "",
          phone: "",
          resume: null,
          coverLetter: null,
          portfolio: "",
          question1: "",
          question2: "",
          question3: "",
        });
      }, 2000);
    } else {
      toast("Please fill Name and Resume fields", {
        style: {
          borderRadius: "25px",
          background: "#FF6900",
          color: "#000",
        },
      });
    }
  };

  const showLoginToast = () => {
    toast.error("Please login first to apply for this job!", {
      style: {
        background: "#FF6900",
        color: "#000",
        borderRadius: "25px",
      },
    });
    setTimeout(() => {
      navigate("/seeker/login");
    }, 900);
  };

  const handleApplyJob = () => {
    if (!isLoggedIn) {
      showLoginToast();
      return;
    }

    setShowApplyModal(true);
  };

  const handleApplyViaWeb = () => {
    if (!isLoggedIn) {
      showLoginToast();
      return;
    }

    window.open(job.applyLink, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 font-sans">
      {/* Minimal Header */}
      <div className="pt-12 pb-8 text-center px-4 bg-white border-b border-slate-100">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          Find Your Dream Job
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          You are applying for{" "}
          <span className="font-semibold text-orange-500">{job.title}</span>.
        </p>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Section */}
        <section className="lg:col-span-8">
          <div className="rounded border border-slate-100 bg-white p-8">
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-orange-50 text-orange-500 border border-orange-100">
              {job.time}
            </span>

            <div className="mt-6 flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                  {job.title}
                </h2>
                <p className="mt-1 text-slate-500">{job.company}</p>
              </div>
              {job.applyLink ? (
                <button
                  onClick={handleApplyViaWeb}
                  className="px-8 py-2.5 rounded bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition-colors shadow-sm"
                >
                  Apply via Web
                </button>
              ) : (
                <button
                  onClick={handleApplyJob}
                  className="px-8 py-2.5 rounded bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition-colors shadow-sm"
                >
                  Apply Job
                </button>
              )}
            </div>

            <div className="flex gap-6 mt-6 text-xs text-slate-400 font-medium flex-wrap border-b border-slate-50 pb-6">
              <span className="flex items-center">
                <BriefcaseIcon /> {job.category}
              </span>
              <span>{job.type}</span>
              <span className="text-orange-500 font-semibold">
                {job.salary}
              </span>
              <span className="flex items-center">
                <MapPinIcon /> {job.location}
              </span>
            </div>

            <div className="mt-10 space-y-10 text-sm text-slate-600 leading-relaxed">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Job Description
                </h3>
                <p className="leading-7">{job.description}.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Key Responsibilities
                </h3>
                <ul className="space-y-3">
                  {job.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-orange-400 rounded-full flex-shrink-0"></span>
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Professional Skills
                </h3>
                <ul className="space-y-3">
                  {job.skills.map((skill, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-orange-400 rounded-full flex-shrink-0"></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              {job.tags && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">
                    Tags
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    {job.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 rounded bg-slate-50 border border-slate-100 text-slate-500 text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Jobs */}
          <div className="mt-14">
            <h2 className="text-xl font-bold text-slate-900">Related Jobs</h2>
            <p className="mt-1 text-sm text-slate-400 mb-8">
              Check out similar opportunities
            </p>

            <div className="space-y-4">
              {relatedJobs.map((related) => (
                <div
                  key={related.id}
                  className="rounded border border-slate-100 bg-white p-6 hover:border-slate-200 hover:shadow-sm transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div>
                    <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-slate-50 text-slate-400 border border-slate-100">
                      {related.time}
                    </span>
                    <h3 className="text-base font-semibold text-slate-800 mt-2">
                      {related.title}
                    </h3>
                    <p className="text-sm text-slate-500">{related.company}</p>
                    <div className="flex gap-4 mt-2 text-xs text-slate-400">
                      <span>{related.category}</span>
                      <span className="text-orange-500 font-semibold">
                        {related.salary}
                      </span>
                    </div>
                  </div>
                  <Link
                    to={`/jobs/${related.id}`}
                    state={{ job: related, allJobs: allJobs }}
                    className="px-5 py-2 rounded border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors whitespace-nowrap"
                  >
                    Job Details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
          {/* Job Overview */}
          <div className="rounded border border-slate-100 bg-white p-8 ">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">
              Job Overview
            </h3>

            <div className="space-y-4 text-sm">
              {[
                { label: "Job Title", value: job.title },
                { label: "Job Type", value: job.type },
                { label: "Category", value: job.category },
                { label: "Experience", value: job.experience },
                { label: "Degree", value: job.degree },
                { label: "Offered Salary", value: job.salary, isOrange: true },
                { label: "Location", value: job.location },
              ].map((item, i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-slate-400">{item.label}</span>
                  <span
                    className={`font-medium text-right ${item.isOrange ? "text-orange-500" : "text-slate-700"}`}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="mt-6 h-40 rounded bg-slate-50 border border-slate-100 flex items-center justify-center text-xs text-slate-400">
              Map / Location Preview
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded border border-slate-100 bg-white p-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">
              Send Us Message
            </h3>

            <div className="space-y-4">
              <input
                className="w-full rounded p-2.5 bg-slate-50 border border-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all"
                placeholder="Full name"
              />
              <input
                className="w-full rounded p-2.5 bg-slate-50 border border-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all"
                placeholder="Email Address"
              />
              <input
                className="w-full rounded p-2.5 bg-slate-50 border border-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all"
                placeholder="Phone Number"
              />
              <textarea
                className="w-full rounded p-2.5 bg-slate-50 border border-slate-100 text-sm h-28 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all resize-none"
                placeholder="Your Message"
              ></textarea>

              <button className="w-full py-2.5 rounded bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors">
                Send Message
              </button>
            </div>
          </div>
        </aside>
      </main>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="rounded-xl max-w-lg w-full bg-white shadow-xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center p-12 text-center flex-grow">
                <div className="w-16 h-16 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-orange-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-slate-900 mb-2">
                  Application Successful!
                </h2>
                <p className="text-sm text-slate-500">
                  Your application has been submitted to {job.company}.
                </p>
              </div>
            ) : (
              <>
                <div className="px-8 py-5 border-b border-slate-100 flex-shrink-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">
                        Apply for {job.title}
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        {job.company}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setShowApplyModal(false);
                        setActiveTab(0);
                        setFormData({
                          name: "",
                          email: "",
                          phone: "",
                          resume: null,
                          coverLetter: null,
                          portfolio: "",
                          question1: "",
                          question2: "",
                          question3: "",
                        });
                      }}
                      className="text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* --- Tabs --- */}
                  <div className="flex mt-5 border-b -mb-5 border-slate-100">
                    <button
                      type="button"
                      onClick={() => setActiveTab(0)}
                      className={`pb-3 px-1 mr-6 text-sm font-medium transition-colors border-b-2 ${
                        activeTab === 0
                          ? "border-orange-500 text-orange-600"
                          : "border-transparent text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      1. Your Details
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab(1)}
                      className={`pb-3 px-1 text-sm font-medium transition-colors border-b-2 ${
                        activeTab === 1
                          ? "border-orange-500 text-orange-600"
                          : "border-transparent text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      2. Company Questions
                    </button>
                  </div>
                </div>
                <form
                  onSubmit={handleApplySubmit}
                  className="p-8 space-y-5 overflow-y-auto flex-grow"
                >
                  {activeTab === 0 && (
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wide">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="John Doe"
                            className="w-full rounded-lg p-2.5 bg-slate-50 border border-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wide">
                            Email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="john@example.com"
                            className="w-full rounded-lg p-2.5 bg-slate-50 border border-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wide">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+1 (555) 000-0000"
                          className="w-full rounded-lg p-2.5 bg-slate-50 border border-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all"
                        />
                      </div>

                      {/* Resume Upload */}
                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wide">
                          Upload Resume *{" "}
                          <span className="normal-case text-slate-300">
                            (PDF, DOC)
                          </span>
                        </label>
                        <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center cursor-pointer hover:border-orange-300 hover:bg-orange-50/30 transition-all bg-slate-50/50">
                          <input
                            type="file"
                            name="resume"
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx"
                            className="w-full cursor-pointer text-xs text-slate-500"
                            required
                          />
                          {formData.resume ? (
                            <p className="text-xs mt-2 text-orange-500 font-medium flex items-center justify-center gap-1">
                              <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              {formData.resume.name}
                            </p>
                          ) : (
                            <p className="text-xs mt-1 text-slate-400">
                              Drag & drop or click to browse
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Cover Letter Upload */}
                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wide">
                          Cover Letter{" "}
                          <span className="normal-case text-slate-300">
                            (Optional)
                          </span>
                        </label>
                        <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center cursor-pointer hover:border-orange-300 hover:bg-orange-50/30 transition-all bg-slate-50/50">
                          <input
                            type="file"
                            name="coverLetter"
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                coverLetter: e.target.files[0],
                              }))
                            }
                            accept=".pdf,.doc,.docx"
                            className="w-full cursor-pointer text-xs text-slate-500"
                          />
                          {formData.coverLetter ? (
                            <p className="text-xs mt-2 text-orange-500 font-medium flex items-center justify-center gap-1">
                              <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              {formData.coverLetter.name}
                            </p>
                          ) : (
                            <p className="text-xs mt-1 text-slate-400">
                              Drag & drop or click to browse
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Portfolio Link */}
                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wide">
                          Portfolio / LinkedIn URL{" "}
                          <span className="normal-case text-slate-300">
                            (Optional)
                          </span>
                        </label>
                        <input
                          type="url"
                          name="portfolio"
                          value={formData.portfolio}
                          onChange={handleInputChange}
                          placeholder="https://linkedin.com/in/yourprofile"
                          className="w-full rounded-lg p-2.5 bg-slate-50 border border-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all"
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === 1 && (
                    <div className="space-y-5">
                      <div className="bg-orange-50 border-l-4 border-orange-400 p-3 rounded-r-lg mb-2">
                        <p className="text-xs text-orange-600 leading-relaxed">
                          <span className="font-semibold">💡 Note:</span>{" "}
                          Answering these briefly increases your selection
                          chances by 40%.
                        </p>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wide">
                          Why do you want to join {job.company}?{" "}
                          <span className="normal-case text-slate-300">
                            (Optional)
                          </span>
                        </label>
                        <textarea
                          name="question1"
                          value={formData.question1}
                          onChange={handleInputChange}
                          placeholder="I am excited about this opportunity because..."
                          className="w-full rounded-lg p-2.5 bg-slate-50 border border-slate-100 text-sm h-24 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wide">
                          What relevant experience do you have?{" "}
                          <span className="normal-case text-slate-300">
                            (Optional)
                          </span>
                        </label>
                        <textarea
                          name="question2"
                          value={formData.question2}
                          onChange={handleInputChange}
                          placeholder="In my previous role, I achieved..."
                          className="w-full rounded-lg p-2.5 bg-slate-50 border border-slate-100 text-sm h-24 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all resize-none"
                        />
                      </div>

                      {/* Extra Added Question */}
                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wide">
                          What are your salary expectations?{" "}
                          <span className="normal-case text-slate-300">
                            (Optional)
                          </span>
                        </label>
                        <input
                          type="text"
                          name="question3"
                          value={formData.question3}
                          onChange={handleInputChange}
                          placeholder="e.g., $60k - $80k"
                          className="w-full rounded-lg p-2.5 bg-slate-50 border border-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all"
                        />
                      </div>
                    </div>
                  )}
                </form>
                <div className="px-8 py-4 border-t border-slate-100 bg-white flex-shrink-0">
                  <div className="flex gap-3">
                    {activeTab === 1 && (
                      <button
                        type="button"
                        onClick={() => setActiveTab(0)}
                        className="flex-1 border border-slate-200 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                      >
                        Previous
                      </button>
                    )}

                    {activeTab === 0 ? (
                      <button
                        type="button"
                        onClick={() =>
                          formData.name && formData.resume && setActiveTab(1)
                        }
                        className="flex-1 px-4 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                      >
                        Next Step
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                          />
                        </svg>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        onClick={handleApplySubmit}
                        className="flex-1 px-4 py-2.5 rounded-lg bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition-colors shadow-sm"
                      >
                        Submit Application
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetailsPage;
