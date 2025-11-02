import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TutorCard from "../../../components/common/TutorCard/TutorCard";
import { useTutors } from "../../../Context/TutorsContext";
import Loading from "../../../components/common/Loading/Loading";
import { Search } from "lucide-react"; // at the top of your file

function AllTutorsPage() {
  const { tutors, loading } = useTutors();
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedCategory = params.get("category");

  const hideHeroSearch = location.state?.hideHeroSearch || false;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [selectedCategory]);

  useEffect(() => {
    if (!tutors.length) return;

    let filtered = tutors.filter(
      (tutor) =>
        tutor.is_approved === true &&
        tutor.active_inactive === true &&
        (tutor.is_paid === true ||
          (Array.isArray(tutor.assigned_students) &&
            tutor.assigned_students.length > 0))
    );

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
          {filteredTutors.map((tutor) => (
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
    </div>
  );
}

export default AllTutorsPage;
