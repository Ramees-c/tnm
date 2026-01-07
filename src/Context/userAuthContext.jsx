// userAuthContext.js
import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import api from "../API/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [isMailVerified, setIsMailVerified] = useState(false);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const res = await api.get("/profile/", { withCredentials: true });
        const data = res.data;
        setUser({
          role: data.role,
          is_approved: data.is_approved,
        });
        setUserDetails(data);
        setToken(true);
      } catch (err) {
        console.warn("User not logged in or session expired");
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, []);

  const refreshUserDetails = async () => {
    try {
      const res = await api.get("/profile/", { withCredentials: true });
      const data = res.data;
      setUserDetails(data);
      if (data?.mail_verified === false) {
        setIsMailVerified("Your mail is not verified. Please verify.");
      }
    } catch (err) {
      console.error("Failed to refresh profile");
    }
  };

  // Auto refresh user on load
  useEffect(() => {
    if (user) {
      refreshUserDetails();
    }
  }, [user]);

  const login = async (data) => {
    try {
      const userData = {
        role: data.role,
        is_approved: data.is_approved ?? false,
      };

      setUser(userData);
      setToken(true);
      localStorage.setItem("user", JSON.stringify(userData));

      // Preload profile before redirect
      const res = await api.get("/profile/", { withCredentials: true });
      setUserDetails(res.data);
    } catch (err) {
      console.warn("Failed to preload profile after login");
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/logout/", {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout failed");
    } finally {
      // Clear local data
      localStorage.removeItem("user");

      setUser(null);
      setToken(null);
      setUserDetails({});

      window.location.href = "/register";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        login,
        handleLogout,
        userDetails,
        refreshUserDetails,
        isMailVerified,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Export the hook separately
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
