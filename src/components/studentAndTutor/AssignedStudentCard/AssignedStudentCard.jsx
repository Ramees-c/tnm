import React from "react";
import { Mail, Phone, Calendar, BookOpen } from "lucide-react";

function AssignedStudentCard({ name, subject, email, phone, nextClass, photo }) {
  return (
    <div className="p-5 bg-white rounded-2xl shadow-md hover:shadow-lg transition flex flex-col sm:flex-row sm:items-center justify-between gap-6 border border-gray-100">
      {/* Left: Photo + Basic Info */}
      <div className="flex items-center gap-4">
        {/* Profile Photo */}
        <img
          src={photo}
          alt={name}
          className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 shadow-sm"
        />

        {/* Name & Subject */}
        <div>
          <h3 className="text-lg font-bold text-gray-800">{name}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
            <BookOpen size={16} className="text-indigo-500" />
            <span>{subject}</span>
          </div>
        </div>
      </div>

      {/* Right: Contact Info */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Mail size={16} className="text-blue-600" />
          <span>{email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone size={16} className="text-green-600" />
          <span>{phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-purple-600" />
          <span className="font-medium">Next:</span> {nextClass}
        </div>
      </div>
    </div>
  );
}

export default AssignedStudentCard;
