import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TutorCard from "../../../components/common/TutorCard/TutorCard";
import { useTutors } from "../../../Context/TutorsContext";
import Loading from "../../../components/common/Loading/Loading";
import { Search } from "lucide-react";

const getPaginationPages = (current, total) => {
  const pages = [];
  const delta = window.innerWidth < 640 ? 1 : 2; // responsive

  const range = [];
  const rangeWithDots = [];

  let start = Math.max(2, current - delta);
  let end = Math.min(total - 1, current + delta);

  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  if (start > 2) {
    rangeWithDots.push("...");
  }

  rangeWithDots.push(...range);

  if (end < total - 1) {
    rangeWithDots.push("...");
  }

  return [1, ...rangeWithDots, total].filter(
    (v, i, a) => a.indexOf(v) === i
  );
};


function AllTutorsPage() {
  const { tutors, loading } = useTutors();
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tutorsPerPage = 20;

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedCategory = params.get("category");

  const hideHeroSearch = location.state?.hideHeroSearch || false;

  const indexOfLastTutor = currentPage * tutorsPerPage;
  const indexOfFirstTutor = indexOfLastTutor - tutorsPerPage;
  const currentTutors = filteredTutors.slice(
    indexOfFirstTutor,
    indexOfLastTutor
  );

  const totalPages = Math.ceil(filteredTutors.length / tutorsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [selectedCategory]);

  useEffect(() => {
    if (!tutors.length) return;

    let filtered = tutors.filter((tutor) => tutor.active_inactive === true);

    // Filter by selected category from URL
    if (selectedCategory) {
      filtered = filtered.filter((t) =>
        t.categories?.some((cat) =>
          cat
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(selectedCategory.toLowerCase().replace(/\s+/g, ""))
        )
      );
    }

    // Filter by search term (full_name, category, city, state, pincode, etc.)
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase().replace(/\s+/g, "");

      filtered = filtered.filter((t) => {
        const normalize = (str) => str?.toLowerCase().replace(/\s+/g, "") || "";

        const nameMatch = normalize(t.full_name).includes(query);
        const categoryMatch = t.categories?.some((cat) =>
          normalize(cat).includes(query)
        );
        const cityMatch = normalize(t.city).includes(query);
        const stateMatch = normalize(t.state).includes(query);
        const pincodeMatch = normalize(t.pincode).includes(query);
        const landmarkMatch = normalize(t.landmark).includes(query);
        const nearByTownMatch = normalize(t.near_by_town).includes(query);

        return (
          nameMatch ||
          categoryMatch ||
          cityMatch ||
          stateMatch ||
          pincodeMatch ||
          landmarkMatch ||
          nearByTownMatch
        );
      });
    }
    setCurrentPage(1);
    setFilteredTutors(filtered);
  }, [tutors, selectedCategory, searchTerm]);

  

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );

  return (
    <div className="container py-10">
      {/* Heading Section */}
      {!hideHeroSearch && (
        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
            All Tutors
          </h1>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
            Discover expert tutors across subjects and grades.
          </p>
          <div className="mt-6 flex justify-center">
            <div className="h-1 w-24 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
          </div>
        </div>
      )}

      {/* Search */}
      {!hideHeroSearch && (
        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="Search by name, subject, city, state, or pincode..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-lg px-4 py-2 border rounded-md outline-none focus:ring-0 focus:border-primary text-xs sm:text-sm"
          />
        </div>
      )}

      {/* Tutors Grid */}
      {filteredTutors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 place-items-center">
          {currentTutors.map((tutor) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </div>
      ) : (
        <div
          className={`flex-1 flex flex-col items-center justify-center text-center ${
            hideHeroSearch ? "h-[50vh]" : "h-[40vh]"
          }`}
        >
          <Search className="text-green-200 mb-1 h-12 w-12 sm:h-16 sm:w-16" />
          <h2 className="text-gray-400 font-medium mb-2 text-lg sm:text-xl">
            No tutors found
          </h2>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
  <div className="flex flex-wrap justify-center items-center mt-12 gap-2 px-2">
    {/* Previous */}
    <button
      disabled={currentPage === 1}
      onClick={() => handlePageChange(currentPage - 1)}
      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center
        ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-green-100"}
      `}
    >
      «
    </button>

    {/* Page Numbers */}
    {getPaginationPages(currentPage, totalPages).map((page, index) =>
      page === "..." ? (
        <span
          key={index}
          className="px-2 text-gray-400 select-none"
        >
          …
        </span>
      ) : (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center text-sm sm:text-base
            ${
              currentPage === page
                ? "bg-green-600 text-white"
                : "hover:bg-green-100"
            }
          `}
        >
          {page}
        </button>
      )
    )}

    {/* Next */}
    <button
      disabled={currentPage === totalPages}
      onClick={() => handlePageChange(currentPage + 1)}
      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center
        ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-green-100"
        }
      `}
    >
      »
    </button>
  </div>
)}

    </div>
  );
}

export default AllTutorsPage;
