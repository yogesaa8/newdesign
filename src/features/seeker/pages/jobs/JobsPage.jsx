import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Info,
  Search,
} from "lucide-react";
import { useJobStore } from "../../store/jobStore";
import useSEO from "@/seo/useSEO";
import seoMeta from "@/data/seoMeta";
import {
  buildBreadcrumbList,
  buildItemListOfJobs,
  buildWebPage,
} from "@/seo/schemas";

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

const selectClass =
  "h-8 min-w-[128px] appearance-none border-0 border-b border-[#D8DCE7] bg-transparent py-1 pl-0 pr-7 text-xs font-medium uppercase text-[#001B44] outline-none transition focus:border-[#001B44]";

const inputClass =
  "h-8 w-full rounded-[6px] border border-[#DDE1EA] bg-white py-1.5 pl-8 pr-3 text-xs text-[#001B44] outline-none transition placeholder:text-[#8B95AA] focus:border-[#2E6BFF] focus:ring-2 focus:ring-[#2E6BFF]/10";

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
    return skills
      .split(/,|;|\n/)
      .map((skill) => skill.trim())
      .filter(Boolean);
  }

  return [];
};

const getShareUrl = (jobId) => {
  if (typeof window === "undefined") return `/jobs/${jobId}`;
  return `${window.location.origin}/jobs/${jobId}`;
};

const FilterSelect = ({ label, value, onChange, options }) => (
  <label className="relative inline-flex items-center gap-2">
    <span className="sr-only">{label}</span>
    <select
      value={value}
      onChange={onChange}
      className={selectClass}
      aria-label={label}
    >
      {options.map(([optionValue, optionLabel]) => (
        <option key={`${label}-${optionValue || "all"}`} value={optionValue}>
          {optionLabel}
        </option>
      ))}
    </select>
    <ChevronDown className="pointer-events-none absolute right-1 h-4 w-4 text-[#001B44]" />
  </label>
);

const JobCard = ({ job }) => {
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
        await navigator.share({
          title: job.title,
          text: `${job.title} at ${job.company}`,
          url,
        });
        return;
      }

      await navigator.clipboard?.writeText(url);
    } catch {
      // Sharing is optional; keep the card interaction silent on cancel/failure.
    }
  };

  return (
    <article className="flex h-full min-h-[280px] flex-col rounded-[7px] border border-[#E6E9F0] bg-white px-2.5 py-2.5 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
      <header className="min-w-0">
        <h2
          className="truncate text-[15px] font-bold leading-5 text-[#001B44]"
          title={job.title}
        >
          {job.title}
        </h2>
        <p className="mt-0.5 truncate text-[11px] font-medium text-[#001B44]">
          Job ID: {jobCode}
        </p>
      </header>

      <div className="mt-2 border-t border-[#E8EAF0] pt-2">
        <p className="truncate text-[11px] font-medium text-[#8993AA]">
          <span>{job.company}</span>
          <span className="mx-1 text-[#C0C5D1]">|</span>
          <span>{job.location}</span>
        </p>
        <p className="mt-1 text-[11px] font-medium text-[#8993AA]">
          Posted On:{" "}
          <span className="font-bold text-[#001B44]">{postedDate}</span>
          <span className="mx-1 text-[#C0C5D1]">|</span>
          End Date: <span className="font-bold text-[#001B44]">{endDate}</span>
        </p>
      </div>

      <div className="mt-2 border-t border-[#E8EAF0] pt-2">
        <p className="text-[11px] font-medium leading-4 text-[#001B44]">
          Required Experience
        </p>
        <p className="text-[12px] font-bold leading-4 text-[#001B44]">
          {job.experience || "Not listed"}
        </p>
      </div>

      <div className="mt-2 border-t border-[#E8EAF0] pt-2">
        <p className="text-[11px] font-medium leading-4 text-[#001B44]">
          Required Skills
        </p>
        <div className="mt-2 flex max-h-[58px] flex-wrap gap-1.5 overflow-hidden">
          {visibleSkills.length > 0 ? (
            <>
              {visibleSkills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex max-w-full items-center rounded-[4px] bg-[#F3F4F6] px-3 py-1.5 text-[11px] font-medium uppercase leading-none text-[#001B44]"
                  title={skill}
                >
                  <span className="truncate">{skill}</span>
                </span>
              ))}
              {remainingSkills > 0 && (
                <span className="inline-flex items-center rounded-[4px] bg-[#F3F4F6] px-3 py-1.5 text-[11px] font-medium leading-none text-[#001B44]">
                  +{remainingSkills}
                </span>
              )}
            </>
          ) : (
            <span className="inline-flex items-center rounded-[4px] bg-[#F3F4F6] px-3 py-1.5 text-[11px] font-medium leading-none text-[#001B44]">
              Not listed
            </span>
          )}
        </div>
      </div>

      <div className="mt-auto flex gap-2 pt-4">
        <button
          type="button"
          onClick={handleShare}
          className="inline-flex h-7 flex-1 items-center justify-center rounded-[5px] border border-[#001B44] bg-white px-3 text-[11px] font-bold text-[#001B44] transition hover:bg-[#F5F6FA]"
        >
          Share
        </button>
        <Link
          to={`/jobs/${job.id}`}
          state={{ job }}
          className="inline-flex h-7 flex-1 items-center justify-center rounded-[5px] bg-[#FF762F] px-3 text-center text-[11px] font-bold text-white transition hover:bg-[#F06422]"
        >
          Register And Apply
        </Link>
      </div>
    </article>
  );
};

