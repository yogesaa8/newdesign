import React from "react";
import {
  FiMapPin,
  FiDollarSign,
  FiClock,
  FiTrash2,
  FiArrowRight,
  FiBookmark,
  FiBriefcase,
} from "react-icons/fi";
import Breadcrumb from "../../../../components/ui/Breadcrumb";
import { savedJobs } from "../../data/mockData";

const SavedJobs = () => {
  return (
    <>
      <Breadcrumb pageName="Saved Jobs" />

      {/* Top Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className=" border border-[#EADFD9] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-[8px] bg-[#FFF7F3] p-3 text-[#FF6B35]">
              <FiBookmark size={20} />
            </div>
            <div>
              <p className="text-sm text-[#6F6F76]">Saved Jobs</p>
              <h3 className="text-xl font-bold">{savedJobs.length}</h3>
            </div>
          </div>
        </div>

        <div className="border border-[#EADFD9] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-[8px] bg-green-50 p-3 text-green-600">
              <FiBriefcase size={20} />
            </div>
            <div>
              <p className="text-sm text-[#6F6F76]">Ready to Apply</p>
              <h3 className="text-xl font-bold">{savedJobs.length}</h3>
            </div>
          </div>
        </div>

        <div className="border border-[#EADFD9] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-[8px] bg-blue-50 p-3 text-blue-600">
              <FiClock size={20} />
            </div>
            <div>
              <p className="text-sm text-[#6F6F76]">Recent Saves</p>
              <h3 className="text-xl font-bold">This Week</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {savedJobs.map((job) => (
          <div
            key={job.id}
            className="group  border border-[#EADFD9] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Header */}
            <div className="mb-6 flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-[8px] border border-[#EADFD9] bg-[#F7F5F2] p-3">
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#FF6B35]">
                    Saved Job
                  </p>
                  <h4 className="mt-1 font-semibold text-[#0A0A0A]">
                    {job.company}
                  </h4>
                </div>
              </div>

              <button
                title="Remove from saved"
                className="rounded-[8px] p-2 text-[#8A8690] transition hover:bg-red-50 hover:text-red-500"
              >
                <FiTrash2 size={18} />
              </button>
            </div>

            {/* Content */}
            <div>
              <h3 className="mb-2 text-xl font-bold text-[#0A0A0A] transition group-hover:text-[#FF6B35]">
                {job.title}
              </h3>

              <div className="mb-6 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-sm text-[#6F6F76]">
                  <FiMapPin size={16} />
                  <span>{job.location}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-[#6F6F76]">
                  <FiDollarSign size={16} />
                  <span>{job.salary}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-[#6F6F76]">
                  <FiClock size={16} />
                  <span>{job.type}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-3">
              <button className="flex-1 rounded border border-[#EADFD9] py-3 font-medium text-[#4F4D55] transition hover:bg-[#F7F5F2]">
                View Details
              </button>

              <button className="flex flex-1 items-center justify-center gap-2 rounded bg-[#FF6B35] py-3 font-semibold text-white shadow-md transition hover:bg-[#FF6B35]">
                Apply
                <FiArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state fallback */}
      {savedJobs.length === 0 && (
        <div className="rounded-[8px] border border-dashed border-[#D8C9C0] bg-white py-20 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#EFE7E1]">
            <FiBookmark size={24} className="text-[#6F6F76]" />
          </div>
          <h3 className="text-lg font-semibold text-[#0A0A0A]">
            No saved jobs yet
          </h3>
          <p className="mt-2 text-sm text-[#6F6F76]">
            Start saving jobs to access them quickly later.
          </p>
        </div>
      )}
    </>
  );
};

export default SavedJobs;
