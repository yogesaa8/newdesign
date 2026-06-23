import { create } from "zustand";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  "https://nodebackend-smx3.onrender.com/api/v1"
).replace(/\/$/, "");

const defaultPagination = {
  page: 1,
  limit: 10,
  total: 0,
};

const getApiUrl = (path) => {
  if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not configured.");
  }

  return `${API_BASE_URL}${path}`;
};

const getResponseData = (payload) => payload?.data ?? payload?.result ?? payload;

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

const buildQueryString = (params = {}) => {
  const query = new URLSearchParams();
  const allowedParams = ["page", "limit", "search", "job_type", "work_mode", "city"];

  allowedParams.forEach((key) => {
    const value = params[key];
    if (value !== "" && value != null) {
      query.set(key, value);
    }
  });

  const value = query.toString();
  return value ? `?${value}` : "";
};

const formatEnum = (value) =>
  value ? value.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()) : "";

const formatDate = (value) => {
  if (!value) return "";

  try {
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return value;
  }
};

const formatDeadline = (value) => {
  const formatted = formatDate(value);
  return formatted ? `Deadline ${formatted}` : "Deadline not listed";
};

const formatSalary = (job = {}) => {
  const currency = job.salary_currency || "INR";
  const salaryType = job.salary_type ? ` ${formatEnum(job.salary_type)}` : "";
  const minSalary = job.min_salary;
  const maxSalary = job.max_salary;

  if (minSalary != null && maxSalary != null) {
    return `${currency} ${minSalary}-${maxSalary}${salaryType}`;
  }

  if (minSalary != null) {
    return `${currency} ${minSalary}+${salaryType}`;
  }

  if (maxSalary != null) {
    return `Up to ${currency} ${maxSalary}${salaryType}`;
  }

  return job.salary || "Salary not disclosed";
};

const formatExperience = (job = {}) => {
  const min = job.experience_min;
  const max = job.experience_max;

  if (min != null && max != null) {
    return `${min}-${max} year${Number(max) === 1 ? "" : "s"}`;
  }

  if (min != null) {
    return `${min}+ years`;
  }

  if (max != null) {
    return `Up to ${max} year${Number(max) === 1 ? "" : "s"}`;
  }

  return job.experience || "Not listed";
};

const getCompanyInitials = (name = "") => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "FJ";

  return parts
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
};

const splitTextList = (value) => {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (!value || typeof value !== "string") return [];

  return value
    .split(/\n|;|\.\s+/)
    .map((item) => item.trim().replace(/\.$/, ""))
    .filter(Boolean);
};

const sortQuestions = (questions = []) =>
  [...questions].sort((a, b) => Number(a.order_number || 0) - Number(b.order_number || 0));

const normalizeJob = (job = {}) => {
  const company = job.company_name || job.company || "Company";
  const jobType = formatEnum(job.job_type || job.type);
  const workMode = formatEnum(job.work_mode);
  const location = [job.city, job.state, job.country].filter(Boolean).join(", ");
  const responsibilities = splitTextList(job.responsibilities);
  const requirements = splitTextList(job.requirements);

  return {
    ...job,
    raw: job,
    id: job.id,
    title: job.job_title || job.title || "Untitled role",
    company,
    category: job.industry || jobType || "Job",
    type: [jobType, workMode].filter(Boolean).join(" - ") || "Job",
    jobTypeValue: job.job_type || "",
    workModeValue: job.work_mode || "",
    jobTypeLabel: jobType,
    workModeLabel: workMode,
    salary: formatSalary(job),
    location: location || job.location || "Location not listed",
    city: job.city || "",
    state: job.state || "",
    country: job.country || "",
    experience: formatExperience(job),
    degree: job.education_required || job.degree || "Not listed",
    time: formatDeadline(job.application_deadline),
    deadline: formatDate(job.application_deadline),
    description:
      job.full_description ||
      job.short_description ||
      job.description ||
      "No description available.",
    shortDescription: job.short_description || job.description || "",
    responsibilities: responsibilities.length ? responsibilities : ["Responsibilities will be shared by the recruiter."],
    skills: requirements.length ? requirements : ["Requirements will be shared by the recruiter."],
    benefits: splitTextList(job.benefits),
    openings: job.openings,
    filledPositions: job.filled_positions,
    logoLetter: getCompanyInitials(company),
    validThrough: job.application_deadline,
    questions: sortQuestions(job.questions || []),
  };
};

const normalizeJobsPayload = (payload) => {
  const data = getResponseData(payload);
  const pagination = data?.pagination ?? {};
  const jobs = data?.jobs ?? [];

  return {
    jobs: jobs.map(normalizeJob),
    pagination: {
      page: Number(pagination.page ?? data?.page ?? defaultPagination.page),
      limit: Number(pagination.limit ?? data?.limit ?? defaultPagination.limit),
      total: Number(pagination.total ?? data?.total ?? jobs.length),
    },
  };
};

const normalizeJobDetailPayload = (payload) => {
  const data = getResponseData(payload);
  return normalizeJob(data?.job ?? data);
};

export const useJobStore = create((set) => ({
  jobs: [],
  selectedJob: null,
  pagination: defaultPagination,
  isLoading: false,
  isDetailLoading: false,
  isApplying: false,
  error: null,
  applyError: null,
  applyResult: null,

  setJobs: (jobs) => set({ jobs }),
  setSelectedJob: (selectedJob) => set({ selectedJob }),
  clearError: () => set({ error: null }),
  clearApplyState: () => set({ applyError: null, applyResult: null }),

  fetchJobs: async (filters = {}) => {
    set({ isLoading: true, error: null });

    try {
      const payload = await apiRequest(`/jobs${buildQueryString(filters)}`);
      const { jobs, pagination } = normalizeJobsPayload(payload);

      set({
        jobs,
        pagination,
        isLoading: false,
      });

      return payload;
    } catch (error) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },

  fetchJobDetail: async (jobId) => {
    set({ isDetailLoading: true, error: null, selectedJob: null });

    try {
      const payload = await apiRequest(`/jobs/${jobId}`);
      const selectedJob = normalizeJobDetailPayload(payload);

      set({
        selectedJob,
        isDetailLoading: false,
      });

      return payload;
    } catch (error) {
      set({ isDetailLoading: false, error: error.message });
      throw error;
    }
  },

  applyToJob: async (jobId, details, token) => {
    set({ isApplying: true, applyError: null, applyResult: null });

    try {
      const requestBody = {
        ...(details.cover_letter ? { cover_letter: details.cover_letter } : {}),
        answers: Array.isArray(details.answers) ? details.answers : [],
      };

      const payload = await apiRequest(`/jobs/${jobId}/apply`, {
        method: "POST",
        token,
        body: JSON.stringify(requestBody),
      });

      set({ isApplying: false, applyResult: payload });
      return payload;
    } catch (error) {
      set({ isApplying: false, applyError: error.message });
      throw error;
    }
  },
}));
