import React, { useState, useEffect, useRef } from "react";
import DefaultButton from "../../common/DefaultButton/DefaultButton";
import { Heart } from "lucide-react";
import TutorFullDetailsPopup from "../TutorFullDetailsPopup/TutorFullDetailsPopup";
import { useAuth } from "../../../Context/userAuthContext";
import axios from "axios";
import API_BASE, { MEDIA_URL } from "../../../API/API";

function TutorSmallCard({
  tutor,
  media,
  onRefresh,
  isChangeMode,
  setRefreshFavourites,
  oldTutorId,
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const containerRef = useRef(null);

  const { token, userDetails, refreshUserDetails } = useAuth();

  const visibleCategoriesCount = 1; // show only first category initially
  const showMoreBtn = tutor.categories.length > visibleCategoriesCount;

  // ✅ Check if this tutor is already in favorites
  useEffect(() => {
    if (
      userDetails?.favorite_tutors?.some((favTutor) => favTutor.id === tutor.id)
    ) {
      setIsFavorite(true);
    }
  }, [userDetails, tutor.id]);

  // ✅ Toggle favorite handler
  const toggleFavorite = async () => {
    const action = isFavorite ? "remove" : "add";
    setIsFavorite((prev) => !prev); // Optimistic UI

    try {
      const response = await axios.post(
        `${API_BASE}/students/favorites/`,
        { action, favorite_tutors: [tutor.id] },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      await refreshUserDetails();
      setRefreshFavourites((prev) => !prev);
      console.log("Favorite updated:", response.data);
    } catch (error) {
      console.error("Failed to update favorite:", error);
      setIsFavorite(true); // revert UI
    }
  };

  return (
    <div
      className={`relative w-full xl:w-[280px] flex flex-col justify-between bg-green-50 rounded-md shadow-sm hover:shadow-md transition-all p-2 lg:p-4 text-center overflow-hidden
      ${
        showAllCategories ? "h-auto" : "h-[240px] md:h-[280px] lg:h-[280px]"
      } duration-300`}
      style={{ alignSelf: "start" }}
    >
      {/* ❤️ Favorite Button */}
      <button
        onClick={toggleFavorite}
        className="absolute top-1 right-1 sm:top-3 sm:right-3 p-1 sm:p-2 rounded-full bg-white shadow-sm hover:bg-gray-100 transition"
      >
        <Heart
          size={20}
          className={isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"}
        />
      </button>

      {/* Top section */}
      <div className="flex flex-col items-center">
        {/* Tutor Image */}
        <img
          src={
            media
              ? `${MEDIA_URL}${tutor.profile_image}`
              : `${tutor.profile_image}`
          }
          alt={tutor.full_name}
          className="w-14 h-14 sm:w-20 sm:h-20 rounded-full mx-auto mb-3 object-cover"
        />

        {/* Tutor Info */}
        <h3 className="text-sm sm:text-base font-semibold">
          {tutor.full_name}
        </h3>
        <p className="text-xs sm:text-xs text-gray-500 mb-1">
          {tutor.experience_years} yrs exp
        </p>

        {/* Categories */}
        <div className="mb-1 mt-2 w-full">
          <div
            ref={containerRef}
            className={`flex flex-col gap-1 overflow-hidden transition-all duration-500 ${
              showAllCategories ? "max-h-[1000px]" : "max-h-14"
            }`}
          >
            {tutor.categories.map((category, index) => {
              const parts = category.split(" in ");
              const mainCategory = parts[0];
              const subCategory = parts[1] || "";

              if (!showAllCategories && index >= visibleCategoriesCount)
                return null;

              return (
                <div
                  key={index}
                  className="bg-green-100 w-full rounded-md p-1 flex flex-col"
                >
                  <span className="text-[7px] sm:text-[11px] font-semibold text-green-800">
                    {mainCategory} -
                    <span className="text-[7px] sm:text-[11px] text-green-600 mt-1">
                      {subCategory}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>

          {showMoreBtn && (
            <div className="mt-1">
              <button
                onClick={() => setShowAllCategories(!showAllCategories)}
                className="text-[8px] sm:text-xs text-primary underline focus:outline-none"
              >
                {showAllCategories
                  ? "Show less"
                  : `+${tutor.categories.length - visibleCategoriesCount} more`}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom section - View Profile button */}
      <div className="flex justify-center mt-1">
        <DefaultButton
          buttonText="View Profile"
          buttonSmall={true}
          onClick={() => setShowModal(true)}
        />
      </div>

      {/* Modal */}
      <TutorFullDetailsPopup
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        tutor={tutor}
        media={media}
        onRefresh={onRefresh}
        isChangeMode={isChangeMode}
        oldTutorId={oldTutorId}
      />
    </div>
  );
}

export default TutorSmallCard;
