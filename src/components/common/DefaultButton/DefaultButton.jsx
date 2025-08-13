import React from "react";

function DefaultButton({buttonText,buttonSmall}) {
  return (
    <button className={`inline-block ${buttonSmall ? 'px-3 py-1' : 'px-8 py-3'} bg-gradient-to-r from-green-500 to-green-600 text-white rounded-md font-medium hover:shadow-lg transition-all duration-300`}>
      {buttonText}
    </button>
  );
}

export default DefaultButton;
