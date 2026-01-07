import React from "react";
import Loading from "../../../components/common/Loading/Loading";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../Context/userAuthContext";

function ProtectedRoute({ children, allowedRole, requirePayment = false }) {
  const { token, user, userDetails, loading } = useAuth();

  // Wait for auth to finish checking session
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Role restriction (use user.role, fallback to userDetails.role)
  const role = user?.role || userDetails?.role;
  if (
    allowedRole &&
    (Array.isArray(allowedRole)
      ? !allowedRole.includes(role)
      : role !== allowedRole)
  ) {
    return <Navigate to="/" replace />;
  }

  // Block tutor if payment required
  if (
    requirePayment &&
    userDetails?.role === "tutor" &&
    (userDetails?.payment_history === null ||
      userDetails?.payment_history === undefined ||
      userDetails?.payment_history.length === 0)
  ) {
    return <Navigate to="/tutorDashboard" replace />;
  }

  // Authorized → render the page
  return children;
}

export default ProtectedRoute;
