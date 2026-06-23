export const normalizeRole = (role) => {
  if (!role) return "";
  const value = String(role).toLowerCase();
  if (["company", "employer", "recruiter"].includes(value)) return "company";
  if (["institute", "institution"].includes(value)) return "institute";
  if (["college", "campus"].includes(value)) return "college";
  return value;
};

export const roleHomePaths = {
  seeker: "/seeker/dashboard",
  company: "/company/dashboard",
  institute: "/institute/dashboard",
  college: "/college",
  admin: "/admin/dashboard",
};

export const getRoleHomePath = (role) =>
  roleHomePaths[normalizeRole(role)] || "/";
