import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import API_BASE from "../API/API";

const TutorsContext = createContext();

export const TutorsProvider = ({ children }) => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
   const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(1);

  // useEffect(() => {
  //   const fetchTutors = async () => {
  //     try {
  //       const res = await axios.get(`${API_BASE}/tutors_list/`);
  //       const approved = res.data.filter(
  //         (t) =>
  //           (t.is_approved === true || t.is_approved === "true") &&
  //           (t.active_inactive === true || t.active_inactive === "true")
  //       );
  //       setTutors(approved);
  //     } catch (err) {
  //       console.error("Error fetching tutors");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchTutors();
  // }, []);

   // Fetch tutors page-wise from backend
  const fetchTutors = async (page = 1, category = "", search = "") => {
  setLoading(true);
  try {
    const res = await axios.get(`${API_BASE}/tutors_list/`, {
      params: {
        page,
        category,
        search,
      },
    });

    setTutors(res.data.results);
    setTotalCount(res.data.count);
    setPageSize(res.data.page_size);
  } catch (err) {
    console.error("Error fetching tutors");
  } finally {
    setLoading(false);
  }
};

  return (
    <TutorsContext.Provider value={{ tutors, loading, totalCount, pageSize, fetchTutors }}>
      {children}
    </TutorsContext.Provider>
  );
};

export const useTutors = () => useContext(TutorsContext);
