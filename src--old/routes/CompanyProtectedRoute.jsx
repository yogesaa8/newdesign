import ProtectedRoute from "./ProtectedRoute";

const CompanyProtectedRoute = ({ children }) => {
  return (
    <ProtectedRoute allowedRoles={["company"]} redirectTo="/company/login">
      {children}
    </ProtectedRoute>
  );
};

export default CompanyProtectedRoute;
