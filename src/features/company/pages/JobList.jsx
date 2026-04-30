import React from 'react';
import { Link } from 'react-router-dom';

const jobs = [
  {
    id: 1,
    title: 'Senior Product Designer',
    department: 'Design',
    location: 'San Francisco, CA',
    applicants: 124,
    status: 'Active',
  },
  {
    id: 2,
    title: 'Frontend Engineer',
    department: 'Engineering',
    location: 'Remote',
    applicants: 86,
    status: 'Active',
  },
  {
    id: 3,
    title: 'Growth Marketing Lead',
    department: 'Marketing',
    location: 'New York, NY',
    applicants: 42,
    status: 'Paused',
  },
];

const JobList = () => {
  return (
    <div className="flex-1">
      <main className="p-8 space-y-9 max-w-[1400px] mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-on-surface tracking-tight font-headline">
              Jobs
            </h1>
            <p className="text-outline mt-1 font-medium">
              Review active and paused job listings.
            </p>
          </div>
          <Link
            to="/company-post-job"
            className="bg-gradient-to-br from-primary to-primary-container text-white px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2 hover:opacity-90 transition-all shadow-md"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Post a Job
          </Link>
        </div>

        <div className="bg-surface-container-lowest rounded-xl shadow-[0px_12px_32px_-4px_rgba(13,28,46,0.06)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low text-label-md uppercase tracking-[0.05em] text-outline">
                  <th className="px-8 py-4 font-bold text-xs">Job Title</th>
                  <th className="px-8 py-4 font-bold text-xs">Department</th>
                  <th className="px-8 py-4 font-bold text-xs">Location</th>
                  <th className="px-8 py-4 font-bold text-xs">Applicants</th>
                  <th className="px-8 py-4 font-bold text-xs text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-surface-container-low/40 transition-colors">
                    <td className="px-8 py-5">
                      <p className="font-bold text-on-surface">{job.title}</p>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm font-medium text-on-surface">{job.department}</span>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm text-outline">{job.location}</span>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm text-on-surface">{job.applicants}</span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          job.status === 'Active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-tertiary-fixed text-on-tertiary-fixed-variant'
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
