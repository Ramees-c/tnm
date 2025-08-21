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
    <section className="py-16 px-4">
      <div className="">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Vision & Mission
          </h2>
          <p className="text-sm md:text-lg text-gray-600 max-w-3xl mx-auto">
            Guiding principles that drive our commitment to transforming
            education
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Vision Card */}
          <div className="flex-1 bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <FaEye className="text-3xl text-blue-600" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-800">Our Vision</h3>
            </div>
            <p className="text-sm md:text-lg text-gray-700 mb-6 leading-relaxed">
              To create a world where quality education is accessible to
              everyone, breaking down barriers and empowering learners to
              achieve their full potential regardless of their background or
              circumstances.
            </p>
            <div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-500 text-sm md:text-lg">
              <h4 className="font-semibold text-blue-800 mb-2">
                What we strive for:
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Global access to quality education</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Personalized learning journeys</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Lifelong learning opportunities</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Mission Card */}
          <div className="flex-1 bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                <FaBullseye className="text-3xl text-purple-600" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-800">Our Mission</h3>
            </div>
            <p className="text-sm md:text-lg text-gray-700 mb-6 leading-relaxed">
              To connect learners with exceptional educators through innovative
              technology, creating personalized educational experiences that
              inspire curiosity, foster growth, and unlock every student's
              unique potential.
            </p>
            <div className="bg-purple-50 rounded-xl p-5 border-l-4 border-purple-500 text-sm md:text-lg">
              <h4 className="font-semibold text-purple-800 mb-2">
                How we achieve it:
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span>Cutting-edge learning platform</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span>World-class educator community</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span>Personalized learning paths</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-16">
          <h3 className="text-2xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Our Core Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Value 1 */}
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                <FaHeart className="text-2xl text-amber-600" />
              </div>
              <h4 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">
                Passion for Education
              </h4>
              <p className="text-gray-600 text-sm md:text-lg">
                We believe in the transformative power of education and are
                dedicated to making it accessible to all.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <FaLightbulb className="text-2xl text-green-600" />
              </div>
              <h4 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">
                Innovation
              </h4>
              <p className="text-gray-600 text-sm md:text-lg">
                We continuously seek new ways to improve learning experiences
                through technology and creativity.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-2xl text-blue-600" />
              </div>
              <h4 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">
                Community
              </h4>
              <p className="text-gray-600 text-sm md:text-lg">
                We foster a supportive community where learners and educators
                grow together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
