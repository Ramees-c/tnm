import React from "react";

function DefaultButton({ buttonText, buttonSmall, buttonMedium, buttonFullwidth }) {
  const buttonClass = buttonFullwidth
    ? "w-full px-4 py-2 lg:px-6 lg:py-3"
    : buttonSmall
    ? "px-3 py-1"
    : buttonMedium
    ? "px-4 py-2 lg:px-3 lg:py-2"
    : "px-3 py-2 lg:px-7 lg:py-3";
  return (
    <button
      className={`inline-block ${buttonClass} bg-gradient-to-r from-green-500 to-green-600 text-white rounded-md font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm lg:text-md tracking-wide`}
    >
      {buttonText}
    </button>
  );
}

export default DefaultButton;
