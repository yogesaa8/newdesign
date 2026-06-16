import React, { useState } from "react";
import { Link } from "react-router-dom";

const applicants = [
  {
    id: 1,
    name: "Priya Nair",
    email: "priya.nair@example.com",
    role: "Graduate Software Engineer",
    applied: "Today",
    status: "New",
    score: "82%",
  },
  {
    id: 2,
    name: "Aman Verma",
    email: "aman.verma@example.com",
    role: "Digital Marketing Trainee",
    applied: "Yesterday",
    status: "Shortlisted",
    score: "76%",
  },
  {
    id: 3,
    name: "Neha Shah",
    email: "neha.shah@example.com",
    role: "Junior Finance Analyst",
    applied: "2 days ago",
    status: "New",
    score: "71%",
  },
  {
    id: 4,
    name: "Rohit Singh",
    email: "rohit.singh@example.com",
    role: "Graduate Software Engineer",
    applied: "3 days ago",
    status: "Reviewed",
    score: "68%",
  },
];

const roles = ["All roles", ...new Set(applicants.map((item) => item.role))];
const statuses = ["All", "New", "Shortlisted", "Reviewed"];

const ApplicantsList = () => {
  const [role, setRole] = useState("All roles");
  const [status, setStatus] = useState("All");

  const filteredApplicants = applicants.filter((applicant) => {
    const matchesRole = role === "All roles" || applicant.role === role;
    const matchesStatus = status === "All" || applicant.status === status;
    return matchesRole && matchesStatus;
  });

  const handleShortlist = (applicantId) => {
    console.log("Shortlist applicant:", applicantId);
  };

  const handleReject = (applicantId) => {
    console.log("Reject applicant:", applicantId);
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8 md:py-8">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8500FA]">
            Applicants
          </p>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-[#111114] md:text-3xl">
            Candidate review
          </h1>
        </div>
        <div className="grid grid-cols-3 gap-2 rounded-[8px] border border-[#E7DDD6] bg-white p-2 text-center">
          <div className="px-3">
            <p className="text-lg font-extrabold text-[#111114]">64</p>
            <p className="text-xs font-semibold text-[#77737D]">New</p>
          </div>
          <div className="border-x border-[#EFE7E1] px-3">
            <p className="text-lg font-extrabold text-[#111114]">21</p>
            <p className="text-xs font-semibold text-[#77737D]">Shortlisted</p>
          </div>
          <div className="px-3">
            <p className="text-lg font-extrabold text-[#111114]">6</p>
            <p className="text-xs font-semibold text-[#77737D]">Interviews</p>
          </div>
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-3 rounded-[8px] border border-[#E7DDD6] bg-white p-3 md:flex-row md:items-center">
        <select
          value={role}
          onChange={(event) => setRole(event.target.value)}
          className="rounded-[8px] border border-[#E7DDD6] bg-[#FDFBF9] px-3 py-2 text-sm font-semibold text-[#4F4D55] outline-none focus:border-[#8500FA]"
        >
          {roles.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <div className="flex flex-wrap gap-2">
          {statuses.map((item) => (
            <button
              key={item}
              onClick={() => setStatus(item)}
              className={`rounded-[8px] border px-3 py-2 text-sm font-bold transition-colors ${
                status === item
                  ? "border-[#111114] bg-[#111114] text-white"
                  : "border-[#E7DDD6] bg-white text-[#4F4D55] hover:bg-[#F7F5F2]"
              }`}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <section className="overflow-hidden rounded-[8px] border border-[#E7DDD6] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left">
            <thead>
              <tr className="border-b border-[#EFE7E1] text-xs font-bold uppercase tracking-[0.08em] text-[#77737D]">
                <th className="px-5 py-3">Candidate</th>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">Applied</th>
                <th className="px-5 py-3">Match</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplicants.map((applicant) => (
                <tr
                  key={applicant.id}
                  className="border-b border-[#F2ECE7] transition-colors last:border-0 hover:bg-[#FDFBF9]"
                >
                  <td className="px-5 py-4">
                    <p className="text-sm font-bold text-[#111114]">{applicant.name}</p>
                    <p className="text-xs text-[#77737D]">{applicant.email}</p>
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-[#4F4D55]">
                    {applicant.role}
                  </td>
                  <td className="px-5 py-4 text-sm text-[#4F4D55]">{applicant.applied}</td>
                  <td className="px-5 py-4 text-sm font-bold text-[#111114]">
                    {applicant.score}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-[8px] px-2.5 py-1 text-xs font-bold ${
                        applicant.status === "Shortlisted"
                          ? "bg-green-50 text-green-700"
                          : applicant.status === "Reviewed"
                            ? "bg-[#F1E7FF] text-[#8500FA]"
                            : "bg-[#FFF1E9] text-[#C84F1F]"
                      }`}
                    >
                      {applicant.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/company/applicants/${applicant.id}/resume`}
                        className="rounded-[8px] border border-[#E7DDD6] bg-white px-3 py-2 text-xs font-bold text-[#4F4D55] transition-colors hover:bg-[#F7F5F2]"
                      >
                        Resume
                      </Link>
                      <button
                        onClick={() => handleShortlist(applicant.id)}
                        className="rounded-[8px] bg-[#111114] px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-[#2B2B31]"
                        type="button"
                      >
                        Shortlist
                      </button>
                      <button
                        onClick={() => handleReject(applicant.id)}
                        className="rounded-[8px] bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition-colors hover:bg-red-100"
                        type="button"
                      >
                        Reject
                      </button>
                    </div>
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

export default ApplicantsList;
