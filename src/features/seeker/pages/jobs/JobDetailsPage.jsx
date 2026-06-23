import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  X,
} from "lucide-react";
import JobsPublicNav from "./JobsPublicNav";
import { useAuthStore } from "../../../../store";
import { useJobStore } from "../../store/jobStore";
import useSEO from "@/seo/useSEO";
import seoMeta from "@/data/seoMeta";
import {
  buildBreadcrumbList,
  buildJobPosting,
  buildWebPage,
} from "@/seo/schemas";
import { HeroHighlight } from "../../../../components/ui/hero-highlight";

const INPUT_CLASS =
  "w-full rounded-[8px] border border-[#EADFD9] bg-[#F7F5F2] p-2.5 text-sm text-[#0A0A0A] outline-none transition placeholder:text-[#9F9FA9] focus:border-[#8500FA] focus:ring-2 focus:ring-[#8500FA]/15";
const LABEL_CLASS = "mb-2 block text-xs font-semibold uppercase text-[#6F6F76]";

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

const DetailRow = ({ label, value, highlight }) => (
  <div className="flex items-start justify-between gap-4 border-b border-[#EADFD9] pb-3 last:border-b-0 last:pb-0">
    <span className="text-sm text-[#6F6F76]">{label}</span>
    <span
      className={`text-right text-sm font-semibold ${
        highlight ? "text-[#8500FA]" : "text-[#0A0A0A]"
      }`}
    >
      {value || "-"}
    </span>
  </div>
);

