import ProtectedRoute from "./ProtectedRoute";

const AdminProtectedRoute = ({ children }) => {
  return (
    <ProtectedRoute allowedRoles={["admin"]} redirectTo="/admin/login">
      {children}
    </ProtectedRoute>
  );
};

export default AdminProtectedRoute;
