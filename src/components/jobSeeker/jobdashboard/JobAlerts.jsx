import React from 'react';
import Breadcrumb from '../components/ui/Breadcrumb';
import { FiBell, FiSettings, FiPlus, FiTrash2, FiEdit3 } from 'react-icons/fi';

const JobAlerts = () => {
  const alerts = [
    { id: 1, role: "Senior React Developer", location: "Remote", frequency: "Daily", status: true },
    { id: 2, role: "Full Stack Engineer", location: "San Francisco", frequency: "Weekly", status: true },
    { id: 3, role: "UI/UX Designer", location: "Austin, TX", frequency: "Daily", status: false }
  ];

  return (
    <>
      <Breadcrumb pageName="Job Alerts" />

      <div className="rounded-2xl border border-stroke bg-white shadow-sm dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex justify-between items-center">
          <h3 className="font-medium text-black dark:text-white">Active Alerts</h3>
          <button className="flex items-center gap-2 rounded-full bg-primary py-2 px-6 text-sm font-medium text-white hover:bg-secondary transition-all shadow-lg shadow-primary/20">
             <FiPlus size={18} /> Create New Alert
          </button>
        </div>

        <div className="p-6.5">
           <div className="flex flex-col gap-5">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border border-stroke dark:border-strokedark hover:border-primary/30 transition-all bg-bg-soft/50 dark:bg-primary/5">
                   <div className="flex items-center gap-4 mb-4 sm:mb-0">
                      <div className={`h-12 w-12 rounded-full flex items-center justify-center ${alert.status ? 'bg-primary/10 text-primary' : 'bg-muted/10 text-muted'}`}>
                         <FiBell size={22} />
                      </div>
                      <div>
                         <h4 className="font-bold text-black dark:text-white">{alert.role}</h4>
                         <p className="text-sm text-muted">{alert.location} • {alert.frequency} notifications</p>
                      </div>
                   </div>
                   
                   <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                         <span className="text-sm font-medium text-muted">Status:</span>
                         <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked={alert.status} className="sr-only peer" />
                            <div className="w-11 h-6 bg-muted/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:bg-primary/20 peer-checked:bg-primary"></div>
                         </label>
                      </div>
                      <div className="flex items-center gap-3 text-muted">
                         <button className="hover:text-primary transition-colors"><FiEdit3 size={18} /></button>
                         <button className="hover:text-danger transition-colors"><FiTrash2 size={18} /></button>
                      </div>
                   </div>
                </div>
              ))}
           </div>

           <div className="mt-10 rounded-2xl border border-stroke bg-bg-soft p-8 dark:border-strokedark dark:bg-primary/5">
              <h4 className="mb-6 text-lg font-bold text-black dark:text-white flex items-center gap-2">
                 <FiSettings size={20} className="text-primary" /> Notification Settings
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                 <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Email Notifications</span>
                    <input type="checkbox" defaultChecked className="h-5 w-5 rounded border-stroke text-primary focus:ring-primary accent-primary" />
                 </div>
                 <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Push Notifications</span>
                    <input type="checkbox" defaultChecked className="h-5 w-5 rounded border-stroke text-primary focus:ring-primary accent-primary" />
                 </div>
                 <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Weekly Job Digest</span>
                    <input type="checkbox" className="h-5 w-5 rounded border-stroke text-primary focus:ring-primary accent-primary" />
                 </div>
                 <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Profile View Alerts</span>
                    <input type="checkbox" defaultChecked className="h-5 w-5 rounded border-stroke text-primary focus:ring-primary accent-primary" />
                 </div>
              </div>
           </div>
        </div>
      </div>
    </>
  );
};

export default JobAlerts;
