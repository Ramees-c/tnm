import React, { useState, useEffect, useRef } from "react";
import { FaChalkboardTeacher, FaBookOpen } from "react-icons/fa";
import DefaultButton from "../DefaultButton/DefaultButton";
import { useAuth } from "../../../Context/userAuthContext";
import { useNavigate } from "react-router-dom";

function TutorCard({ tutor }) {
  const navigate = useNavigate();
  const { userDetails } = useAuth();

  const [isHovered, setIsHovered] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showMoreBtn, setShowMoreBtn] = useState(false);
  const [visibleCategoriesCount, setVisibleCategoriesCount] = useState(
    tutor.categories.length
  );

  const containerRef = useRef(null);

  // Check if categories overflow the first row
  useEffect(() => {
    const checkOverflow = () => {
      const container = containerRef.current;
      if (!container) return;

      const firstRowTop = container.children[0]?.offsetTop || 0;
      let count = 0;

      for (let i = 0; i < container.children.length; i++) {
        if (container.children[i].offsetTop === firstRowTop) {
          count++;
        }
      }

      setVisibleCategoriesCount(count);
      setShowMoreBtn(count < tutor.categories.length);
    };

    checkOverflow();

    const resizeObserver = new ResizeObserver(checkOverflow);
    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, [tutor.categories]);

  const handleClick = () => {
    if (userDetails?.role === "student") {
      navigate("/studentDashbordAllTutors");
    } else {
      navigate("/register", {
        state: { redirect: "/studentDashbordAllTutors" },
      });
    }
  };

  return (
    // Tutor card
    <div
      className={`relative rounded-md shadow-lg overflow-hidden transition-all duration-300 
      w-[340px] md:w-[300px] lg:w-[350px] xl:w-[290px] 2xl:w-[340px] flex flex-col 
      ${userDetails?.role !== "tutor" ? "min-h-[420px]" : "min-h-[400px]"} 
      ${isHovered ? "shadow-xl -translate-y-1" : "shadow-md"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tutor Image */}
      <div className="relative overflow-hidden h-[200px] ">
        <img
          src={tutor.profile_image}
          alt={tutor.full_name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Tutor Info */}
      <div className="p-3 flex flex-col justify-between flex-1 bg-white transition-all duration-300">
        <div>
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                {tutor.full_name}
              </h3>
              <p className="text-gray-600 text-sm">{tutor.qualification}</p>
            </div>
          </div>

          {/* Categories */}
          <div className="mb-2 mt-2">
            <div
              ref={containerRef}
              className={`flex flex-wrap gap-2 transition-all duration-500 scroll-smooth ${
                showAllCategories
                  ? "max-h-52 overflow-y-auto" 
                  : "max-h-14 overflow-hidden" 
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
                    className="bg-gray-100 rounded-md p-1 flex flex-col hover:shadow-md transition-all duration-300 border border-gray-200"
                  >
                    <span className="text-xs sm:text-xs font-semibold text-gray-800">
                      {mainCategory}
                    </span>
                    {subCategory && (
                      <span className="text-[11px] sm:text-xs text-gray-600 mt-1">
                        {subCategory}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* More / Less Button */}
            {showMoreBtn && (
              <div className="mt-2">
                <button
                  onClick={() => setShowAllCategories(!showAllCategories)}
                  className="text-xs sm:text-xs text-primary underline focus:outline-none"
                >
                  {showAllCategories
                    ? "Show less"
                    : `+${
                        tutor.categories.length - visibleCategoriesCount
                      } more`}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer always sticks to bottom */}
        <div className="mt-auto pt-1 border-t border-gray-100 flex justify-between items-end">
          <div
            className={`${
              userDetails?.role === "tutor"
                ? "flex w-full justify-between items-center"
                : ""
            }`}
          >
            <span className="text-gray-500 text-sm block">Starting from</span>
            <p className="text-xl font-bold text-primary">
              ₹{tutor.hourly_rate}/hr
            </p>
          </div>

          {userDetails?.role !== "tutor" && (
            <DefaultButton
              onClick={handleClick}
              buttonText="Register Now"
              buttonMedium={true}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(TutorCard);
