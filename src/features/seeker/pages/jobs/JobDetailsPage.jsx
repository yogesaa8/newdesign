import React, { useEffect, useMemo, useState } from "react";
import toast from "@/lib/toast";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  X,
} from "lucide-react";
import { useAuthStore } from "../../../../store";
import { isJobApplied, useJobStore } from "../../store/jobStore";
import useSEO from "@/seo/useSEO";
import seoMeta from "@/data/seoMeta";
import {
  buildBreadcrumbList,
  buildJobPosting,
  buildWebPage,
} from "@/seo/schemas";

const INPUT_CLASS =
  "w-full rounded-lg border border-n-200 bg-n-50 p-2.5 text-sm text-n-900 outline-none transition placeholder:text-n-400 focus:border-sk-primary focus:ring-2 focus:ring-sk-primary/10";
const LABEL_CLASS = "mb-2 block text-xs font-semibold uppercase text-n-500";

const resetApplicationForm = {
  coverLetter: "",
  answers: {},
};

const formatQuestionType = (type) =>
  type ? type.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()) : "Answer";

const hasAnswerValue = (questionType, value) => {
  if (questionType === "multiple_choice") return Array.isArray(value) && value.length > 0;
  return value != null && String(value).trim() !== "";
};

const buildAnswerPayload = (questions, answers) =>
  questions
    .map((question) => {
      const value = answers[question.id];

      if (!hasAnswerValue(question.question_type, value)) {
        return null;
      }

      const answer = { question_id: question.id };

      switch (question.question_type) {
        case "single_choice":
          answer.selected_option_id = value;
          break;
        case "multiple_choice":
          answer.selected_option_ids = value;
          break;
        case "file_upload":
          answer.file_url = String(value).trim();
          break;
        case "url":
          answer.url_answer = String(value).trim();
          break;
        case "text":
        case "number":
        case "yes_no":
        default:
          answer.answer_text = String(value).trim();
          break;
      }

      return answer;
    })
    .filter(Boolean);

const isAlreadyAppliedError = (error) => {
  const message = String(error?.message || error?.code || "").toLowerCase();
  return message.includes("already") && message.includes("appl");
};

const DetailRow = ({ label, value, highlight }) => (
  <div className="flex items-start justify-between gap-4 border-b border-n-100 pb-3 last:border-b-0 last:pb-0">
    <span className="text-sm text-n-500">{label}</span>
    <span
      className={`text-right text-sm font-semibold ${
        highlight ? "text-sk-primary" : "text-n-900"
      }`}
    >
      {value || "-"}
    </span>
  </div>
);

const SectionList = ({ title, items }) => (
  <section>
    <h3 className="text-xl font-semibold text-n-900">{title}</h3>
    <ul className="mt-4 space-y-3 text-sm leading-6 text-n-500">
      {items.map((item, index) => (
        <li key={index} className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sk-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </section>
);

const QuestionInput = ({ question, value, onChange }) => {
  const options = question.options || [];

  switch (question.question_type) {
    case "number":
      return (
        <input
          type="number"
          value={value || ""}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Enter a number"
          className={INPUT_CLASS}
        />
      );
    case "yes_no":
      return (
        <select
          value={value || ""}
          onChange={(event) => onChange(event.target.value)}
          className={INPUT_CLASS}
        >
          <option value="">Select an answer</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      );
    case "single_choice":
      return (
        <select
          value={value || ""}
          onChange={(event) => onChange(event.target.value)}
          className={INPUT_CLASS}
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.option_text}
            </option>
          ))}
        </select>
      );
    case "multiple_choice":
      return (
        <div className="space-y-2 rounded-lg border border-n-200 bg-n-50 p-3">
          {options.map((option) => {
            const selectedValues = Array.isArray(value) ? value : [];
            return (
              <label
                key={option.id}
                className="flex items-center gap-2 text-sm font-medium text-n-500"
              >
                <input
                  type="checkbox"
                  checked={selectedValues.includes(option.id)}
                  onChange={(event) => {
                    const nextValue = event.target.checked
                      ? [...selectedValues, option.id]
                      : selectedValues.filter((item) => item !== option.id);
                    onChange(nextValue);
                  }}
                  className="h-4 w-4 accent-sk-primary"
                />
                {option.option_text}
              </label>
            );
          })}
        </div>
      );
    case "file_upload":
      return (
        <input
          type="url"
          value={value || ""}
          onChange={(event) => onChange(event.target.value)}
          placeholder="https://example.com/resume.pdf"
          className={INPUT_CLASS}
        />
      );
    case "url":
      return (
        <input
          type="url"
          value={value || ""}
          onChange={(event) => onChange(event.target.value)}
          placeholder="https://example.com/profile"
          className={INPUT_CLASS}
        />
      );
    case "text":
    default:
      return (
        <textarea
          value={value || ""}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Write your answer"
          className={`${INPUT_CLASS} h-24 resize-none`}
        />
      );
  }
};

