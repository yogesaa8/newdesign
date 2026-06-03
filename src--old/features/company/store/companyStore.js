import { create } from "zustand";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");

const getApiUrl = (path) => {
  if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not configured.");
  }

  return `${API_BASE_URL}${path}`;
};

const parseApiResponse = async (response) => {
  const text = await response.text();
  const payload = text ? JSON.parse(text) : {};

  if (!response.ok) {
    const message =
      payload?.message ||
      payload?.error ||
      payload?.errors?.[0]?.message ||
      "Something went wrong. Please try again.";
    throw new Error(message);
  }

  return payload;
};

const apiRequest = async (path, { token, ...options } = {}) => {
  const response = await fetch(getApiUrl(path), {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  return parseApiResponse(response);
};

const getResponseData = (payload) => payload?.data ?? payload?.result ?? payload;

const cleanPayload = (payload) =>
  Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== "" && value != null),
  );

const normalizeCompanyProfile = (payload) => {
  const data = getResponseData(payload);
  const profile = data?.profile ?? data?.company ?? data ?? null;
  if (!profile || !profile.company_name) return null;
  const location = profile.location ?? null;
  return {
    ...profile,
    logo_url: profile.logo_url || "",
    location_id: profile.location_id || location?.id || "",
    location_city: location?.city || profile.location_city || "",
    location_state: location?.state || profile.location_state || "",
  };
};

export const useCompanyStore = create((set) => ({
  company: null,
  applicants: [],
  isLoading: false,
  isSaving: false,
  isDeleting: false,
  error: null,

  setCompany: (company) => set({ company }),
  setApplicants: (applicants) => set({ applicants }),
  clearError: () => set({ error: null }),

  fetchCompanyProfile: async (token) => {
    set({ isLoading: true, error: null });

    try {
      const payload = await apiRequest("/profile", { token });
      const company = normalizeCompanyProfile(payload);
      set({ company, isLoading: false });
      return payload;
    } catch (error) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },

  completeCompanyProfile: async (details, token) => {
    set({ isSaving: true, error: null });

    try {
      const requestBody = cleanPayload(details);
      const payload = await apiRequest("/profile/complete", {
        method: "POST",
        token,
        body: JSON.stringify(requestBody),
      });
      const company = normalizeCompanyProfile(payload) || requestBody;
      set({ company, isSaving: false });
      return payload;
    } catch (error) {
      set({ isSaving: false, error: error.message });
      throw error;
    }
  },

  updateCompanyProfile: async (details, token) => {
    set({ isSaving: true, error: null });

    try {
      const requestBody = cleanPayload(details);
      const payload = await apiRequest("/profile", {
        method: "PUT",
        token,
        body: JSON.stringify(requestBody),
      });
      const company = normalizeCompanyProfile(payload);
      set((state) => ({
        company: company ? { ...state.company, ...company } : { ...state.company, ...requestBody },
        isSaving: false,
      }));
      return payload;
    } catch (error) {
      set({ isSaving: false, error: error.message });
      throw error;
    }
  },

  deleteCompanyProfile: async (token) => {
    set({ isDeleting: true, error: null });

    try {
      const payload = await apiRequest("/profile", {
        method: "DELETE",
        token,
      });
      set({ company: null, isDeleting: false });
      return payload;
    } catch (error) {
      set({ isDeleting: false, error: error.message });
      throw error;
    }
  },
}));
