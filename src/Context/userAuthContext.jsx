// userAuthContext.js
import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null); // ✅ provide default value

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [isMailVerified, setIsMailVerified] = useState("");

  const refreshUserDetails = async () => {
    if (!token) return;
    try {
      const res = await axios.get("/api/profile/", {
        headers: { Authorization: `Token ${token}` },
      });
      setUserDetails(res.data);
      if (res.data?.mail_verified === false) {
        setIsMailVerified(
          "Your mail is not verified. Please verify.",
          "warning"
        );
      }
    } catch (err) {
      console.error("Failed to refresh profile:", err);
    }
  };

  useEffect(() => {
    if (token) {
      setLoading(true);
      refreshUserDetails().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = (data) => {
    const userData = {
      role: data.role,
      is_approved: data.is_approved ?? false,
    };
    setUser(userData);
    setToken(data.token);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = async () => {
    try {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        await axios.post(
          "/api/logout/",
          {},
          { headers: { Authorization: `Token ${storedToken}` } }
        );
      }
    } catch (err) {
      console.error("❌ Logout failed:", err.response?.data || err.message);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      setToken(null);
      setUserDetails({});
      window.location.href = "/register";
    }
  };

  console.log(token);

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

// ✅ Export the hook separately, NOT inline
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
