import React, { useRef, useState, useEffect } from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

function TestimonialCard({ testimonial }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [maxHeight, setMaxHeight] = useState("200px"); 
  const contentRef = useRef(null);

  const maxLength = 180;
  const shouldTruncate = testimonial.description.length > maxLength;
  const displayedText = isExpanded
    ? testimonial.description
    : testimonial.description.slice(0, maxLength) + (shouldTruncate ? "..." : "");

  useEffect(() => {
    if (contentRef.current) {
      const fullHeight = contentRef.current.scrollHeight;

      if (isExpanded) {
        
        setMaxHeight(`${fullHeight}px`);
        const timeout = setTimeout(() => setMaxHeight("9999px"), 400); 
      } else {
        
        requestAnimationFrame(() => {
          setMaxHeight(`${fullHeight}px`); 
          requestAnimationFrame(() => {
            setMaxHeight("200px"); 
          });
        });
      }
    }
  }, [isExpanded]);

  const toggleReadMore = () => setIsExpanded(!isExpanded);

  return (
    <div className="bg-white rounded-md shadow-md p-3 sm:p-5 relative border border-gray-100 hover:shadow-xl transition-all duration-300 w-full overflow-hidden">
      {/* Quote icon */}
      <FaQuoteLeft className="absolute top-5 right-5 text-gray-200 text-6xl opacity-40 pointer-events-none select-none" />

      {/* Rating Stars */}
      <div className="flex mb-3 relative z-10">
        {[...Array(5)].map((_, i) => {
          const ratingValue = testimonial.rating;
          const fillPercentage = Math.min(Math.max(ratingValue - i, 0), 1) * 100;
          return (
            <div key={i} className="relative w-5 h-5 mr-1">
              <FaStar className="absolute top-0 left-0 text-gray-300 w-5 h-5" />
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

      {/* Animated Description */}
      <div
        style={{
          maxHeight,
          overflow: "hidden",
          transition: "max-height 0.4s ease",
        }}
        className="relative z-10"
        ref={contentRef}
      >
        <p className="text-gray-600 mb-3 text-xs sm:text-sm lg:text-base leading-relaxed">
          {displayedText}
        </p>
      </div>

      {/* Read More / Less */}
      {shouldTruncate && (
        <button
          onClick={toggleReadMore}
          className="text-green-600 text-xs sm:text-sm font-medium hover:underline focus:outline-none transition-all relative z-10"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      )}

      {/* Author Info */}
      <div className="flex items-center mt-4 relative z-10">
        <img
          src={testimonial.profile_photo}
          alt={testimonial.full_name}
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

export default React.memo(TestimonialCard);
