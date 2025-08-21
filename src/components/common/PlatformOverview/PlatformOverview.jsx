import React, { useState } from "react";
import {
  FiUsers,
  FiBookOpen,
  FiMonitor,
  FiAward,
  FiClock,
  FiArrowRight,
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
    },
    {
      icon: <FiBookOpen className="text-3xl" />,
      title: "Personalized Learning",
      description:
        "Customized lesson plans tailored to your learning style and goals.",
      stats: "95% Success Rate",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: <FiMonitor className="text-3xl" />,
      title: "Interactive Platform",
      description:
        "Seamless virtual classroom with real-time collaboration tools.",
      stats: "24/7 Access",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <FiAward className="text-3xl" />,
      title: "Certified Programs",
      description:
        "Earn recognized certifications to advance your career or academic journey.",
      stats: "100+ Programs",
      color: "bg-amber-100 text-amber-600",
    },
  ];

  const tabs = [
    {
      title: "For Students",
      content:
        "Find the perfect tutor tailored to your learning needs, schedule, and budget.",
    },
    {
      title: "For Tutors",
      content:
        "Share your expertise with students worldwide and build your teaching career.",
    },
    {
      title: "For Institutions",
      content:
        "Enhance your educational offerings with our platform integration solutions.",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
            Transforming Education Through Technology
          </h2>
          <p className="text-sm md:text-lg text-gray-600">
            Our platform connects learners with expert educators for
            personalized, effective learning experiences.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center mb-12">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 mx-2 mb-4 rounded-full text-sm md:text-lg font-medium transition-all duration-300 ${
                activeTab === index
                  ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gradient-to-r hover:from-green-500 hover:text-white hover:to-green-600 shadow-md"
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-16 max-w-4xl mx-auto">
          <p className="text-sm md:text-lg text-center text-gray-700">
            {tabs[activeTab].content}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div
                className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 ${feature.color}`}
              >
                {feature.icon}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-4 text-sm md:text-lg">{feature.description}</p>
              <p className="font-semibold text-gray-800">{feature.stats}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-xl p-10 text-center text-white">
          <h3 className="text-2xl md:text-4xl font-bold mb-4">
            Ready to Start Your Learning Journey?
          </h3>
          <p className="text-sm md:text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of students achieving their goals with our platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-black font-semibold py-3 px-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors ">
              Find a Tutor <FiArrowRight className="ml-2" />
            </button>
            <button className="border-2 border-white text-white font-semibold py-3 px-8 rounded-full hover:bg-white hover:text-black transition-colors">
              Become a Tutor
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformOverview;
