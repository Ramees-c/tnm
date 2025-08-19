import React from "react";

function DefaultButton({buttonText,buttonSmall}) {
  return (
    <button className={`inline-block ${buttonSmall ? 'px-3 py-1' : 'px-3 py-2 lg:px-7 lg:py-3'} bg-gradient-to-r from-green-500 to-green-600 text-white rounded-md font-medium hover:shadow-lg transition-all duration-300 text-sm lg:text-md tracking-wide`}>
      {buttonText}
    </button>
  );
}

export default DefaultButton;
