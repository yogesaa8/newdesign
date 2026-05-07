import { create } from "zustand";

export const useAdminStore = create((set) => ({
 activeTab: "overview",
 setActiveTab: (activeTab) => set({ activeTab }),
}));
