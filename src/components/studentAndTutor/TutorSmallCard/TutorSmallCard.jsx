import React, { useState } from "react";
import DefaultButton from "../../common/DefaultButton/DefaultButton";
import { Heart } from "lucide-react"; // using lucide-react icon

function TutorSmallCard({ image, name, subject, experience }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <div className="relative min-w-[240px] bg-green-50 rounded-xl shadow hover:shadow-md transition p-4 text-center">
      {/* Favorite Button (top-right corner) */}
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
        src={image}
        alt={name}
        className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
      />

      {/* Tutor Info */}
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm text-gray-500 mb-3">
        {subject} • {experience} yrs exp
      </p>

      {/* Profile Button */}
      <DefaultButton buttonText="View Profile" buttonMedium />
    </div>
  );
}

export default TutorSmallCard;
