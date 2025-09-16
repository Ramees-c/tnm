import React, { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import DefaultButton from "../../common/DefaultButton/DefaultButton";
import axios from "axios";

function SubscriptionCard({ title, price, features, onSelect, duration }) {
  return (
    <div
      className={`
        flex flex-col rounded-md shadow-lg p-6 border
       
      `}
    >
      {/* Title */}
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>

      {/* Price */}
      <p className="text-3xl font-extrabold text-gray-900 mb-4">
        ₹{price}{" "}
        <span className="text-base font-medium text-gray-600">/{duration}</span>
      </p>

      {/* Features */}
      <ul className="flex-1 space-y-2 mb-6">
        {features.map((feature,index) => (
          <li key={index} className="flex items-center gap-2 text-gray-700">
            <CheckCircle2 size={18} className="text-green-600" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Button */}
      <DefaultButton buttonText="Choose Plan" onClick={onSelect} />
    </div>
  );
}

export default SubscriptionCard;
