import React from 'react';
import { FiBell, FiSettings, FiPlus, FiTrash2, FiEdit3 } from 'react-icons/fi';
import Breadcrumb from '../../../components/ui/Breadcrumb';

const JobAlerts = () => {
  const alerts = [
    { id: 1, role: "Senior React Developer", location: "Remote", frequency: "Daily", status: true },
    { id: 2, role: "Full Stack Engineer", location: "San Francisco", frequency: "Weekly", status: true },
    { id: 3, role: "UI/UX Designer", location: "Austin, TX", frequency: "Daily", status: false }
  ];

  return (
    <>
      <Breadcrumb pageName="Job Alerts" />

      <div className="rounded-2xl border border-outline-variant bg-white shadow-sm dark:border-outline-variant/30 dark:bg-inverse-surface">
        <div className="border-b border-outline-variant py-4 px-6.5 dark:border-outline-variant/30 flex justify-between items-center">
          <h3 className="font-medium text-on-surface dark:text-white">Active Alerts</h3>
          <button className="flex items-center gap-2 rounded-full bg-primary py-2 px-6 text-sm font-medium text-white hover:bg-primary-container transition-all shadow-lg shadow-primary/20">
             <FiPlus size={18} /> Create New Alert
          </button>
        </div>

        <div className="p-6.5">
           <div className="flex flex-col gap-5">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border border-outline-variant dark:border-outline-variant/30 hover:border-primary/30 transition-all bg-surface-container-low/50 dark:bg-primary/5">
                   <div className="flex items-center gap-4 mb-4 sm:mb-0">
                      <div className={`h-12 w-12 rounded-full flex items-center justify-center ${alert.status ? 'bg-primary/10 text-primary' : 'bg-outline/10 text-outline'}`}>
                         <FiBell size={22} />
                      </div>
                      <div>
                         <h4 className="font-bold text-on-surface dark:text-white">{alert.role}</h4>
                         <p className="text-sm text-outline">{alert.location} • {alert.frequency} notifications</p>
                      </div>
                   </div>

                   <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                         <span className="text-sm font-medium text-outline">Status:</span>
                         <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked={alert.status} className="sr-only peer" />
                            <div className="w-11 h-6 bg-outline/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-outline-variant after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:bg-primary/20 peer-checked:bg-primary"></div>
                         </label>
                      </div>
                      <div className="flex items-center gap-3 text-outline">
                         <button className="hover:text-primary transition-colors"><FiEdit3 size={18} /></button>
                         <button className="hover:text-error transition-colors"><FiTrash2 size={18} /></button>
                      </div>
                   </div>
                </div>
              ))}
           </div>

           <div className="mt-10 rounded-2xl border border-outline-variant bg-surface-container-low p-8 dark:border-outline-variant/30 dark:bg-primary/5">
              <h4 className="mb-6 text-lg font-bold text-on-surface dark:text-white flex items-center gap-2">
                 <FiSettings size={20} className="text-primary" /> Notification Settings
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                 <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-on-surface">Email Notifications</span>
                    <input type="checkbox" defaultChecked className="h-5 w-5 rounded border-outline-variant text-primary focus:ring-primary accent-primary" />
                 </div>
                 <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-on-surface">Push Notifications</span>
                    <input type="checkbox" defaultChecked className="h-5 w-5 rounded border-outline-variant text-primary focus:ring-primary accent-primary" />
                 </div>
                 <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-on-surface">Weekly Job Digest</span>
                    <input type="checkbox" className="h-5 w-5 rounded border-outline-variant text-primary focus:ring-primary accent-primary" />
                 </div>
                 <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-on-surface">Profile View Alerts</span>
                    <input type="checkbox" defaultChecked className="h-5 w-5 rounded border-outline-variant text-primary focus:ring-primary accent-primary" />
                 </div>
              </div>
           </div>
        </div>
      </div>
    </>
  );
};

export default JobAlerts;
