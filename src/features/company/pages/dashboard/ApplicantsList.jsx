import React, { useEffect, useMemo, useState } from "react";
import toast from "@/lib/toast";
import { Link, useParams } from "react-router-dom";
import { useAuthStore } from "../../../../store";
import { useCompanyStore } from "../../store/companyStore";

const formatEnum = (value) =>
  value ? value.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()) : "-";

const formatDate = (value) => {
  if (!value) return "-";

  try {
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return value;
  }
};

const statusClasses = {
  submitted: "bg-info-bg text-info",
  withdrawn: "bg-n-100 text-n-500",
};

const getSnapshot = (applicant) => applicant.resume_snapshot || applicant;

const getApplicantName = (applicant) =>
  getSnapshot(applicant).full_name || applicant.full_name || "Applicant";

const getApplicantEmail = (applicant) =>
  getSnapshot(applicant).email || applicant.email || "-";

const getResumeUrl = (applicant) =>
  getSnapshot(applicant).resume_url || applicant.resume_url || "";

const getAnswerText = (answer) => {
  if (answer.answer_text) return answer.answer_text;
  if (answer.selected_option_text) return answer.selected_option_text;
  if (Array.isArray(answer.selected_option_ids) && answer.selected_option_ids.length) {
    return answer.selected_option_ids.join(", ");
  }
  if (answer.file_url) return answer.file_url;
  if (answer.url_answer) return answer.url_answer;
  return "-";
};

