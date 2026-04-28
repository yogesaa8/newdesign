import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const DetailJobModal = () => {
  const location = useLocation();
  const job = location.state?.job;
  const allJobs = location.state?.allJobs || [];
  
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    resume: null,
    question1: "",
    question2: ""
  });

  if (!job) return <div>Job not found</div>;

  const relatedJobs = allJobs
    .filter((j) => j.id !== job.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      resume: e.target.files[0]
    }));
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.resume) {
      setIsSuccess(true);
      setTimeout(() => {
        setShowApplyModal(false);
        setIsSuccess(false);
        setFormData({ name: "", resume: null, question1: "", question2: "" });
      }, 2000);
    } else {
      alert("Please fill Name and Resume fields");
    }
  };

  return (
    <div className="bg-surface-container-low text-on-surface font-sans">
      <div className="bg-white pt-12 pb-8 text-center px-4 border-b border-outline-variant">
        <h1 className="text-3xl md:text-4xl font-bold text-on-surface mb-4">
          Find Your Dream Job
        </h1>
        <p className="text-outline mb-8">
          You are applying for this <b>{job.title}</b>.
        </p>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-12 gap-10">
        {/* Left Section */}
        <section className="col-span-8">
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">
              {job.time}
            </span>
            <div className="mt-5 flex justify-between items-start">
              <div>
                <h2 className="text-4xl font-semibold">{job.title}</h2>
                <p className="text-outline mt-1">{job.company}</p>
              </div>
              {job.applyLink ? (
                <a
                  href={job.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-on-primary px-10 py-3 rounded-md"
                >
                  Apply via Web
                </a>
              ) : (
                <button
                  onClick={() => setShowApplyModal(true)}
                  className="bg-primary text-on-primary px-10 py-3 rounded-md hover:bg-primary-container"
                >
                  Apply Job
                </button>
              )}
            </div>

            <div className="flex gap-8 text-outline mt-6 text-sm flex-wrap">
              <span>{job.category}</span>
              <span>{job.type}</span>
              <span>{job.salary}</span>
              <span>{job.location}</span>
            </div>

            <div className="mt-10 space-y-10">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Job Description</h3>
                <p className="text-outline leading-8">{job.description}.</p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4">
                  Key Responsibilities
                </h3>
                <ul className="space-y-3 text-outline">
                  {job.responsibilities.map((resp, i) => (
                    <li key={i}>✓ {resp}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4">
                  Professional Skills
                </h3>
                <ul className="space-y-3 text-outline">
                  {job.skills.map((skill, i) => (
                    <li key={i}>✓ {skill}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4">Tags:</h3>
                <div className="flex gap-3 flex-wrap">
                  {job.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related Jobs */}
          <div className="mt-14">
            <h2 className="text-5xl font-bold">Related Jobs</h2>
            <p className="text-outline mt-3">
              At eu lobortis pretium tincidunt amet lacus at aenean aliquet
            </p>
            <div className="mt-8 space-y-6">
              {relatedJobs.map((related) => (
                <div
                  key={related.id}
                  className="bg-white rounded-2xl p-6 shadow-sm flex items-center justify-between"
                >
                  <div>
                    <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">
                      {related.time}
                    </span>
                    <h3 className="text-2xl font-semibold mt-3">
                      {related.title}
                    </h3>
                    <p className="text-outline">{related.company}</p>
                    <div className="flex gap-8 text-outline mt-4 text-sm">
                      <span>{related.category}</span>
                      <span>{related.type}</span>
                      <span>{related.salary}</span>
                      <span>{related.location}</span>
                    </div>
                  </div>
                  <Link
                    to={`/jobs/${related.id}`}
                    state={{ job: related, allJobs: allJobs }}
                    className="bg-primary text-on-primary px-6 py-3 rounded-md hover:bg-primary-container transition-colors"
                  >
                    Job Details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sidebar */}
        <aside className="col-span-4 space-y-8">
          {/* Job Overview */}
          <div className="bg-surface-container rounded-2xl p-8">
            <h3 className="text-2xl font-semibold mb-6">Job Overview</h3>

            <div className="space-y-4 text-on-surface-variant">
              <p>
                <strong>Job Title:</strong> {job.title}
              </p>
              <p>
                <strong>Job Type:</strong> {job.type}
              </p>
              <p>
                <strong>Category:</strong> {job.category}
              </p>
              <p>
                <strong>Experience:</strong> {job.experience}
              </p>
              <p>
                <strong>Degree:</strong> {job.degree}
              </p>
              <p>
                <strong>Offered Salary:</strong> {job.salary}
              </p>
              <p>
                <strong>Location:</strong> {job.location}
              </p>
            </div>

            {/* Map / Image placeholder */}
            <div className="mt-6 h-48 bg-surface-container rounded-xl flex items-center justify-center text-sm text-outline">
              Map / Location Preview
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-surface-container rounded-2xl p-8">
            <h3 className="text-2xl font-semibold mb-6">Send Us Message</h3>

            <div className="space-y-4">
              <input
                className="w-full rounded-md p-3"
                placeholder="Full name"
              />
              <input
                className="w-full rounded-md p-3"
                placeholder="Email Address"
              />
              <input
                className="w-full rounded-md p-3"
                placeholder="Phone Number"
              />
              <textarea
                className="w-full rounded-md p-3 h-32"
                placeholder="Your Message"
              ></textarea>

              <button className="bg-primary text-on-primary px-6 py-3 rounded-md w-full hover:bg-primary-container transition-colors">
                Send Message
              </button>
            </div>
          </div>
        </aside>
      </main>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-lg overflow-hidden">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center p-12 text-center">
                <div className="text-5xl mb-4">✓</div>
                <h2 className="text-2xl font-semibold text-primary mb-2">
                  Application Successful!
                </h2>
                <p className="text-outline">
                  Your application has been submitted to {job.company}.
                </p>
              </div>
            ) : (
              <>
                <div className="bg-surface-container px-8 py-6 border-b border-outline-variant">
                  <h2 className="text-2xl font-semibold text-on-surface">
                    Apply for {job.title}
                  </h2>
                  <p className="text-outline text-sm mt-1">{job.company}</p>
                </div>

                <form onSubmit={handleApplySubmit} className="p-8 space-y-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-semibold text-on-surface-variant mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      className="w-full border border-outline-variant rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary/30"
                      required
                    />
                  </div>

                  {/* Resume Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-on-surface-variant mb-2">
                      Upload Resume *
                    </label>
                    <div className="border-2 border-dashed border-outline-variant rounded-md p-4 text-center hover:border-primary cursor-pointer">
                      <input
                        type="file"
                        name="resume"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                        className="w-full cursor-pointer"
                        required
                      />
                      {formData.resume && (
                        <p className="text-sm text-primary mt-2">
                          ✓ {formData.resume.name}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* HR Question 1 */}
                  <div>
                    <label className="block text-sm font-semibold text-on-surface-variant mb-2">
                      Why do you want to join {job.company}? <span className="text-outline">(Optional)</span>
                    </label>
                    <textarea
                      name="question1"
                      value={formData.question1}
                      onChange={handleInputChange}
                      placeholder="Share your thoughts..."
                      className="w-full border border-outline-variant rounded-md p-3 h-20 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                    />
                  </div>

                  {/* HR Question 2 */}
                  <div>
                    <label className="block text-sm font-semibold text-on-surface-variant mb-2">
                      What relevant experience do you have? <span className="text-outline">(Optional)</span>
                    </label>
                    <textarea
                      name="question2"
                      value={formData.question2}
                      onChange={handleInputChange}
                      placeholder="Tell us about your experience..."
                      className="w-full border border-outline-variant rounded-md p-3 h-20 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                    />
                  </div>

                  {/* Note */}
                  <div className="bg-primary/10 border-l-4 border-primary p-4 rounded">
                    <p className="text-xs text-on-surface-variant">
                      <span className="font-semibold text-primary">💡 Note:</span> Filling the optional questions will make a better impression with our HR team!
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowApplyModal(false);
                        setFormData({ name: "", resume: null, question1: "", question2: "" });
                      }}
                      className="flex-1 border border-outline-variant text-on-surface-variant px-4 py-3 rounded-md font-semibold hover:bg-surface-container-low"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-primary text-on-primary px-4 py-3 rounded-md font-semibold hover:bg-primary-container transition-colors"
                    >
                      Apply Now
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailJobModal;
