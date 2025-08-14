import React from "react";

import shapeIcon from "../../../assets/images/91.png";
import shapeIcon2 from "../../../assets/images/92.png";
import bannerImg from "../../../assets/images/1.png";

import {
  FaStar,
  FaStarHalfAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import DefaultButton from "../DefaultButton/DefaultButton";

function Hero() {
  return (
    // Header section start
    <div className="relative w-full bg-primary overflow-hidden flex items-center">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left Content - Text Area */}
          <div className="w-full lg:w-7/12 text-center lg:text-left z-10 pt-20 lg:pt-0">
            <div className="animate-fade-in">
              <h4 className="flex items-center justify-center lg:justify-start text-lg md:text-xl font-medium mb-4 text-white">
                <img
                  src={shapeIcon}
                  alt="Discover"
                  className="mr-3 w-10 hidden lg:block animate-bounce-slow"
                />
                <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm lg:text-md">
                  Discover 20,000+ World-Class Courses
                </span>
              </h4>

              <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 text-white leading-tight">
                Learn <span className="text-secondary">Smarter</span>,<br />
                Achieve <span className="text-accent">Knowledge</span>
              </h2>

              <p className="text-white/90 mb-8 text-lg max-w-2xl mx-auto lg:mx-0 ">
                Expand your knowledge and open doors to exciting careers with
                our revolutionary online education platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <DefaultButton buttonText="Find the Right Tutor for You" />
              </div>
            </div>
          </div>

          {/* Right Content - Image Area */}
          <div className="w-full lg:w-5/12 relative mt-12 lg:mt-0">
            <div className="relative w-full max-w-[400px] mx-auto">
              {/* Main Image with floating animation */}
              <img
                src={bannerImg}
                alt="Learning Illustration"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
