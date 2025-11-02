import React, { useState, useEffect, useRef } from "react";
import DefaultButton from "../../common/DefaultButton/DefaultButton";
import { Heart } from "lucide-react";
import TutorFullDetailsPopup from "../TutorFullDetailsPopup/TutorFullDetailsPopup"; // can reuse for student details
import { useAuth } from "../../../Context/userAuthContext";
import axios from "axios";
import API_BASE, { MEDIA_URL } from "../../../API/API";
import StudentFullDetailsPopup from "../StudentFullDetailsPopup/StudentFullDetailsPopup";

function StudentSmallCard({
  student,
  media,
  onRefresh,
  isChangeMode,
  setRefreshFavourites,
  oldStudentId,
}) {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const containerRef = useRef(null);
  const { token, userDetails, refreshUserDetails } = useAuth();

  const visibleCategoriesCount = 1; // show only first category initially
  const showMoreBtn = student.categories.length > visibleCategoriesCount;

  return (
    <div
      className={`relative w-full xl:w-[280px] flex flex-col justify-between bg-green-50 rounded-md shadow-sm hover:shadow-md transition-all p-2 lg:p-4 text-center overflow-hidden
      ${
        showAllCategories ? "h-auto" : "h-[220px] md:h-[260px] lg:h-[260px]"
      } duration-300`}
      style={{ alignSelf: "start" }}
    >
      {/* Top section */}
      <div className="flex flex-col items-center">
        {/* Student Image */}
        <img
          src={
            media
              ? `${MEDIA_URL}${student.profile_photo}`
              : `${student.profile_photo}`
          }
          alt={student.full_name}
          className="w-14 h-14 sm:w-20 sm:h-20 rounded-full mx-auto mb-3 object-cover"
        />

        {/* Student Info */}
        <h3 className="text-sm sm:text-base font-semibold mb-3">
          {student.full_name}
        </h3>

        {/* Categories */}
        <div className="mb-1 mt-2 w-full">
          <div
            ref={containerRef}
            className={`flex flex-col gap-1 overflow-hidden transition-all duration-500 ${
              showAllCategories ? "max-h-[1000px]" : "max-h-14"
            }`}
          >
            {student.categories.map((category, index) => {
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
                  : `+${
                      student.categories.length - visibleCategoriesCount
                    } more`}
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
      <StudentFullDetailsPopup
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        student={student} // reusing TutorFullDetailsPopup for students
        media={media}
        onRefresh={onRefresh}
        isChangeMode={isChangeMode}
        oldTutorId={oldStudentId}
      />
    </div>
  );
}

export default StudentSmallCard;
