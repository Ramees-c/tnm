import React from "react";
import {
  FaBullseye,
  FaEye,
  FaRocket,
  FaUsers,
  FaLightbulb,
  FaHeart,
} from "react-icons/fa";

const VisionMission = () => {
  return (
    <section className="pt-10 sm:pt-20">
      <div>
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16 px-2 sm:px-4">
          <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Our Vision & Mission
          </h2>
          <p className="text-xs md:text-base text-gray-600 max-w-3xl mx-auto">
            Core values that inspire our dedication to connecting learners with
            quality education opportunities.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-2 lg:gap-8">
          {/* Vision Card */}
          <div className="flex-1 bg-white rounded-md p-3 sm:p-5 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-blue-100 flex items-center justify-center mr-3 sm:mr-4">
                <FaEye className="text-2xl sm:text-3xl text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
                Our Vision
              </h3>
            </div>
            <p className="text-xs sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed">
              To build a learning environment where every student has access to
              quality education, empowering individuals to reach their fullest
              potential through meaningful connections with the right tutors.
            </p>
            <div className="bg-blue-50 rounded-xl p-4 sm:p-5 border-l-4 border-blue-500 text-xs sm:text-base">
              <h4 className="font-semibold text-blue-800 mb-2">
                What we strive for:
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Equal access to quality learning opportunities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Personalized and goal-oriented education paths</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Continuous growth and lifelong learning</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Mission Card */}
          <div className="flex-1 bg-white rounded-md p-3 sm:p-5 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-purple-100 flex items-center justify-center mr-3 sm:mr-4">
                <FaBullseye className="text-2xl sm:text-3xl text-purple-600" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
                Our Mission
              </h3>
            </div>
            <p className="text-xs sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed">
              To bridge the gap between students and skilled tutors through
              innovative technology, delivering personalized learning
              experiences that inspire curiosity, encourage growth, and help
              every learner realize their true potential.
            </p>
            <div className="bg-purple-50 rounded-xl p-4 sm:p-5 border-l-4 border-purple-500 text-xs sm:text-base">
              <h4 className="font-semibold text-purple-800 mb-2">
                How we achieve it:
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span>Advanced, easy-to-use learning platform</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span>Dedicated network of experienced tutors</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span>Tailored learning plans for individual goals</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-10 sm:mt-16">
          <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10 sm:mb-12">
            Our Core Values
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 lg:gap-6">
            {/* Value 1 */}
            <div className="bg-white rounded-md p-3 sm:p-5 text-center shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center">
              <div className="w-12 h-12  rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <FaHeart className="text-2xl text-amber-600" />
              </div>
              <h4 className="text-base sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">
                Commitment to Learning
              </h4>
              <p className="text-gray-600 text-xs sm:text-base">
                We are dedicated to the transformative power of education,
                making quality learning accessible for every student.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white rounded-md p-3 sm:p-5 text-center shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <FaLightbulb className="text-2xl text-green-600" />
              </div>
              <h4 className="text-base sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">
                Innovation
              </h4>
              <p className="text-gray-600 text-xs sm:text-base">
                We embrace creative solutions and technology to enhance learning
                experiences and outcomes.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white rounded-md p-3 sm:p-5 text-center shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <FaUsers className="text-2xl text-blue-600" />
              </div>
              <h4 className="text-base sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">
                Community
              </h4>
              <p className="text-gray-600 text-xs sm:text-base">
                We cultivate a supportive environment where learners and tutors
                thrive together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
