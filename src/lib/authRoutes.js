export const normalizeRole = (role) => {
  if (!role) return "";
  const value = String(role).toLowerCase();
  if (["company", "employer", "recruiter"].includes(value)) return "company";
  if (["college", "campus"].includes(value)) return "college";
  return value;
};

export const roleHomePaths = {
  seeker: "/seeker/dashboard",
  company: "/company/dashboard",
  college: "/college",
};

export const getRoleHomePath = (role) =>
  roleHomePaths[normalizeRole(role)] || "/";
