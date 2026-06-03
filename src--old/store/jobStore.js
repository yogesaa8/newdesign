import { create } from "zustand";

export const useJobStore = create((set) => ({
  jobs: [],
  selectedJob: null,
  setJobs: (jobs) => set({ jobs }),
  setSelectedJob: (selectedJob) => set({ selectedJob }),
}));
