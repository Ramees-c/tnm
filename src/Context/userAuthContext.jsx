// userAuthContext.js
import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // ✅ Load token and user from localStorage on init
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch profile if token exists
  useEffect(() => {
    if (token) {
      axios
        .get("/api/profile/", {
          headers: { Authorization: `Token ${token}` },
        })
        .then((res) => {
          setUserDetails(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch profile:", err);
          // If token invalid, clear it
          handleLogout();
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  // ✅ Login function
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

  // ✅ Logout function
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
      // Clear everything anyway
      localStorage.removeItem("token");
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
        loading, // useful for ProtectedRoute
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
