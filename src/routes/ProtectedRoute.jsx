import { Navigate } from "react-router-dom";
import { getRoleHomePath, normalizeRole } from "../lib/authRoutes";
import { useAuthStore } from "../store";

const ProtectedRoute = ({
  allowedRoles,
  children,
  redirectTo = "/seeker/login",
}) => {
  const { isAuthenticated, isInitializing, role } = useAuthStore();
  const normalizedRole = normalizeRole(role);

  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-600 border-t-transparent" />
          <p className="text-sm text-slate-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (allowedRoles && !allowedRoles.map(normalizeRole).includes(normalizedRole)) {
    return <Navigate to={getRoleHomePath(normalizedRole) || redirectTo} replace />;
  }

  return children;
};

export default ProtectedRoute;
