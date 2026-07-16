import { useEffect, useMemo, useState } from "react";
import toast from "@/lib/toast";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../../../store";
import { useCompanyStore } from "../../store/companyStore";

const stateLabels = {
  draft: "Draft",
  published: "Active",
  paused: "Paused",
  expired: "Expired",
  filled: "Filled",
  deleted: "Deleted",
};

const stateClasses = {
  draft: "bg-co-surface text-co-primary",
  published: "bg-success-bg text-success",
  paused: "bg-warning-bg text-warning",
  expired: "bg-error-bg text-error",
  filled: "bg-info-bg text-info",
  deleted: "bg-n-100 text-n-500",
};

const jobTypes = [
  ["", "All types"],
  ["full_time", "Full time"],
  ["part_time", "Part time"],
  ["internship", "Internship"],
  ["contract", "Contract"],
  ["freelance", "Freelance"],
  ["temporary", "Temporary"],
];

const workModes = [
  ["", "All modes"],
  ["remote", "Remote"],
  ["onsite", "Onsite"],
  ["hybrid", "Hybrid"],
];

const statusFilters = [
  ["", "All"],
  ["true", "Active"],
  ["false", "Drafts"],
];

const formatEnum = (value) =>
  value ? value.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()) : "-";

const getJobState = (job) => job.computed_job_post_state || (job.is_published ? "published" : "draft");

