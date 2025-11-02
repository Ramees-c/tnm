import React from "react";
import { MEDIA_URL } from "../../../API/API";
import { useNavigate } from "react-router-dom";

import categoryDefalultImg from "../../../assets/images/categoryDefault.jpg";

function CategoryCard({ image, title }) {

  console.log(image, "image");
  
  const navigate = useNavigate();
  const handleCategoryClick = (categoryName) => {
    navigate(`/all-tutors?category=${encodeURIComponent(categoryName)}`, {
      state: { hideHeroSearch: true },
    });
  };

  const isValidImage =
    image && image !== "null" && image !== null && image !== "";

  // ✅ final image URL logic
  const finalImage = isValidImage ? `${MEDIA_URL}${image}` : categoryDefalultImg;

  return (
    <div
      onClick={() => handleCategoryClick(title)}
      className="group relative overflow-hidden rounded-md shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 w-[230px] lg:w-[220px] xl:w-[230px] h-36 lg:h-[140px] cursor-pointer"
    >
      {/* Image Container with Gradient Overlay */}
      <div className="relative h-full overflow-hidden">
        <img
          src={finalImage}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="text-sm sm:text-lgp font-bold mb-1">{title}</h3>
      </div>
    </div>
  );
}

export default CategoryCard;
