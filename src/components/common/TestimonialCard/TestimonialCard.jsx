import React from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-white rounded-md shadow-md p-3 sm:p-5 relative overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300 w-full">
      {/* Quote icon */}
      <FaQuoteLeft className="absolute top-6 right-6 text-gray-100 text-5xl -z-0" />

      {/* Rating stars */}
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => {
          const ratingValue = testimonial.rating;
          const fillPercentage =
            Math.min(Math.max(ratingValue - i, 0), 1) * 100; // value between 0–100

          return (
            <div key={i} className="relative w-5 h-5 mr-1">
              {/* Empty gray star (base) */}
              <FaStar className="absolute top-0 left-0 text-gray-300 w-5 h-5" />

              {/* Filled yellow portion */}
              <div
                className="absolute top-0 left-0 overflow-hidden"
                style={{ width: `${fillPercentage}%` }}
              >
                <FaStar className="text-yellow-400 w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Testimonial text */}
      <p className="text-gray-600 mb-6 z-10 relative text-xs sm:text-sm lg:text-base">
        {testimonial.description}
      </p>

      {/* Author info */}
      <div className="flex items-center">
        <img
          src={testimonial.profile_photo}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm mr-4"
        />
        <div>
          <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
            {testimonial.full_name}
          </h4>
          <p className="text-xs sm:text-sm text-gray-500">{testimonial.position}</p>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;