const JobList = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const {
    jobs,
    jobPagination,
    isLoading,
    isDeleting,
    isJobActionLoading,
    fetchCompanyJobs,
    publishCompanyJob,
    pauseCompanyJob,
    resumeCompanyJob,
    deleteCompanyJob,
    clearError,
  } = useCompanyStore();
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    is_published: "",
    job_type: "",
    work_mode: "",
    city: "",
    include_deleted: false,
  });

  const apiFilters = useMemo(
    () => ({
      ...filters,
      include_deleted: filters.include_deleted ? "true" : "",
    }),
    [filters],
  );

  useEffect(() => {
    if (!accessToken) return;
    fetchCompanyJobs(apiFilters, accessToken).catch((fetchError) => {
      toast.error(fetchError.message);
    });
  }, [accessToken, apiFilters, fetchCompanyJobs]);

  const updateFilter = (name, value) => {
    clearError();
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      page: name === "page" ? value : 1,
    }));
  };

  const runJobAction = async (action, successMessage) => {
    if (!accessToken) {
      toast.error("Session expired. Please sign in again.");
      return;
    }

    clearError();

    try {
      await action();
      await fetchCompanyJobs(apiFilters, accessToken);
      toast.success(successMessage);
    } catch (actionError) {
      if (actionError.code === "COMPANY_NOT_APPROVED") {
        toast.error(
          "Your company profile is pending admin approval. You can create draft jobs, but publishing will be enabled after approval.",
        );
        return;
      }

      toast.error(actionError.message);
    }
  };

  const handlePause = (jobId) => {
    const reason = window.prompt("Pause reason", "Hiring is temporarily paused.");
    if (reason === null) return;
    runJobAction(() => pauseCompanyJob(jobId, reason, accessToken), "Job paused successfully.");
  };

  const handleDelete = (jobId) => {
    const reason = window.prompt("Delete reason", "Position is no longer required.");
    if (reason === null) return;
    runJobAction(() => deleteCompanyJob(jobId, reason, accessToken), "Job deleted successfully.");
  };

  const canGoBack = Number(jobPagination.page) > 1;
  const canGoForward =
    Number(jobPagination.page) * Number(jobPagination.limit) < Number(jobPagination.total);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8 md:py-8">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-co-primary">
            Jobs
          </p>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-n-900 md:text-3xl">
            Job posts
          </h1>
        </div>
        <Link
          to="/company/jobs/new"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-co-primary px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-co-hover"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Post job
        </Link>
      </div>

      <section className="mb-4 grid grid-cols-1 gap-3 rounded-lg border border-n-200 bg-white p-4 md:grid-cols-3 xl:grid-cols-6">
        <input
          value={filters.search}
          onChange={(event) => updateFilter("search", event.target.value)}
          className="rounded-lg border border-n-200 bg-n-50 px-3 py-2 text-sm font-semibold text-n-900 outline-none focus:border-co-primary"
          placeholder="Search jobs"
          type="search"
        />
        <select
          value={filters.is_published}
          onChange={(event) => updateFilter("is_published", event.target.value)}
          className="rounded-lg border border-n-200 bg-n-50 px-3 py-2 text-sm font-semibold text-n-900 outline-none focus:border-co-primary"
        >
          {statusFilters.map(([value, label]) => (
            <option key={label} value={value}>
              {label}
            </option>
          ))}
        </select>
        <select
          value={filters.job_type}
          onChange={(event) => updateFilter("job_type", event.target.value)}
          className="rounded-lg border border-n-200 bg-n-50 px-3 py-2 text-sm font-semibold text-n-900 outline-none focus:border-co-primary"
        >
          {jobTypes.map(([value, label]) => (
            <option key={label} value={value}>
              {label}
            </option>
          ))}
        </select>
        <select
          value={filters.work_mode}
          onChange={(event) => updateFilter("work_mode", event.target.value)}
          className="rounded-lg border border-n-200 bg-n-50 px-3 py-2 text-sm font-semibold text-n-900 outline-none focus:border-co-primary"
        >
          {workModes.map(([value, label]) => (
            <option key={label} value={value}>
              {label}
            </option>
          ))}
        </select>
        <input
          value={filters.city}
          onChange={(event) => updateFilter("city", event.target.value)}
          className="rounded-lg border border-n-200 bg-n-50 px-3 py-2 text-sm font-semibold text-n-900 outline-none focus:border-co-primary"
          placeholder="City"
          type="text"
        />
        <label className="flex items-center gap-2 rounded-lg border border-n-200 bg-n-50 px-3 py-2 text-sm font-semibold text-n-700">
          <input
            checked={filters.include_deleted}
            onChange={(event) => updateFilter("include_deleted", event.target.checked)}
            className="h-4 w-4 accent-co-primary"
            type="checkbox"
          />
          Deleted
        </label>
      </section>

      <section className="overflow-hidden rounded-lg border border-n-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left">
            <thead>
              <tr className="border-b border-n-100 text-xs font-bold uppercase tracking-[0.08em] text-n-500">
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Mode</th>
                <th className="px-5 py-3">Location</th>
                <th className="px-5 py-3">Openings</th>
                <th className="px-5 py-3">Deadline</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td className="px-5 py-8 text-center text-sm font-semibold text-n-500" colSpan={8}>
                    Loading jobs...
                  </td>
                </tr>
              ) : jobs.length === 0 ? (
                <tr>
                  <td className="px-5 py-8 text-center text-sm font-semibold text-n-500" colSpan={8}>
                    No jobs found.
                  </td>
                </tr>
              ) : (
                jobs.map((job) => {
                  const jobState = getJobState(job);
                  return (
                    <tr
                      key={job.id}
                      className="border-b border-[#F2ECE7] transition-colors last:border-0 hover:bg-n-50"
                    >
                      <td className="px-5 py-4">
                        <p className="text-sm font-bold text-n-900">{job.job_title}</p>
                        <p className="mt-1 text-xs text-n-500">{job.job_slug}</p>
                      </td>
                      <td className="px-5 py-4 text-sm text-n-700">{formatEnum(job.job_type)}</td>
                      <td className="px-5 py-4 text-sm text-n-700">{formatEnum(job.work_mode)}</td>
                      <td className="px-5 py-4 text-sm text-n-700">
                        {job.job_location || [job.city, job.state].filter(Boolean).join(", ") || "-"}
                      </td>
                      <td className="px-5 py-4 text-sm text-n-700">
                        {job.filled_positions ?? 0}/{job.openings ?? 0}
                      </td>
                      <td className="px-5 py-4 text-sm text-n-700">
                        {job.application_deadline || "-"}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`rounded-lg px-2.5 py-1 text-xs font-bold ${
                            stateClasses[jobState] || "bg-zinc-100 text-zinc-700"
                          }`}
                        >
                          {stateLabels[jobState] || formatEnum(jobState)}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <Link
                            to={`/company/jobs/${job.id}/applications`}
                            className="rounded-lg border border-n-200 bg-white px-3 py-1.5 text-xs font-bold text-n-700 transition-colors hover:bg-n-50"
                          >
                            Applicants
                          </Link>
                          {jobState === "draft" && (
                            <button
                              onClick={() =>
                                runJobAction(
                                  () => publishCompanyJob(job.id, accessToken),
                                  "Job published successfully.",
                                )
                              }
                              disabled={isJobActionLoading}
                              className="rounded-lg border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700 disabled:opacity-60"
                              type="button"
                            >
                              Publish
                            </button>
                          )}
                          {jobState === "published" && (
                            <button
                              onClick={() => handlePause(job.id)}
                              disabled={isJobActionLoading}
                              className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700 disabled:opacity-60"
                              type="button"
                            >
                              Pause
                            </button>
                          )}
                          {jobState === "paused" && (
                            <button
                              onClick={() =>
                                runJobAction(
                                  () => resumeCompanyJob(job.id, accessToken),
                                  "Job resumed successfully.",
                                )
                              }
                              disabled={isJobActionLoading}
                              className="rounded-lg border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700 disabled:opacity-60"
                              type="button"
                            >
                              Resume
                            </button>
                          )}
                          {jobState !== "deleted" && (
                            <button
                              onClick={() => handleDelete(job.id)}
                              disabled={isDeleting}
                              className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700 disabled:opacity-60"
                              type="button"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>

      <div className="mt-4 flex flex-col justify-between gap-3 text-sm font-semibold text-n-700 sm:flex-row sm:items-center">
        <p>
          Page {jobPagination.page} of {Math.max(1, Math.ceil(jobPagination.total / jobPagination.limit))}
          {" "}({jobPagination.total} jobs)
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => updateFilter("page", Number(filters.page) - 1)}
            disabled={!canGoBack || isLoading}
            className="rounded-lg border border-n-200 bg-white px-3 py-2 disabled:opacity-50"
            type="button"
          >
            Previous
          </button>
          <button
            onClick={() => updateFilter("page", Number(filters.page) + 1)}
            disabled={!canGoForward || isLoading}
            className="rounded-lg border border-n-200 bg-white px-3 py-2 disabled:opacity-50"
            type="button"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobList;
