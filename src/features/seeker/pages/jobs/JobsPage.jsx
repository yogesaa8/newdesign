import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Search,
  MapPin,
} from "lucide-react";
import { useJobStore } from "../../store/jobStore";
import useSEO from "@/seo/useSEO";
import seoMeta from "@/data/seoMeta";
import {
  buildBreadcrumbList,
  buildItemListOfJobs,
  buildWebPage,
} from "@/seo/schemas";
import { useAuthStore } from "../../../../store";
import { isJobApplied } from "../../store/jobStore";
import { EmptyState } from "@/components/ui/EmptyState";

const PAGE_LIMIT = 10;

const jobTypeOptions = [
  ["full_time", "Full time"],
  ["part_time", "Part time"],
  ["internship", "Internship"],
  ["contract", "Contract"],
  ["freelance", "Freelance"],
  ["temporary", "Temporary"],
];

const workModeOptions = [
  ["", "All work modes"],
  ["remote", "Remote"],
  ["onsite", "Onsite"],
  ["hybrid", "Hybrid"],
];

const formatCardDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const stripDeadlineLabel = (value = "") =>
  String(value).replace(/^Deadline\s*/i, "").trim();

const getJobCode = (job = {}) =>
  job.job_code ||
  job.job_id ||
  job.reference_id ||
  job.raw?.job_code ||
  job.raw?.job_id ||
  job.raw?.reference_id ||
  job.id;

const getPostedDate = (job = {}) =>
  formatCardDate(
    job.posted_at ||
      job.created_at ||
      job.published_at ||
      job.raw?.posted_at ||
      job.raw?.created_at ||
      job.raw?.published_at,
  );

const getEndDate = (job = {}) => {
  if (job.deadline) return job.deadline;
  if (job.raw?.application_deadline) {
    return formatCardDate(job.raw.application_deadline);
  }
  return /^Deadline/i.test(job.time || "") ? stripDeadlineLabel(job.time) : "";
};

const getSkills = (skills) => {
  if (Array.isArray(skills)) return skills.filter(Boolean);
  if (typeof skills === "string") {
    return skills.split(/,|;|\n/).map((s) => s.trim()).filter(Boolean);
  }
  return [];
};

const getShareUrl = (jobId) => {
  if (typeof window === "undefined") return `/jobs/${jobId}`;
  return `${window.location.origin}/jobs/${jobId}`;
};

// ─── Job Card ─────────────────────────────────────────────────────────────────

