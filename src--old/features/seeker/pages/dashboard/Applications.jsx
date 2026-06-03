import React, { useState } from "react";
import {
  FiSearch,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
  FiEye,
  FiBriefcase,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiEdit3, // Added for Notes functionality
} from "react-icons/fi";
import { applications } from "../../data/mockData";
import Breadcrumb from "../../../../components/ui/Breadcrumb";

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

  const getStatusClasses = (status) => {
    switch (status) {
      case "Interview Scheduled":
        return "bg-blue-50 text-blue-700 border border-blue-100";
      case "Shortlisted":
        return "bg-green-50 text-green-700 border border-green-100";
      case "Rejected":
        return "bg-red-50 text-red-700 border border-red-100";
      default:
        return "bg-orange-50 text-orange-700 border border-orange-100";
    }
  };

  // Mock function for when user clicks a row or notes
  const handleViewDetails = (appId) => {
    console.log("Navigate to application details:", appId);
    // navigate(`/applications/${appId}`);
  };

  const handleAddNote = (e, appId) => {
    e.stopPropagation(); // Prevents the row click event from firing
    console.log("Open note modal for:", appId);
    // setOpenNoteModal(appId);
  };

  return (
    <>
      <Breadcrumb pageName="Job Applications" />

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <FiBriefcase className="text-orange-600" size={22} />
            <div>
              <p className="text-sm text-slate-500">Total</p>
              <h3 className="text-xl font-bold">{applications.length}</h3>
            </div>
          </div>
        </div>

        <div className="border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <FiClock className="text-orange-500" size={22} />
            <div>
              <p className="text-sm text-slate-500">Pending</p>
              <h3 className="text-xl font-bold">
                {applications.filter((a) => a.status === "Pending").length}
              </h3>
            </div>
          </div>
        </div>

        <div className="border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <FiCheckCircle className="text-green-600" size={22} />
            <div>
              <p className="text-sm text-slate-500">Shortlisted</p>
              <h3 className="text-xl font-bold">
                {applications.filter((a) => a.status === "Shortlisted").length}
              </h3>
            </div>
          </div>
        </div>

        <div className="border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <FiXCircle className="text-red-600" size={22} />
            <div>
              <p className="text-sm text-slate-500">Rejected</p>
              <h3 className="text-xl font-bold">
                {applications.filter((a) => a.status === "Rejected").length}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="overflow-hidden rounded border border-slate-200 bg-white shadow-sm">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-slate-100 p-5 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:w-96">
            <FiSearch
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search by company or role..."
              className="w-full rounded border border-slate-200 py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-orange-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <select
              className="rounded border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-200"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Rejected">Rejected</option>
            </select>

            <button className="flex items-center justify-center gap-2 rounded border border-slate-200 px-5 py-3 font-medium hover:bg-slate-50 transition">
              <FiFilter size={18} />
              Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-100 text-left text-sm text-slate-500">
                <th className="px-6 py-4 font-semibold">Company & Role</th>
                <th className="px-6 py-4 font-semibold">Location</th>
                <th className="px-6 py-4 font-semibold">Applied Date</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">
                  Quick Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredApplications.length > 0 ? (
                filteredApplications.map((app, index) => (
                  // Made the whole row clickable for better UX
                  <tr
                    key={index}
                    onClick={() => handleViewDetails(app.id)}
                    className="cursor-pointer border-b border-slate-100 hover:bg-slate-50 transition"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white p-2">
                          <img
                            src={app.logo}
                            alt={app.company}
                            className="h-full w-full object-contain"
                          />
                        </div>

                        <div>
                          <h4 className="font-semibold text-slate-800">
                            {app.jobTitle}
                          </h4>
                          <p className="text-sm text-slate-500">
                            {app.company}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Assuming you have location in mock data, else change app.location to a static string like "Remote" */}
                    <td className="px-6 py-5 text-sm text-slate-600">
                      {app.location || "Remote"}
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-600">
                      {app.date}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                          app.status,
                        )}`}
                      >
                        {app.status}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-2">
                        {/* Note Button: e.stopPropagation() prevents row click when clicking note */}
                        <button
                          title="Add Note"
                          onClick={(e) => handleAddNote(e, app.id)}
                          className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                        >
                          <FiEdit3 size={18} />
                        </button>

                        {/* View Details Button */}
                        <button
                          title="View Details"
                          className="rounded-lg p-2 text-slate-400 hover:bg-orange-50 hover:text-orange-600 transition"
                        >
                          <FiEye size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-14 text-center text-slate-500"
                  >
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-4 border-t border-slate-100 p-5 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-slate-500">
            Showing {filteredApplications.length} of {applications.length}{" "}
            applications
          </p>

          <div className="flex items-center gap-2">
            <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-50">
              <FiChevronLeft />
            </button>

            <button className="flex h-9 min-w-[36px] items-center justify-center rounded-xl bg-orange-500 px-3 text-white shadow">
              1
            </button>

            <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-50">
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Applications;
