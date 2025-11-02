import React from "react";
import {
  Mail,
  Phone,
  BookOpen,
  MapPin,
  Award,
  FileText,
  Building2,
  Landmark,
} from "lucide-react";
import { MEDIA_URL } from "../../../API/API";

function AssignedStudentCard({
  full_name,
  categories,
  email,
  mobile_number,
  profile_photo,
  qualification,
  city,
  state,
  description,
  near_by_town,
  landmark,
}) {
  return (
    <div className="p-2 sm:p-6 bg-white rounded-md shadow-sm hover:shadow-xl transform transition-all border flex flex-col gap-4 w-full">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <img
          src={`${MEDIA_URL}${profile_photo}`}
          alt={full_name}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-green-200 shadow-sm flex-shrink-0 mx-auto sm:mx-0"
        />
        <div className="flex-1 min-w-0 text-center sm:text-left">
          <h3 className="text-lg sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600 truncate">
            {full_name}
          </h3>

          {/* Qualification */}
          {qualification && (
            <div className="flex items-center justify-center sm:justify-start gap-1 mt-1 flex-wrap">
              <Award size={17} className="text-green-500 flex-shrink-0" />
              <span className="truncate text-xs sm:text-sm font-medium text-gray-800">
                {qualification}
              </span>
            </div>
          )}

          {/* City & State */}
          {(city || state) && (
            <div className="flex items-center justify-center sm:justify-start gap-1 mt-1 flex-wrap">
              <MapPin size={17} className="text-green-500 flex-shrink-0" />
              <span className="truncate text-xs sm:text-sm font-medium text-gray-800">
                {[city, state].filter(Boolean).join(", ")}
              </span>
            </div>
          )}
          {(near_by_town || landmark) && (
            <div className="flex flex-col gap-1 mt-1 text-gray-800 text-xs sm:text-sm">
              {near_by_town && (
                <div className="flex items-center gap-2">
                  <Building2
                    size={15}
                    className="text-green-500 flex-shrink-0"
                  />
                  <span className="font-medium">
                    Nearby Town:{" "}
                    <span className="font-normal">{near_by_town}</span>
                  </span>
                </div>
              )}
              {landmark && (
                <div className="flex items-center gap-2">
                  <Landmark
                    size={15}
                    className="text-green-500 flex-shrink-0"
                  />
                  <span className="font-medium">
                    Landmark: <span className="font-normal">{landmark}</span>
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Subjects */}
      {categories && categories.length > 0 ? (
        <div className="mt-3">
          <h4 className="text-sm sm:text-base font-semibold text-gray-700 mb-2 text-center sm:text-left">
            Selected Subjects
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((category, idx) => {
              const parts = category.split(" in ");
              const mainCategory = parts[0]; // Big text
              const subCategory = parts[1] || ""; // Small text

              return (
                <div
                  key={idx}
                  className="bg-green-50 border border-green-200 rounded-md p-3 flex flex-col hover:shadow-sm transition-shadow duration-300"
                >
                  <span className="text-sm sm:text-base font-semibold text-green-700">
                    {mainCategory}
                  </span>
                  {subCategory && (
                    <span className="text-xs sm:text-sm text-green-900 mt-1">
                      {subCategory}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p className="text-gray-400 text-sm italic">
          No subjects selected yet.
        </p>
      )}

      {/* Contact Info */}
      <div className="mt-3">
        <h4 className="text-sm sm:text-base font-semibold text-gray-700 mb-2 text-center sm:text-left">
          Contact Info
        </h4>
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 justify-center sm:justify-start">
          {email && (
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2 break-all hover:text-green-700 font-medium"
            >
              <Mail size={16} className="text-green-500 flex-shrink-0" />
              <span className="truncate text-xs sm:text-sm">{email}</span>
            </a>
          )}
          {mobile_number && (
            <a
              href={`tel:${mobile_number}`}
              className="flex items-center gap-2 break-all hover:text-green-700 font-medium"
            >
              <Phone size={16} className="text-green-500 flex-shrink-0" />
              <span className="text-xs sm:text-sm">{mobile_number}</span>
            </a>
          )}
        </div>
      </div>

      {/* Bio (optional like tutor) */}
      {description && (
        <div className="mt-3">
          <h4 className="text-sm font-semibold text-gray-700 mb-2 text-center sm:text-left">
            Bio
          </h4>
          <div className="flex items-start gap-2 text-gray-600 text-xs sm:text-sm">
            <FileText
              size={16}
              className="text-green-500 mt-0.5 flex-shrink-0"
            />
            <p className="text-justify">{description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AssignedStudentCard;
