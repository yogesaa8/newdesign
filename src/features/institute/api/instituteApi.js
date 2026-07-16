const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  "https://nodebackend-smx3.onrender.com/api/v1"
).replace(/\/$/, "");
const UPLOAD_PATH = import.meta.env.VITE_UPLOAD_PATH || "/upload";

const parseResponse = async (response) => {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("text/csv")) {
    if (!response.ok) {
      throw new Error("Unable to export applicants.");
    }
    return response.blob();
  }

  const text = await response.text();
  const payload = text ? JSON.parse(text) : {};

  if (!response.ok || payload?.success === false) {
    if (response.status === 401 && typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("institute-session-expired"));
    }

    const validationMessage = payload?.errors?.[0]?.message;
    const message =
      validationMessage ||
      payload?.message ||
      payload?.error ||
      "Something went wrong. Please try again.";
    const error = new Error(message);
    error.status = response.status;
    error.code = payload?.errorCode || payload?.code;
    error.details = payload?.errors;
    throw error;
  }

  return payload;
};

const buildQuery = (params = {}) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "" && value !== "all") {
      query.set(key, value);
    }
  });

  const queryString = query.toString();
  return queryString ? `?${queryString}` : "";
};

export const instituteRequest = async (path, { token, body, ...options } = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  return parseResponse(response);
};

const extractUploadedUrl = (payload) => {
  const data = payload?.data || payload?.result || payload;
  return (
    data?.url ||
    data?.file_url ||
    data?.fileUrl ||
    data?.location ||
    data?.secure_url ||
    data?.publicUrl ||
    data?.file?.url ||
    data?.file?.file_url ||
    data?.file?.location ||
    data?.upload?.url ||
    data?.upload?.file_url ||
    ""
  );
};

export const uploadInstituteFile = async (token, file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}${UPLOAD_PATH}`, {
    method: "POST",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });
  const payload = await parseResponse(response);
  const uploadedUrl = extractUploadedUrl(payload);

  if (!uploadedUrl) {
    throw new Error("Upload completed but no file URL was returned.");
  }

  return uploadedUrl;
};

export const getProfile = (token) =>
  instituteRequest("/institute/profile", { token });

export const completeProfile = (token, payload) =>
  instituteRequest("/institute/profile/complete", {
    method: "POST",
    token,
    body: payload,
  });

export const updateProfile = (token, payload) =>
  instituteRequest("/institute/profile", {
    method: "PUT",
    token,
    body: payload,
  });

export const listCourses = (token, params) =>
  instituteRequest(`/institute/courses${buildQuery(params)}`, { token });

export const getCourse = (token, courseId) =>
  instituteRequest(`/institute/courses/${courseId}`, { token });

export const createCourse = (token, payload) =>
  instituteRequest("/institute/courses", {
    method: "POST",
    token,
    body: payload,
  });

export const updateCourse = (token, courseId, payload) =>
  instituteRequest(`/institute/courses/${courseId}`, {
    method: "PATCH",
    token,
    body: payload,
  });

export const updateCourseStatus = (token, courseId, status) =>
  instituteRequest(`/institute/courses/${courseId}/status`, {
    method: "PATCH",
    token,
    body: { status },
  });

export const deleteCourse = (token, courseId) =>
  instituteRequest(`/institute/courses/${courseId}`, {
    method: "DELETE",
    token,
  });

export const listApplicants = (token, courseId, params) =>
  instituteRequest(
    `/institute/courses/${courseId}/applications${buildQuery(params)}`,
    { token }
  );

export const exportApplicants = (token, courseId) =>
  instituteRequest(`/institute/courses/${courseId}/applications/export`, {
    token,
  });
