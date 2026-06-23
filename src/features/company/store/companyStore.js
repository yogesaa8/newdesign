import { create } from "zustand";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  "https://nodebackend-smx3.onrender.com/api/v1"
).replace(/\/$/, "");

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
    const apiError = payload?.error;
    const message =
      payload?.message ||
      apiError?.message ||
      (typeof apiError === "string" ? apiError : "") ||
      payload?.errors?.[0]?.message ||
      "Something went wrong. Please try again.";
    const error = new Error(message);
    error.payload = payload;
    error.code =
      apiError?.code || (typeof apiError === "string" ? apiError : undefined);
    error.details = apiError?.details || payload?.errors;
    throw error;
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

const buildQueryString = (params = {}) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== "" && value != null) query.set(key, value);
  });

  const value = query.toString();
  return value ? `?${value}` : "";
};

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

const normalizeJobList = (payload) => {
  const data = getResponseData(payload);
  return {
    page: data?.page ?? 1,
    limit: data?.limit ?? 10,
    total: data?.total ?? data?.jobs?.length ?? 0,
    jobs: data?.jobs ?? [],
  };
};

const normalizeQuestionList = (payload) => {
  const data = getResponseData(payload);
  return data?.questions ?? [];
};

const normalizeApplicationList = (payload) => {
  const data = getResponseData(payload);
  const applications = data?.applications ?? [];

  return {
    applicantJob: data?.job ?? null,
    totalApplications: Number(data?.total_applications ?? applications.length),
    applications,
  };
};

const cleanQuestionPayload = (question) => {
  const payload = cleanPayload(question);

  if (!["single_choice", "multiple_choice"].includes(payload.question_type)) {
    delete payload.options;
    return payload;
  }

  payload.options = (payload.options || [])
    .map((option, index) =>
      cleanPayload({
        option_text: option.option_text,
        order_number: option.order_number || index + 1,
      }),
    )
    .filter((option) => option.option_text);

  return payload;
};

