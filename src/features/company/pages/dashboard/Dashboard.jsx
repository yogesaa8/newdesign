import React, { useState } from "react";
import { Link } from "react-router-dom";

const stats = [
  { label: "Open jobs", value: "8", note: "2 closing this week", color: "text-co-primary" },
  { label: "New applicants", value: "64", note: "Needs review", color: "text-info" },
  { label: "Shortlisted", value: "21", note: "Ready for outreach", color: "text-success" },
  { label: "Interviews", value: "6", note: "Next 7 days", color: "text-warning" },
];

const pipeline = [
  { label: "Applied", count: 64, width: "100%" },
  { label: "Reviewed", count: 38, width: "59%" },
  { label: "Shortlisted", count: 21, width: "33%" },
  { label: "Interview", count: 6, width: "9%" },
];

const priorityJobs = [
  { role: "Graduate Software Engineer", applicants: 28, pending: 12, status: "Active" },
  { role: "Marketing Trainee", applicants: 19, pending: 6, status: "Active" },
  { role: "Junior Finance Analyst", applicants: 17, pending: 4, status: "Draft" },
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
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-co-primary">
            Company
          </p>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-n-900 md:text-3xl">
            Hiring overview
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

      {/* Stats */}
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-n-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-n-500">
              {stat.label}
            </p>
            <p className={`mt-3 text-3xl font-extrabold ${stat.color}`}>{stat.value}</p>
            <p className="mt-1 text-sm text-n-400">{stat.note}</p>
          </div>
        ))}
      </section>

      {/* Pipeline + Activity */}
      <section className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded-xl border border-n-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-n-900">Pipeline</h2>
              <p className="text-sm text-n-500">Candidates by review stage.</p>
            </div>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="rounded-lg border border-n-200 bg-n-50 px-3 py-2 text-sm font-semibold text-n-700 outline-none focus:border-co-primary"
            >
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>

          <div className="space-y-4">
            {pipeline.map((stage) => (
              <div key={stage.label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-semibold text-n-900">{stage.label}</span>
                  <span className="text-n-500">{stage.count}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-n-100">
                  <div className="h-full rounded-full bg-co-primary transition-all" style={{ width: stage.width }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-n-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-bold text-n-900">Needs action</h2>
          <div className="mt-4 space-y-3">
            {activity.map((item) => (
              <div key={item.text} className="rounded-lg border border-n-100 bg-n-50 p-3">
                <p className="text-sm font-semibold text-n-900">{item.text}</p>
                <p className="mt-1 text-xs text-n-500">{item.meta}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs to review */}
      <section className="mt-4 overflow-hidden rounded-xl border border-n-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-n-100 px-5 py-4">
          <div>
            <h2 className="text-base font-bold text-n-900">Jobs to review</h2>
            <p className="text-sm text-n-500">Open roles with pending applicants.</p>
          </div>
          <Link to="/company/jobs" className="text-sm font-bold text-co-primary hover:text-co-hover">
            View jobs
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left">
            <thead>
              <tr className="border-b border-n-100 text-xs font-bold uppercase tracking-[0.08em] text-n-500">
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">Applicants</th>
                <th className="px-5 py-3">Pending</th>
                <th className="px-5 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {priorityJobs.map((job) => (
                <tr key={job.role} className="border-b border-n-50 last:border-0 hover:bg-n-50">
                  <td className="px-5 py-4 text-sm font-semibold text-n-900">{job.role}</td>
                  <td className="px-5 py-4 text-sm text-n-700">{job.applicants}</td>
                  <td className="px-5 py-4 text-sm text-n-700">{job.pending}</td>
                  <td className="px-5 py-4 text-right">
                    <span
                      className={`rounded-lg px-2.5 py-1 text-xs font-bold ${
                        job.status === "Active"
                          ? "bg-success-bg text-success"
                          : "bg-co-surface text-co-primary"
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
