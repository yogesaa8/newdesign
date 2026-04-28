import React, { useState } from 'react';
import Breadcrumb from '../components/ui/Breadcrumb';
import { applications } from '../data/mockData';
import { FiSearch, FiFilter, FiChevronLeft, FiChevronRight, FiMoreHorizontal, FiEye, FiTrash2 } from 'react-icons/fi';

const Applications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          app.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <Breadcrumb pageName="Job Applications" />

      <div className="rounded-2xl border border-stroke bg-white shadow-sm dark:border-strokedark dark:bg-boxdark overflow-hidden">
        <div className="flex flex-col gap-5 p-4 md:flex-row md:items-center md:justify-between md:p-6 xl:p-7.5">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search applications..."
              className="w-full rounded-full border border-stroke bg-bg-soft dark:bg-primary/5 py-2.5 pl-10 pr-4 outline-none focus:ring-1 focus:ring-primary/20 dark:border-strokedark text-black dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
          </div>

          <div className="flex items-center gap-3">
             <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-black dark:text-white">Status:</span>
                <select 
                  className="rounded-full border border-stroke bg-bg-soft dark:bg-primary/5 py-2 px-4 outline-none focus:ring-1 focus:ring-primary/20 dark:border-strokedark"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Interview Scheduled">Interview Scheduled</option>
                  <option value="Rejected">Rejected</option>
                </select>
             </div>
             <button className="flex items-center gap-2 rounded-full border border-stroke py-2 px-6 font-medium hover:border-primary hover:text-primary transition-all dark:border-strokedark text-muted">
                <FiFilter size={18} /> Filter
             </button>
          </div>
        </div>

        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-bg-soft text-left dark:bg-primary/10">
                <th className="min-w-[220px] py-4 px-4 font-semibold text-black dark:text-white xl:pl-11">Job Title & Company</th>
                <th className="min-w-[150px] py-4 px-4 font-semibold text-black dark:text-white">Applied Date</th>
                <th className="min-w-[120px] py-4 px-4 font-semibold text-black dark:text-white">Status</th>
                <th className="py-4 px-4 font-semibold text-black dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((app, key) => (
                <tr key={key} className="border-b border-stroke dark:border-strokedark hover:bg-bg-soft/30 dark:hover:bg-primary/5 transition-colors">
                  <td className="py-5 px-4 pl-9 xl:pl-11">
                    <div className="flex items-center gap-3">
                       <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-white p-1 border border-stroke dark:border-strokedark">
                          <img src={app.logo} alt="Company" />
                       </div>
                       <div>
                          <h5 className="font-semibold text-black dark:text-white">{app.jobTitle}</h5>
                          <p className="text-sm text-muted">{app.company}</p>
                       </div>
                    </div>
                  </td>
                  <td className="py-5 px-4">
                    <p className="text-black dark:text-white text-sm">{app.date}</p>
                  </td>
                  <td className="py-5 px-4">
                    <span className={`inline-flex rounded-full py-1 px-3 text-xs font-bold 
                      ${app.status === 'Interview Scheduled' ? 'bg-success/10 text-success' : 
                        app.status === 'Shortlisted' ? 'bg-primary/10 text-primary' : 
                        app.status === 'Rejected' ? 'bg-danger/10 text-danger' : 'bg-warning/10 text-warning'}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="py-5 px-4">
                    <div className="flex items-center space-x-3.5 text-muted">
                      <button className="hover:text-primary transition-colors" title="View Details"><FiEye size={18} /></button>
                      <button className="hover:text-danger transition-colors" title="Delete"><FiTrash2 size={18} /></button>
                      <button className="hover:text-primary transition-colors"><FiMoreHorizontal size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between p-4 md:p-6 xl:p-7.5 border-t border-stroke dark:border-strokedark">
           <p className="text-sm text-muted">Showing 1 to {filteredApplications.length} of {filteredApplications.length} entries</p>
           <div className="flex items-center gap-2">
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-stroke text-muted hover:bg-primary hover:text-white transition-all dark:border-strokedark">
                 <FiChevronLeft size={18} />
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary bg-primary text-white shadow-lg shadow-primary/20">1</button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-stroke text-muted hover:bg-primary hover:text-white transition-all dark:border-strokedark">
                 <FiChevronRight size={18} />
              </button>
           </div>
        </div>
      </div>
    </>
  );
};

export default Applications;
