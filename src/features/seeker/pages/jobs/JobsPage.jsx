import React, { useState, useMemo } from "react";
import jobsData from "../../data/jobsData.json";
import { Link } from "react-router-dom";
import useSEO from "@/seo/useSEO";
import seoMeta from "@/data/seoMeta";
import {
  buildWebPage,
  buildBreadcrumbList,
  buildItemListOfJobs,
} from "@/seo/schemas";

// --- Minimal SVG Icons ---
const MagnifyingGlassIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-4 h-4 text-slate-400"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
    />
  </svg>
);

const MapPinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-3.5 h-3.5 text-slate-400"
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
    className="w-3.5 h-3.5 text-slate-400"
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
    className="w-3.5 h-3.5 text-slate-400"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
    />
  </svg>
);

const BookmarkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-4 h-4 text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
    />
  </svg>
);

const ArrowRightIcon = () => (
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
);

const JobCard = ({ job }) => (
  <div className="p-5 rounded border border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group">
    <div className="flex items-start gap-4 w-full md:w-auto">
      <div className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 text-slate-800 font-bold text-sm">
        {job.logoLetter}
      </div>
      <div>
        <h3 className="text-[15px] font-semibold text-slate-800 leading-tight mb-1 group-hover:text-indigo-600 transition-colors">
          {job.title}
        </h3>
        <p className="text-sm text-slate-500 mb-2">{job.company}</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 font-medium">
          <span className="flex items-center gap-1">
            <BriefcaseIcon /> {job.category}
          </span>
          <span className="flex items-center gap-1">
            <ClockIcon /> {job.time}
          </span>
          <span className="text-slate-900 font-semibold">{job.salary}</span>
        </div>
      </div>
    </div>

    <div className="flex flex-col items-end justify-between w-full md:w-auto h-full gap-3 self-center md:self-center">
      <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
        <MapPinIcon /> {job.location}
      </div>
      <div className="flex items-center gap-2">
        <span className="px-2.5 py-1 bg-slate-50 text-slate-500 text-[11px] font-semibold rounded-md">
          {job.time || "Full Time"}
        </span>
        <BookmarkIcon />
        <Link
          to={`/jobs/${job.id}`}
          state={{ job, allJobs: jobsData }}
          className="px-4 py-1.5 bg-indigo-600 text-white rounded text-xs font-medium hover:bg-indigo-700 transition-colors shadow-sm"
        >
          Apply
        </Link>
      </div>
    </div>
  </div>
);

const TopCompanyCard = ({ company }) => (
  <div className="p-5 rounded border border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm transition-all duration-300 flex flex-col items-center text-center">
    <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-3 text-lg font-bold text-slate-700">
      {company.logo}
    </div>
    <h4 className="font-semibold text-sm text-slate-800">{company.name}</h4>
    <p className="text-xs font-medium mt-1 text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
      {company.openPositions} Open Positions
    </p>
  </div>
);

