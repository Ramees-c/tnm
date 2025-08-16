import {
  FaStar,
  FaChalkboardTeacher,
  FaBookOpen,
  FaRegHeart,
  FaHeart,
} from "react-icons/fa";
import { useState } from "react";
import DefaultButton from "../DefaultButton/DefaultButton";

function TutorCard({ tutor }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative bg-white rounded-md shadow-lg overflow-hidden transition-all duration-300 xl:w-[370px] 2xl:w-[400px] ${
        isHovered ? "shadow-xl -translate-y-1" : "shadow-md"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      

      {/* Tutor Image */}
      <div className="relative overflow-hidden">
        <img
          src={tutor.image}
          alt={tutor.name}
          className="w-full h-[250px] object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Tutor Info */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{tutor.name}</h3>
            <p className="text-gray-600 text-sm">{tutor.specialization}</p>
          </div>
          <div className="flex items-center bg-primary/10 px-3 py-1 rounded-full">
            <FaStar className="text-yellow-400 mr-1" />
            <span className="font-semibold text-gray-800">{tutor.rating}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tutor.bio}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tutor.subjects.slice(0, 3).map((subject, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
            >
              {subject}
            </span>
          ))}
          {tutor.subjects.length > 3 && (
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
              +{tutor.subjects.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <div className="flex items-center text-gray-600">
            <FaChalkboardTeacher className="mr-2" />
            <span className="text-sm">{tutor.students} students</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FaBookOpen className="mr-2" />
            <span className="text-sm">{tutor.courses} courses</span>
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div>
            <span className="text-gray-500 text-sm">Starting from</span>
            <p className="text-xl font-bold text-primary">${tutor.price}/hr</p>
          </div>
          {/* Default button */}
          <DefaultButton buttonText="Register Now" buttonSmall={true} />
        </div>
      </div>
    </div>
  );
}

export default TutorCard;
