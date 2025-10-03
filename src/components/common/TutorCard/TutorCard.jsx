import { useState } from "react";
import { FaChalkboardTeacher, FaBookOpen } from "react-icons/fa";
import DefaultButton from "../DefaultButton/DefaultButton";

function TutorCard({ tutor }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showFullBio, setShowFullBio] = useState(false); // 👈 new state

  return (
    <div
      className={`relative bg-white rounded-md shadow-lg overflow-hidden transition-all duration-300 
      w-[340px] md:w-[390px] lg:w-[390px] xl:w-[350px] 2xl:w-[400px] min-h-[590px] 
      ${isHovered ? "shadow-xl -translate-y-1" : "shadow-md"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tutor Image */}
      <div className="relative overflow-hidden h-[250px]">
        <img
          src={tutor.profile_image}
          alt={tutor.full_name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Tutor Info */}
      <div className="p-5 flex flex-col justify-between bg-white flex-grow transition-all duration-300">
        <div className="flex flex-col justify-between bg-white">
          <div>
            <div className="flex justify-between items-start mb-1">
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {tutor.full_name}
                </h3>
                <p className="text-gray-600 text-sm">{tutor.qualification}</p>
              </div>
            </div>

            {/* Bio */}
            <div>
              <p
                className={`text-gray-600 text-sm ${
                  showFullBio ? "" : "overflow-hidden h-10"
                }`}
                style={
                  showFullBio
                    ? {}
                    : {
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }
                }
              >
                {tutor.description}
              </p>
              {tutor.description.length > 120 && (
                <button
                  onClick={() => setShowFullBio(!showFullBio)}
                  className="text-xs text-primary underline mt-1 focus:outline-none"
                >
                  {showFullBio ? "Show less" : "Read more"}
                </button>
              )}
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-2 mt-2">
              {(showAllCategories
                ? tutor.categories
                : tutor.categories.slice(0, 1)
              ).map((subject, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                >
                  {subject}
                </span>
              ))}

              {tutor.categories.length > 1 && (
                <button
                  onClick={() => setShowAllCategories(!showAllCategories)}
                  className="text-xs text-primary underline focus:outline-none"
                >
                  {showAllCategories
                    ? "Show less"
                    : `+${tutor.categories.length - 1} more`}
                </button>
              )}
            </div>
          </div>

          {/* Footer */}
          <div>
            <div className="flex items-center justify-between border-t border-gray-100 pt-2">
              <div className="flex items-center text-gray-600">
                <FaChalkboardTeacher className="mr-2" />
                <span className="text-sm">
                  {tutor.assigned_students.length} students
                </span>
              </div>
              <div className="flex items-center text-gray-600">
                <FaBookOpen className="mr-2" />
                <span className="text-sm">
                  {tutor.categories.length} courses
                </span>
              </div>
            </div>

            <div className="mt-3 flex justify-between items-center pb-3">
              <div>
                <span className="text-gray-500 text-sm">Starting from</span>
                <p className="text-xl font-bold text-primary">
                  ₹{tutor.hourly_rate}/hr
                </p>
              </div>
              <DefaultButton buttonText="Register Now" buttonSmall={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TutorCard;
