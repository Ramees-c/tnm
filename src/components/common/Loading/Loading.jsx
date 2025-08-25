import React from "react";
import logo from "../../../assets/images/logo/tnmlogo.png";

function Loading() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div
        className="relative flex items-center justify-center
                      w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-16 lg:h-16"
      >
        {/* Animated Circle */}
        <div className="absolute inset-0 rounded-full border-2 border-primary/85 border-t-transparent animate-spin-slow"></div>

        {/* Logo fixed in center */}
        <img
          src={logo}
          alt="TNM"
          className="relative z-10 w-10 h-10 sm:w-10 sm:h-10 md:w-10 md:h-10 lg:w-8 lg:h-8 object-contain"
        />
      </div>
    </div>
  );
}

export default Loading;
