// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store";

const ProtectedRoute = ({
  allowedRoles,
  children,
  redirectTo = "/job-seeker/login",
}) => {
  const { isAuthenticated, role } = useAuthStore();

  // 1. Agar logged in nahi hai -> Login page par bhejo
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // 2. Agar logged in hai lekin usko yahan entry nahi hai (Galat role)
  if (allowedRoles && !allowedRoles.includes(role)) {
    // Role ke hisaab sahi dashboard par bhej do
    if (role === "seeker") return <Navigate to="/job-seeker/dashboard" replace />;
    if (role === "company") return <Navigate to="/company/dashboard" replace />;
    if (role === "admin") return <Navigate to="/admin/dashboard" replace />;
    
    return <Navigate to={redirectTo} replace />;
  }

  // 3. Sab sahi hai -> Page dikhado
  return children;
};

export default ProtectedRoute;
