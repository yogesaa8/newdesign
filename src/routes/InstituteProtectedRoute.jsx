import ProtectedRoute from "./ProtectedRoute";

const InstituteProtectedRoute = ({ children }) => {
  return (
    <ProtectedRoute allowedRoles={["institute"]} redirectTo="/institute/login">
      {children}
    </ProtectedRoute>
  );
};

export default InstituteProtectedRoute;
