import React from "react";

function DefaultButton({
  buttonText,
  buttonSmall,
  buttonMedium,
  buttonFullwidth,
  onClick,
  disabled = false,
}) {
  const buttonClass = buttonFullwidth
    ? "w-full px-4 py-2 lg:px-6 lg:py-3"
    : buttonSmall
    ? "px-2 py-1 text-[10px]"
    : buttonMedium
    ? "px-4 py-2 lg:px-3 lg:py-2"
    : "px-3 py-2 lg:px-5 lg:py-3";

  return (
    // Default Button
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-block ${buttonClass} bg-gradient-to-r from-green-500 to-green-600 text-white rounded-md font-medium 
        hover:shadow-lg hover:scale-105 transition-all duration-300 text-xs lg:text-sm tracking-normal
        ${
          disabled
            ? "opacity-50 cursor-not-allowed hover:shadow-none hover:scale-100"
            : ""
        }
      `}
    >
      {buttonText}
    </button>
  );
}

export default DefaultButton;
