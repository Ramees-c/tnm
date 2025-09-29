import React from "react";
import Loading from "../../../components/common/Loading/Loading";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../Context/userAuthContext";

function ProtectedRoute({ children, allowedRole }) {
  const { token, userDetails } = useAuth();

  // ❌ Not logged in → redirect
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // 🔄 Wait until role is loaded (avoid premature redirect)
  if (!userDetails?.role) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  // 🚫 Role restriction
  if (
    allowedRole &&
    (Array.isArray(allowedRole)
      ? !allowedRole.includes(userDetails.role)
      : userDetails.role !== allowedRole)
  ) {
    return <Navigate to="/" replace />;
  }

  // ✅ Authorized → render the page
  return children;
}

export default ProtectedRoute;
