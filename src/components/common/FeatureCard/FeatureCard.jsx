import React from "react";
import {
  FaGraduationCap,
  FaChalkboardTeacher,
  FaCertificate,
  FaUserFriends,
  FaMobileAlt,
  FaClock,
} from "react-icons/fa";

function FeatureCard({ benefits }) {
  return (
    <div>
      {/* Benefits Grid */}
      <div
        className={`${benefits.bgColor} p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100`}
      >
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 p-3 bg-white rounded-lg shadow-sm">
            {benefits.icon}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {benefits.title}
            </h3>
            <p className="text-gray-600">{benefits.description}</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      {/* <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
            <div className="text-gray-600">Students Enrolled</div>
          </div>
          <div className="text-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-blue-600">500+</div>
            <div className="text-gray-600">Courses Available</div>
          </div>
          <div className="text-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-blue-600">200+</div>
            <div className="text-gray-600">Expert Instructors</div>
          </div>
          <div className="text-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-blue-600">98%</div>
            <div className="text-gray-600">Satisfaction Rate</div>
          </div>
        </div> */}
    </div>
  );
}

export default FeatureCard;
