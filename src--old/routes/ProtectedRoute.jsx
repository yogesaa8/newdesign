import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store";

const ProtectedRoute = ({
  allowedRoles,
  children,
  redirectTo = "/seeker/login",
}) => {
  const { isAuthenticated, isInitializing, role } = useAuthStore();

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

  if (allowedRoles && !allowedRoles.includes(role)) {
    if (role === "seeker") return <Navigate to="/seeker/dashboard/profile" replace />;
    if (role === "company") return <Navigate to="/company/dashboard" replace />;
    if (role === "admin") return <Navigate to="/admin/dashboard" replace />;
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default ProtectedRoute;
