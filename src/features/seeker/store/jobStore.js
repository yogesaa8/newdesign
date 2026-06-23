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

const APPLIED_JOBS_STORAGE_PREFIX = "firstJobIndiaAppliedJobs";

const appliedStatusValues = new Set([
  "applied",
  "submitted",
  "pending",
  "shortlisted",
  "interview_scheduled",
  "interview scheduled",
  "accepted",
  "rejected",
]);

const getApiUrl = (path) => {
  if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not configured.");
  }

  return `${API_BASE_URL}${path}`;
};

const getResponseData = (payload) => payload?.data ?? payload?.result ?? payload;

const decodeJwtPayload = (token) => {
  try {
    if (!token) return {};

    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  } catch {
    return {};
  }
};

const hashToken = (token = "") => {
  let hash = 0;

  for (let index = 0; index < token.length; index += 1) {
    hash = (hash * 31 + token.charCodeAt(index)) >>> 0;
  }

  return hash.toString(36);
};

const getAppliedJobsStorageKey = (token) => {
  const payload = decodeJwtPayload(token);
  const identity =
    payload.sub ||
    payload.id ||
    payload.user_id ||
    payload.userId ||
    payload.seeker_id ||
    payload.seekerId ||
    payload.email ||
    `token-${hashToken(token)}`;

  return `${APPLIED_JOBS_STORAGE_PREFIX}:${identity}`;
};

const readStoredAppliedJobIds = (token) => {
  try {
    if (typeof localStorage === "undefined") return [];

    const value = localStorage.getItem(getAppliedJobsStorageKey(token));
    const parsed = value ? JSON.parse(value) : [];
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
};

const persistAppliedJobIds = (token, ids = []) => {
  try {
    if (typeof localStorage === "undefined" || !token) return;

    localStorage.setItem(
      getAppliedJobsStorageKey(token),
      JSON.stringify(Array.from(new Set(ids.map(String)))),
    );
  } catch {
    // Applied state persistence is best-effort; API truth still wins.
  }
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

const hasAppliedFlag = (job = {}) => {
  if (
    job.is_applied === true ||
    job.has_applied === true ||
    job.already_applied === true ||
    job.applied === true ||
    Boolean(job.application_id) ||
    Boolean(job.user_application_id) ||
    Boolean(job.application?.id)
  ) {
    return true;
  }

  const status = String(
    job.application_status ||
      job.application?.status ||
      job.application?.application_status ||
      "",
  )
    .trim()
    .toLowerCase();

  return appliedStatusValues.has(status);
};

const getApplicationJobId = (application = {}) => {
  if (typeof application === "string" || typeof application === "number") {
    return application;
  }

  return (
    application.job_id ||
    application.jobId ||
    application.job_listing_id ||
    application.job_post_id ||
    application.job?.id ||
    application.job?.job_id ||
    application.job?.jobId ||
    application.job?.job_listing_id ||
    application.job?.job_post_id ||
    application.raw?.job_id ||
    application.raw?.job?.id
  );
};

const normalizeAppliedJobIds = (items = []) =>
  items
    .map(getApplicationJobId)
    .filter((id) => id != null && String(id).trim() !== "")
    .map(String);

const extractApplications = (payload) => {
  const data = getResponseData(payload);
  const profile = data?.profile ?? data?.seeker ?? data ?? {};

  return (
    profile.applications ||
    profile.job_applications ||
    profile.applied_jobs ||
    data?.applications ||
    data?.job_applications ||
    data?.applied_jobs ||
    []
  );
};

const extractAlreadyApplied = (error) => {
  const text = [
    error?.code,
    error?.message,
    error?.payload?.message,
    error?.payload?.error?.code,
    error?.payload?.error?.message,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return text.includes("already") && text.includes("appl");
};

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
    isApplied: hasAppliedFlag(job),
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

export const isJobApplied = (job, appliedJobIds = []) => {
  if (!job) return false;
  const ids = new Set(appliedJobIds.map(String));
  return Boolean(job.isApplied) || ids.has(String(job.id));
};

export const useJobStore = create((set, get) => ({
  jobs: [],
  selectedJob: null,
  appliedJobIds: [],
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
  markJobApplied: (jobId, token) => {
    if (jobId == null) return;
    const id = String(jobId);

    set((state) => {
      const appliedIds = state.appliedJobIds.map(String);
      const nextIds = appliedIds.includes(id) ? appliedIds : [...appliedIds, id];

      persistAppliedJobIds(token, nextIds);

      return {
        appliedJobIds: nextIds,
        jobs: state.jobs.map((job) =>
          String(job.id) === id ? { ...job, isApplied: true } : job,
        ),
        selectedJob:
          String(state.selectedJob?.id) === id
            ? { ...state.selectedJob, isApplied: true }
            : state.selectedJob,
      };
    });
  },

  fetchJobs: async (filters = {}) => {
    set({ isLoading: true, error: null });

    try {
      const payload = await apiRequest(`/jobs${buildQueryString(filters)}`);
      const { jobs, pagination } = normalizeJobsPayload(payload);

      set({
        jobs: jobs.map((job) =>
          get().appliedJobIds.map(String).includes(String(job.id))
            ? { ...job, isApplied: true }
            : job,
        ),
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
        selectedJob: get().appliedJobIds.map(String).includes(String(selectedJob.id))
          ? { ...selectedJob, isApplied: true }
          : selectedJob,
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
      get().markJobApplied(jobId, token);
      return payload;
    } catch (error) {
      if (extractAlreadyApplied(error)) {
        get().markJobApplied(jobId, token);
      }

      set({ isApplying: false, applyError: error.message });
      throw error;
    }
  },

  fetchAppliedJobs: async (token) => {
    if (!token) return [];

    const storedAppliedJobIds = readStoredAppliedJobIds(token);
    if (storedAppliedJobIds.length) {
      set((state) => {
        const nextIds = Array.from(
          new Set([...state.appliedJobIds.map(String), ...storedAppliedJobIds]),
        );
        const appliedSet = new Set(nextIds);

        return {
          appliedJobIds: nextIds,
          jobs: state.jobs.map((job) =>
            appliedSet.has(String(job.id)) ? { ...job, isApplied: true } : job,
          ),
          selectedJob:
            state.selectedJob && appliedSet.has(String(state.selectedJob.id))
              ? { ...state.selectedJob, isApplied: true }
              : state.selectedJob,
        };
      });
    }

    try {
      const payload = await apiRequest("/profile", { token });
      const appliedJobIds = normalizeAppliedJobIds(extractApplications(payload));

      if (!appliedJobIds.length) return storedAppliedJobIds;

      set((state) => {
        const nextIds = Array.from(
          new Set([...state.appliedJobIds.map(String), ...appliedJobIds]),
        );
        const appliedSet = new Set(nextIds);
        persistAppliedJobIds(token, nextIds);

        return {
          appliedJobIds: nextIds,
          jobs: state.jobs.map((job) =>
            appliedSet.has(String(job.id)) ? { ...job, isApplied: true } : job,
          ),
          selectedJob:
            state.selectedJob && appliedSet.has(String(state.selectedJob.id))
              ? { ...state.selectedJob, isApplied: true }
              : state.selectedJob,
        };
      });

      return appliedJobIds;
    } catch {
      return storedAppliedJobIds;
    }
  },
}));
