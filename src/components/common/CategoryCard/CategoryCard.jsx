import React from "react";

function CategoryCard({ image, title, count }) {
  return (
    <div className="group relative overflow-hidden rounded-md shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 w-[250px] lg:w-[220px] xl:w-[230px] h-40 lg:h-[140px]">
      {/* Image Container with Gradient Overlay */}
      <div className="relative h-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="text-md font-bold mb-1">{title}</h3>
        <p className="text-sm opacity-90">{count} courses</p>
      </div>

      {/* Hover Indicator */}
      <div className="absolute top-4 right-4 bg-white/90 text-gray-800 px-2 py-1 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Explore →
      </div>
    </div>
  );
}

export default CategoryCard;
