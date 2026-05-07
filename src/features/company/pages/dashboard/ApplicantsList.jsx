import React from "react";
import { Link } from "react-router-dom";

const ApplicantsList = () => {
  // Sample applicant data
  const applicants = [
    {
      id: 1,
      name: "Elena Rodriguez",
      email: "erodriguez@design.com",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAh1ZBRWBk6jYZ4m2xJLzEpXU0N3wVdUQm-SiO4Y3kz6VY_yNdSN8JWp0f8YF8wm_zFQF0u4rJYZN6vR8gZ0N3wVdUQm-SiO4Y3kz6VY_yNdSN8JWp0f8YF8wm_zFQF0u4rJYZN6vR8gZ",
      position: "Senior UI/UX Designer",
      appliedDate: "Oct 12, 2023",
      rating: 5,
    },
    {
      id: 2,
      name: "Jonathan Wu",
      email: "j.wu@techcloud.io",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBCqNyi1oOBlNY_0NSwXbms5bpHhJd8wjKFTf5GOw5JSSk8SN_i3h5olsNQppl4kUmnf3fSXMy6qN5yqtWhWVyTERl6hpGNq0N8r__RS1in2OOZi88Lfoo4RfE5SisDbYCcn4yBbSmKia13gVNekQX5T9DCVQY4Fjm8uG8yQXiqihl2NeZmr_HSjtT_XRpfPe8ny0OPaDwLGDuiAVh2tLSBn4e_RrdzUzRFB655G3I8DY9-sKOKHSnyBx8yfOm_wEgSdMCm6x_LAAk2",
      position: "Senior UI/UX Designer",
      appliedDate: "Oct 11, 2023",
      rating: 5,
    },
    {
      id: 3,
      name: "Sarah Jenkins",
      email: "s.jenkins@freelance.co",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBpwa8vY77GyWArjIR-A19L5xlelJw8j5O-m02Jhtkq7lsrW7aslbHHCVNwopc3FvyR8Bfa0j_mgvUC7S8G2CoMfFtyxWVHQzQBhLBlQp7JQis739nNDu9cGQaEVeyboFAgwRpWlQGSyuk11opJagAOhhzgoF1hu9_Zf4tsKWetQVnq1lGKzs4EKPDkBL0xoEk5dArhxThBmCxyUTC980hSQSwaNJRfJ9tq0OQH4b1-E8IrRCDDj0X1qrrdmZjY9tbgKN3foTx6Qhse",
      position: "Senior UI/UX Designer",
      appliedDate: "Oct 10, 2023",
      rating: 3,
    },
    {
      id: 4,
      name: "Michael Kinsley",
      email: "mkinsley@global.net",
      initials: "MK",
      position: "Senior UI/UX Designer",
      appliedDate: "Oct 09, 2023",
      rating: 4,
    },
  ];

  const handleShortlist = (applicantId) => {
    console.log("Shortlist applicant:", applicantId);
  };

  const handleReject = (applicantId) => {
    console.log("Reject applicant:", applicantId);
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5 text-orange-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className="material-symbols-outlined text-lg"
            style={{
              fontVariationSettings: star <= rating ? "'FILL' 1" : "'FILL' 0",
            }}
          >
            star
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="flex-1">
      {/* Main Content */}
      <div className="p-8">
        <div className="mx-auto max-w-7xl">
          {/* Header Section */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="mb-2 font-headline text-3xl font-extrabold tracking-tight text-slate-800">
                Senior UI/UX Designer
              </h1>
              <p className="text-sm font-medium text-slate-500">
                124 Total Applicants • San Francisco, CA (Remote)
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 rounded border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:shadow-md">
                <span className="material-symbols-outlined text-lg">tune</span>
                Filters
              </button>
              <button className="flex items-center gap-2 rounded bg-orange-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-orange-700">
                <span className="material-symbols-outlined text-lg">upload</span>
                Export List
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
            <div className="rounded border border-slate-200 bg-white p-6 shadow-sm">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                New Applied
              </p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-extrabold text-slate-800">42</span>
                <span className="mb-1 text-xs font-bold text-green-600">+12%</span>
              </div>
            </div>
            <div className="rounded border border-slate-200 bg-white p-6 shadow-sm">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                Shortlisted
              </p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-extrabold text-slate-800">18</span>
                <span className="mb-1 text-xs font-bold text-slate-500">Top 15%</span>
              </div>
            </div>
            <div className="rounded border border-slate-200 bg-white p-6 shadow-sm">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                Avg. Rating
              </p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-extrabold text-slate-800">4.2</span>
                <span
                  className="material-symbols-outlined mb-1 text-orange-400"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
              </div>
            </div>
            <div className="rounded border border-slate-200 bg-white p-6 shadow-sm">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                Avg. Experience
              </p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-extrabold text-slate-800">6.4</span>
                <span className="mb-1 text-xs text-slate-500">YEARS</span>
              </div>
            </div>
          </div>

          {/* Applicants Table */}
          <div className="overflow-hidden rounded border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                      Candidate Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                      Applied For
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                      Date Applied
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                      Rating
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                      Resume
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-400">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {applicants.map((applicant) => (
                    <tr
                      key={applicant.id}
                      className="border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50/50 group"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          {applicant.avatar ? (
                            <img
                              className="h-10 w-10 rounded-full object-cover shadow-sm"
                              src={applicant.avatar}
                              alt={applicant.name}
                            />
                          ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 font-bold text-orange-600">
                              {applicant.initials}
                            </div>
                          )}
                          <div>
                            <p className="text-sm font-bold text-slate-800">
                              {applicant.name}
                            </p>
                            <p className="text-xs font-medium text-slate-500">
                              {applicant.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-sm font-medium text-slate-700">
                          {applicant.position}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-sm text-slate-600">
                          {applicant.appliedDate}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        {renderStars(applicant.rating)}
                      </td>
                      <td className="px-6 py-5">
                        <Link
                          to={`/company/applicants/${applicant.id}/resume`}
                          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-tight text-orange-600 underline-offset-4 transition"
                        >
                          <span className="material-symbols-outlined text-sm">
                            visibility
                          </span>
                          Resume Preview
                        </Link>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleShortlist(applicant.id)}
                            className="rounded bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-600 transition-all hover:bg-orange-100"
                          >
                            Shortlist
                          </button>
                          <button
                            onClick={() => handleReject(applicant.id)}
                            className="rounded bg-red-50 px-3 py-1.5 text-xs font-bold text-red-500 transition-all hover:bg-red-100"
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

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
              <p className="text-xs font-medium text-slate-500">
                Showing 1 to 10 of 124 candidates
              </p>
              <div className="flex items-center gap-1">
                <button className="flex h-8 w-8 items-center justify-center rounded border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:bg-slate-50 hover:text-slate-700">
                  <span className="material-symbols-outlined text-lg">
                    chevron_left
                  </span>
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded bg-orange-600 text-xs font-bold text-white shadow-sm">
                  1
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded border border-slate-200 bg-white text-xs font-bold text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-700">
                  2
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded border border-slate-200 bg-white text-xs font-bold text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-700">
                  3
                </button>
                <span className="px-1 text-slate-400">...</span>
                <button className="flex h-8 w-8 items-center justify-center rounded border border-slate-200 bg-white text-xs font-bold text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-700">
                  13
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:bg-slate-50 hover:text-slate-700">
                  <span className="material-symbols-outlined text-lg">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer Info Cards */}
          <div className="grid grid-cols-1 gap-8 pb-12 md:grid-cols-2 mt-8">
            <div className="flex items-start gap-4 rounded border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-600">
                <span className="material-symbols-outlined">lightbulb</span>
              </div>
              <div>
                <h4 className="mb-1 text-sm font-bold text-slate-800">Recruitment Tip</h4>
                <p className="text-xs leading-relaxed text-slate-600">
                  Candidates with high design ratings typically have portfolio
                  links attached to their resume preview. Look for "Portfolio"
                  keywords in the Resume Preview mode.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-600">
                <span className="material-symbols-outlined">schedule</span>
              </div>
              <div>
                <h4 className="mb-1 text-sm font-bold text-slate-800">Upcoming Interviews</h4>
                <p className="text-xs leading-relaxed text-slate-600">
                  You have 4 interviews scheduled for this role tomorrow
                  starting at 10:00 AM PST. Ensure all candidates are marked as
                  &apos;Shortlisted&apos; to view their profile details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantsList;