import { create } from "zustand";

const AUTH_STORAGE_KEY = "jobPortalAuth";
const SESSION_KEY = "jobPortalSession";
const PENDING_AUTH_STORAGE_KEY = "jobPortalPendingAuth";
const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  "https://nodebackend-smx3.onrender.com/api/v1"
).replace(/\/$/, "");

const getStoredAuth = () => {
  try {
    const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    return storedAuth ? JSON.parse(storedAuth) : null;
  } catch {
    return null;
  }
};

const getStoredSession = () => {
  try {
    const s = localStorage.getItem(SESSION_KEY);
    return s ? JSON.parse(s) : null;
  } catch {
    return null;
  }
};

const getStoredPendingAuth = () => {
  try {
    const storedPendingAuth = sessionStorage.getItem(PENDING_AUTH_STORAGE_KEY);
    return storedPendingAuth ? JSON.parse(storedPendingAuth) : null;
  } catch {
    return null;
  }
};

const storedAuth = getStoredAuth();
const storedSession = getStoredSession();
const storedPendingAuth = getStoredPendingAuth();

const hasFullAuth = Boolean(storedAuth?.user && storedAuth?.role);
const hasSession = !hasFullAuth && Boolean(storedSession?.refreshToken);

const persistSession = ({ user, role, refreshToken }) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ user, role, refreshToken }));
};

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

const extractTokens = (payload) => {
  const data = getResponseData(payload);
  const tokens = data?.tokens ?? payload?.tokens ?? {};

  return {
    accessToken:
      data?.accessToken ||
      data?.access_token ||
      data?.token ||
      tokens?.accessToken ||
      tokens?.access_token ||
      tokens?.access?.token ||
      tokens?.access ||
      payload?.accessToken ||
      payload?.access_token ||
      payload?.token ||
      "",
    refreshToken:
      data?.refreshToken ||
      data?.refresh_token ||
      tokens?.refreshToken ||
      tokens?.refresh_token ||
      tokens?.refresh?.token ||
      tokens?.refresh ||
      payload?.refreshToken ||
      payload?.refresh_token ||
      "",
  };
};

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

const getUserType = (user, token) => {
  const tokenPayload = decodeJwtPayload(token);

  return (
    user?.user_type ||
    user?.userType ||
    user?.role ||
    user?.profile?.user_type ||
    user?.profile?.userType ||
    tokenPayload?.user_type ||
    tokenPayload?.userType ||
    tokenPayload?.role ||
    ""
  );
};

const persistAuthenticatedUser = ({
  set,
  user,
  role,
  accessToken,
  refreshToken,
  remember = false,
}) => {
  persistSession({ user, role, refreshToken });

  if (remember) {
    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({ user, role, accessToken, refreshToken })
    );
  } else {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  sessionStorage.removeItem(PENDING_AUTH_STORAGE_KEY);
  set({
    user,
    role,
    accessToken: accessToken || null,
    refreshToken: refreshToken || null,
    pendingVerification: null,
    isAuthenticated: true,
    isInitializing: false,
    isLoading: false,
    error: null,
  });
};

const buildUser = (payload, fallback = {}) => {
  const data = getResponseData(payload);
  const user = data?.user ?? payload?.user ?? data ?? {};
  const profile = user?.profile ?? data?.profile ?? payload?.profile ?? {};
  const company = user?.company ?? data?.company ?? payload?.company ?? {};

  return {
    ...user,
    profile,
    company,
    name:
      user?.name ||
      user?.full_name ||
      user?.fullName ||
      profile?.name ||
      profile?.full_name ||
      company?.company_name ||
      company?.companyName ||
      company?.name ||
      user?.email ||
      fallback.name ||
      fallback.email ||
      "User",
    email: user?.email || profile?.email || company?.email || fallback.email,
    phone_no:
      user?.phone_no ||
      user?.phone ||
      profile?.phone_no ||
      profile?.phone ||
      company?.phone_no ||
      company?.phone ||
      fallback.phone_no,
  };
};

const persistPendingAuth = (pendingVerification) => {
  if (pendingVerification) {
    sessionStorage.setItem(
      PENDING_AUTH_STORAGE_KEY,
      JSON.stringify(pendingVerification)
    );
  } else {
    sessionStorage.removeItem(PENDING_AUTH_STORAGE_KEY);
  }
};

export const useAuthStore = create((set, get) => ({
  user: storedAuth?.user ?? null,
  role: storedAuth?.role ?? null,
  accessToken: storedAuth?.accessToken ?? null,
  refreshToken: storedAuth?.refreshToken ?? storedSession?.refreshToken ?? null,
  pendingVerification: storedPendingAuth,
  isLoading: false,
  isInitializing: hasSession,
  error: null,
  isAuthenticated: hasFullAuth,
  setAuth: ({ user, role, accessToken, refreshToken, remember = false }) => {
    sessionStorage.removeItem(PENDING_AUTH_STORAGE_KEY);
    persistSession({ user, role, refreshToken });

    if (remember) {
      localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({ user, role, accessToken, refreshToken })
      );
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }

    set({
      user,
      role,
      accessToken: accessToken ?? null,
      refreshToken: refreshToken ?? null,
      pendingVerification: null,
      isAuthenticated: true,
      isInitializing: false,
      error: null,
    });
  },
  clearAuth: () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(PENDING_AUTH_STORAGE_KEY);
    set({
      user: null,
      role: null,
      accessToken: null,
      refreshToken: null,
      pendingVerification: null,
      isAuthenticated: false,
      isInitializing: false,
      error: null,
    });
  },
  clearError: () => set({ error: null }),
  registerSeeker: async ({ email, phone_no, password }) => {
    set({ isLoading: true, error: null });

    try {
      const requestBody = {
        email,
        phone_no,
        password,
        user_type: "seeker",
      };

      const payload = await apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify(requestBody),
      });
      const tokens = extractTokens(payload);
      const user = buildUser(payload, { email, phone_no });
      const pendingVerification = {
        user,
        role: "seeker",
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        remember: false,
      };

      persistPendingAuth(pendingVerification);
      set({ pendingVerification, isLoading: false, error: null });

      return payload;
    } catch (error) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },
  loginSeeker: async ({ email, password, remember = false }) => {
    set({ isLoading: true, error: null });

    try {
      const payload = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const tokens = extractTokens(payload);
      const user = buildUser(payload, { email });
      const userType = getUserType(user, tokens.accessToken);

      if (userType && userType !== "seeker") {
        throw new Error("Please login with a seeker account.");
      }

      persistSession({ user, role: "seeker", refreshToken: tokens.refreshToken });

      if (remember) {
        localStorage.setItem(
          AUTH_STORAGE_KEY,
          JSON.stringify({
            user,
            role: "seeker",
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
          })
        );
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }

      sessionStorage.removeItem(PENDING_AUTH_STORAGE_KEY);
      set({
        user,
        role: "seeker",
        accessToken: tokens.accessToken || null,
        refreshToken: tokens.refreshToken || null,
        pendingVerification: null,
        isAuthenticated: true,
        isInitializing: false,
        isLoading: false,
        error: null,
      });

      return payload;
    } catch (error) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },
  continueWithGoogle: async ({ idToken, userType, remember = false }) => {
    set({ isLoading: true, error: null });

    try {
      const payload = await apiRequest("/auth/google", {
        method: "POST",
        body: JSON.stringify({
          id_token: idToken,
          user_type: userType,
        }),
      });
      const tokens = extractTokens(payload);
      const user = buildUser(payload);
      const returnedUserType = getUserType(user, tokens.accessToken);
      const role = returnedUserType || userType;

      if (role !== userType) {
        throw new Error(`Please login with a ${userType} account.`);
      }

      persistAuthenticatedUser({
        set,
        user,
        role,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        remember,
      });

      return payload;
    } catch (error) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },
  verifySeekerOtp: async (otp) => {
    set({ isLoading: true, error: null });

    try {
      const pendingVerification = getStoredPendingAuth();

      if (!pendingVerification?.accessToken) {
        throw new Error("OTP session expired. Please sign up again.");
      }

      const payload = await apiRequest("/auth/verify-otp", {
        method: "POST",
        token: pendingVerification.accessToken,
        body: JSON.stringify({ otp }),
      });

      persistSession({
        user: pendingVerification.user,
        role: pendingVerification.role,
        refreshToken: pendingVerification.refreshToken,
      });
      sessionStorage.removeItem(PENDING_AUTH_STORAGE_KEY);
      set({
        user: pendingVerification.user,
        role: pendingVerification.role,
        accessToken: pendingVerification.accessToken,
        refreshToken: pendingVerification.refreshToken || null,
        pendingVerification: null,
        isAuthenticated: true,
        isInitializing: false,
        isLoading: false,
        error: null,
      });

      return payload;
    } catch (error) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },
  resendSeekerOtp: async () => {
    set({ isLoading: true, error: null });

    try {
      const pendingVerification = getStoredPendingAuth();

      if (!pendingVerification?.accessToken) {
        throw new Error("OTP session expired. Please sign up again.");
      }

      const payload = await apiRequest("/auth/resend-otp", {
        method: "POST",
        token: pendingVerification.accessToken,
        body: JSON.stringify({ channel: "email" }),
      });

      set({ isLoading: false, error: null });
      return payload;
    } catch (error) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },
  completeSeekerProfile: async (details) => {
    set({ isLoading: true, error: null });

    try {
      const pendingVerification = getStoredPendingAuth();
      const token = get().accessToken || pendingVerification?.accessToken;

      if (!token) {
        throw new Error("Session expired. Please sign up or login again.");
      }

      const payload = await apiRequest("/profile/complete", {
        method: "POST",
        token,
        body: JSON.stringify(details),
      });

      set({ isLoading: false, error: null });
      return payload;
    } catch (error) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },
  registerCompany: async ({ email, phone_no, password }) => {
    set({ isLoading: true, error: null });

    try {
      const payload = await apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, phone_no, password, user_type: "company" }),
      });
      const tokens = extractTokens(payload);
      const user = buildUser(payload, { email, phone_no });
      const pendingVerification = {
        user,
        role: "company",
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      };

      persistPendingAuth(pendingVerification);
      set({ pendingVerification, isLoading: false, error: null });
      return payload;
    } catch (error) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },
  loginCompany: async ({ email, password, remember = false }) => {
    set({ isLoading: true, error: null });

    try {
      const payload = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const tokens = extractTokens(payload);
      const user = buildUser(payload, { email });
      const userType = getUserType(user, tokens.accessToken);

      if (userType && userType !== "company") {
        throw new Error("Please login with a company account.");
      }

      persistSession({ user, role: "company", refreshToken: tokens.refreshToken });

      if (remember) {
        localStorage.setItem(
          AUTH_STORAGE_KEY,
          JSON.stringify({ user, role: "company", accessToken: tokens.accessToken, refreshToken: tokens.refreshToken })
        );
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }

      sessionStorage.removeItem(PENDING_AUTH_STORAGE_KEY);
      set({
        user,
        role: "company",
        accessToken: tokens.accessToken || null,
        refreshToken: tokens.refreshToken || null,
        pendingVerification: null,
        isAuthenticated: true,
        isInitializing: false,
        isLoading: false,
        error: null,
      });
      return payload;
    } catch (error) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },
  verifyCompanyOtp: async (otp) => {
    set({ isLoading: true, error: null });

    try {
      const pendingVerification = getStoredPendingAuth();

      if (!pendingVerification?.accessToken) {
        throw new Error("OTP session expired. Please sign up again.");
      }

      const payload = await apiRequest("/auth/verify-otp", {
        method: "POST",
        token: pendingVerification.accessToken,
        body: JSON.stringify({ otp }),
      });

      // Keep pendingVerification — token still needed for profile/complete
      set({ isLoading: false, error: null });
      return payload;
    } catch (error) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },
  resendCompanyOtp: async () => {
    set({ isLoading: true, error: null });

    try {
      const pendingVerification = getStoredPendingAuth();

      if (!pendingVerification?.accessToken) {
        throw new Error("OTP session expired. Please sign up again.");
      }

      const payload = await apiRequest("/auth/resend-otp", {
        method: "POST",
        token: pendingVerification.accessToken,
        body: JSON.stringify({ channel: "email" }),
      });

      set({ isLoading: false, error: null });
      return payload;
    } catch (error) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },
  completeCompanyProfile: async (details) => {
    set({ isLoading: true, error: null });

    try {
      const pendingVerification = getStoredPendingAuth();

      if (!pendingVerification?.accessToken) {
        throw new Error("Session expired. Please sign up again.");
      }

      const payload = await apiRequest("/profile/complete", {
        method: "POST",
        token: pendingVerification.accessToken,
        body: JSON.stringify(details),
      });

      sessionStorage.removeItem(PENDING_AUTH_STORAGE_KEY);
      set({ pendingVerification: null, isLoading: false, error: null });
      return payload;
    } catch (error) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },
  logout: async () => {
    const { accessToken } = get();

    try {
      if (accessToken) {
        await apiRequest("/auth/logout", {
          method: "POST",
          token: accessToken,
        });
      }
    } catch {
      // Logout locally even if API call fails
    } finally {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem(SESSION_KEY);
      sessionStorage.removeItem(PENDING_AUTH_STORAGE_KEY);
      set({
        user: null,
        role: null,
        accessToken: null,
        refreshToken: null,
        pendingVerification: null,
        isAuthenticated: false,
        isInitializing: false,
        error: null,
      });
    }
  },

  initAuth: async () => {
    if (get().isAuthenticated) {
      set({ isInitializing: false });
      return;
    }

    const session = getStoredSession();
    if (!session?.refreshToken) {
      set({ isInitializing: false });
      return;
    }

    try {
      const payload = await apiRequest("/auth/refresh", {
        method: "POST",
        body: JSON.stringify({ refresh_token: session.refreshToken }),
      });
      const tokens = extractTokens(payload);
      const newAccessToken = tokens.accessToken;
      const newRefreshToken = tokens.refreshToken || session.refreshToken;

      persistSession({ user: session.user, role: session.role, refreshToken: newRefreshToken });

      set({
        user: session.user,
        role: session.role,
        accessToken: newAccessToken || null,
        refreshToken: newRefreshToken || null,
        isAuthenticated: true,
        isInitializing: false,
        error: null,
      });
    } catch {
      localStorage.removeItem(SESSION_KEY);
      set({
        user: null,
        role: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isInitializing: false,
      });
    }
  },
}));
