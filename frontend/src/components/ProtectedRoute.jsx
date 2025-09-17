import { Navigate } from "react-router-dom";
import { getToken } from "../services/auth";

const ProtectedRoute = ({ children, role }) => {
  const token = getToken();
  const userRole = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" replace />;
  if (role && userRole !== role) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