const JobsPage = () => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("Newest");

  const types = ["Full Time", "Part Time", "Remote", "Internship"];

  const handleTypeToggle = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  // Filtering and Sorting Logic
  const filteredJobs = useMemo(() => {
    let result = [...jobsData];

    if (searchTerm) {
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (location) {
      result = result.filter((job) =>
        job.location.toLowerCase().includes(location.toLowerCase()),
      );
    }

    if (category) {
      result = result.filter(
        (job) => job.category.toLowerCase() === category.toLowerCase(),
      );
    }

    if (selectedTypes.length > 0) {
      result = result.filter((job) => selectedTypes.includes(job.time));
    }

    if (sortBy === "Newest") {
      result.reverse(); // Assuming original data is oldest to newest
    }

    return result;
  }, [searchTerm, location, category, selectedTypes, sortBy]);

  const companies = [
    { id: 1, name: "Instagram", logo: "IG", openPositions: 2 },
    { id: 2, name: "Tesla", logo: "T", openPositions: 4 },
    { id: 3, name: "McDonald's", logo: "M", openPositions: 6 },
    { id: 4, name: "Apple", logo: "A", openPositions: 8 },
  ];

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

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-800">
      {seoElement}
      {/* Minimal Header */}
      <div className="pt-12 pb-8 text-center px-4 bg-white border-b border-slate-100">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          Browse first jobs in India
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Verified openings for freshers across IT, sales, design, operations,
          and more.
        </p>
      </div>

      {/* MAIN CONTENT */}
      <main className="grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar Filters */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <aside className="p-6 rounded border border-slate-100 bg-white h-fit sticky top-24">
              <h3 className="font-semibold text-base text-slate-900 mb-5">
                Filters
              </h3>

              {/* Search Input */}
              <div className="mb-5">
                <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wide">
                  Keyword
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Job title..."
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 text-sm text-slate-700 placeholder-slate-400 transition-all"
                  />
                  <span className="absolute left-3 top-3">
                    <MagnifyingGlassIcon />
                  </span>
                </div>
              </div>

              {/* Location Dropdown */}
              <div className="mb-5">
                <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wide">
                  Location
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-100 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 text-sm text-slate-700 appearance-none cursor-pointer transition-all"
                >
                  <option value="">All Locations</option>
                  <option value="London">London, UK</option>
                  <option value="New York">New York, USA</option>
                </select>
              </div>

              {/* Category Dropdown */}
              <div className="mb-5">
                <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wide">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-100 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 text-sm text-slate-700 appearance-none cursor-pointer transition-all"
                >
                  <option value="">All Categories</option>
                  <option value="Private">Private</option>
                  <option value="Government">Government</option>
                </select>
              </div>

              {/* Custom Checkboxes */}
              <div className="mt-6">
                <label className="block text-xs font-medium text-slate-500 mb-3 uppercase tracking-wide">
                  Job Type
                </label>
                <div className="space-y-3">
                  {types.map((type) => (
                    <label
                      key={type}
                      onClick={() => handleTypeToggle(type)}
                      className="flex items-center space-x-3 cursor-pointer group"
                    >
                      <div
                        className={`w-4 h-4 border-2 rounded flex items-center justify-center transition-all duration-200 ${
                          selectedTypes.includes(type)
                            ? "bg-indigo-600 border-indigo-600"
                            : "border-slate-300 group-hover:border-slate-400"
                        }`}
                      >
                        {selectedTypes.includes(type) && (
                          <svg
                            className="w-2.5 h-2.5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={4}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <span
                        className={`text-sm transition-colors ${selectedTypes.includes(type) ? "text-slate-900 font-medium" : "text-slate-500"}`}
                      >
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedTypes([]);
                  setSearchTerm("");
                  setLocation("");
                  setCategory("");
                }}
                className="w-full mt-8 py-2.5 rounded text-sm font-medium text-slate-500 border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                Clear Filters
              </button>
            </aside>
          </div>

          {/* Right Job List */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-sm font-semibold text-slate-900">
                Showing{" "}
                <span className="text-slate-900 font-semibold">{filteredJobs.length}</span>{" "}
                Jobs
              </h2>
              <div className="flex items-center text-xs gap-2 text-slate-500">
                <span>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer"
                >
                  <option>Newest</option>
                  <option>Oldest</option>
                </select>
              </div>
            </div>

            {filteredJobs.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-slate-200 rounded bg-white">
                <p className="text-slate-400 font-medium">
                  No matches yet. Try a broader city or fewer filters; new
                  fresher roles arrive daily.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Top Companies Section */}
        <div className="mt-20 mb-10">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-slate-900">
              Recruiters hiring this month
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Indian companies who hired freshers through FirstJobIndia this
              season.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {companies.map((company) => (
              <TopCompanyCard key={company.id} company={company} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobsPage;
