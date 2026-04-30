import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ApplicantsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Sample applicant data
  const applicants = [
    {
      id: 1,
      name: 'Elena Rodriguez',
      email: 'erodriguez@design.com',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAh1ZBRWBk6jYZ4m2xJLzEpXU0N3wVdUQm-SiO4Y3kz6VY_yNdSN8JWp0f8YF8wm_zFQF0u4rJYZN6vR8gZ0N3wVdUQm-SiO4Y3kz6VY_yNdSN8JWp0f8YF8wm_zFQF0u4rJYZN6vR8gZ0N3wVdUQm-SiO4Y3kz6VY_yNdSN8JWp0f8YF8wm_zFQF0u4rJYZN6vR8gZ',
      position: 'Senior UI/UX Designer',
      appliedDate: 'Oct 12, 2023',
      rating: 5,
    },
    {
      id: 2,
      name: 'Jonathan Wu',
      email: 'j.wu@techcloud.io',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCqNyi1oOBlNY_0NSwXbms5bpHhJd8wjKFTf5GOw5JSSk8SN_i3h5olsNQppl4kUmnf3fSXMy6qN5yqtWhWVyTERl6hpGNq0N8r__RS1in2OOZi88Lfoo4RfE5SisDbYCcn4yBbSmKia13gVNekQX5T9DCVQY4Fjm8uG8yQXiqihl2NeZmr_HSjtT_XRpfPe8ny0OPaDwLGDuiAVh2tLSBn4e_RrdzUzRFB655G3I8DY9-sKOKHSnyBx8yfOm_wEgSdMCm6x_LAAk2',
      position: 'Senior UI/UX Designer',
      appliedDate: 'Oct 11, 2023',
      rating: 5,
    },
    {
      id: 3,
      name: 'Sarah Jenkins',
      email: 's.jenkins@freelance.co',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpwa8vY77GyWArjIR-A19L5xlelJw8j5O-m02Jhtkq7lsrW7aslbHHCVNwopc3FvyR8Bfa0j_mgvUC7S8G2CoMfFtyxWVHQzQBhLBlQp7JQis739nNDu9cGQaEVeyboFAgwRpWlQGSyuk11opJagAOhhzgoF1hu9_Zf4tsKWetQVnq1lGKzs4EKPDkBL0xoEk5dArhxThBmCxyUTC980hSQSwaNJRfJ9tq0OQH4b1-E8IrRCDDj0X1qrrdmZjY9tbgKN3foTx6Qhse',
      position: 'Senior UI/UX Designer',
      appliedDate: 'Oct 10, 2023',
      rating: 3,
    },
    {
      id: 4,
      name: 'Michael Kinsley',
      email: 'mkinsley@global.net',
      initials: 'MK',
      position: 'Senior UI/UX Designer',
      appliedDate: 'Oct 09, 2023',
      rating: 4,
    },
  ];

  const handleShortlist = (applicantId) => {
    console.log('Shortlist applicant:', applicantId);
  };

  const handleReject = (applicantId) => {
    console.log('Reject applicant:', applicantId);
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5 text-[#FFB800]">
        {[1, 2, 3, 4, 5].map((star) => (
          <span 
            key={star} 
            className="material-symbols-outlined text-lg"
            style={{ fontVariationSettings: star <= rating ? "'FILL' 1" : "'FILL' 0" }}
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
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-on-surface tracking-tight mb-2 font-headline">
                Senior UI/UX Designer
              </h1>
              <p className="text-sm text-outline font-medium">
                124 Total Applicants • San Francisco, CA (Remote)
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 rounded-lg bg-surface-container-lowest text-on-surface font-semibold text-sm flex items-center gap-2 hover:bg-surface-container-low transition-all">
                <span className="material-symbols-outlined text-lg">tune</span>
                Filters
              </button>
              <button className="px-6 py-2 rounded-lg bg-primary text-on-primary font-semibold text-sm flex items-center gap-2 shadow-sm hover:opacity-90 transition-all">
                <span className="material-symbols-outlined text-lg">upload</span>
                Export List
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-surface-container-lowest p-6 rounded-xl">
              <p className="text-xs font-bold text-outline uppercase tracking-wider mb-2">New Applied</p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-extrabold text-on-surface">42</span>
                <span className="text-xs font-bold text-green-600 mb-1">+12%</span>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-xl">
              <p className="text-xs font-bold text-outline uppercase tracking-wider mb-2">Shortlisted</p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-extrabold text-on-surface">18</span>
                <span className="text-xs font-bold text-primary mb-1">Top 15%</span>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-xl">
              <p className="text-xs font-bold text-outline uppercase tracking-wider mb-2">Avg. Rating</p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-extrabold text-on-surface">4.2</span>
                <span className="material-symbols-outlined text-[#FFB800] mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-xl">
              <p className="text-xs font-bold text-outline uppercase tracking-wider mb-2">Avg. Experience</p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-extrabold text-on-surface">6.4</span>
                <span className="text-xs text-outline mb-1">YEARS</span>
              </div>
            </div>
          </div>

          {/* Applicants Table */}
          <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-surface-container-low border-b border-outline-variant/10">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-outline uppercase tracking-wider">
                      Candidate Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-outline uppercase tracking-wider">
                      Applied For
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-outline uppercase tracking-wider">
                      Date Applied
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-outline uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-outline uppercase tracking-wider">
                      Resume
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-outline uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-outline-variant/10">
                  {applicants.map((applicant) => (
                    <tr key={applicant.id} className="hover:bg-surface-container-low transition-colors group">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          {applicant.avatar ? (
                            <img 
                              className="w-10 h-10 rounded-full object-cover" 
                              src={applicant.avatar}
                              alt={applicant.name}
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-tertiary-fixed text-tertiary font-bold flex items-center justify-center">
                              {applicant.initials}
                            </div>
                          )}
                          <div>
                            <p className="text-sm font-bold text-on-surface">{applicant.name}</p>
                            <p className="text-xs text-outline font-medium">{applicant.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-sm font-medium text-on-surface">{applicant.position}</span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-sm text-outline">{applicant.appliedDate}</span>
                      </td>
                      <td className="px-6 py-5">
                        {renderStars(applicant.rating)}
                      </td>
                      <td className="px-6 py-5">
                        <Link 
                          to={`/company-applicants/${applicant.id}/resume`}
                          className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-tight hover:underline decoration-2 underline-offset-4"
                        >
                          <span className="material-symbols-outlined text-sm">visibility</span>
                          Resume Preview
                        </Link>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleShortlist(applicant.id)}
                            className="px-3 py-1.5 rounded-lg text-primary bg-primary/10 font-bold text-xs hover:bg-primary/20 transition-all"
                          >
                            Shortlist
                          </button>
                          <button
                            onClick={() => handleReject(applicant.id)}
                            className="px-3 py-1.5 rounded-lg text-error bg-error/8 hover:bg-error/15 font-bold text-xs transition-all"
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
            <div className="px-6 py-4 bg-surface-container-low flex items-center justify-between">
              <p className="text-xs text-outline font-medium">Showing 1 to 10 of 124 candidates</p>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 rounded bg-white flex items-center justify-center text-outline hover:text-primary transition-colors shadow-sm">
                  <span className="material-symbols-outlined text-lg">chevron_left</span>
                </button>
                <button className="w-8 h-8 rounded bg-primary text-on-primary text-xs font-bold shadow-sm">1</button>
                <button className="w-8 h-8 rounded bg-white text-on-surface text-xs font-bold hover:bg-primary/5 transition-colors shadow-sm">2</button>
                <button className="w-8 h-8 rounded bg-white text-on-surface text-xs font-bold hover:bg-primary/5 transition-colors shadow-sm">3</button>
                <span className="px-1 text-outline">...</span>
                <button className="w-8 h-8 rounded bg-white text-on-surface text-xs font-bold hover:bg-primary/5 transition-colors shadow-sm">13</button>
                <button className="w-8 h-8 rounded bg-white flex items-center justify-center text-outline hover:text-primary transition-colors shadow-sm">
                  <span className="material-symbols-outlined text-lg">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer Info Cards */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 pb-12">
            <div className="p-6 rounded-xl bg-surface-container shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined">lightbulb</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-on-surface mb-1">Recruitment Tip</h4>
                <p className="text-xs text-outline leading-relaxed">
                  Candidates with high design ratings typically have portfolio links attached to their resume preview. 
                  Look for "Portfolio" keywords in the Resume Preview mode.
                </p>
              </div>
            </div>
            <div className="p-6 rounded-xl bg-surface-container-high shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-tertiary-container/10 flex items-center justify-center text-tertiary shrink-0">
                <span className="material-symbols-outlined">schedule</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-on-surface mb-1">Upcoming Interviews</h4>
                <p className="text-xs text-outline leading-relaxed">
                  You have 4 interviews scheduled for this role tomorrow starting at 10:00 AM PST. 
                  Ensure all candidates are marked as 'Shortlisted' to view their profile details.
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
