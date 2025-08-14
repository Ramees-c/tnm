import React from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

function TestimonialCard({testimonial}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-8 relative overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300 w-[400px] xl:w-[700px]">
      {/* Quote icon */}
      <FaQuoteLeft className="absolute top-6 right-6 text-gray-100 text-5xl -z-0" />

      {/* Rating stars */}
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`w-5 h-5 ${
              i < testimonial.rating ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Testimonial text */}
      <p className="text-gray-600 mb-6 z-10 relative">{testimonial.text}</p>

      {/* Author info */}
      <div className="flex items-center">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm mr-4"
        />
        <div>
          <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
          <p className="text-sm text-gray-500">{testimonial.position}</p>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;
