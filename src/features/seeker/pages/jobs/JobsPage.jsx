import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bookmark,
  BriefcaseBusiness,
  Clock,
  MapPin,
  Search,
} from "lucide-react";
import JobsPublicNav from "./JobsPublicNav";
import jobsData from "../../data/jobsData.json";
import useSEO from "@/seo/useSEO";
import seoMeta from "@/data/seoMeta";
import {
  buildBreadcrumbList,
  buildItemListOfJobs,
  buildWebPage,
} from "@/seo/schemas";
import {
  HeroHighlight,
  Highlight,
} from "../../../../components/ui/hero-highlight";

const FIELD_CLASS =
  "w-full rounded-[8px] border border-[#EADFD9] bg-[#F7F5F2] px-3 py-2.5 text-sm text-[#0A0A0A] outline-none transition focus:border-[#8500FA] focus:ring-2 focus:ring-[#8500FA]/15";
const LABEL_CLASS = "mb-2 block text-xs font-semibold uppercase text-[#6F6F76]";

const TypeChip = ({ label, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full rounded-[8px] border px-3 py-2 text-left text-sm font-medium transition ${
      active
        ? "border-[#8500FA] bg-[#8500FA] text-white"
        : "border-[#EADFD9] bg-[#F7F5F2] text-[#6F6F76] hover:border-[#C6AFFF] hover:text-[#0A0A0A]"
    }`}
  >
    {label}
  </button>
);

const JobCard = ({ job }) => (
  <article className="group rounded-[8px] border border-[#EADFD9] bg-[#F7F5F2] p-5 transition hover:border-[#FF9566] hover:bg-white hover:shadow-sm">
    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
      <div className="flex min-w-0 items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[8px] border border-[#EADFD9] bg-white text-sm font-bold text-[#0A0A0A]">
          {job.logoLetter}
        </div>

        <div className="min-w-0">
          <h3 className="text-base font-semibold leading-tight text-[#0A0A0A] transition group-hover:text-[#FF6B35]">
            {job.title}
          </h3>
          <p className="mt-1 text-sm text-[#6F6F76]">{job.company}</p>

          <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium">
            <span className="inline-flex items-center gap-1 rounded-[8px] border border-[#EADFD9] bg-[#FFF7F3] px-2.5 py-1 text-[#6F6F76]">
              <BriefcaseBusiness className="h-3.5 w-3.5" />
              {job.category}
            </span>
            <span className="inline-flex items-center gap-1 rounded-[8px] border border-[#EADFD9] bg-[#FFF7F3] px-2.5 py-1 text-[#6F6F76]">
              <Clock className="h-3.5 w-3.5" />
              {job.time}
            </span>
            <span className="rounded-[8px] border border-[#C6AFFF] bg-white px-2.5 py-1 font-semibold text-[#8500FA]">
              {job.salary}
            </span>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-3 md:w-auto md:items-end">
        <span className="inline-flex items-center gap-1 text-xs font-medium text-[#6F6F76]">
          <MapPin className="h-3.5 w-3.5 text-[#FF9566]" />
          {job.location}
        </span>

        <div className="flex items-center gap-2">
          <span className="rounded-[8px] border border-green-100 bg-green-50 px-2.5 py-1 text-[11px] font-semibold text-green-700">
            {job.type}
          </span>
          <button
            type="button"
            aria-label={`Save ${job.title}`}
            className="rounded-[8px] border border-[#EADFD9] bg-white p-2 text-[#6F6F76] transition hover:border-[#C6AFFF] hover:text-[#8500FA]"
          >
            <Bookmark className="h-4 w-4" />
          </button>
          <Link
            to={`/jobs/${job.id}`}
            state={{ job, allJobs: jobsData }}
            className="inline-flex items-center justify-center gap-1 rounded-[8px] bg-[#FF6B35] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#FF9566]"
          >
            Apply now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  </article>
);

const TopCompanyCard = ({ company }) => (
  <article className="flex items-center gap-3 rounded-[8px] border border-[#EADFD9] bg-[#F7F5F2] px-4 py-3 transition hover:border-[#FF9566] hover:bg-white">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] border border-[#EADFD9] bg-white text-xs font-bold text-[#0A0A0A]">
      {company.logo}
    </div>
    <div className="min-w-0 text-left">
      <h3 className="truncate text-sm font-semibold text-[#0A0A0A]">
        {company.name}
      </h3>
      <p className="text-xs font-medium text-green-700">
        {company.openPositions} roles
      </p>
    </div>
  </article>
);

const JobsPage = () => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("Remote, India");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("Newest");

  const types = useMemo(
    () => [...new Set(jobsData.map((job) => job.type).filter(Boolean))],
    [],
  );
  const locations = useMemo(
    () => [...new Set(jobsData.map((job) => job.location).filter(Boolean))],
    [],
  );
  const categories = useMemo(
    () => [...new Set(jobsData.map((job) => job.category).filter(Boolean))],
    [],
  );

  const handleTypeToggle = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const filteredJobs = useMemo(() => {
    let result = [...jobsData];
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (normalizedSearch) {
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(normalizedSearch) ||
          job.company.toLowerCase().includes(normalizedSearch) ||
          job.category.toLowerCase().includes(normalizedSearch),
      );
    }

    if (location) {
      result = result.filter((job) => job.location === location);
    }

    if (category) {
      result = result.filter((job) => job.category === category);
    }

    if (selectedTypes.length > 0) {
      result = result.filter((job) => selectedTypes.includes(job.type));
    }

    return sortBy === "Newest" ? result.reverse() : result;
  }, [searchTerm, location, category, selectedTypes, sortBy]);

  const companies = [
    { id: 1, name: "Tata Consultancy Services", logo: "TC", openPositions: 6 },
    { id: 2, name: "Zomato", logo: "ZO", openPositions: 3 },
    { id: 3, name: "Zoho", logo: "ZH", openPositions: 4 },
    { id: 4, name: "Meesho", logo: "ME", openPositions: 5 },
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
  const hasActiveFilters =
    selectedTypes.length > 0 || searchTerm || location || category;
  const clearFilters = () => {
    setSelectedTypes([]);
    setSearchTerm("");
    setLocation("");
    setCategory("");
  };

  return (
    <div className="min-h-screen bg-[#FFF7F3] text-[#0A0A0A]">
      {seoElement}
      <JobsPublicNav />

      <HeroHighlight
        containerClassName="border-b border-[#EADFD9] bg-[#F7F5F2]"
        className="px-4 py-14 md:py-20"
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase text-[#FF9566]">
              Verified fresher jobs
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-[#0A0A0A] md:text-6xl">
              Find your{" "}
              <Highlight className="rounded-[8px] px-2 pb-1">
                first job.
              </Highlight>
            </h1>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="#job-search"
                className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-[#FF6B35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#FF9566]"
              >
                Browse openings
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/resume"
                className="inline-flex items-center justify-center gap-2 rounded-[8px] border border-[#EADFD9] bg-white px-5 py-3 text-sm font-semibold text-[#0A0A0A] transition hover:border-[#C6AFFF] hover:text-[#8500FA]"
              >
                Build resume
              </Link>
            </div>
          </div>
        </div>
      </HeroHighlight>

      <main
        id="job-search"
        className="mx-auto w-full max-w-6xl px-4 py-10 md:py-14"
      >
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-[8px] border border-[#EADFD9] bg-white p-5 lg:sticky lg:top-24">
            <div className="space-y-5">
              <div>
                <label className={LABEL_CLASS}>Keyword</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9F9FA9]" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Role or company"
                    className={`${FIELD_CLASS} pl-9`}
                  />
                </div>
              </div>

              <div>
                <label className={LABEL_CLASS}>Location</label>
                <select
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  className={FIELD_CLASS}
                >
                  <option value="">All locations</option>
                  {locations.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={LABEL_CLASS}>Category</label>
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className={FIELD_CLASS}
                >
                  <option value="">All categories</option>
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={LABEL_CLASS}>Sort</label>
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className={FIELD_CLASS}
                >
                  <option>Newest</option>
                  <option>Oldest</option>
                </select>
              </div>

              <div>
                <div className="space-y-2">
                  {types.map((type) => (
                    <TypeChip
                      key={type}
                      label={type}
                      active={selectedTypes.includes(type)}
                      onClick={() => handleTypeToggle(type)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3 border-t border-[#EADFD9] pt-4">
              <span className="text-sm font-semibold text-[#0A0A0A]">
                {filteredJobs.length} matched
              </span>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="rounded-[8px] border border-[#EADFD9] bg-white px-3 py-2 text-sm font-semibold text-[#6F6F76] transition hover:bg-[#F7F5F2] hover:text-[#0A0A0A]"
                >
                  Clear
                </button>
              )}
            </div>
          </aside>

          <section>
            {filteredJobs.length === 0 ? (
              <div className="rounded-[8px] border border-dashed border-[#EADFD9] bg-white px-6 py-16 text-center">
                <h3 className="text-lg font-semibold text-[#0A0A0A]">
                  No jobs found
                </h3>
                <p className="mx-auto mt-2 max-w-md text-sm text-[#6F6F76]">
                  Try a broader role, city, or type.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </section>
        </div>

        <section className="mt-12">
          <div className="mb-4 max-w-2xl">
            <h2 className="text-2xl font-semibold text-[#0A0A0A]">
              Hiring companies
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {companies.map((company) => (
              <TopCompanyCard key={company.id} company={company} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default JobsPage;
