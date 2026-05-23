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
const asArray = (payload) => {
  const data = getResponseData(payload);
  return Array.isArray(data) ? data : data?.items ?? data?.rows ?? [];
};

const cleanPayload = (payload) =>
  Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== "" && value != null),
  );

const getId = (item) =>
  item?.id ??
  item?._id ??
  item?.uuid ??
  (globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`);

const formatYearRange = (start, end) => {
  if (!start && !end) return "";
  return [start, end || "Present"].filter(Boolean).join(" - ");
};

const formatDateRange = (start, end, isCurrent) => {
  if (!start && !end) return "";
  return [start, isCurrent ? "Present" : end].filter(Boolean).join(" - ");
};

const emptyProfile = {
  name: "",
  full_name: "",
  location_id: "",
  location_city: "",
  location_state: "",
  stream: "",
  degree: "",
  graduation_year: "",
  college_name_manual: "",
  position: "",
  target_role: "",
  bio: "",
  cover: "",
  cover_photo_url: "",
  avatar: "",
  github_url: "",
  linkedin_url: "",
  portfolio_url: "",
  skills: "",
  links: {
    github: "",
    linkedin: "",
    portfolio: "",
  },
  applications: [],
  completion: 0,
};

const normalizeProfile = (payload) => {
  const data = getResponseData(payload);
  const profile = data?.profile ?? data?.seeker ?? data ?? {};
  const location = profile.location ?? null;

  return {
    ...emptyProfile,
    ...profile,
    name: profile.full_name || profile.name || "",
    full_name: profile.full_name || profile.name || "",
    location_id: profile.location_id || "",
    location_city: location?.city || profile.location_city || profile.city || "",
    location_state: location?.state || profile.location_state || profile.state || "",
    stream: profile.stream || "",
    degree: profile.degree || "",
    graduation_year: profile.graduation_year || "",
    college_name_manual: profile.college_name_manual || "",
    position: profile.target_role || profile.position || "",
    target_role: profile.target_role || "",
    bio: profile.bio || "",
    cover: profile.cover_photo_url || profile.cover || "",
    cover_photo_url: profile.cover_photo_url || "",
    github_url: profile.github_url || "",
    linkedin_url: profile.linkedin_url || "",
    portfolio_url: profile.portfolio_url || "",
    skills: profile.skills || "",
    links: {
      github: profile.github_url || "",
      linkedin: profile.linkedin_url || "",
      portfolio: profile.portfolio_url || "",
    },
  };
};

const normalizeExperience = (item) => ({
  ...item,
  id: getId(item),
  role: item.title || item.role || "",
  company: item.company_name || item.company || "",
  period:
    item.period ||
    formatDateRange(item.start_date, item.end_date, item.is_current),
  description: item.description || "",
});

const normalizeProject = (item) => ({
  ...item,
  id: getId(item),
  title: item.title || "",
  duration: item.duration || "",
  description: item.description || "",
  link: item.project_url || item.link || "",
  techStack: item.tech_stack || item.techStack || "",
});

const normalizeEducation = (item) => ({
  ...item,
  id: getId(item),
  degree: item.degree || "",
  institution: item.institution_name || item.institution || "",
  period: item.period || formatYearRange(item.start_year, item.end_year),
  description: item.description || "",
  grade: item.grade || "",
});

export const useSeekerProfileStore = create((set, get) => ({
  profile: emptyProfile,
  experiences: [],
  projects: [],
  educations: [],
  isLoading: false,
  isSaving: false,
  error: null,

  clearError: () => set({ error: null }),

  fetchSeekerProfile: async (token) => {
    set({ isLoading: true, error: null });

    try {
      const payload = await apiRequest("/profile", { token });
      set({ profile: normalizeProfile(payload), isLoading: false });
      return payload;
    } catch (error) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },

  completeSeekerProfile: async (details, token) => {
    set({ isSaving: true, error: null });

    try {
      const payload = await apiRequest("/profile/complete", {
        method: "POST",
        token,
        body: JSON.stringify(cleanPayload(details)),
      });
      set({ profile: normalizeProfile(payload), isSaving: false });
      return payload;
    } catch (error) {
      set({ isSaving: false, error: error.message });
      throw error;
    }
  },

  updateSeekerProfile: async (details, token) => {
    set({ isSaving: true, error: null });

    try {
      const payload = await apiRequest("/profile", {
        method: "PUT",
        token,
        body: JSON.stringify(cleanPayload(details)),
      });
      set((state) => ({
        profile: { ...state.profile, ...normalizeProfile(payload) },
        isSaving: false,
      }));
      return payload;
    } catch (error) {
      set({ isSaving: false, error: error.message });
      throw error;
    }
  },

  deleteSeekerProfile: async (token) => {
    set({ isSaving: true, error: null });

    try {
      const payload = await apiRequest("/profile", {
        method: "DELETE",
        token,
      });
      set({
        profile: emptyProfile,
        experiences: [],
        projects: [],
        educations: [],
        isSaving: false,
      });
      return payload;
    } catch (error) {
      set({ isSaving: false, error: error.message });
      throw error;
    }
  },

  fetchExperiences: async (token) => {
    set({ isLoading: true, error: null });

    try {
      const payload = await apiRequest("/profile/experiences", { token });
      const experiences = asArray(payload).map(normalizeExperience);
      set({ experiences, isLoading: false });
      return payload;
    } catch (error) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },

  addExperience: async (details, token) => {
    set({ isSaving: true, error: null });

    try {
      const payload = await apiRequest("/profile/experience", {
        method: "POST",
        token,
        body: JSON.stringify(cleanPayload(details)),
      });
      const experience = normalizeExperience(getResponseData(payload));
      set({ experiences: [experience, ...get().experiences], isSaving: false });
      return payload;
    } catch (error) {
      set({ isSaving: false, error: error.message });
      throw error;
    }
  },

  updateExperience: async (experienceId, details, token) => {
    set({ isSaving: true, error: null });

    try {
      const payload = await apiRequest(`/profile/experience/${experienceId}`, {
        method: "PUT",
        token,
        body: JSON.stringify(cleanPayload(details)),
      });
      const updated = normalizeExperience(getResponseData(payload));
      set({
        experiences: get().experiences.map((item) =>
          item.id === experienceId ? { ...item, ...updated, id: item.id } : item,
        ),
        isSaving: false,
      });
      return payload;
    } catch (error) {
      set({ isSaving: false, error: error.message });
      throw error;
    }
  },

  deleteExperience: async (experienceId, token) => {
    set({ isSaving: true, error: null });

    try {
      const payload = await apiRequest(`/profile/experience/${experienceId}`, {
        method: "DELETE",
        token,
      });
      set({
        experiences: get().experiences.filter((item) => item.id !== experienceId),
        isSaving: false,
      });
      return payload;
    } catch (error) {
      set({ isSaving: false, error: error.message });
      throw error;
    }
  },

  fetchProjects: async (token) => {
    set({ isLoading: true, error: null });

    try {
      const payload = await apiRequest("/profile/projects", { token });
      const projects = asArray(payload).map(normalizeProject);
      set({ projects, isLoading: false });
      return payload;
    } catch (error) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },

  addProject: async (details, token) => {
    set({ isSaving: true, error: null });

    try {
      const payload = await apiRequest("/profile/project", {
        method: "POST",
        token,
        body: JSON.stringify(cleanPayload(details)),
      });
      const project = normalizeProject(getResponseData(payload));
      set({ projects: [project, ...get().projects], isSaving: false });
      return payload;
    } catch (error) {
      set({ isSaving: false, error: error.message });
      throw error;
    }
  },

  updateProject: async (projectId, details, token) => {
    set({ isSaving: true, error: null });

    try {
      const payload = await apiRequest(`/profile/project/${projectId}`, {
        method: "PUT",
        token,
        body: JSON.stringify(cleanPayload(details)),
      });
      const updated = normalizeProject(getResponseData(payload));
      set({
        projects: get().projects.map((item) =>
          item.id === projectId ? { ...item, ...updated, id: item.id } : item,
        ),
        isSaving: false,
      });
      return payload;
    } catch (error) {
      set({ isSaving: false, error: error.message });
      throw error;
    }
  },

  deleteProject: async (projectId, token) => {
    set({ isSaving: true, error: null });

    try {
      const payload = await apiRequest(`/profile/project/${projectId}`, {
        method: "DELETE",
        token,
      });
      set({
        projects: get().projects.filter((item) => item.id !== projectId),
        isSaving: false,
      });
      return payload;
    } catch (error) {
      set({ isSaving: false, error: error.message });
      throw error;
    }
  },

  fetchEducations: async (token) => {
    set({ isLoading: true, error: null });

    try {
      const payload = await apiRequest("/profile/educations", { token });
      const educations = asArray(payload).map(normalizeEducation);
      set({ educations, isLoading: false });
      return payload;
    } catch (error) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },

  addEducation: async (details, token) => {
    set({ isSaving: true, error: null });

    try {
      const payload = await apiRequest("/profile/education", {
        method: "POST",
        token,
        body: JSON.stringify(cleanPayload(details)),
      });
      const education = normalizeEducation(getResponseData(payload));
      set({ educations: [education, ...get().educations], isSaving: false });
      return payload;
    } catch (error) {
      set({ isSaving: false, error: error.message });
      throw error;
    }
  },

  updateEducation: async (educationId, details, token) => {
    set({ isSaving: true, error: null });

    try {
      const payload = await apiRequest(`/profile/education/${educationId}`, {
        method: "PUT",
        token,
        body: JSON.stringify(cleanPayload(details)),
      });
      const updated = normalizeEducation(getResponseData(payload));
      set({
        educations: get().educations.map((item) =>
          item.id === educationId ? { ...item, ...updated, id: item.id } : item,
        ),
        isSaving: false,
      });
      return payload;
    } catch (error) {
      set({ isSaving: false, error: error.message });
      throw error;
    }
  },

  deleteEducation: async (educationId, token) => {
    set({ isSaving: true, error: null });

    try {
      const payload = await apiRequest(`/profile/education/${educationId}`, {
        method: "DELETE",
        token,
      });
      set({
        educations: get().educations.filter((item) => item.id !== educationId),
        isSaving: false,
      });
      return payload;
    } catch (error) {
      set({ isSaving: false, error: error.message });
      throw error;
    }
  },
}));
