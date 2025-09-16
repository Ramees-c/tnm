import React from "react";
import { Mail, Phone, BookOpen, MapPin, Award } from "lucide-react";
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
}) {
  return (
    <div className="p-5 bg-green-50 rounded-md shadow-md hover:shadow-lg transition flex flex-col gap-4 border border-gray-100">
      {/* Profile Photo */}
      <div className="flex justify-start">
        <img
          src={`${MEDIA_URL}${profile_photo}`}
          alt={full_name}
          className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 shadow-sm"
        />
      </div>

      {/* Name & Subjects */}
      <div className="text-start">
        <h3 className="text-lg font-bold text-gray-800">{full_name}</h3>

        {/* Qualification */}
        {qualification && (
          <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
            <Award size={16} className="text-green-600" />
            <span>{qualification}</span>
          </div>
        )}

        {/* City & State */}
        {(city || state) && (
          <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
            <MapPin size={16} className="text-green-600" />
            <span>{[city, state].filter(Boolean).join(", ")}</span>
          </div>
        )}

        {/* Subjects */}
        <div className=" text-sm text-gray-600 mt-3">
          {categories && categories.length > 0 ? (
            categories.map((subject, idx) => (
              <div key={idx} className="flex items-center gap-1 mb-1">
                <BookOpen size={16} className="text-green-600" />
                <span>{subject}</span>
              </div>
            ))
          ) : (
            <span>No Subject Assigned</span>
          )}
        </div>
      </div>

      {/* Contact Info */}
      <div className="flex flex-col lg:flex-row items-start gap-5 text-sm text-gray-600 mt-2">
        <div className="flex items-center gap-2">
          <Mail size={16} className="text-green-600" />
          <span>{email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone size={16} className="text-green-600" />
          <span>{mobile_number}</span>
        </div>
      </div>
    </div>
  );
}

export default AssignedStudentCard;
