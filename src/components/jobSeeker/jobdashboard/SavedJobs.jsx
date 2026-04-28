import React from 'react';
import Breadcrumb from '../components/ui/Breadcrumb';
import { savedJobs } from '../data/mockData';
import { FiMapPin, FiDollarSign, FiClock, FiTrash2, FiArrowRight } from 'react-icons/fi';

const SavedJobs = () => {
  return (
    <>
      <Breadcrumb pageName="Saved Jobs" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {savedJobs.map((job) => (
          <div key={job.id} className="rounded-2xl border border-stroke bg-white p-6 shadow-sm dark:border-strokedark dark:bg-boxdark hover:border-primary/30 transition-all group">
            <div className="flex items-center justify-between mb-6">
              <div className="h-16 w-16 rounded-xl bg-bg-soft p-3 dark:bg-primary/10 flex items-center justify-center">
                <img src={job.logo} alt={job.company} className="max-h-full max-w-full" />
              </div>
              <button className="text-muted hover:text-danger transition-colors" title="Remove from saved">
                <FiTrash2 size={20} />
              </button>
            </div>

            <h4 className="mb-1 text-xl font-bold text-black dark:text-white group-hover:text-primary transition-colors">
              {job.title}
            </h4>
            <p className="mb-4 text-sm font-semibold text-primary/80">{job.company}</p>

            <div className="flex flex-col gap-3 mb-6">
              <div className="flex items-center gap-2 text-sm text-muted">
                <FiMapPin size={16} />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted">
                <FiDollarSign size={16} />
                <span>{job.salary}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted">
                <FiClock size={16} />
                <span>{job.type}</span>
              </div>
            </div>

            <button className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 px-4 font-bold text-white hover:bg-secondary transition-all shadow-lg shadow-primary/20">
              Apply Now <FiArrowRight size={18} />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default SavedJobs;
