import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Award,
  Calendar,
  User,
  Briefcase,
  FileText,
  RefreshCcw,
  Landmark,
  Building2,
} from "lucide-react";
import { MEDIA_URL } from "../../../API/API";
import { useNavigate } from "react-router-dom";

function AssignedTutorCard({
  full_name,
  categories,
  email,
  mobile_number,
  profile_image,
  qualification,
  city,
  state,
  hourly_rate,
  available_days,
  gender,
  experience_years,
  description,
  tutor_id,
  landmark,
  near_by_town,
}) {
  const navigate = useNavigate();

  // Change tutor
  const onChangeTutor = () => {
    navigate("/studentDashbordAllTutors", {
      state: { isChangeMode: true, old_tutor_id: tutor_id },
    });
  };

  return (
    <div className="p-2 sm:p-6 bg-white rounded-md shadow-sm hover:shadow-xl transform transition-all border flex flex-col gap-4 w-full">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <img
          src={`${MEDIA_URL}${profile_image}`}
          alt={full_name}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-green-200 shadow-sm flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600 truncate">
            {full_name}
          </h3>
          {qualification && (
            <div className="flex items-center gap-1 mt-1 flex-wrap">
              <Award size={17} className="text-green-500 flex-shrink-0" />
              <span className="truncate text-xs sm:text-sm font-medium text-gray-800">
                {qualification}
              </span>
            </div>
          )}
          {(city || state) && (
            <div className="flex items-center gap-1 mt-1 flex-wrap">
              <MapPin size={17} className="text-green-500 flex-shrink-0" />
              <span className="truncate text-sm font-medium text-gray-800">
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

        {hourly_rate && (
          <div className="text-sm md:text-lg font-bold text-green-700 mt-2 sm:mt-0 whitespace-nowrap">
            <span className="text-base sm:text-2xl">₹</span> {hourly_rate}/hr
          </div>
        )}
      </div>

      {/* Info Badges */}
      <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-gray-600 mt-2">
        {gender && (
          <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full">
            <User size={14} />
            <span>{gender}</span>
          </div>
        )}
        {experience_years && (
          <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full">
            <Briefcase size={14} />
            <span>{experience_years} yrs exp</span>
          </div>
        )}
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

      {available_days && (
        <div className="mt-3">
          <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">
            Available Days
          </h4>
          <div className="flex flex-wrap items-center gap-2">
            <Calendar size={14} className="text-green-500" />
            {(Array.isArray(available_days)
              ? available_days
              : available_days.split(",")
            ).map((day, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-green-100 text-green-700 rounded-md text-xs font-medium"
              >
                {day.trim()}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Contact Info */}
      <div className="mt-3">
        <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">
          Contact Info
        </h4>
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 text-gray-800 text-xs sm:text-sm">
          {email && (
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2 break-all hover:text-green-700 font-medium"
            >
              <Mail size={16} className="text-green-500 flex-shrink-0" />
              <span className="truncate">{email}</span>
            </a>
          )}
          {mobile_number && (
            <a
              href={`tel:${mobile_number}`}
              className="flex items-center gap-2 break-all hover:text-green-700 font-medium"
            >
              <Phone size={16} className="text-green-500 flex-shrink-0" />
              <span>{mobile_number}</span>
            </a>
          )}
        </div>
      </div>

      {/* Bio */}
      {description && (
        <div className="mt-3">
          <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">
            Bio
          </h4>
          <div className="flex items-start gap-2 text-gray-800 text-xs sm:text-sm">
            <FileText
              size={16}
              className="text-green-500 mt-0.5 flex-shrink-0"
            />
            <p>{description}</p>
          </div>
        </div>
      )}

      {/* 🔹 Change Tutor Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={onChangeTutor}
          className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-md text-xs sm:text-base font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all"
        >
          <RefreshCcw size={18} />
          Change Tutor
        </button>
      </div>
    </div>
  );
}

export default AssignedTutorCard;
