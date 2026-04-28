import React from 'react';
import Breadcrumb from '../components/ui/Breadcrumb';
import { upcomingInterviews } from '../data/mockData';
import { FiCalendar, FiClock, FiUser, FiVideo, FiMapPin, FiChevronRight } from 'react-icons/fi';

const Interviews = () => {
  return (
    <>
      <Breadcrumb pageName="Interviews" />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-black dark:text-white mb-4">Upcoming Interviews</h3>
          
          {upcomingInterviews.map((interview) => (
            <div key={interview.id} className="rounded-2xl border border-stroke bg-white p-6 shadow-sm dark:border-strokedark dark:bg-boxdark">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary bg-opacity-10 text-primary flex items-center justify-center flex-shrink-0">
                    <FiCalendar size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-black dark:text-white text-lg">{interview.position}</h4>
                    <p className="text-primary font-medium">{interview.company} • {interview.type}</p>
                    <div className="mt-3 flex flex-wrap gap-4 text-sm text-body">
                       <span className="flex items-center gap-1.5"><FiCalendar size={16} /> {interview.date}</span>
                       <span className="flex items-center gap-1.5"><FiClock size={16} /> {interview.time}</span>
                       <span className="flex items-center gap-1.5"><FiUser size={16} /> {interview.interviewer}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                   <button className="flex items-center gap-2 rounded-full bg-primary py-2 px-8 font-medium text-white hover:bg-secondary transition-all shadow-lg shadow-primary/20">
                      <FiVideo size={18} /> Join Meeting
                   </button>
                   <button className="flex items-center gap-2 rounded-full border border-stroke py-2 px-6 font-medium hover:border-primary hover:text-primary transition-all dark:border-strokedark text-muted">
                      Reschedule
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
           <div className="rounded-2xl border border-stroke bg-white shadow-sm dark:border-strokedark dark:bg-boxdark p-6">
              <h3 className="text-lg font-bold text-black dark:text-white mb-6">Calendar View</h3>
              {/* Simplified Calendar UI */}
              <div className="flex flex-col gap-4">
                 {[...Array(5)].map((_, i) => (
                   <div key={i} className="flex items-center gap-4 border-b border-stroke pb-4 last:border-0 last:pb-0 dark:border-strokedark">
                      <div className="text-center min-w-[50px]">
                         <p className="text-sm font-bold text-black dark:text-white">{28 + i}</p>
                         <p className="text-xs uppercase">Apr</p>
                      </div>
                      <div className="flex-1">
                         <p className="text-sm font-medium text-black dark:text-white">
                            {i === 0 ? 'Interview with Google' : i === 4 ? 'Interview with Stripe' : 'No events'}
                         </p>
                         { (i === 0 || i === 4) && <p className="text-xs text-primary">Technical Round</p> }
                      </div>
                      {(i === 0 || i === 4) && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                   </div>
                 ))}
                 <button className="text-primary text-sm font-medium hover:underline mt-2">Open Full Calendar</button>
              </div>
           </div>

           <div className="rounded-2xl border border-stroke bg-white shadow-sm dark:border-strokedark dark:bg-boxdark p-6">
              <h3 className="text-lg font-bold text-black dark:text-white mb-4">Interview Tips</h3>
              <ul className="space-y-4">
                 <li className="flex gap-3">
                    <FiChevronRight size={18} className="text-primary shrink-0" />
                    <p className="text-sm">Research the company's culture and values.</p>
                 </li>
                 <li className="flex gap-3">
                    <FiChevronRight size={18} className="text-primary shrink-0" />
                    <p className="text-sm">Prepare STAR method responses for behavioral questions.</p>
                 </li>
                 <li className="flex gap-3">
                    <FiChevronRight size={18} className="text-primary shrink-0" />
                    <p className="text-sm">Dress professionally even for video calls.</p>
                 </li>
              </ul>
           </div>
        </div>
      </div>
    </>
  );
};

export default Interviews;
