import React, { useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  User,
  BookOpen,
  X,
  Landmark,
  Building2,
  Award,
} from "lucide-react";
import { MEDIA_URL } from "../../../API/API";
import { useAuth } from "../../../Context/userAuthContext";

function StudentFullDetailsPopup({ isOpen, onClose, student, media }) {
  const { userDetails } = useAuth();

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (isOpen) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      html.style.overflow = "";
      body.style.overflow = "";
      body.style.paddingRight = "";
    }

    return () => {
      html.style.overflow = "";
      body.style.overflow = "";
      body.style.paddingRight = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 p-4">
      <div className="bg-white rounded-md shadow-2xl w-full max-w-2xl p-3 md:p-6 relative overflow-y-auto max-h-[90vh] scrollbar-hide animate-scaleIn">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black transition-colors"
          onClick={onClose}
        >
          <X size={22} />
        </button>

        {/* Top Section */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-left">
          <img
            src={
              media
                ? `${MEDIA_URL}${student.profile_photo}`
                : `${student.profile_photo}`
            }
            alt={student.full_name}
            className="w-20 h-20 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-green-200 shadow-md flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600 truncate">
              {student.full_name}
            </h2>

            {student.qualification && (
              <div className="flex items-center gap-2 mt-1">
                <Award size={17} className="text-green-500" />
                <span className="truncate text-xs sm:text-sm font-medium text-gray-800">
                  {student.qualification}
                </span>
              </div>
            )}

            {(student.city || student.state) && (
              <div className="flex items-center gap-2 mt-1">
                <MapPin size={17} className="text-green-500" />
                <span className="truncate text-xs sm:text-sm font-medium text-gray-800">
                  {[student.city, student.state].filter(Boolean).join(", ")}
                </span>
              </div>
            )}

            {(student.near_by_town || student.landmark) && (
              <div className="flex flex-col gap-1 mt-1 text-gray-800 text-xs sm:text-sm">
                {student.near_by_town && (
                  <div className="flex items-center gap-2">
                    <Building2
                      size={15}
                      className="text-green-500 flex-shrink-0"
                    />
                    <span className="font-medium">
                      Nearby Town:{" "}
                      <span className="font-normal">
                        {student.near_by_town}
                      </span>
                    </span>
                  </div>
                )}
                {student.landmark && (
                  <div className="flex items-center gap-2">
                    <Landmark
                      size={15}
                      className="text-green-500 flex-shrink-0"
                    />
                    <span className="font-medium">
                      Landmark:{" "}
                      <span className="font-normal">{student.landmark}</span>
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Info Badges */}
        <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-gray-600 mt-3 justify-start">
          {student.gender && (
            <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full hover:scale-105 transition-transform">
              <User size={14} />
              <span className="text-xs sm:text-sm">{student.gender}</span>
            </div>
          )}
          {student.grade && (
            <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full hover:scale-105 transition-transform">
              <BookOpen size={14} />
              <span className="text-xs sm:text-sm">{student.grade}</span>
            </div>
          )}
        </div>

        {/* Selected Subjects */}
        {student.categories && student.categories.length > 0 ? (
          <div className="mt-4">
            <h4 className="text-sm sm:text-base font-semibold text-gray-700 mb-2 text-center sm:text-left">
              Selected Subjects
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              {student.categories.map((category, idx) => {
                const parts = category.split(" in ");
                const mainCategory = parts[0];
                const subCategory = parts[1] || "";

                return (
                  <div
                    key={idx}
                    className="bg-green-50 border border-green-200 rounded-md p-1 flex flex-col hover:shadow-sm transition-shadow duration-300"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-green-700">
                      {mainCategory}
                    </span>
                    {subCategory && (
                      <span className="text-xs sm:text-xs text-green-900 mt-1">
                        {subCategory}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-sm italic mt-2 text-center sm:text-left">
            No subjects added yet.
          </p>
        )}

        {/* Show contact info only if the student is assigned to the logged-in user */}
        {userDetails?.assigned_students?.some(
          (s) => s.id === student.student_id
        ) &&
          (student.email || student.mobile_number) && (
            <div className="mt-4 text-left">
              <h4 className="text-sm font-semibold text-gray-800 mb-2">
                Contact Info
              </h4>
              <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 text-gray-600 text-xs sm:text-sm">
                {student.email && (
                  <a
                    href={`mailto:${student.email}`}
                    className="flex items-center gap-2 break-all hover:text-green-700 font-medium"
                  >
                    <Mail size={16} className="text-green-500 flex-shrink-0" />
                    <span className="truncate">{student.email}</span>
                  </a>
                )}
                {student.mobile_number && (
                  <a
                    href={`tel:${student.mobile_number}`}
                    className="flex items-center gap-2 break-all hover:text-green-700 font-medium"
                  >
                    <Phone size={16} className="text-green-500 flex-shrink-0" />
                    <span>{student.mobile_number}</span>
                  </a>
                )}
              </div>
            </div>
          )}
      </div>
      <style jsx>{`
        .animate-scaleIn {
          transform: scale(0.8);
          animation: scaleIn 0.45s forwards;
        }
        @keyframes scaleIn {
          to {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}

export default StudentFullDetailsPopup;
