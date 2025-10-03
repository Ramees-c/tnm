import React, { useState } from "react";
import DefaultButton from "../../common/DefaultButton/DefaultButton";
import { Heart } from "lucide-react";
import TutorFullDetailsPopup from "../TutorFullDetailsPopup/TutorFullDetailsPopup";

function TutorSmallCard({ tutor }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <div
      className={`relative min-w-[240px] flex flex-col items-center justify-center bg-green-50 rounded-md shadow hover:shadow-md transition-all p-4 text-center overflow-hidden
      ${showAllCategories ? "max-h-auto" : "max-h-[400px]"} duration-300`}
    >
      {/* Favorite Button */}
      <button
        onClick={toggleFavorite}
        className="absolute top-3 right-3 p-2 rounded-full bg-white shadow hover:bg-gray-100 transition"
      >
        <Heart
          size={20}
          className={isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"}
        />
      </button>

      {/* Tutor Image */}
      <img
        src={tutor.profile_image}
        alt={tutor.full_name}
        className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
      />

      {/* Tutor Info */}
      <h3 className="text-lg font-semibold">{tutor.full_name}</h3>
      <p className="text-sm text-gray-500 mb-1">
        {tutor.experience_years} yrs exp
      </p>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-2 mb-3 mt-2">
        {(showAllCategories
          ? tutor.categories
          : tutor?.categories.slice(0, 1)
        ).map((subject, index) => (
          <span
            key={index}
            className="text-xs bg-green-100 text-green-700 px-2 py-1 text-start rounded-md"
          >
            {subject}
          </span>
        ))}

        {tutor?.categories.length > 1 && (
          <button
            onClick={() => setShowAllCategories(!showAllCategories)}
            className="text-xs text-primary underline focus:outline-none"
          >
            {showAllCategories
              ? "Show less"
              : `+${tutor?.categories.length - 1} more`}
          </button>
        )}
      </div>

      {/* Profile Button */}
      <div className="flex items-end">
        <DefaultButton
          buttonText="View Profile"
          buttonMedium
          onClick={() => setShowModal(true)}
        />
      </div>
      {/* Modal */}
      <TutorFullDetailsPopup
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        tutor={tutor}
      />
    </div>
  );
}

export default TutorSmallCard;
