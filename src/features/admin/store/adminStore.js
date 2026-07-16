import { create } from "zustand";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  "https://nodebackend-smx3.onrender.com/api/v1"
).replace(/\/$/, "");

const getApiUrl = (path) => `${API_BASE_URL}${path}`;

const buildQueryString = (params = {}) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.set(key, value);
    }
  });

  const queryString = query.toString();
  return queryString ? `?${queryString}` : "";
};

const parseApiResponse = async (response) => {
  const text = await response.text();
  const payload = text ? JSON.parse(text) : {};

  if (!response.ok) {
    const apiError = payload?.error;
    const error = new Error(
      payload?.message ||
        apiError?.message ||
        (typeof apiError === "string" ? apiError : "") ||
        payload?.errors?.[0]?.message ||
        "Something went wrong. Please try again.",
    );
    error.code = payload?.code || apiError?.code;
    error.details = apiError?.details || payload?.errors;
    throw error;
  }

  return payload;
};

const apiRequest = async (path, { token, ...options } = {}) => {
  if (!token) {
    throw new Error("Admin session expired. Please login again.");
  }

  const response = await fetch(getApiUrl(path), {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  return parseApiResponse(response);
};

const getData = (payload) => payload?.data ?? payload?.result ?? payload;

export const useAdminStore = create((set, get) => ({
  activeTab: "overview",
  setActiveTab: (activeTab) => set({ activeTab }),

  companies: [],
  companyPagination: { page: 1, limit: 10, total: 0, total_pages: 1 },
  companyFilters: {
    page: 1,
    limit: 10,
    search: "",
    status: "all",
    sort_by: "created_at",
    sort_order: "desc",
  },
  isCompaniesLoading: false,
  isApprovingCompany: false,
  companyError: null,

  institutes: [],
  selectedInstitute: null,
  institutePagination: { page: 1, limit: 10, total: 0, total_pages: 1 },
  instituteFilters: {
    page: 1,
    limit: 10,
    search: "",
    status: "all",
    profile_status: "all",
    sort_by: "created_at",
    sort_order: "desc",
  },
  isInstitutesLoading: false,
  isCreatingInstitute: false,
  isFetchingInstitute: false,
  instituteError: null,

  setCompanyFilters: (filters) =>
    set((state) => ({
      companyFilters: {
        ...state.companyFilters,
        ...filters,
        page: filters.page ?? 1,
      },
    })),

  setInstituteFilters: (filters) =>
    set((state) => ({
      instituteFilters: {
        ...state.instituteFilters,
        ...filters,
        page: filters.page ?? 1,
      },
    })),

  fetchCompanies: async (token, filters = get().companyFilters) => {
    set({ isCompaniesLoading: true, companyError: null });

    try {
      const payload = await apiRequest(
        `/admin/companies${buildQueryString(filters)}`,
        { token },
      );
      const data = getData(payload);

      set({
        companies: data?.companies ?? [],
        companyPagination: data?.pagination ?? {
          page: filters.page ?? 1,
          limit: filters.limit ?? 10,
          total: 0,
          total_pages: 1,
        },
        companyFilters: {
          ...get().companyFilters,
          ...(data?.filters ?? {}),
          page: data?.pagination?.page ?? filters.page ?? 1,
          limit: data?.pagination?.limit ?? filters.limit ?? 10,
        },
        isCompaniesLoading: false,
        companyError: null,
      });

      return payload;
    } catch (error) {
      set({ isCompaniesLoading: false, companyError: error.message });
      throw error;
    }
  },

  approveCompany: async (companyId, token) => {
    set({ isApprovingCompany: true, companyError: null });

    try {
      const payload = await apiRequest(
        `/admin/companies/${companyId}/approve`,
        {
          method: "PATCH",
          token,
          body: JSON.stringify({}),
        },
      );
      const approvedCompany = getData(payload)?.company;

      set((state) => ({
        companies: state.companies.map((company) =>
          company.company_id === companyId
            ? { ...company, ...approvedCompany }
            : company,
        ),
        isApprovingCompany: false,
        companyError: null,
      }));

      return payload;
    } catch (error) {
      set({ isApprovingCompany: false, companyError: error.message });
      throw error;
    }
  },

  fetchInstitutes: async (token, filters = get().instituteFilters) => {
    set({ isInstitutesLoading: true, instituteError: null });

    try {
      const payload = await apiRequest(
        `/admin/institutes${buildQueryString(filters)}`,
        { token },
      );
      const data = getData(payload);

      set({
        institutes: data?.institutes ?? [],
        institutePagination: data?.pagination ?? {
          page: filters.page ?? 1,
          limit: filters.limit ?? 10,
          total: 0,
          total_pages: 1,
        },
        instituteFilters: {
          ...get().instituteFilters,
          ...(data?.filters ?? {}),
          page: data?.pagination?.page ?? filters.page ?? 1,
          limit: data?.pagination?.limit ?? filters.limit ?? 10,
        },
        isInstitutesLoading: false,
        instituteError: null,
      });

      return payload;
    } catch (error) {
      set({ isInstitutesLoading: false, instituteError: error.message });
      throw error;
    }
  },

  createInstitute: async (details, token) => {
    set({ isCreatingInstitute: true, instituteError: null });

    try {
      const payload = await apiRequest("/admin/institutes", {
        method: "POST",
        token,
        body: JSON.stringify(details),
      });

      set({ isCreatingInstitute: false, instituteError: null });
      await get().fetchInstitutes(token, {
        ...get().instituteFilters,
        page: 1,
      });

      return payload;
    } catch (error) {
      set({ isCreatingInstitute: false, instituteError: error.message });
      throw error;
    }
  },

  fetchInstituteById: async (instituteUserId, token) => {
    set({ isFetchingInstitute: true, instituteError: null });

    try {
      const payload = await apiRequest(
        `/admin/institutes/${instituteUserId}`,
        { token },
      );
      const instituteUser = getData(payload)?.institute_user ?? null;

      set({
        selectedInstitute: instituteUser,
        isFetchingInstitute: false,
        instituteError: null,
      });

      return instituteUser;
    } catch (error) {
      set({ isFetchingInstitute: false, instituteError: error.message });
      throw error;
    }
  },

  clearSelectedInstitute: () => set({ selectedInstitute: null }),
}));
