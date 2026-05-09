import ProtectedRoute from "./ProtectedRoute";

const SeekerProtectedRoute = ({ children }) => {
  return (
    <ProtectedRoute allowedRoles={["seeker"]} redirectTo="/seeker/login">
      {children}
    </ProtectedRoute>
  );
};

export default SeekerProtectedRoute;
