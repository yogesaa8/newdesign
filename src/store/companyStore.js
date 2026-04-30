import { create } from "zustand";

export const useCompanyStore = create((set) => ({
  company: null,
  applicants: [],
  setCompany: (company) => set({ company }),
  setApplicants: (applicants) => set({ applicants }),
}));
