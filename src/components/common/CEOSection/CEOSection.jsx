import React from "react";
import {
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaQuoteLeft,
} from "react-icons/fa";

import ceoImg from "../../../assets/images/CEO.jpg";

const CEOSection = () => {
  // CEO data - you can replace this with actual data
  const ceoData = {
    name: "Aysha Zameer",
    position: "Founder & CEO",
    image: ceoImg,
    bio: "An educator and entrepreneur, Aysha believes learning becomes impactful when it is personal and caring. She founded One On One Academy in 2020 to help students continue learning through individualized sessions. With Tutor Near Me, she extends that vision—connecting students with trusted local tutors for effective and comfortable learning experiences.",
    quote:
      "Education is not the filling of a pail, but the lighting of a fire. Our mission is to ignite that passion for learning in every student.",
  };

  return (
    <section className="py-5 sm:py-12 px-2 xl:px-0 bg-secondary/20 rounded-md">
      <div className="">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Leadership
          </h2>
          <p className="text-xs md:text-base text-gray-600 max-w-2xl mx-auto">
            Meet the visionary founder shaping the future of personalized
            learning
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          {/* CEO Image */}
          <div className="w-full lg:w-2/5 max-w-sm">
            <div className="relative">
              <div className="rounded-md overflow-hidden shadow-lg">
                <img
                  src={ceoData.image}
                  alt={ceoData.name}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          {/* CEO Details */}
          <div className="w-full lg:w-3/5">
            <div className="bg-white rounded-md p-3 sm:p-5 shadow-md">
              <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                {ceoData.name}
              </h3>
              <p className="text-sm md:text-lg text-secondary font-semibold mb-5">
                {ceoData.position}
              </p>

              <p className="text-gray-700 mb-6 leading-relaxed text-xs md:text-base">
                {ceoData.bio}
              </p>

              {/* Quote */}
              <div className="bg-secondary/10 rounded-lg p-3 border-l-4 border-secondary">
                <FaQuoteLeft className="text-secondary text-xl mb-2" />
                <p className="text-gray-800 italic text-xs md:text-base">
                  {ceoData.quote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CEOSection;
