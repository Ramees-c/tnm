// userAuthContext.js
import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
   const [userDetails, setUserDetails] = useState({});

  // 🔹 Fetch profile from API with token
  useEffect(() => {
    if (token) {
      axios
        .get("/api/profile/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((res) => {
          setUserDetails(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch profile:", err);
        });
    }
  }, [token]);

  console.log(token);
  

  const login = (data) => {
    setUser(data);
    setToken(data.token);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, login, logout, userDetails }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