const SectionList = ({ title, items }) => (
  <section>
    <h3 className="text-xl font-semibold text-[#0A0A0A]">{title}</h3>
    <ul className="mt-4 space-y-3 text-sm leading-6 text-[#6F6F76]">
      {items.map((item, index) => (
        <li key={index} className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF9566]" />
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
        <div className="space-y-2 rounded-[8px] border border-[#EADFD9] bg-[#F7F5F2] p-3">
          {options.map((option) => {
            const selectedValues = Array.isArray(value) ? value : [];
            return (
              <label
                key={option.id}
                className="flex items-center gap-2 text-sm font-medium text-[#6F6F76]"
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
                  className="h-4 w-4 accent-[#8500FA]"
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
      <div className="flex min-h-screen items-center justify-center bg-[#FFF7F3] px-4 text-center text-[#6F6F76]">
        {seoElement}
        <div>
          <h1 className="text-2xl font-semibold text-[#0A0A0A]">
            Loading job...
          </h1>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFF7F3] px-4 text-center text-[#6F6F76]">
        {seoElement}
        <div>
          <h1 className="text-2xl font-semibold text-[#0A0A0A]">
            {error ? "Could not load job" : "Job not found"}
          </h1>
          {error && <p className="mt-2 text-sm text-[#6F6F76]">{error}</p>}
          <Link
            to="/jobs"
            className="mt-4 inline-flex items-center gap-2 rounded-[8px] bg-[#FF6B35] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#FF9566]"
          >
            Browse jobs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

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
  const primaryApplyLabel = "Apply now";
  const canContinue = formData.coverLetter.length <= 2000;

  return (
    <div className="min-h-screen bg-[#FFF7F3] text-[#0A0A0A]">
      {seoElement}
      <JobsPublicNav />

      <HeroHighlight
        containerClassName="border-b border-[#EADFD9] bg-[#FFF7F3]"
        className="px-4 py-14 md:py-20"
      >
        <div className="mx-auto max-w-6xl">
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#6F6F76] transition hover:text-[#FF6B35]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to jobs
          </Link>

          <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className="rounded-[8px] border border-green-100 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                {job.type}
              </span>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-[#0A0A0A] md:text-5xl">
                {job.title}
              </h1>
              <p className="mt-3 text-base text-[#6F6F76]">
                {job.company} - {job.location}
              </p>
            </div>

            <button
              type="button"
              onClick={primaryApplyAction}
              className="inline-flex w-full items-center justify-center gap-2 rounded-[8px] bg-[#FF6B35] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#FF9566] sm:w-auto"
            >
              {primaryApplyLabel}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </HeroHighlight>

      <main className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[1fr_340px] lg:py-16">
        <section className="space-y-8">
          <article className="rounded-[8px] border border-[#EADFD9] bg-white p-6 md:p-8">
            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-semibold text-[#0A0A0A]">
                  Job description
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#6F6F76]">
                  {job.description}
                </p>
              </section>

              <SectionList
                title="Key responsibilities"
                items={job.responsibilities}
              />
              <SectionList title="Skills recruiters expect" items={job.skills} />
              {job.benefits?.length > 0 && (
                <SectionList title="Benefits" items={job.benefits} />
              )}
              {questions.length > 0 && (
                <section>
                  <h3 className="text-xl font-semibold text-[#0A0A0A]">
                    Screening questions
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-[#6F6F76]">
                    {questions.map((question) => (
                      <li key={question.id} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF9566]" />
                        <span>
                          {question.question_text}
                          <span className="ml-2 font-semibold text-[#8500FA]">
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
              <div className="mb-5">
                <h2 className="text-2xl font-semibold text-[#0A0A0A]">
                  Related jobs
                </h2>
              </div>

              <div className="space-y-4">
                {relatedJobs.map((related) => (
                  <article
                    key={related.id}
                    className="rounded-[8px] border border-[#EADFD9] bg-[#F7F5F2] p-5 transition hover:border-[#FF9566] hover:bg-white"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <span className="rounded-[8px] border border-green-100 bg-green-50 px-2.5 py-1 text-[11px] font-semibold text-green-700">
                          {related.type}
                        </span>
                        <h3 className="mt-3 text-base font-semibold text-[#0A0A0A]">
                          {related.title}
                        </h3>
                        <p className="mt-1 text-sm text-[#6F6F76]">
                          {related.company}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2 text-xs font-medium">
                          <span className="text-[#6F6F76]">
                            {related.category}
                          </span>
                          <span className="font-semibold text-[#8500FA]">
                            {related.salary}
                          </span>
                        </div>
                      </div>
                      <Link
                        to={`/jobs/${related.id}`}
                        state={{ job: related, allJobs }}
                        className="inline-flex items-center justify-center gap-2 rounded-[8px] border border-[#EADFD9] bg-white px-4 py-2 text-sm font-semibold text-[#0A0A0A] transition hover:border-[#FF9566] hover:text-[#FF6B35]"
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
          <section className="rounded-[8px] border border-[#EADFD9] bg-white p-6">
            <h2 className="text-lg font-semibold text-[#0A0A0A]">
              Job overview
            </h2>
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
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-[8px] bg-[#FF6B35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#FF9566]"
            >
              {primaryApplyLabel}
              <ArrowRight className="h-4 w-4" />
            </button>
          </section>
        </aside>
      </main>

      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-[8px] border border-[#EADFD9] bg-white shadow-xl">
            {isSuccess ? (
              <div className="flex flex-1 flex-col items-center justify-center p-10 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-green-100 bg-green-50 text-green-700">
                  <Check className="h-8 w-8" />
                </div>
                <h2 className="mt-5 text-xl font-semibold text-[#0A0A0A]">
                  Application submitted
                </h2>
                <p className="mt-2 text-sm text-[#6F6F76]">
                  Your application has been sent to {job.company}.
                </p>
              </div>
            ) : (
              <>
                <div className="border-b border-[#EADFD9] px-6 py-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-semibold text-[#0A0A0A]">
                        Apply for {job.title}
                      </h2>
                      <p className="mt-1 text-sm text-[#6F6F76]">
                        {job.company}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={closeApplyModal}
                      aria-label="Close application form"
                      className="rounded-[8px] border border-[#EADFD9] p-2 text-[#6F6F76] transition hover:bg-[#F7F5F2] hover:text-[#0A0A0A]"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-5 flex border-b border-[#EADFD9]">
                    {["Cover letter", "Recruiter questions"].map(
                      (label, index) => (
                        <button
                          key={label}
                          type="button"
                          onClick={() => setActiveTab(index)}
                          className={`mr-6 border-b-2 px-1 pb-3 text-sm font-semibold transition ${
                            activeTab === index
                              ? "border-[#8500FA] text-[#8500FA]"
                              : "border-transparent text-[#6F6F76] hover:text-[#0A0A0A]"
                          }`}
                        >
                          {label}
                        </button>
                      ),
                    )}
                  </div>
                </div>

                <form
                  onSubmit={handleApplySubmit}
                  className="flex-1 space-y-5 overflow-y-auto p-6"
                >
                  {activeTab === 0 && (
                    <>
                      <div className="rounded-[8px] border border-[#EADFD9] bg-[#FFF7F3] p-4">
                        <p className="text-sm leading-6 text-[#6F6F76]">
                          Your saved seeker profile and resume snapshot will be
                          used with this application.
                        </p>
                      </div>

                      <div>
                        <label className={LABEL_CLASS}>
                          Cover letter
                        </label>
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
                        <p className="mt-2 text-xs font-medium text-[#6F6F76]">
                          {formData.coverLetter.length}/2000 characters
                        </p>
                      </div>
                    </>
                  )}

                  {activeTab === 1 && (
                    <>
                      <div className="rounded-[8px] border border-[#EADFD9] bg-[#FFF7F3] p-4">
                        <p className="text-sm leading-6 text-[#6F6F76]">
                          Short, specific answers help recruiters understand
                          your fit faster.
                        </p>
                      </div>

                      {questions.length === 0 ? (
                        <div className="rounded-[8px] border border-dashed border-[#EADFD9] bg-white p-4 text-sm font-semibold text-[#6F6F76]">
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
                        <div className="rounded-[8px] border border-red-100 bg-red-50 p-3 text-sm font-semibold text-red-700">
                          {applyError}
                        </div>
                      )}
                    </>
                  )}
                </form>

                <div className="border-t border-[#EADFD9] bg-white px-6 py-4">
                  <div className="flex gap-3">
                    {activeTab === 1 && (
                      <button
                        type="button"
                        onClick={() => setActiveTab(0)}
                        className="flex-1 rounded-[8px] border border-[#EADFD9] px-4 py-2.5 text-sm font-semibold text-[#6F6F76] transition hover:bg-[#F7F5F2] hover:text-[#0A0A0A]"
                      >
                        Previous
                      </button>
                    )}

                    {activeTab === 0 ? (
                      <button
                        type="button"
                        disabled={!canContinue}
                        onClick={() => setActiveTab(1)}
                        className="flex flex-1 items-center justify-center gap-2 rounded-[8px] bg-[#15151A] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1D1D1E] disabled:cursor-not-allowed disabled:bg-[#9F9FA9]"
                      >
                        Next
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleApplySubmit}
                        disabled={isApplying}
                        className="flex-1 rounded-[8px] bg-[#FF6B35] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#FF9566] disabled:cursor-not-allowed disabled:bg-[#FF9566]"
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
