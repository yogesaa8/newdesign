import React, { useState } from "react";
import { Link } from "react-router-dom";

const stats = [
  { label: "Open jobs", value: "8", note: "2 closing this week" },
  { label: "New applicants", value: "64", note: "Needs review" },
  { label: "Shortlisted", value: "21", note: "Ready for outreach" },
  { label: "Interviews", value: "6", note: "Next 7 days" },
];

const pipeline = [
  { label: "Applied", count: 64, width: "100%" },
  { label: "Reviewed", count: 38, width: "59%" },
  { label: "Shortlisted", count: 21, width: "33%" },
  { label: "Interview", count: 6, width: "9%" },
];

const priorityJobs = [
  {
    role: "Graduate Software Engineer",
    applicants: 28,
    pending: 12,
    status: "Active",
  },
  {
    role: "Marketing Trainee",
    applicants: 19,
    pending: 6,
    status: "Active",
  },
  {
    role: "Junior Finance Analyst",
    applicants: 17,
    pending: 4,
    status: "Draft",
  },
];

const activity = [
  { text: "Priya Nair shortlisted", meta: "Graduate Software Engineer" },
  { text: "Aman Verma applied", meta: "Marketing Trainee" },
  { text: "Finance Analyst draft needs salary range", meta: "Job draft" },
];

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("Last 30 days");

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8 md:py-8">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8500FA]">
            Company
          </p>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-[#111114] md:text-3xl">
            Hiring overview
          </h1>
        </div>
        <Link
          to="/company/jobs/new"
          className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-[#FF6B35] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#E85F2F]"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Post job
        </Link>
      </div>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[8px] border border-[#E7DDD6] bg-white p-4"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#77737D]">
              {stat.label}
            </p>
            <p className="mt-3 text-3xl font-extrabold text-[#111114]">{stat.value}</p>
            <p className="mt-1 text-sm text-[#77737D]">{stat.note}</p>
          </div>
        ))}
      </section>

      <section className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded-[8px] border border-[#E7DDD6] bg-white p-5">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-[#111114]">Pipeline</h2>
              <p className="text-sm text-[#77737D]">Candidates by review stage.</p>
            </div>
            <select
              value={timeRange}
              onChange={(event) => setTimeRange(event.target.value)}
              className="rounded-[8px] border border-[#E7DDD6] bg-[#F7F5F2] px-3 py-2 text-sm font-semibold text-[#4F4D55] outline-none focus:border-[#8500FA]"
            >
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>

          <div className="space-y-4">
            {pipeline.map((stage) => (
              <div key={stage.label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-semibold text-[#111114]">{stage.label}</span>
                  <span className="text-[#77737D]">{stage.count}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-[8px] bg-[#EFE7E1]">
                  <div className="h-full bg-[#8500FA]" style={{ width: stage.width }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[8px] border border-[#E7DDD6] bg-white p-5">
          <h2 className="text-base font-bold text-[#111114]">Needs action</h2>
          <div className="mt-4 space-y-3">
            {activity.map((item) => (
              <div
                key={item.text}
                className="rounded-[8px] border border-[#EFE7E1] bg-[#FDFBF9] p-3"
              >
                <p className="text-sm font-semibold text-[#111114]">{item.text}</p>
                <p className="mt-1 text-xs text-[#77737D]">{item.meta}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-4 overflow-hidden rounded-[8px] border border-[#E7DDD6] bg-white">
        <div className="flex items-center justify-between border-b border-[#EFE7E1] px-5 py-4">
          <div>
            <h2 className="text-base font-bold text-[#111114]">Jobs to review</h2>
            <p className="text-sm text-[#77737D]">Open roles with pending applicants.</p>
          </div>
          <Link
            to="/company/jobs"
            className="text-sm font-bold text-[#8500FA] hover:text-[#6D00D2]"
          >
            View jobs
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left">
            <thead>
              <tr className="border-b border-[#EFE7E1] text-xs font-bold uppercase tracking-[0.08em] text-[#77737D]">
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">Applicants</th>
                <th className="px-5 py-3">Pending</th>
                <th className="px-5 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {priorityJobs.map((job) => (
                <tr key={job.role} className="border-b border-[#F2ECE7] last:border-0">
                  <td className="px-5 py-4 text-sm font-semibold text-[#111114]">
                    {job.role}
                  </td>
                  <td className="px-5 py-4 text-sm text-[#4F4D55]">{job.applicants}</td>
                  <td className="px-5 py-4 text-sm text-[#4F4D55]">{job.pending}</td>
                  <td className="px-5 py-4 text-right">
                    <span
                      className={`rounded-[8px] px-2.5 py-1 text-xs font-bold ${
                        job.status === "Active"
                          ? "bg-green-50 text-green-700"
                          : "bg-[#F1E7FF] text-[#8500FA]"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
