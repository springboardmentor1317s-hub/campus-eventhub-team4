// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();

  if (!user) {
    // not logged in → send to login
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.accountType !== requiredRole) {
    // logged in but wrong role → block access
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
