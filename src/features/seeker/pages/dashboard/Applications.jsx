import React, { useState } from "react";
import {
  FiSearch,
  FiBriefcase,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiEye,
  FiEdit3,
} from "react-icons/fi";
import { applications } from "../../data/mockData";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import Breadcrumb from "../../../../components/ui/Breadcrumb";

const STATUS_TABS = ["All", "Pending", "Shortlisted", "Interview Scheduled", "Rejected"];

const badgeStatusMap = {
  "Interview Scheduled": "info",
  Shortlisted: "success",
  Rejected: "error",
  Applied: "applied",
  Pending: "warning",
};

const borderAccentMap = {
  Applied: "border-l-sk-primary",
  Pending: "border-l-sk-primary",
  "Interview Scheduled": "border-l-warning",
  Shortlisted: "border-l-success",
  Rejected: "border-l-error",
};

const statIconColorMap = {
  total: "bg-sk-surface text-sk-primary",
  pending: "bg-warning-bg text-warning",
  shortlisted: "bg-success-bg text-success",
  rejected: "bg-error-bg text-error",
};

const STAGES = ["Applied", "Viewed", "Shortlisted", "Interview"];
const stageIndexMap = {
  Applied: 0,
  Pending: 0,
  Viewed: 1,
  Shortlisted: 2,
  "Interview Scheduled": 3,
};

const handleViewDetails = (appId) => {
  console.log("Navigate to application details:", appId);
};

const handleAddNote = (e, appId) => {
  e.stopPropagation();
  console.log("Open note modal for:", appId);
};

const Applications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const tabCount = (tab) =>
    tab === "All"
      ? applications.length
      : applications.filter((a) => a.status === tab).length;

  return (
    <>
      <Breadcrumb pageName="Job Applications" />

      {/* Stat cards */}
      <div className="mb-6 grid grid-cols-2 gap-4 xl:grid-cols-4">
        {[
          { label: "Total", value: applications.length, icon: <FiBriefcase size={18} />, key: "total" },
          { label: "Pending", value: applications.filter((a) => a.status === "Pending").length, icon: <FiClock size={18} />, key: "pending" },
          { label: "Shortlisted", value: applications.filter((a) => a.status === "Shortlisted").length, icon: <FiCheckCircle size={18} />, key: "shortlisted" },
          { label: "Rejected", value: applications.filter((a) => a.status === "Rejected").length, icon: <FiXCircle size={18} />, key: "rejected" },
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

      {/* Search + filter tabs */}
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-80">
          <FiSearch size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-n-400" />
          <input
            type="text"
            placeholder="Search by role or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-n-200 bg-white py-2.5 pl-10 pr-4 text-sm text-n-900 outline-none placeholder:text-n-400 focus:border-sk-primary focus:ring-2 focus:ring-sk-primary/10"
          />
        </div>

        {/* Filter pill tabs */}
        <div className="flex gap-1.5 rounded-xl bg-n-100 p-1 overflow-x-auto shrink-0">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                statusFilter === tab
                  ? "bg-white text-n-900 shadow-sm"
                  : "text-n-500 hover:text-n-900"
              }`}
            >
              {tab}
              <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                statusFilter === tab ? "bg-sk-surface text-sk-primary" : "bg-n-200 text-n-500"
              }`}>
                {tabCount(tab)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Application cards */}
      {filteredApplications.length === 0 ? (
        <div className="rounded-xl border border-n-200 bg-white p-8">
          <EmptyState
            icon="📄"
            title="No applications found"
            description={searchTerm ? "Try a different search term." : "Browse jobs and start applying."}
          />
        </div>
      ) : (
        <div className="space-y-3">
          {filteredApplications.map((app, i) => {
            const currentStage = stageIndexMap[app.status] ?? -1;
            const isRejected = app.status === "Rejected";
            const borderClass = borderAccentMap[app.status] || "border-l-n-200";

            return (
              <div
                key={i}
                onClick={() => handleViewDetails(app.id)}
                className={`cursor-pointer rounded-xl border border-n-200 border-l-4 bg-white p-5 shadow-sm transition hover:shadow-md ${borderClass}`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  {/* Left: logo + info */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="h-11 w-11 shrink-0 rounded-lg border border-n-200 bg-white p-1.5">
                      <img
                        src={app.logo}
                        alt={app.company}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-n-900 truncate">{app.jobTitle}</p>
                      <p className="text-sm text-n-500 truncate">{app.company}</p>
                    </div>
                  </div>

                  {/* Right: badge + actions */}
                  <div className="flex items-center gap-3 shrink-0">
                    <Badge status={badgeStatusMap[app.status] || "neutral"}>
                      {app.status}
                    </Badge>
                    <button
                      title="Add Note"
                      onClick={(e) => handleAddNote(e, app.id)}
                      className="rounded-lg p-1.5 text-n-400 hover:bg-n-100 hover:text-n-700 transition"
                    >
                      <FiEdit3 size={16} />
                    </button>
                    <button
                      title="View Details"
                      className="rounded-lg p-1.5 text-n-400 hover:bg-sk-surface hover:text-sk-primary transition"
                    >
                      <FiEye size={16} />
                    </button>
                  </div>
                </div>

                {/* Progress tracker */}
                {!isRejected && (
                  <div className="mt-4 flex items-center gap-0">
                    {STAGES.map((stage, idx) => {
                      const done = idx <= currentStage;
                      return (
                        <React.Fragment key={stage}>
                          <div className="flex flex-col items-center gap-1">
                            <div className={`w-3 h-3 rounded-full shrink-0 ${done ? "bg-sk-primary" : "bg-n-200"}`} />
                            <span className={`text-[10px] whitespace-nowrap ${done ? "text-sk-primary font-semibold" : "text-n-400"}`}>
                              {stage}
                            </span>
                          </div>
                          {idx < STAGES.length - 1 && (
                            <div className={`flex-1 h-px mx-1 mb-3.5 ${done && idx < currentStage ? "bg-sk-primary" : "bg-n-200"}`} />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                )}

                {/* Footer row */}
                <div className="mt-3 flex items-center gap-4">
                  <span className="text-xs text-n-400">Applied {app.date}</span>
                  {app.location && (
                    <span className="text-xs text-n-400">{app.location}</span>
                  )}
                  <div className="ml-auto flex gap-3">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleViewDetails(app.id); }}
                      className="text-xs font-semibold text-sk-primary hover:underline"
                    >
                      View Details
                    </button>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs font-semibold text-error hover:underline"
                    >
                      Withdraw
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination footer */}
      <div className="mt-4 flex items-center justify-between text-sm text-n-500">
        <p>Showing {filteredApplications.length} of {applications.length} applications</p>
        <div className="flex items-center gap-1.5">
          <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-n-200 hover:bg-n-50 transition">
            ‹
          </button>
          <button className="flex h-8 min-w-[32px] items-center justify-center rounded-lg bg-sk-surface px-2.5 text-xs font-bold text-sk-primary">
            1
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-n-200 hover:bg-n-50 transition">
            ›
          </button>
        </div>
      </div>
    </>
  );
};

export default Applications;
