import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import API_BASE from "../API/API";

const TutorsContext = createContext();

export const TutorsProvider = ({ children }) => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await axios.get(`${API_BASE}/tutors_list/`);
        const approved = res.data.filter(
          (t) =>
            (t.is_approved === true || t.is_approved === "true") &&
            (t.active_inactive === true || t.active_inactive === "true")
        );
        setTutors(approved);
      } catch (err) {
        console.error("Error fetching tutors:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTutors();
  }, []);

  return (
    <TutorsContext.Provider value={{ tutors, loading }}>
      {children}
    </TutorsContext.Provider>
  );
};

export const useTutors = () => useContext(TutorsContext);
