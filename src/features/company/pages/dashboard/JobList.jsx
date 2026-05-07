import React from "react";
import { Link } from "react-router-dom";

const jobs = [
  {
    id: 1,
    title: "Senior Product Designer",
    department: "Design",
    location: "San Francisco, CA",
    applicants: 124,
    status: "Active",
  },
  {
    id: 2,
    title: "Frontend Engineer",
    department: "Engineering",
    location: "Remote",
    applicants: 86,
    status: "Active",
  },
  {
    id: 3,
    title: "Growth Marketing Lead",
    department: "Marketing",
    location: "New York, NY",
    applicants: 42,
    status: "Paused",
  },
];

const JobList = () => {
  return (
    <div className="flex-1">
      <main className="w-full max-w-[1400px] space-y-9 p-8 mx-auto">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight font-headline text-slate-800">
              Jobs
            </h1>
            <p className="mt-1 font-medium text-slate-500">
              Review active and paused job listings.
            </p>
          </div>
          <Link
            to="/company/jobs/new"
            className="flex items-center gap-2 rounded bg-orange-600 px-6 py-2.5 font-semibold text-white shadow-md transition-all hover:bg-orange-700"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Post a Job
          </Link>
        </div>

        <div className="overflow-hidden rounded border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="text-label-md uppercase tracking-[0.05em] border-b border-slate-100">
                  <th className="px-8 py-4 text-xs font-bold text-slate-400">
                    Job Title
                  </th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400">
                    Department
                  </th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400">
                    Location
                  </th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400">
                    Applicants
                  </th>
                  <th className="px-8 py-4 text-xs font-bold text-right text-slate-400">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr
                    key={job.id}
                    className="border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50/50"
                  >
                    <td className="px-8 py-5">
                      <p className="font-bold text-slate-800">{job.title}</p>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm font-medium text-slate-700">
                        {job.department}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm text-slate-600">
                        {job.location}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm text-slate-600">
                        {job.applicants}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          job.status === "Active"
                            ? "bg-green-50 text-green-600"
                            : "bg-orange-50 text-orange-600"
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
        </div>
      </main>
    </div>
  );
};

export default JobList;
