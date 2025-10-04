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

const PlatformOverview = () => {
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    {
      icon: <FiUsers className="text-3xl" />,
      title: "Expert Tutors",
      description:
        "Connect with certified professionals across diverse subjects and skill levels.",
      stats: "5000+ Tutors",
      color: "bg-blue-100 text-blue-600",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: <FiBookOpen className="text-3xl" />,
      title: "Personalized Learning",
      description:
        "Customized lesson plans tailored to your learning style and goals.",
      stats: "95% Success Rate",
      color: "bg-purple-100 text-purple-600",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      icon: <FiMonitor className="text-3xl" />,
      title: "Interactive Platform",
      description:
        "Seamless virtual classroom with real-time collaboration tools.",
      stats: "24/7 Access",
      color: "bg-green-100 text-green-600",
      gradient: "from-green-500 to-green-600",
    },
    {
      icon: <FiAward className="text-3xl" />,
      title: "Certified Programs",
      description:
        "Earn recognized certifications to advance your career or academic journey.",
      stats: "100+ Programs",
      color: "bg-amber-100 text-amber-600",
      gradient: "from-amber-500 to-amber-600",
    },
  ];

  const tabs = [
    {
      title: "For Students",
      content:
        "Find the perfect tutor tailored to your learning needs, schedule, and budget.",
      benefits: [
        "Personalized learning paths",
        "Flexible scheduling",
        "Progress tracking",
        "Affordable pricing options",
      ],
    },
    {
      title: "For Tutors",
      content:
        "Share your expertise with students worldwide and build your teaching career.",
      benefits: [
        "Global student reach",
        "Flexible working hours",
        "Competitive earnings",
        "Teaching resources",
      ],
    },
  ];

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center  mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold text-green-600 bg-green-100 rounded-full mb-4">
            Transforming Education
          </span>
          <h2 className="text-2xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
            Learn from the Best{" "}
            <span className="text-transparent bg-clip-text bg-green-600">
              Educators
            </span>{" "}
            Worldwide
          </h2>
          <p className="text-sm md:text-lg text-gray-600 leading-relaxed">
            Our innovative platform connects passionate learners with expert
            educators for personalized, effective learning experiences.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center mb-12">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-8 py-4 mx-2 mb-4 rounded-md text-sm md:text-md md:text-lg font-medium transition-all duration-300 relative overflow-hidden group ${
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
        <div className="bg-white rounded-md shadow-md p-8 mb-16 max-w-5xl mx-auto transform transition-all duration-300 hover:shadow-2xl">
          <p className="text-lg text-center text-gray-700 mb-6">
            {tabs[activeTab].content}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {tabs[activeTab].benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="flex items-center p-3 bg-gray-50 rounded-lg"
              >
                <FiCheckCircle className="text-green-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-md p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-50 to-white rounded-bl-full"></div>

              <div
                className={`w-16 h-16 rounded-md flex items-center justify-center mb-6 ${feature.color} group-hover:scale-110 transition-transform duration-300`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {feature.description}
              </p>
              <div className="flex items-center justify-between mt-6">
                <span className="font-semibold text-gray-800">
                  {feature.stats}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-green-500 via-green-600 to-green-700 rounded-md shadow-md p-10 text-center text-white relative overflow-hidden">
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
        </div>
      </div>
    </section>
  );
};

export default PlatformOverview;
