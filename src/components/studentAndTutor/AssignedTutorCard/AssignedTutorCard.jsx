import React from "react";
import {
  Mail,
  Phone,
  BookOpen,
  MapPin,
  Award,
  DollarSign,
  Calendar,
  User,
  Briefcase,
  FileText,
} from "lucide-react";
import { MEDIA_URL } from "../../../API/API";

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
}) {
  return (
    <div className="p-4 sm:p-6 bg-white rounded-md shadow-md hover:shadow-xl transform transition-all border flex flex-col gap-4 w-full">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <img
          src={`${MEDIA_URL}${profile_image}`}
          alt={full_name}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-green-200 shadow-sm flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600 truncate">
            {full_name}
          </h3>
          {qualification && (
            <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 mt-1 flex-wrap">
              <Award size={16} className="text-green-500 flex-shrink-0" />
              <span className="truncate">{qualification}</span>
            </div>
          )}
          {(city || state) && (
            <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 mt-1 flex-wrap">
              <MapPin size={16} className="text-green-500 flex-shrink-0" />
              <span className="truncate">{[city, state].filter(Boolean).join(", ")}</span>
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
      {categories && categories.length > 0 && (
        <div className="mt-3">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Selected Subjects</h4>
          <div className="flex flex-wrap gap-2">
            {categories.map((subject, idx) => (
              <span
                key={idx}
                className="flex flex-col md:flex-row md:items-center gap-1 bg-green-100 text-green-700 px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium"
              >
                <BookOpen size={14} />
                {subject}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Available Days */}
      {available_days && (
        <div className="mt-3">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Available Days</h4>
          <div className="flex flex-wrap items-center gap-2">
            <Calendar size={14} className="text-green-500" />
            {available_days.split(",").map((day, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-green-50 rounded text-xs font-medium"
              >
                {day.trim()}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Contact Info */}
      <div className="mt-3">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Contact Info</h4>
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 text-gray-600 text-xs sm:text-sm">
          {email && (
            <div className="flex items-center gap-2 break-all">
              <Mail size={16} className="text-green-500 flex-shrink-0" />
              <span className="truncate">{email}</span>
            </div>
          )}
          {mobile_number && (
            <div className="flex items-center gap-2 break-all">
              <Phone size={16} className="text-green-500 flex-shrink-0" />
              <span>{mobile_number}</span>
            </div>
          )}
        </div>
      </div>

      {/* Bio */}
      {description && (
        <div className="mt-3">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Bio</h4>
          <div className="flex items-start gap-2 text-gray-600 text-xs sm:text-sm">
            <FileText size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
            <p>{description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AssignedTutorCard;
