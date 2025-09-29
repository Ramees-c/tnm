import React from "react";
import {
  Mail,
  Phone,
  BookOpen,
  MapPin,
  Award,
  FileText,
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
}) {
  return (
    <div className="p-4 sm:p-6 bg-white rounded-md shadow-md hover:shadow-xl transform transition-all border flex flex-col gap-4 w-full">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <img
          src={`${MEDIA_URL}${profile_photo}`}
          alt={full_name}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-green-200 shadow-sm flex-shrink-0 mx-auto sm:mx-0"
        />
        <div className="flex-1 min-w-0 text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600 truncate">
            {full_name}
          </h3>

          {/* Qualification */}
          {qualification && (
            <div className="flex items-center justify-center sm:justify-start gap-1 text-xs sm:text-sm text-gray-600 mt-1 flex-wrap">
              <Award size={16} className="text-green-500 flex-shrink-0" />
              <span className="truncate">{qualification}</span>
            </div>
          )}

          {/* City & State */}
          {(city || state) && (
            <div className="flex items-center justify-center sm:justify-start gap-1 text-xs sm:text-sm text-gray-500 mt-1 flex-wrap">
              <MapPin size={16} className="text-green-500 flex-shrink-0" />
              <span className="truncate">
                {[city, state].filter(Boolean).join(", ")}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Subjects */}
      {categories && categories.length > 0 && (
        <div className="mt-3">
          <h4 className="text-sm font-semibold text-gray-700 mb-2 text-center sm:text-left">
            Assigned Subjects
          </h4>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {categories.map((subject, idx) => (
              <span
                key={idx}
                className="flex flex-col lg:flex-row lg:items-center gap-1 bg-green-100 text-green-700 sm:px-3 py-1 px-4 rounded-md text-xs sm:text-sm font-medium"
              >
                <BookOpen size={14} />
                {subject}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Contact Info */}
      <div className="mt-3">
        <h4 className="text-sm font-semibold text-gray-700 mb-2 text-center sm:text-left">
          Contact Info
        </h4>
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 text-gray-600 text-xs sm:text-sm justify-center sm:justify-start">
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