const ApplicantsList = () => {
  const { jobId } = useParams();
  const accessToken = useAuthStore((state) => state.accessToken);
  const {
    applicants,
    applicantJob,
    totalApplications,
    isApplicantsLoading,
    error,
    fetchJobApplications,
    clearError,
  } = useCompanyStore();
  const [role, setRole] = useState("All roles");
  const [status, setStatus] = useState("All");

  useEffect(() => {
    if (!jobId || !accessToken) return;

    clearError();
    fetchJobApplications(jobId, accessToken).catch((fetchError) => {
      toast.error(fetchError.message);
    });
  }, [accessToken, clearError, fetchJobApplications, jobId]);

  const roleTitle = applicantJob?.job_title || "Current role";
  const roles = useMemo(() => ["All roles", roleTitle], [roleTitle]);
  const statuses = useMemo(
    () => [
      "All",
      ...new Set(applicants.map((item) => item.status).filter(Boolean).map(formatEnum)),
    ],
    [applicants],
  );

  const filteredApplicants = applicants.filter((applicant) => {
    const applicantRole = applicantJob?.job_title || roleTitle;
    const matchesRole = role === "All roles" || applicantRole === role;
    const matchesStatus = status === "All" || formatEnum(applicant.status) === status;
    return matchesRole && matchesStatus;
  });

  const submittedCount = applicants.filter((item) => item.status === "submitted").length;
  const withdrawnCount = applicants.filter((item) => item.status === "withdrawn").length;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8 md:py-8">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-co-primary">
            Applicants
          </p>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-n-900 md:text-3xl">
            Candidate review
          </h1>
          {applicantJob && (
            <p className="mt-2 text-sm font-semibold text-n-500">
              {applicantJob.job_title} - {[applicantJob.city, applicantJob.state].filter(Boolean).join(", ")}
            </p>
          )}
        </div>
        <div className="grid grid-cols-3 gap-2 rounded-lg border border-n-200 bg-white p-2 text-center">
          <div className="px-3">
            <p className="text-lg font-extrabold text-n-900">{totalApplications}</p>
            <p className="text-xs font-semibold text-n-500">Total</p>
          </div>
          <div className="border-x border-n-100 px-3">
            <p className="text-lg font-extrabold text-n-900">{submittedCount}</p>
            <p className="text-xs font-semibold text-n-500">Submitted</p>
          </div>
          <div className="px-3">
            <p className="text-lg font-extrabold text-n-900">{withdrawnCount}</p>
            <p className="text-xs font-semibold text-n-500">Withdrawn</p>
          </div>
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-3 rounded-lg border border-n-200 bg-white p-3 md:flex-row md:items-center">
        <select
          value={role}
          onChange={(event) => setRole(event.target.value)}
          className="rounded-lg border border-n-200 bg-n-50 px-3 py-2 text-sm font-semibold text-n-700 outline-none focus:border-co-primary"
        >
          {roles.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <div className="flex flex-wrap gap-2">
          {statuses.map((item) => (
            <button
              key={item}
              onClick={() => setStatus(item)}
              className={`rounded-lg border px-3 py-2 text-sm font-bold transition-colors ${
                status === item
                  ? "border-co-primary bg-co-primary text-white"
                  : "border-n-200 bg-white text-n-700 hover:bg-n-50"
              }`}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {!jobId && (
        <div className="mb-4 rounded-lg border border-dashed border-n-200 bg-white px-6 py-8 text-center">
          <h2 className="text-lg font-bold text-n-900">
            Open applicants from a job post
          </h2>
          <p className="mt-2 text-sm font-semibold text-n-500">
            The applicant API requires a company job ID.
          </p>
          <Link
            to="/company/jobs"
            className="mt-4 inline-flex rounded-lg bg-co-primary px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-co-hover"
          >
            Go to jobs
          </Link>
        </div>
      )}

      <section className="overflow-hidden rounded-lg border border-n-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left">
            <thead>
              <tr className="border-b border-n-100 text-xs font-bold uppercase tracking-[0.08em] text-n-500">
                <th className="px-5 py-3">Candidate</th>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">Applied</th>
                <th className="px-5 py-3">Snapshot</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isApplicantsLoading ? (
                <tr>
                  <td className="px-5 py-8 text-center text-sm font-semibold text-n-500" colSpan={6}>
                    Loading applicants...
                  </td>
                </tr>
              ) : error && jobId ? (
                <tr>
                  <td className="px-5 py-8 text-center text-sm font-semibold text-red-600" colSpan={6}>
                    {error}
                  </td>
                </tr>
              ) : filteredApplicants.length === 0 ? (
                <tr>
                  <td className="px-5 py-8 text-center text-sm font-semibold text-n-500" colSpan={6}>
                    {jobId ? "No applicants found." : "Select a job to view applicants."}
                  </td>
                </tr>
              ) : (
                filteredApplicants.map((applicant) => {
                  const snapshot = getSnapshot(applicant);
                  const resumeUrl = getResumeUrl(applicant);
                  const screeningAnswers = applicant.screening_answers || [];
                  const rowId = applicant.application_id || applicant.id;

                  return (
                    <React.Fragment key={rowId}>
                      <tr className="border-b border-[#F2ECE7] transition-colors hover:bg-n-50">
                        <td className="px-5 py-4">
                          <p className="text-sm font-bold text-n-900">
                            {getApplicantName(applicant)}
                          </p>
                          <p className="text-xs text-n-500">
                            {getApplicantEmail(applicant)}
                          </p>
                          <p className="mt-1 text-xs text-n-500">
                            {snapshot.phone_no || applicant.phone_no || "-"}
                          </p>
                        </td>
                        <td className="px-5 py-4 text-sm font-semibold text-n-700">
                          <p>{applicantJob?.job_title || applicant.job_id}</p>
                          <p className="mt-1 text-xs text-n-500">
                            {[formatEnum(applicantJob?.job_type), formatEnum(applicantJob?.work_mode)]
                              .filter((item) => item !== "-")
                              .join(" - ") || "-"}
                          </p>
                        </td>
                        <td className="px-5 py-4 text-sm text-n-700">
                          {formatDate(applicant.applied_at)}
                        </td>
                        <td className="px-5 py-4 text-sm text-n-700">
                          <p className="font-semibold text-n-900">
                            {[snapshot.degree, snapshot.stream].filter(Boolean).join(" - ") || "-"}
                          </p>
                          <p className="mt-1 text-xs text-n-500">
                            {snapshot.graduation_year || ""}
                          </p>
                          <p className="mt-1 max-w-[220px] truncate text-xs text-n-500">
                            {snapshot.skills || "-"}
                          </p>
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`rounded-lg px-2.5 py-1 text-xs font-bold ${
                              statusClasses[applicant.status] || "bg-co-surface text-co-primary"
                            }`}
                          >
                            {formatEnum(applicant.status)}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-2">
                            {resumeUrl ? (
                              <a
                                href={resumeUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-lg border border-n-200 bg-white px-3 py-2 text-xs font-bold text-n-700 transition-colors hover:bg-n-50"
                              >
                                Resume
                              </a>
                            ) : (
                              <span className="rounded-lg border border-n-200 bg-white px-3 py-2 text-xs font-bold text-n-500">
                                No resume
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b border-[#F2ECE7] last:border-0">
                        <td className="px-5 pb-4" colSpan={6}>
                          <div className="rounded-lg border border-n-200 bg-n-50 p-4">
                            <div className="grid gap-3 text-xs font-semibold text-n-700 md:grid-cols-3">
                              <p>
                                Snapshot name:{" "}
                                <span className="text-n-900">{snapshot.full_name || "-"}</span>
                              </p>
                              <p>
                                Snapshot email:{" "}
                                <span className="text-n-900">{snapshot.email || "-"}</span>
                              </p>
                              <p>
                                Snapshot phone:{" "}
                                <span className="text-n-900">{snapshot.phone_no || "-"}</span>
                              </p>
                            </div>
                            <div className="mt-4 border-t border-n-100 pt-4">
                              <p className="text-xs font-bold uppercase tracking-[0.08em] text-n-500">
                                Screening answers
                              </p>
                              {screeningAnswers.length === 0 ? (
                                <p className="mt-2 text-sm font-semibold text-n-500">
                                  No screening answers submitted.
                                </p>
                              ) : (
                                <div className="mt-3 space-y-3">
                                  {screeningAnswers.map((answer) => (
                                    <div key={answer.answer_id || answer.question_id}>
                                      <p className="text-sm font-bold text-n-900">
                                        {answer.question_text}
                                      </p>
                                      <p className="mt-1 text-sm text-n-700">
                                        {getAnswerText(answer)}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ApplicantsList;