export const useCompanyStore = create((set) => ({
  company: null,
  applicants: [],
  applicantJob: null,
  totalApplications: 0,
  jobs: [],
  jobPagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
  questionsByJobId: {},
  isLoading: false,
  isSaving: false,
  isDeleting: false,
  isJobActionLoading: false,
  isApplicantsLoading: false,
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

  fetchCompanyJobs: async (filters = {}, token) => {
    set({ isLoading: true, error: null });

    try {
      const payload = await apiRequest(`/company/jobs${buildQueryString(filters)}`, {
        token,
      });
      const { jobs, page, limit, total } = normalizeJobList(payload);

      set({
        jobs,
        jobPagination: { page, limit, total },
        isLoading: false,
      });

      return payload;
    } catch (error) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },

  fetchJobApplications: async (jobId, token) => {
    set({
      isApplicantsLoading: true,
      error: null,
      applicants: [],
      applicantJob: null,
      totalApplications: 0,
    });

    try {
      const payload = await apiRequest(`/company/jobs/${jobId}/applications`, {
        token,
      });
      const { applications, applicantJob, totalApplications } =
        normalizeApplicationList(payload);

      set({
        applicants: applications,
        applicantJob,
        totalApplications,
        isApplicantsLoading: false,
      });

      return payload;
    } catch (error) {
      set({ isApplicantsLoading: false, error: error.message });
      throw error;
    }
  },

  createCompanyJob: async (details, token) => {
    set({ isSaving: true, error: null });

    try {
      const payload = await apiRequest("/company/jobs", {
        method: "POST",
        token,
        body: JSON.stringify(cleanPayload(details)),
      });
      const data = getResponseData(payload);
      const job = data?.job;

      if (job) {
        set((state) => ({
          jobs: [job, ...state.jobs],
          jobPagination: {
            ...state.jobPagination,
            total: state.jobPagination.total + 1,
          },
        }));
      }

      set({ isSaving: false });
      return payload;
    } catch (error) {
      set({ isSaving: false, error: error.message });
      throw error;
    }
  },

  updateCompanyJob: async (jobId, details, token) => {
    set({ isSaving: true, error: null });

    try {
      const payload = await apiRequest(`/company/jobs/${jobId}`, {
        method: "PUT",
        token,
        body: JSON.stringify(cleanPayload(details)),
      });
      const data = getResponseData(payload);
      const updatedJob = data?.job;

      if (updatedJob) {
        set((state) => ({
          jobs: state.jobs.map((job) => (job.id === jobId ? { ...job, ...updatedJob } : job)),
        }));
      }

      set({ isSaving: false });
      return payload;
    } catch (error) {
      set({ isSaving: false, error: error.message });
      throw error;
    }
  },

  publishCompanyJob: async (jobId, token) => {
    set({ isJobActionLoading: true, error: null });

    try {
      const payload = await apiRequest(`/company/jobs/${jobId}/publish`, {
        method: "PATCH",
        token,
        body: JSON.stringify({}),
      });
      const data = getResponseData(payload);
      const updatedJob = data?.job;

      if (updatedJob) {
        set((state) => ({
          jobs: state.jobs.map((job) => (job.id === jobId ? { ...job, ...updatedJob } : job)),
        }));
      }

      set({ isJobActionLoading: false });
      return payload;
    } catch (error) {
      set({ isJobActionLoading: false, error: error.message });
      throw error;
    }
  },

  pauseCompanyJob: async (jobId, pauseReason, token) => {
    set({ isJobActionLoading: true, error: null });

    try {
      const payload = await apiRequest(`/company/jobs/${jobId}/pause`, {
        method: "PATCH",
        token,
        body: JSON.stringify(cleanPayload({ pause_reason: pauseReason })),
      });
      const data = getResponseData(payload);
      const updatedJob = data?.job;

      if (updatedJob) {
        set((state) => ({
          jobs: state.jobs.map((job) => (job.id === jobId ? { ...job, ...updatedJob } : job)),
        }));
      }

      set({ isJobActionLoading: false });
      return payload;
    } catch (error) {
      set({ isJobActionLoading: false, error: error.message });
      throw error;
    }
  },

  resumeCompanyJob: async (jobId, token) => {
    set({ isJobActionLoading: true, error: null });

    try {
      const payload = await apiRequest(`/company/jobs/${jobId}/resume`, {
        method: "PATCH",
        token,
        body: JSON.stringify({}),
      });
      const data = getResponseData(payload);
      const updatedJob = data?.job;

      if (updatedJob) {
        set((state) => ({
          jobs: state.jobs.map((job) => (job.id === jobId ? { ...job, ...updatedJob } : job)),
        }));
      }

      set({ isJobActionLoading: false });
      return payload;
    } catch (error) {
      set({ isJobActionLoading: false, error: error.message });
      throw error;
    }
  },

  deleteCompanyJob: async (jobId, deleteReason, token) => {
    set({ isDeleting: true, error: null });

    try {
      const payload = await apiRequest(`/company/jobs/${jobId}`, {
        method: "DELETE",
        token,
        body: JSON.stringify(cleanPayload({ delete_reason: deleteReason })),
      });
      const data = getResponseData(payload);
      const deletedJob = data?.job;

      set((state) => ({
        jobs: state.jobs.map((job) =>
          job.id === jobId
            ? { ...job, ...deletedJob, computed_job_post_state: "deleted" }
            : job,
        ),
      }));

      set({ isDeleting: false });
      return payload;
    } catch (error) {
      set({ isDeleting: false, error: error.message });
      throw error;
    }
  },

  fetchJobQuestions: async (jobId, token) => {
    set({ isLoading: true, error: null });

    try {
      const payload = await apiRequest(`/company/jobs/${jobId}/questions`, {
        token,
      });
      const questions = normalizeQuestionList(payload);

      set((state) => ({
        questionsByJobId: {
          ...state.questionsByJobId,
          [jobId]: questions,
        },
        isLoading: false,
      }));

      return payload;
    } catch (error) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },

  createJobQuestion: async (jobId, question, token) => {
    set({ isSaving: true, error: null });

    try {
      const payload = await apiRequest(`/company/jobs/${jobId}/questions`, {
        method: "POST",
        token,
        body: JSON.stringify(cleanQuestionPayload(question)),
      });
      const data = getResponseData(payload);
      const createdQuestion = data?.question;

      if (createdQuestion) {
        set((state) => ({
          questionsByJobId: {
            ...state.questionsByJobId,
            [jobId]: [...(state.questionsByJobId[jobId] || []), createdQuestion].sort(
              (a, b) => a.order_number - b.order_number,
            ),
          },
        }));
      }

      set({ isSaving: false });
      return payload;
    } catch (error) {
      set({ isSaving: false, error: error.message });
      throw error;
    }
  },

  deleteJobQuestion: async (jobId, questionId, deleteReason, token) => {
    set({ isDeleting: true, error: null });

    try {
      const payload = await apiRequest(`/company/jobs/${jobId}/questions/${questionId}`, {
        method: "DELETE",
        token,
        body: JSON.stringify(cleanPayload({ delete_reason: deleteReason })),
      });

      set((state) => ({
        questionsByJobId: {
          ...state.questionsByJobId,
          [jobId]: (state.questionsByJobId[jobId] || []).filter(
            (question) => question.id !== questionId,
          ),
        },
        isDeleting: false,
      }));

      return payload;
    } catch (error) {
      set({ isDeleting: false, error: error.message });
      throw error;
    }
  },
}));
