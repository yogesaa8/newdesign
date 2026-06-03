import React from 'react';
import { FiHelpCircle, FiMessageCircle, FiFileText, FiChevronRight, FiSend } from 'react-icons/fi';
import Breadcrumb from '../../../components/ui/Breadcrumb';

const Support = () => {
  return (
    <>
      <Breadcrumb pageName="Support Center" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
         <div className="rounded-2xl border border-outline-variant bg-white shadow-sm dark:border-outline-variant/30 dark:bg-inverse-surface p-8">
            <h3 className="text-xl font-bold text-on-surface dark:text-white mb-6">How can we help you?</h3>
            <div className="space-y-4">
               <div className="flex items-center justify-between p-5 rounded-2xl border border-outline-variant dark:border-outline-variant/30 hover:bg-surface-container-low dark:hover:bg-primary/5 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                     <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <FiHelpCircle size={24} />
                     </div>
                     <span className="font-semibold text-on-surface dark:text-white">Knowledge Base</span>
                  </div>
                  <FiChevronRight size={18} className="text-outline group-hover:text-primary transition-colors" />
               </div>
               <div className="flex items-center justify-between p-5 rounded-2xl border border-outline-variant dark:border-outline-variant/30 hover:bg-surface-container-low dark:hover:bg-primary/5 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                     <div className="h-12 w-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
                        <FiMessageCircle size={24} />
                     </div>
                     <span className="font-semibold text-on-surface dark:text-white">Community Forum</span>
                  </div>
                  <FiChevronRight size={18} className="text-outline group-hover:text-primary transition-colors" />
               </div>
               <div className="flex items-center justify-between p-5 rounded-2xl border border-outline-variant dark:border-outline-variant/30 hover:bg-surface-container-low dark:hover:bg-primary/5 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                     <div className="h-12 w-12 rounded-xl bg-outline/10 text-outline flex items-center justify-center">
                        <FiFileText size={24} />
                     </div>
                     <span className="font-semibold text-on-surface dark:text-white">API Documentation</span>
                  </div>
                  <FiChevronRight size={18} className="text-outline group-hover:text-primary transition-colors" />
               </div>
            </div>
         </div>

         <div className="rounded-2xl border border-outline-variant bg-white shadow-sm dark:border-outline-variant/30 dark:bg-inverse-surface p-8">
            <h3 className="text-xl font-bold text-on-surface dark:text-white mb-6">Open a Support Ticket</h3>
            <form>
               <div className="mb-4.5">
                  <label className="mb-2.5 block text-sm font-medium text-on-surface dark:text-white">Subject</label>
                  <input type="text" placeholder="Enter ticket subject" className="w-full rounded-xl border border-outline-variant bg-surface-container-low dark:bg-primary/5 py-3 px-5 text-on-surface outline-none focus:ring-1 focus:ring-primary/20 dark:border-outline-variant/30 dark:text-white" />
               </div>
               <div className="mb-4.5">
                  <label className="mb-2.5 block text-sm font-medium text-on-surface dark:text-white">Category</label>
                  <select className="w-full rounded-xl border border-outline-variant bg-surface-container-low dark:bg-primary/5 py-3 px-5 text-on-surface outline-none focus:ring-1 focus:ring-primary/20 dark:border-outline-variant/30 dark:text-white">
                     <option>Technical Issue</option>
                     <option>Billing</option>
                     <option>Account Access</option>
                     <option>Feature Request</option>
                  </select>
               </div>
               <div className="mb-6">
                  <label className="mb-2.5 block text-sm font-medium text-on-surface dark:text-white">Description</label>
                  <textarea rows="5" placeholder="Describe your issue" className="w-full rounded-xl border border-outline-variant bg-surface-container-low dark:bg-primary/5 py-3 px-5 text-on-surface outline-none focus:ring-1 focus:ring-primary/20 dark:border-outline-variant/30 dark:text-white"></textarea>
               </div>
               <button className="flex w-full justify-center rounded-full bg-primary p-3.5 font-bold text-white hover:bg-primary-container transition-all shadow-lg shadow-primary/20 items-center gap-2">
                  <FiSend size={18} /> Submit Ticket
               </button>
            </form>
         </div>
      </div>
    </>
  );
};

export default Support;
