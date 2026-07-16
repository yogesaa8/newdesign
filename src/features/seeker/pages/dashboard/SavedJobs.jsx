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
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../../../components/ui/Breadcrumb";
import { EmptyState } from "@/components/ui/EmptyState";
import { savedJobs } from "../../data/mockData";

const statIconColorMap = {
  saved: "bg-sk-surface text-sk-primary",
  ready: "bg-success-bg text-success",
  recent: "bg-info-bg text-info",
};

const SavedJobs = () => {
  const navigate = useNavigate();

  return (
    <>
      <Breadcrumb pageName="Saved Jobs" />

      {/* Stat cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          { label: "Saved Jobs", value: savedJobs.length, icon: <FiBookmark size={18} />, key: "saved" },
          { label: "Ready to Apply", value: savedJobs.length, icon: <FiBriefcase size={18} />, key: "ready" },
          { label: "Recent Saves", value: "This Week", icon: <FiClock size={18} />, key: "recent" },
        ].map(({ label, value, icon, key }) => (
          <div key={key} className="flex items-center gap-4 rounded-xl border border-n-200 bg-white p-5 shadow-sm">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${statIconColorMap[key]}`}>
              {icon}
            </div>
            <div>
              <p className="text-xs text-n-500">{label}</p>
              <p className="text-xl font-bold text-n-900">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {savedJobs.length === 0 ? (
        <div className="rounded-xl border border-n-200 bg-white p-8">
          <EmptyState
            icon="❤️"
            title="No saved jobs yet"
            description="Start saving jobs to access them quickly later."
            actionLabel="Browse Jobs"
            onAction={() => navigate("/jobs")}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {savedJobs.map((job) => (
            <div
              key={job.id}
              className="group flex flex-col rounded-xl border border-n-200 border-l-4 border-l-sk-primary bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              {/* Header */}
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 shrink-0 rounded-lg border border-n-200 bg-n-50 p-2 flex items-center justify-center">
                    <img
                      src={job.logo}
                      alt={job.company}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-sk-primary uppercase tracking-wide">
                      Saved Job
                    </p>
                    <p className="text-sm font-semibold text-n-900 mt-0.5">{job.company}</p>
                  </div>
                </div>
                <button
                  title="Remove from saved"
                  className="rounded-lg p-1.5 text-n-400 transition hover:bg-error-bg hover:text-error"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>

              {/* Job title */}
              <h3 className="mb-3 text-base font-bold text-n-900 transition group-hover:text-sk-primary leading-snug">
                {job.title}
              </h3>

              {/* Meta info */}
              <div className="mb-5 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-n-500">
                  <FiMapPin size={14} className="shrink-0" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-n-500">
                  <FiDollarSign size={14} className="shrink-0" />
                  <span className="font-semibold text-sk-primary">{job.salary}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-n-500">
                  <FiClock size={14} className="shrink-0" />
                  <span>{job.type}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-auto flex gap-2">
                <button
                  onClick={() => navigate("/jobs")}
                  className="flex-1 rounded-lg border border-n-200 py-2.5 text-sm font-semibold text-n-700 transition hover:bg-n-50"
                >
                  View Details
                </button>
                <button
                  onClick={() => navigate("/jobs")}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-sk-primary py-2.5 text-sm font-semibold text-white transition hover:bg-sk-hover"
                >
                  Apply
                  <FiArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SavedJobs;
