import React from "react";
import { CheckCircle2 } from "lucide-react";

function SubscriptionCard({ title, price, features, highlighted, onSelect }) {
  return (
    <div
      className={`
        flex flex-col rounded-2xl shadow-lg p-6 border
        ${
          highlighted
            ? "border-green-600 bg-green-50"
            : "border-gray-200 bg-white"
        }
      `}
    >
      {/* Title */}
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>

      {/* Price */}
      <p className="text-3xl font-extrabold text-gray-900 mb-4">
        ₹{price}{" "}
        <span className="text-base font-medium text-gray-600">/month</span>
      </p>

      {/* Features */}
      <ul className="flex-1 space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-gray-700">
            <CheckCircle2 size={18} className="text-green-600" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Button */}
      <button
        onClick={onSelect}
        className={`
          w-full py-2 px-4 rounded-lg font-medium shadow 
          transition
          ${
            highlighted
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }
        `}
      >
        {highlighted ? "Get Started" : "Choose Plan"}
      </button>
    </div>
  );
}

export default SubscriptionCard;
