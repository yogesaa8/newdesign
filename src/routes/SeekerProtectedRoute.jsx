import ProtectedRoute from "./ProtectedRoute";

const SeekerProtectedRoute = ({ children }) => {
  return (
    <ProtectedRoute allowedRoles={["seeker"]} redirectTo="/job-seeker/login">
      {children}
    </ProtectedRoute>
  );
};

export default SeekerProtectedRoute;