const JobDetailsPage = () => {
  const routeLocation = useLocation();
  const navigate = useNavigate();
  const { jobId } = useParams();
  const accessToken = useAuthStore((state) => state.accessToken);
  const role = useAuthStore((state) => state.role);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const {
    jobs,
    selectedJob: storeSelectedJob,
    isDetailLoading,
    isApplying,
    error,
    applyError,
    fetchJobDetail,
    applyToJob,
    appliedJobIds,
    fetchAppliedJobs,
    clearApplyState,
  } = useJobStore();
  const fallbackJob =
    String(routeLocation.state?.job?.id) === String(jobId)
      ? routeLocation.state.job
      : null;
  const selectedJob =
    String(storeSelectedJob?.id) === String(jobId) ? storeSelectedJob : null;
  const job = selectedJob || fallbackJob;
  const questions = useMemo(() => job?.questions || [], [job]);

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState(resetApplicationForm);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (!jobId) return;
    fetchJobDetail(jobId).catch(() => {});
  }, [fetchJobDetail, jobId]);

  useEffect(() => {
    if (!isAuthenticated || role !== "seeker" || !accessToken) return;
    fetchAppliedJobs(accessToken).catch(() => {});
  }, [accessToken, fetchAppliedJobs, isAuthenticated, role]);

  useEffect(() => {
    clearApplyState();
  }, [clearApplyState, jobId]);

  const allJobs = useMemo(
    () => (jobs.length ? jobs : routeLocation.state?.allJobs || []),
    [jobs, routeLocation.state?.allJobs],
  );

  const relatedJobs = useMemo(() => {
    if (!job) return [];

    const sameCategory = allJobs.filter(
      (item) => item.id !== job.id && item.category === job.category,
    );
    const fallback = allJobs.filter((item) => item.id !== job.id);
    return [...sameCategory, ...fallback]
      .filter(
        (item, index, source) =>
          source.findIndex((match) => match.id === item.id) === index,
      )
      .slice(0, 3);
  }, [allJobs, job]);

  const jobMetaTemplate = seoMeta["/jobs/:jobId"];
  const jobPath = job ? `/jobs/${job.id}` : "/jobs";
  const jobCity = job?.city || (job?.location ? job.location.split(",")[0].trim() : "");
  const jobTitleString = job
    ? jobMetaTemplate.titleTemplate
        .replace("{jobTitle}", job.title)
        .replace("{company}", job.company)
        .replace("{city}", jobCity)
    : "Job not found | FirstJobIndia";
  const jobDescriptionString = job
    ? jobMetaTemplate.descriptionTemplate
        .replace("{jobTitle}", job.title)
        .replace("{company}", job.company)
        .replace("{city}", jobCity)
        .replace("{type}", job.jobTypeLabel || job.type || "Full Time")
        .replace("{experience}", job.experience || "Entry level")
        .replace("{salary}", job.salary || "Competitive")
    : "This job is no longer available on FirstJobIndia.";

  const seoElement = useSEO({
    title: jobTitleString,
    description: jobDescriptionString,
    path: jobPath,
    noindex: !job,
    graph: job
      ? [
          buildWebPage({
            path: jobPath,
            title: jobTitleString,
            description: jobDescriptionString,
            breadcrumbPath: jobPath,
          }),
          buildBreadcrumbList(
            [
              { name: "Home", path: "/" },
              { name: "Jobs", path: "/jobs" },
              { name: job.title, path: jobPath },
            ],
            jobPath,
          ),
          buildJobPosting(job, jobPath),
        ]
      : [],
  });

  if (isDetailLoading && !job) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-sk-bg px-4 text-center text-n-500">
        {seoElement}
        <div>
          <h1 className="text-2xl font-semibold text-n-900">Loading job...</h1>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-sk-bg px-4 text-center text-n-500">
        {seoElement}
        <div>
          <h1 className="text-2xl font-semibold text-n-900">
            {error ? "Could not load job" : "Job not found"}
          </h1>
          {error && <p className="mt-2 text-sm text-n-500">{error}</p>}
          <Link
            to="/jobs"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-sk-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sk-hover"
          >
            Browse jobs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  const alreadyApplied = isJobApplied(job, appliedJobIds);

  const closeApplyModal = () => {
    setShowApplyModal(false);
    setActiveTab(0);
    setFormData(resetApplicationForm);
    clearApplyState();
  };

  const handleAnswerChange = (questionId, value) => {
    clearApplyState();
    setFormData((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: value,
      },
    }));
  };

  const handleApplySubmit = async (event) => {
    event?.preventDefault();

    if (!accessToken) {
      toast.error("Session expired. Please sign in again.", {
        style: {
          background: "#FF6B35",
          color: "#ffffff",
          borderRadius: "8px",
        },
      });
      navigate("/seeker/login");
      return;
    }

    try {
      const answers = buildAnswerPayload(questions, formData.answers);
      const payload = await applyToJob(
        job.id,
        {
          cover_letter: formData.coverLetter.trim(),
          answers,
        },
        accessToken,
      );

      setIsSuccess(true);
      toast.success(payload?.message || "Application submitted successfully.");
      setTimeout(() => {
        setIsSuccess(false);
        closeApplyModal();
      }, 2000);
    } catch (submitError) {
      if (isAlreadyAppliedError(submitError)) {
        toast.success("You have already applied for this job.");
        closeApplyModal();
        return;
      }

      if (
        submitError.code === "REQUIRED_QUESTION_NOT_ANSWERED" ||
        submitError.code === "INVALID_JOB_QUESTION" ||
        submitError.code === "INVALID_SELECTED_OPTION" ||
        submitError.message.toLowerCase().includes("question")
      ) {
        setActiveTab(1);
      }

      toast.error(submitError.message, {
        style: {
          background: "#FF6B35",
          color: "#ffffff",
          borderRadius: "8px",
        },
      });
    }
  };

  const showLoginToast = () => {
    toast.error("Please sign in to apply for this job.", {
      style: {
        background: "#FF6B35",
        color: "#ffffff",
        borderRadius: "8px",
      },
    });
    setTimeout(() => {
      navigate("/seeker/login");
    }, 900);
  };

  const handleApplyJob = () => {
    if (alreadyApplied) {
      toast.success("You have already applied for this job.");
      return;
    }

    if (!isAuthenticated || !accessToken) {
      showLoginToast();
      return;
    }

    if (role !== "seeker") {
      toast.error("Please use a seeker account to apply for jobs.", {
        style: {
          background: "#FF6B35",
          color: "#ffffff",
          borderRadius: "8px",
        },
      });
      return;
    }

    clearApplyState();
    setShowApplyModal(true);
  };

  const primaryApplyAction = handleApplyJob;
  const primaryApplyLabel = alreadyApplied ? "Applied ✓" : "Apply now";
  const primaryApplyClass = alreadyApplied
    ? "bg-success-bg text-success border border-success/20 cursor-default"
    : "bg-sk-primary text-white hover:bg-sk-hover";
  const canContinue = formData.coverLetter.length <= 2000;

  return (
    <div className="min-h-screen bg-sk-bg text-n-900">
      {seoElement}

      {/* Page header — replaces HeroHighlight */}
      <div className="border-b border-n-200 bg-white px-4 py-10 md:py-14">
        <div className="mx-auto max-w-6xl">
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-n-500 transition hover:text-sk-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to jobs
          </Link>

          <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className="rounded-full border border-success/20 bg-success-bg px-3 py-1 text-xs font-semibold text-success">
                {job.type}
              </span>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-n-900 md:text-5xl">
                {job.title}
              </h1>
              <p className="mt-3 text-base text-n-500">
                {job.company} · {job.location}
              </p>
            </div>

            <button
              type="button"
              onClick={primaryApplyAction}
              disabled={alreadyApplied}
              className={`inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition sm:w-auto ${primaryApplyClass}`}
            >
              {primaryApplyLabel}
              {!alreadyApplied && <ArrowRight className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      <main className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[1fr_340px] lg:py-16">
        <section className="space-y-8">
          <article className="rounded-xl border border-n-200 bg-white p-6 shadow-sm md:p-8">
            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-semibold text-n-900">Job description</h2>
                <p className="mt-4 text-sm leading-7 text-n-500">{job.description}</p>
              </section>

              <SectionList title="Key responsibilities" items={job.responsibilities} />
              <SectionList title="Skills recruiters expect" items={job.skills} />
              {job.benefits?.length > 0 && (
                <SectionList title="Benefits" items={job.benefits} />
              )}
              {questions.length > 0 && (
                <section>
                  <h3 className="text-xl font-semibold text-n-900">Screening questions</h3>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-n-500">
                    {questions.map((question) => (
                      <li key={question.id} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sk-primary" />
                        <span>
                          {question.question_text}
                          <span className="ml-2 font-semibold text-sk-primary">
                            {formatQuestionType(question.question_type)}
                            {question.is_required ? " - Required" : ""}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </article>

          {relatedJobs.length > 0 && (
            <section>
              <h2 className="mb-5 text-2xl font-semibold text-n-900">Related jobs</h2>
              <div className="space-y-4">
                {relatedJobs.map((related) => (
                  <article
                    key={related.id}
                    className="rounded-xl border border-n-200 bg-n-50 p-5 transition hover:border-sk-primary hover:bg-white hover:shadow-sm"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <span className="rounded-full border border-success/20 bg-success-bg px-2.5 py-1 text-[11px] font-semibold text-success">
                          {related.type}
                        </span>
                        <h3 className="mt-3 text-base font-semibold text-n-900">
                          {related.title}
                        </h3>
                        <p className="mt-1 text-sm text-n-500">{related.company}</p>
                        <div className="mt-2 flex flex-wrap gap-2 text-xs font-medium">
                          <span className="text-n-500">{related.category}</span>
                          <span className="font-semibold text-sk-primary">{related.salary}</span>
                        </div>
                      </div>
                      <Link
                        to={`/jobs/${related.id}`}
                        state={{ job: related, allJobs }}
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-n-200 bg-white px-4 py-2 text-sm font-semibold text-n-900 transition hover:border-sk-primary hover:text-sk-primary"
                      >
                        View details
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </section>

        <aside className="space-y-6">
          <section className="rounded-xl border border-n-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-n-900">Job overview</h2>
            <div className="mt-5 space-y-3">
              <DetailRow label="Category" value={job.category} />
              <DetailRow label="Job type" value={job.jobTypeLabel || job.type} />
              <DetailRow label="Work mode" value={job.workModeLabel} />
              <DetailRow label="Experience" value={job.experience} />
              <DetailRow label="Degree" value={job.degree} />
              <DetailRow label="Salary" value={job.salary} highlight />
              <DetailRow label="Deadline" value={job.deadline || "Not listed"} />
              <DetailRow
                label="Openings"
                value={
                  job.openings != null
                    ? `${job.filledPositions ?? 0}/${job.openings} filled`
                    : "Not listed"
                }
              />
            </div>
            <button
              type="button"
              onClick={primaryApplyAction}
              disabled={alreadyApplied}
              className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition ${primaryApplyClass}`}
            >
              {primaryApplyLabel}
              {!alreadyApplied && <ArrowRight className="h-4 w-4" />}
            </button>
          </section>
        </aside>
      </main>

      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-n-200 bg-white shadow-xl">
            {isSuccess ? (
              <div className="flex flex-1 flex-col items-center justify-center p-10 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-success/20 bg-success-bg text-success">
                  <Check className="h-8 w-8" />
                </div>
                <h2 className="mt-5 text-xl font-semibold text-n-900">Application submitted</h2>
                <p className="mt-2 text-sm text-n-500">
                  Your application has been sent to {job.company}.
                </p>
              </div>
            ) : (
              <>
                <div className="border-b border-n-200 px-6 py-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-semibold text-n-900">Apply for {job.title}</h2>
                      <p className="mt-1 text-sm text-n-500">{job.company}</p>
                    </div>
                    <button
                      type="button"
                      onClick={closeApplyModal}
                      aria-label="Close application form"
                      className="rounded-lg border border-n-200 p-2 text-n-500 transition hover:bg-n-50 hover:text-n-900"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-5 flex border-b border-n-200">
                    {["Cover letter", "Recruiter questions"].map((label, index) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setActiveTab(index)}
                        className={`mr-6 border-b-2 px-1 pb-3 text-sm font-semibold transition ${
                          activeTab === index
                            ? "border-sk-primary text-sk-primary"
                            : "border-transparent text-n-500 hover:text-n-900"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <form
                  onSubmit={handleApplySubmit}
                  className="flex-1 space-y-5 overflow-y-auto p-6"
                >
                  {activeTab === 0 && (
                    <>
                      <div className="rounded-lg border border-sk-border bg-sk-surface p-4">
                        <p className="text-sm leading-6 text-n-500">
                          Your saved seeker profile and resume snapshot will be
                          used with this application.
                        </p>
                      </div>

                      <div>
                        <label className={LABEL_CLASS}>Cover letter</label>
                        <textarea
                          name="coverLetter"
                          value={formData.coverLetter}
                          onChange={(event) =>
                            setFormData((prev) => ({
                              ...prev,
                              coverLetter: event.target.value,
                            }))
                          }
                          maxLength={2000}
                          placeholder="I am interested in this role because..."
                          className={`${INPUT_CLASS} h-36 resize-none`}
                        />
                        <p className="mt-2 text-xs font-medium text-n-500">
                          {formData.coverLetter.length}/2000 characters
                        </p>
                      </div>
                    </>
                  )}

                  {activeTab === 1 && (
                    <>
                      <div className="rounded-lg border border-sk-border bg-sk-surface p-4">
                        <p className="text-sm leading-6 text-n-500">
                          Short, specific answers help recruiters understand your fit faster.
                        </p>
                      </div>

                      {questions.length === 0 ? (
                        <div className="rounded-lg border border-dashed border-n-200 bg-white p-4 text-sm font-semibold text-n-500">
                          No screening questions for this job.
                        </div>
                      ) : (
                        questions.map((question) => (
                          <div key={question.id}>
                            <label className={LABEL_CLASS}>
                              {question.question_text}
                              {question.is_required ? " *" : ""}
                            </label>
                            <QuestionInput
                              question={question}
                              value={formData.answers[question.id]}
                              onChange={(value) =>
                                handleAnswerChange(question.id, value)
                              }
                            />
                          </div>
                        ))
                      )}

                      {applyError && (
                        <div className="rounded-lg border border-error/20 bg-error-bg p-3 text-sm font-semibold text-error">
                          {applyError}
                        </div>
                      )}
                    </>
                  )}
                </form>

                <div className="border-t border-n-200 bg-white px-6 py-4">
                  <div className="flex gap-3">
                    {activeTab === 1 && (
                      <button
                        type="button"
                        onClick={() => setActiveTab(0)}
                        className="flex-1 rounded-lg border border-n-200 px-4 py-2.5 text-sm font-semibold text-n-500 transition hover:bg-n-50 hover:text-n-900"
                      >
                        Previous
                      </button>
                    )}

                    {activeTab === 0 ? (
                      <button
                        type="button"
                        disabled={!canContinue}
                        onClick={() => setActiveTab(1)}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-n-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-n-700 disabled:cursor-not-allowed disabled:bg-n-400"
                      >
                        Next
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleApplySubmit}
                        disabled={isApplying}
                        className="flex-1 rounded-lg bg-sk-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sk-hover disabled:cursor-not-allowed disabled:bg-sk-hover"
                      >
                        {isApplying ? "Submitting..." : "Submit application"}
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
