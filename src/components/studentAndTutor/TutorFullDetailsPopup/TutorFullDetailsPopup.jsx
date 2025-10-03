import React, { useState } from "react";
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
  X,
} from "lucide-react";

function TutorFullDetailsPopup({ isOpen, onClose, tutor }) {
  const [showFullBio, setShowFullBio] = useState(false);

  if (!isOpen) return null;

  const availableDaysArray =
    typeof tutor.available_days === "string"
      ? tutor.available_days.split(",")
      : Array.isArray(tutor.available_days)
      ? tutor.available_days
      : [];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 p-4">
      <div className="bg-white rounded-md shadow-2xl w-full max-w-2xl p-6 relative overflow-y-auto max-h-[90vh] scrollbar-hide transform transition-transform duration-300 scale-100">
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
            src={tutor.profile_image}
            alt={tutor.full_name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-green-200 shadow-md flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h2 className="text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600 truncate">
              {tutor.full_name}
            </h2>

            {tutor.qualification && (
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mt-1">
                <Award size={16} className="text-green-500" />
                <span className="truncate">{tutor.qualification}</span>
              </div>
            )}

            {(tutor.city || tutor.state) && (
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mt-1">
                <MapPin size={16} className="text-green-500" />
                <span className="truncate">
                  {[tutor.city, tutor.state].filter(Boolean).join(", ")}
                </span>
              </div>
            )}
          </div>

          {tutor.hourly_rate && (
            <div className="text-sm md:text-lg font-bold text-green-700 mt-2 sm:mt-0 whitespace-nowrap flex items-center gap-1">
              ₹{tutor.hourly_rate}/hr
            </div>
          )}
        </div>

        {/* Info Badges */}
        <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-gray-600 mt-3 justify-start">
          {tutor.gender && (
            <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full hover:scale-105 transition-transform">
              <User size={14} />
              <span>{tutor.gender}</span>
            </div>
          )}
          {tutor.experience_years && (
            <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full hover:scale-105 transition-transform">
              <Briefcase size={14} />
              <span>{tutor.experience_years} yrs exp</span>
            </div>
          )}
        </div>

        {/* Subjects */}
        {tutor.categories?.length > 0 && (
          <div className="mt-4 text-left">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Subjects
            </h4>
            <div className="flex flex-wrap gap-2">
              {tutor.categories.map((subject, idx) => (
                <span
                  key={idx}
                  className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-md text-xs sm:text-sm font-medium hover:bg-green-200 transition-colors"
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Available Days */}
        {availableDaysArray.length > 0 && (
          <div className="mt-4 text-left">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Available Days
            </h4>
            <div className="flex flex-wrap items-center gap-2">
              <Calendar size={14} className="text-green-500" />
              {availableDaysArray.map((day, idx) => (
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
        <div className="mt-4 text-left">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            Contact Info
          </h4>
          <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 text-gray-600 text-xs sm:text-sm">
            {tutor.email && (
              <div className="flex items-center gap-2 break-all">
                <Mail size={16} className="text-green-500 flex-shrink-0" />
                <span className="truncate">{tutor.email}</span>
              </div>
            )}
            {tutor.mobile_number && (
              <div className="flex items-center gap-2 break-all">
                <Phone size={16} className="text-green-500 flex-shrink-0" />
                <span>{tutor.mobile_number}</span>
              </div>
            )}
          </div>
        </div>

        {/* Bio / Description */}
        {tutor.description && (
          <div className="mt-4 text-left">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Bio</h4>
            <div className="flex items-start gap-2 text-gray-600 text-xs sm:text-sm">
              <p className="flex-1">
                {showFullBio || tutor.description.length <= 150
                  ? tutor.description
                  : tutor.description.slice(0, 150) + "..."}
                {tutor.description.length > 150 && (
                  <button
                    onClick={() => setShowFullBio(!showFullBio)}
                    className="ml-1 text-green-600 underline text-xs"
                  >
                    {showFullBio ? "Show less" : "Read more"}
                  </button>
                )}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TutorFullDetailsPopup;