const JobCard = ({ job, isApplied }) => {
  const skills = getSkills(job.skills);
  const visibleSkills = skills.slice(0, 3);
  const remainingSkills = Math.max(0, skills.length - visibleSkills.length);
  const postedDate = getPostedDate(job) || "Not listed";
  const endDate = getEndDate(job) || "Not listed";
  const jobCode = getJobCode(job);

  const handleShare = async () => {
    const url = getShareUrl(job.id);
    try {
      if (navigator.share) {
        await navigator.share({ title: job.title, text: `${job.title} at ${job.company}`, url });
        return;
      }
      await navigator.clipboard?.writeText(url);
    } catch {
      // silent
    }
  };

  return (
    <article className="flex h-full flex-col rounded-xl border border-n-200 border-l-4 border-l-sk-primary bg-white p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <header className="min-w-0">
        <h2 className="truncate text-base font-bold text-n-900 leading-tight" title={job.title}>
          {job.title}
        </h2>
        <p className="mt-0.5 truncate text-xs text-n-400">ID: {jobCode}</p>
      </header>

      {/* Company + location */}
      <div className="mt-3 flex items-center gap-1.5 text-xs text-n-500">
        <span className="font-medium truncate">{job.company}</span>
        {job.location && (
          <>
            <span className="text-n-300">·</span>
            <span className="flex items-center gap-0.5 shrink-0">
              <MapPin size={11} className="text-n-400" />
              {job.location}
            </span>
          </>
        )}
      </div>

      {/* Meta */}
      <div className="mt-3 border-t border-n-100 pt-3 space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-n-400">Posted</span>
          <span className="font-semibold text-n-700">{postedDate}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-n-400">Deadline</span>
          <span className="font-semibold text-n-700">{endDate}</span>
        </div>
        {job.experience && (
          <div className="flex justify-between text-xs">
            <span className="text-n-400">Experience</span>
            <span className="font-semibold text-n-700">{job.experience}</span>
          </div>
        )}
      </div>

      {/* Skills */}
      {(visibleSkills.length > 0) && (
        <div className="mt-3 border-t border-n-100 pt-3">
          <div className="flex flex-wrap gap-1.5">
            {visibleSkills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-n-100 px-2.5 py-1 text-[10px] font-medium text-n-700 truncate max-w-[120px]"
                title={skill}
              >
                {skill}
              </span>
            ))}
            {remainingSkills > 0 && (
              <span className="rounded-full bg-n-100 px-2.5 py-1 text-[10px] font-medium text-n-500">
                +{remainingSkills}
              </span>
            )}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="mt-auto flex gap-2 pt-4">
        <button
          type="button"
          onClick={handleShare}
          className="flex-1 rounded-lg border border-n-200 bg-white px-3 py-2 text-xs font-semibold text-n-700 transition hover:bg-n-50"
        >
          Share
        </button>
        <Link
          to={`/jobs/${job.id}`}
          state={{ job }}
          className={`flex-1 rounded-lg px-3 py-2 text-center text-xs font-bold transition ${
            isApplied
              ? "border border-success/30 bg-success-bg text-success"
              : "bg-sk-primary text-white hover:bg-sk-hover"
          }`}
        >
          {isApplied ? "Applied ✓" : "View & Apply"}
        </Link>
      </div>
    </article>
  );
};

// ─── Loading skeleton ─────────────────────────────────────────────────────────

const JobCardSkeleton = () => (
  <div className="rounded-xl border border-n-200 border-l-4 border-l-n-200 bg-white p-5 animate-pulse space-y-3">
    <div className="h-5 bg-n-200 rounded w-3/4" />
    <div className="h-3 bg-n-100 rounded w-1/2" />
    <div className="h-px bg-n-100 my-3" />
    <div className="space-y-2">
      <div className="h-3 bg-n-100 rounded w-full" />
      <div className="h-3 bg-n-100 rounded w-2/3" />
    </div>
    <div className="flex gap-1.5 pt-2">
      <div className="h-6 bg-n-100 rounded-full w-16" />
      <div className="h-6 bg-n-100 rounded-full w-16" />
      <div className="h-6 bg-n-100 rounded-full w-10" />
    </div>
    <div className="flex gap-2 pt-2">
      <div className="h-8 bg-n-100 rounded-lg flex-1" />
      <div className="h-8 bg-sk-surface rounded-lg flex-1" />
    </div>
  </div>
);

// ─── Filter bar ───────────────────────────────────────────────────────────────