const JobsPage = () => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [workMode, setWorkMode] = useState("");
  const [sortBy, setSortBy] = useState("Newest");
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(true);
  const {
    jobs,
    pagination,
    isLoading,
    error,
    fetchJobs,
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
      buildWebPage({
        path: meta.path,
        title: meta.title,
        description: meta.description,
        breadcrumbPath: meta.path,
      }),
      buildBreadcrumbList(breadcrumbs, meta.path),
      buildItemListOfJobs(filteredJobs.slice(0, 20), "/jobs"),
    ],
  });
  const hasActiveFilters =
    selectedTypes.length > 0 || searchTerm || location || workMode;
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
    <div className="min-h-screen bg-[#F5F6FA] text-[#001B44]">
      {seoElement}

      <main id="job-search" className="mx-auto w-full max-w-[1280px] px-2 py-4 sm:px-4 lg:px-2">
        <h1 className="text-[18px] font-bold leading-6 text-[#001B44]">
          All Jobs
        </h1>

        <section className="mt-3 rounded-[8px] bg-white px-3 py-4 shadow-[0_1px_8px_rgba(15,23,42,0.03)]">
          {showFilters && (
            <div className="flex flex-wrap items-center gap-x-5 gap-y-4">
              <span className="text-[12px] font-bold uppercase tracking-wide text-[#001B44]">
                Filter By
              </span>

              <FilterSelect
                label="Job type"
                value={selectedTypes[0] || ""}
                onChange={handleTypeChange}
                options={[["", "Job Type"], ...jobTypeOptions]}
              />

              <label className="relative inline-flex items-center">
                <span className="sr-only">Location</span>
                <input
                  type="text"
                  value={location}
                  onChange={updateFilter(setLocation)}
                  placeholder="Location"
                  className="h-8 min-w-[128px] border-0 border-b border-[#D8DCE7] bg-transparent py-1 pl-0 pr-2 text-xs font-medium uppercase text-[#001B44] outline-none placeholder:text-[#001B44] focus:border-[#001B44]"
                />
              </label>

              <FilterSelect
                label="Work mode"
                value={workMode}
                onChange={updateFilter(setWorkMode)}
                options={workModeOptions.map(([value, label]) => [
                  value,
                  value ? label : "Work Mode",
                ])}
              />

              <FilterSelect
                label="Sort"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                options={[
                  ["Newest", "Newest"],
                  ["Oldest", "Oldest"],
                ]}
              />
            </div>
          )}

          <div className={`${showFilters ? "mt-6" : ""} flex items-center justify-between gap-3 border-t border-[#DDE1EA] pt-3`}>
            <div>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-[11px] font-bold uppercase text-[#001B44] transition hover:text-[#FF762F]"
                >
                  Clear Filters
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowFilters((value) => !value)}
              className="inline-flex items-center gap-1 text-[11px] font-bold uppercase text-[#001B44]"
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
              {showFilters ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          </div>
        </section>

        <div className="mt-4 flex items-center gap-1.5">
          <div className="relative w-full max-w-[345px]">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#2E6BFF]" />
            <input
              type="text"
              value={searchTerm}
              onChange={updateFilter(setSearchTerm)}
              placeholder="Search Job"
              className={inputClass}
            />
          </div>
          <Info className="h-4 w-4 shrink-0 text-[#001B44]" />
        </div>

        <section className="mt-5">
          {isLoading && filteredJobs.length === 0 ? (
            <div className="rounded-[8px] border border-dashed border-[#DDE1EA] bg-white px-6 py-16 text-center">
              <h2 className="text-lg font-semibold text-[#001B44]">
                Loading jobs...
              </h2>
            </div>
          ) : error ? (
            <div className="rounded-[8px] border border-dashed border-[#DDE1EA] bg-white px-6 py-16 text-center">
              <h2 className="text-lg font-semibold text-[#001B44]">
                Could not load jobs
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-[#68738A]">
                {error}
              </p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="rounded-[8px] border border-dashed border-[#DDE1EA] bg-white px-6 py-16 text-center">
              <h2 className="text-lg font-semibold text-[#001B44]">
                No jobs found
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-[#68738A]">
                Try a broader role, city, or type.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </section>

        <div className="sticky bottom-0 z-10 mt-5 flex flex-col gap-3 border-t border-[#E6E9F0] bg-white/95 px-4 py-3 text-[11px] font-bold uppercase text-[#222936] shadow-[0_-2px_12px_rgba(15,23,42,0.06)] backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span>Showing</span>
            <span className="rounded-[3px] bg-[#E8EEF9] px-2 py-1 text-[#001B44]">
              {showingTo}
            </span>
            <span>Of {totalJobs}</span>
          </div>

          <div className="flex items-center gap-1 self-end sm:self-auto">
            <button
              type="button"
              onClick={() => setPage(1)}
              disabled={!canGoBack || isLoading}
              className="rounded-[3px] px-2 py-1 text-[#8993AA] transition hover:bg-[#F3F4F6] hover:text-[#001B44] disabled:cursor-not-allowed disabled:opacity-50"
            >
              First
            </button>
            <button
              type="button"
              aria-label="Previous page"
              onClick={() => setPage((value) => Math.max(1, value - 1))}
              disabled={!canGoBack || isLoading}
              className="rounded-[3px] p-1 text-[#8993AA] transition hover:bg-[#F3F4F6] hover:text-[#001B44] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="rounded-[3px] bg-[#F4E9E3] px-2 py-1 text-[#FF762F]">
              {currentPage}
            </span>
            <button
              type="button"
              aria-label="Next page"
              onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
              disabled={!canGoForward || isLoading}
              className="rounded-[3px] p-1 text-[#8993AA] transition hover:bg-[#F3F4F6] hover:text-[#001B44] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setPage(totalPages)}
              disabled={!canGoForward || isLoading}
              className="rounded-[3px] px-2 py-1 text-[#8993AA] transition hover:bg-[#F3F4F6] hover:text-[#001B44] disabled:cursor-not-allowed disabled:opacity-50"
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
