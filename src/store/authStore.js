import { create } from "zustand";

const AUTH_STORAGE_KEY = "jobPortalAuth";

const getStoredAuth = () => {
 try {
  const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
  return storedAuth ? JSON.parse(storedAuth) : null;
 } catch {
  return null;
 }
};

const storedAuth = getStoredAuth();

export const useAuthStore = create((set) => ({
 user: storedAuth?.user ?? null,
 role: storedAuth?.role ?? null,
 isAuthenticated: Boolean(storedAuth?.user && storedAuth?.role),
 setAuth: ({ user, role, remember = false }) => {
  if (remember) {
   localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user, role }));
  } else {
   localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  set({ user, role, isAuthenticated: true });
 },
 clearAuth: () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  set({ user: null, role: null, isAuthenticated: false });
 },
}));