const FilterSelect = ({ label, value, onChange, options }) => (
  <label className="relative inline-flex items-center">
    <span className="sr-only">{label}</span>
    <select
      value={value}
      onChange={onChange}
      aria-label={label}
      className="appearance-none rounded-lg border border-n-200 bg-white py-2 pl-3 pr-7 text-xs font-medium text-n-700 outline-none focus:border-sk-primary focus:ring-2 focus:ring-sk-primary/10 transition"
    >
      {options.map(([optionValue, optionLabel]) => (
        <option key={`${label}-${optionValue || "all"}`} value={optionValue}>
          {optionLabel}
        </option>
      ))}
    </select>
    <ChevronDown className="pointer-events-none absolute right-2 h-3.5 w-3.5 text-n-400" />
  </label>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

const JobsPage = () => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [workMode, setWorkMode] = useState("");
  const [sortBy, setSortBy] = useState("Newest");
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(true);
  const accessToken = useAuthStore((state) => state.accessToken);
  const role = useAuthStore((state) => state.role);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const {
    jobs,
    pagination,
    isLoading,
    error,
    appliedJobIds,
    fetchJobs,
    fetchAppliedJobs,
    clearError,
  } = useJobStore();

  const apiFilters = useMemo(
    () => ({
      page,
      limit: PAGE_LIMIT,
      search: searchTerm.trim(),
      job_type: selectedTypes[0] || "",
      work_mode: workMode,
      city: location.trim(),
    }),
    [location, page, searchTerm, selectedTypes, workMode],
  );

  useEffect(() => {
    fetchJobs(apiFilters).catch(() => {});
  }, [apiFilters, fetchJobs]);

  useEffect(() => {
    if (!isAuthenticated || role !== "seeker" || !accessToken) return;
    fetchAppliedJobs(accessToken).catch(() => {});
  }, [accessToken, fetchAppliedJobs, isAuthenticated, role]);

  const updateFilter = (setter) => (event) => {
    clearError();
    setPage(1);
    setter(event.target.value);
  };

  const handleTypeChange = (event) => {
    clearError();
    setPage(1);
    setSelectedTypes(event.target.value ? [event.target.value] : []);
  };

  const filteredJobs = useMemo(() => {
    const result = [...jobs];
    return sortBy === "Oldest" ? result.reverse() : result;
  }, [jobs, sortBy]);

  const meta = seoMeta["/jobs"];
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Jobs", path: meta.path },
  ];
  const seoElement = useSEO({
    title: meta.title,
    description: meta.description,
    path: meta.path,
    graph: [
      buildWebPage({ path: meta.path, title: meta.title, description: meta.description, breadcrumbPath: meta.path }),
      buildBreadcrumbList(breadcrumbs, meta.path),
      buildItemListOfJobs(filteredJobs.slice(0, 20), "/jobs"),
    ],
  });

  const hasActiveFilters = selectedTypes.length > 0 || searchTerm || location || workMode;
  const clearFilters = () => {
    clearError();
    setSelectedTypes([]);
    setSearchTerm("");
    setLocation("");
    setWorkMode("");
    setPage(1);
  };

  const currentPage = Number(pagination.page) || page;
  const currentLimit = Number(pagination.limit) || PAGE_LIMIT;
  const totalJobs = Number(pagination.total) || filteredJobs.length;
  const totalPages = Math.max(1, Math.ceil(totalJobs / currentLimit));
  const canGoBack = currentPage > 1;
  const canGoForward = currentPage < totalPages;
  const showingTo = totalJobs
    ? Math.min(currentPage * currentLimit, totalJobs)
    : filteredJobs.length;

  return (
    <div className="min-h-screen bg-sk-bg text-n-900">
      {seoElement}

      <main id="job-search" className="mx-auto w-full max-w-[1280px] px-4 py-6">
        {/* Page header */}
        <div className="mb-5">
          <h1 className="text-xl font-bold text-n-900">All Jobs</h1>
          {totalJobs > 0 && !isLoading && (
            <p className="text-sm text-n-500 mt-0.5">{totalJobs} positions available</p>
          )}
        </div>

        {/* Search + filters bar */}
        <div className="bg-white border border-n-200 rounded-xl p-4 mb-5 shadow-sm">
          {/* Search row */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-n-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={updateFilter(setSearchTerm)}
                placeholder="Search by role, skill, or company"
                className="w-full rounded-lg border border-n-200 bg-white py-2.5 pl-9 pr-3 text-sm text-n-900 outline-none placeholder:text-n-400 focus:border-sk-primary focus:ring-2 focus:ring-sk-primary/10 transition"
              />
            </div>
            <div className="relative sm:w-52">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-n-400" />
              <input
                type="text"
                value={location}
                onChange={updateFilter(setLocation)}
                placeholder="City or location"
                className="w-full rounded-lg border border-n-200 bg-white py-2.5 pl-9 pr-3 text-sm text-n-900 outline-none placeholder:text-n-400 focus:border-sk-primary focus:ring-2 focus:ring-sk-primary/10 transition"
              />
            </div>
          </div>

          {/* Filter selects row */}
          {showFilters && (
            <div className="mt-3 pt-3 border-t border-n-100 flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold text-n-400 uppercase tracking-wider">Filter by</span>
              <FilterSelect
                label="Job type"
                value={selectedTypes[0] || ""}
                onChange={handleTypeChange}
                options={[["", "Job Type"], ...jobTypeOptions]}
              />
              <FilterSelect
                label="Work mode"
                value={workMode}
                onChange={updateFilter(setWorkMode)}
                options={workModeOptions.map(([v, l]) => [v, v ? l : "Work Mode"])}
              />
              <FilterSelect
                label="Sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                options={[["Newest", "Newest"], ["Oldest", "Oldest"]]}
              />
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs font-semibold text-error hover:underline ml-auto"
                >
                  Clear filters ×
                </button>
              )}
            </div>
          )}

          {/* Toggle filters */}
          <div className={`${showFilters ? "mt-3 pt-3 border-t border-n-100" : "mt-3"} flex justify-end`}>
            <button
              type="button"
              onClick={() => setShowFilters((v) => !v)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-n-500 hover:text-n-900 transition"
            >
              {showFilters ? "Hide filters" : "Show filters"}
              {showFilters ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        {/* Active filter chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedTypes[0] && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sk-surface border border-sk-border text-sk-primary px-3 py-1 text-xs font-semibold">
                {jobTypeOptions.find(([v]) => v === selectedTypes[0])?.[1]}
                <button onClick={() => { setSelectedTypes([]); setPage(1); }} className="hover:text-sk-pressed">×</button>
              </span>
            )}
            {workMode && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sk-surface border border-sk-border text-sk-primary px-3 py-1 text-xs font-semibold">
                {workMode}
                <button onClick={() => { setWorkMode(""); setPage(1); }} className="hover:text-sk-pressed">×</button>
              </span>
            )}
          </div>
        )}

        {/* Grid / empty / loading */}
        <section>
          {isLoading && filteredJobs.length === 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => <JobCardSkeleton key={i} />)}
            </div>
          ) : error ? (
            <EmptyState
              icon="⚠️"
              title="Could not load jobs"
              description={error}
              actionLabel="Try again"
              onAction={() => fetchJobs(apiFilters).catch(() => {})}
            />
          ) : filteredJobs.length === 0 ? (
            <EmptyState
              icon="🔍"
              title="No jobs found"
              description="Try a broader role, city, or type."
              actionLabel="Reset Filters"
              onAction={clearFilters}
            />
          ) : (
            <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  isApplied={isJobApplied(job, appliedJobIds)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Pagination */}
        <div className="sticky bottom-0 z-10 mt-6 flex flex-col gap-3 border-t border-n-200 bg-white/95 px-4 py-3 text-xs font-semibold text-n-700 shadow-[0_-2px_12px_rgba(15,23,42,0.06)] backdrop-blur sm:flex-row sm:items-center sm:justify-between rounded-t-xl">
          <div className="flex items-center gap-2">
            <span className="text-n-400">Showing</span>
            <span className="rounded bg-n-100 px-2 py-0.5 text-n-900">{showingTo}</span>
            <span className="text-n-400">of {totalJobs}</span>
          </div>

          <div className="flex items-center gap-1 self-end sm:self-auto">
            <button
              type="button"
              onClick={() => setPage(1)}
              disabled={!canGoBack || isLoading}
              className="rounded px-2 py-1 text-n-400 transition hover:bg-n-100 hover:text-n-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              First
            </button>
            <button
              type="button"
              aria-label="Previous page"
              onClick={() => setPage((v) => Math.max(1, v - 1))}
              disabled={!canGoBack || isLoading}
              className="rounded p-1 text-n-400 transition hover:bg-n-100 hover:text-n-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="rounded bg-sk-surface px-2 py-0.5 text-sk-primary">
              {currentPage}
            </span>
            <button
              type="button"
              aria-label="Next page"
              onClick={() => setPage((v) => Math.min(totalPages, v + 1))}
              disabled={!canGoForward || isLoading}
              className="rounded p-1 text-n-400 transition hover:bg-n-100 hover:text-n-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setPage(totalPages)}
              disabled={!canGoForward || isLoading}
              className="rounded px-2 py-1 text-n-400 transition hover:bg-n-100 hover:text-n-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Last
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobsPage;
