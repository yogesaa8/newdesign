import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  role: null,
  isAuthenticated: false,
  setAuth: ({ user, role }) => set({ user, role, isAuthenticated: true }),
  clearAuth: () => set({ user: null, role: null, isAuthenticated: false }),
}));
