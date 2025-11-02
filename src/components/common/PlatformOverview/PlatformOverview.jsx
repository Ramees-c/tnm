import React, { useState } from "react";
import {
  FiUsers,
  FiBookOpen,
  FiMonitor,
  FiAward,
  FiClock,
  FiArrowRight,
  FiChevronRight,
  FiStar,
  FiCheckCircle,
} from "react-icons/fi";
import SubHeader from "../Subheader/SubHeader";

const PlatformOverview = () => {
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    {
      icon: <FiUsers className="text-3xl" />,
      title: "Skilled Tutors",
      description:
        "Learn from experienced professionals who guide you every step of the way.",
      color: "bg-blue-100 text-blue-600",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: <FiBookOpen className="text-3xl" />,
      title: "Customized Learning",
      description:
        "Tailored lesson plans that adapt to your goals and learning style.",
      color: "bg-purple-100 text-purple-600",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      icon: <FiMonitor className="text-3xl" />,
      title: "Interactive Platform",
      description:
        "Engage in dynamic lessons with real-time collaboration tools.",
      color: "bg-green-100 text-green-600",
      gradient: "from-green-500 to-green-600",
    },
    {
      icon: <FiAward className="text-3xl" />,
      title: "Accredited Learning",
      description:
        "Complete accredited programs that validate your skills and enhance your professional growth.",
      color: "bg-amber-100 text-amber-600",
      gradient: "from-amber-500 to-amber-600",
    },
  ];

  const tabs = [
    {
      title: "For Students",
      content:
        "Find the ideal tutor who fits your goals, schedule, and learning style.",
      benefits: [
        "Customized learning plans",
        "Convenient session timings",
        "Continuous progress tracking",
        "Affordable and transparent pricing",
      ],
    },
    {
      title: "For Tutors",
      content:
        "Share your knowledge with dedicated learners and grow your tutoring career.",
      benefits: [
        "Reach motivated students",
        "Flexible teaching schedules",
        "Fair and transparent earnings",
        "Access to valuable teaching resources",
      ],
    },
  ];

  return (
    <section className=" relative overflow-hidden">
      <div className="px-4 relative z-10">
        {/* Section Header */}
        {/* <div className="text-center  mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold text-green-600 bg-green-100 rounded-full mb-4">
            Transforming Education
          </span>
          <h2 className="text-2xl md:text-5xl font-extrabold text-gray-800 mb-6 leading-tight">
            Learn from Top
            <span className="text-transparent bg-clip-text bg-green-600">
              {" "}
              Educators{" "}
            </span>
            Around the World
          </h2>

          <p className="text-sm md:text-lg text-gray-600 leading-relaxed">
            Our platform links motivated learners with skilled tutors for
            personalized guidance and effective learning outcomes.
          </p>
        </div> */}

        <SubHeader
          tagline="Transforming Education"
          title="Learn from Top Learn from Top Educators Around the World"
          description="Our platform links motivated learners with skilled tutors for
            personalized guidance and effective learning outcomes."
        />

        {/* Tabs */}
        <div className="flex flex-wrap justify-center mb-7">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-3 py-2 sm:px-5 sm:py-4 mx-2 mb-4 rounded-md text-xs md:text-sm font-medium transition-all duration-300 relative overflow-hidden group ${
                activeTab === index
                  ? "text-white shadow-md"
                  : "bg-white text-gray-700 hover:text-white shadow-md hover:shadow-lg"
              }`}
            >
              <span
                className={`absolute inset-0 w-full h-full transition-all duration-300 ease-out transform ${
                  activeTab === index
                    ? "bg-gradient-to-r from-green-500 to-green-600"
                    : "bg-gradient-to-r from-green-500/10 to-blue-500/10 group-hover:scale-105 group-hover:from-green-500 group-hover:to-green-600"
                }`}
              ></span>
              <span className="relative z-10">{tab.title}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-md shadow-md p-2 sm:p-4 mb-12 max-w-5xl mx-auto transform transition-all duration-300 hover:shadow-2xl">
          <p className="text-base sm:text-lg font-semibold text-center text-gray-700 mb-6">
            {tabs[activeTab].content}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mt-6">
            {tabs[activeTab].benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="flex items-center p-2 bg-gray-50 rounded-lg"
              >
                <FiCheckCircle className="text-green-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700 text-xs sm:text-base">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-2 sm:gap-5">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-md p-2 sm:p-4 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-50 to-white rounded-bl-full"></div>

              <div
                className={`w-12 h-12 rounded-md flex items-center justify-center mb-6 ${feature.color} group-hover:scale-110 transition-transform duration-300`}
              >
                {feature.icon}
              </div>
              <h3 className="text-base sm:text-xl font-bold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-xs sm:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        {/* <div className="bg-gradient-to-br from-green-500 via-green-600 to-green-700 rounded-md shadow-md p-10 text-center text-white relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/10 rounded-full"></div>

          <h3 className="text-2xl md:text-4xl font-bold mb-4 relative z-10">
            Ready to Start Your Learning Journey?
          </h3>
          <p className="text-lg mb-8 max-w-2xl mx-auto relative z-10">
            Join thousands of students achieving their goals with our platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <button className="bg-white text-gray-800 font-semibold py-4 px-8 rounded-md flex items-center justify-center hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Find a Tutor <FiArrowRight className="ml-2" />
            </button>
            <button className="bg-transparent border-2 border-white text-white font-semibold py-4 px-8 rounded-md hover:bg-white hover:text-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Become a Tutor
            </button>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default PlatformOverview;
