import React, { useState } from "react";
import jobsData from "../../../data/jobsData.json";
import { Link } from "react-router-dom";

// --- Icons (Components) ---
const MagnifyingGlassIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-5 h-5 text-outline"
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
    strokeWidth={2}
    stroke="currentColor"
    className="w-4 h-4 mr-1 text-outline"
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
    strokeWidth={2}
    stroke="currentColor"
    className="w-4 h-4 mr-1 text-outline"
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
    strokeWidth={2}
    stroke="currentColor"
    className="w-4 h-4 mr-1 text-outline"
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
    strokeWidth={2}
    stroke="currentColor"
    className="w-5 h-5 text-outline hover:text-primary cursor-pointer"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
    />
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-4 h-4 ml-2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
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
    className="w-4 h-4 ml-2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
    />
  </svg>
);

const JobCard = ({ job }) => (
  <div className="bg-white p-5 rounded-xl shadow-sm border border-outline-variant hover:shadow-md transition duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
    <div className="flex items-start gap-4 w-full md:w-auto">
      <div className="w-14 h-14 bg-surface-container-low rounded-lg flex items-center justify-center flex-shrink-0 border border-outline-variant">
        <span className="text-xl font-bold text-primary">{job.logoLetter}</span>
      </div>
      <div>
        <h3 className="text-lg font-bold text-on-surface leading-tight mb-1">
          {job.title}
        </h3>
        <p className="text-on-surface-variant font-medium text-sm mb-2">{job.company}</p>
        <div className="flex flex-wrap items-center gap-4 text-xs text-outline font-medium">
          <span className="flex items-center bg-surface-container px-2 py-1 rounded text-on-surface">
            <BriefcaseIcon /> {job.category}
          </span>
          <span className="flex items-center">
            <ClockIcon /> {job.time}
          </span>
          <span className="flex items-center text-on-surface font-semibold">
            {job.salary}
          </span>
        </div>
      </div>
    </div>

    <div className="flex flex-col items-end justify-between w-full md:w-auto h-full gap-2 self-center">
      <div className="flex items-center gap-2 text-outline text-sm font-medium mb-2 md:mb-0">
        <MapPinIcon /> {job.location}
      </div>
      <div className="flex items-center gap-3">
        <span className="px-3 py-1 border border-green-500 text-green-600 text-xs font-bold rounded-full">
          Full Time
        </span>
        <BookmarkIcon />
        <Link to={`/jobs/${job.id}`} state={{ job, allJobs: jobsData }} className="bg-primary text-on-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-container transition">
          Apply Now
        </Link>
      </div>
    </div>
  </div>
);

const TopCompanyCard = ({ company }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-outline-variant flex flex-col items-center text-center hover:border-primary/30 transition">
    <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center mb-3 text-2xl font-bold text-on-surface">
      {company.logo}
    </div>
    <h4 className="font-bold text-on-surface text-lg">{company.name}</h4>
    <p className="text-green-600 text-sm font-semibold mt-1 bg-green-50 px-3 py-1 rounded-full">
      {company.openPositions} Open Positions
    </p>
  </div>
);

const JobsPage = () => {
  const [selected, setSelected] = useState("Part Time");

  const types = ["Full Time", "Part Time", "Remote", "Internship"];

  const companies = [
    { id: 1, name: "Instagram", logo: "IG", openPositions: 2 },
    { id: 2, name: "Tesla", logo: "T", openPositions: 4 },
    { id: 3, name: "McDonald's", logo: "M", openPositions: 6 },
    { id: 4, name: "Apple", logo: "A", openPositions: 8 },
  ];
  return (
    <div className="bg-surface-container-low min-h-screen flex flex-col">
      {/* Hero Section (Implied context for a Job page) */}
      <div className="bg-white pt-12 pb-8 text-center px-4 border-b border-outline-variant">
        <h1 className="text-3xl md:text-4xl font-bold text-on-surface mb-4">
          Find Your Dream Job
        </h1>
        <p className="text-outline mb-8">
          Browse thousands of job openings from top companies.
        </p>
      </div>

      {/* MAIN */}
      <main className="grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <aside className="bg-white p-6 rounded-xl shadow-sm border border-outline-variant h-fit">
              <h3 className="font-bold text-lg mb-4">Filter</h3>

              {/* Search Input */}
              <div className="mb-6">
                <label
                  htmlFor="search"
                  className="block text-sm font-medium text-on-surface-variant mb-2"
                >
                  Search
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="search"
                    placeholder="Job title or keyword"
                    className="w-full pl-10 pr-4 py-2 border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                  />
                  <span className="absolute left-3 top-2.5">
                    <MagnifyingGlassIcon />
                  </span>
                </div>
              </div>

              {/* Location Dropdown */}
              <div className="mb-6">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-on-surface-variant mb-2"
                >
                  Location
                </label>
                <div className="relative">
                  <select
                    id="location"
                    className="w-full pl-4 pr-10 py-2 border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm appearance-none bg-white"
                  >
                    <option>Select Location</option>
                    <option>London, UK</option>
                    <option>New York, USA</option>
                  </select>
                  <span className="absolute right-3 top-2.5 text-outline pointer-events-none">
                    <ChevronDownIcon />
                  </span>
                </div>
              </div>

              {/* Category Dropdown */}
              <div className="mb-6">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-on-surface-variant mb-2"
                >
                  Category
                </label>
                <div className="relative">
                  <select
                    id="category"
                    className="w-full pl-4 pr-10 py-2 border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm appearance-none bg-white"
                  >
                    <option>Select Category</option>
                    <option>Private</option>
                    <option>Government</option>
                  </select>
                  <span className="absolute right-3 top-2.5 text-outline pointer-events-none">
                    <ChevronDownIcon />
                  </span>
                </div>
              </div>

              {/* Checkboxes / Tags */}
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-3">
                  Type
                </label>

                <div className="space-y-3">
                  {types.map((type) => (
                    <label
                      key={type}
                      onClick={() => setSelected(type)}
                      className="flex items-center space-x-3 cursor-pointer group"
                    >
                      <div
                        className={`w-5 h-5 border-2 rounded flex items-center justify-center transition
              ${
                selected === type
                  ? "border-primary bg-primary/10"
                  : "border-outline-variant group-hover:border-primary"
              }`}
                      >
                        <div
                          className={`w-3 h-3 bg-primary rounded-sm transition ${
                            selected === type ? "opacity-100" : "opacity-0"
                          }`}
                        ></div>
                      </div>

                      <span
                        className={`text-sm ${
                          selected === type
                            ? "text-on-surface font-medium"
                            : "text-on-surface-variant"
                        }`}
                      >
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <button className="w-full mt-8 bg-primary text-on-primary py-2.5 rounded-lg font-medium shadow-md shadow-primary/20 hover:bg-primary-container transition">
                Find Jobs
              </button>
            </aside>
          </div>

          {/* Right Job List */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-on-surface">
                Showing 65 Jobs
              </h2>
              <div className="flex items-center text-sm text-outline gap-2">
                <span>Sort by:</span>
                <span className="font-semibold text-on-surface cursor-pointer">
                  Newest
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {jobsData.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <button className="flex items-center px-6 py-2 border border-outline-variant rounded-lg text-sm font-medium text-on-surface-variant hover:bg-surface-container hover:border-outline transition">
                Load More <ArrowRightIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Top Companies Section */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-on-surface">Top Company</h2>
            <p className="text-outline mt-2">
              See all companies and available positions
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
