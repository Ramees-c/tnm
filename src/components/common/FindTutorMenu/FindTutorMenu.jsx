import React, { useState } from "react";
import { FiChevronDown, FiChevronRight, FiChevronUp } from "react-icons/fi";
import DefaultButton from "../DefaultButton/DefaultButton";

const menuData = [
  {
    title: "Tuition",
    columns: [
      {
        heading: "Tuitions",
        icon: "🏫",
        links: [
          "Class 12 Tuition",
          "Class 11 Tuition",
          "Class 10 Tuition",
          "Class 9 Tuition",
          "Class 8 Tuition",
          "Class 7 Tuition",
          "Class 6 Tuition",
          "Class I-V Tuition",
          "BCom Tuition",
          "BTech Tuition",
          "BA Tuition",
          "BSc Tuition",
          "BCA Tuition",
          "BBA Tuition",
          "MCA Tuition",
          "MBA Tuition",
        ],
      },
    ],
  },
  {
    title: "Languages",
    columns: [
      {
        heading: "Popular Languages",
        icon: "🌟",
        links: [
          "Spoken English",
          "French Language",
          "Spanish Language",
          "German Language",
          "Hindi Language",
          "Japanese Language",
          "Chinese Language",
          "Korean Language",
          "Russian Language",
          "Portuguese Language",
          "Italian Language",
          "Arabic Language",
        ],
      },
      {
        heading: "Test Prep",
        icon: "📝",
        links: ["IELTS", "PTE", "TOEFL", "GRE", "GMAT", "SAT", "ACT", "GMAT", "TOEIC"],
      },
    ],
  },
  {
    title: "Hobby Classes",
    columns: [
      {
        heading: "Creative Arts",
        icon: "🎨",
        links: ["Singing", "Dance", "Guitar", "Piano", "Painting", "Drawing", "Photography", "Pottery", "Sculpting", "Calligraphy"],
      },
      {
        heading: "Wellness",
        icon: "🧘",
        links: ["Yoga", "Meditation", "Zumba", "Pilates", "Aerobics", "Karate", "Taekwondo", "Martial Arts", "Boxing"],
      },
    ],
  },
  {
    title: "IT Courses",
    columns: [
      {
        heading: "Programming",
        icon: "💻",
        links: ["Python", "JavaScript", "Java", "C++", "Web Development", "Mobile App Development", "Game Development", "Data Structures", "Algorithms"],
      },
      {
        heading: "Data Science",
        icon: "📊",
        links: ["Machine Learning", "Data Analysis", "AI", "Big Data", "Data Visualization", "Deep Learning", "Natural Language Processing", "Computer Vision"],
      },
    ],
  },
  {
    title: "Exam Coaching",
    columns: [
      {
        heading: "Entrance Exams",
        icon: "🎯",
        links: ["JEE", "NEET", "GATE", "CAT", "UPSC", "SSC", "Bank PO", "Railway", "Defense", "CLAT", "NET", "SET"],
      },
      {
        heading: "Study Abroad",
        icon: "✈️",
        links: ["SAT", "GRE", "GMAT", "TOEFL", "IELTS", "PTE", "Duolingo", "OET", "CELPIP"],
      },
    ],
  },
];

function FindTutorMenu() {
  const [activeTab, setActiveTab] = useState(menuData[0]);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [mobileOpenIndex, setMobileOpenIndex] = useState(null);

  const toggleMobileMenu = (index) => {
    setMobileOpenIndex(mobileOpenIndex === index ? null : index);
  };

  // Function to determine if a column should use two columns
  const shouldUseTwoColumns = (links) => links.length >= 8;

  return (
    <div className="w-full mx-auto px-4 pb-16">
      {/* Desktop View */}
      <div className="hidden lg:block">
        {/* Tabs */}
        <div className="flex flex-wrap rounded-t-lg overflow-hidden shadow-sm">
          {menuData.map((item) => (
            <button
              key={item.title}
              onClick={() => setActiveTab(item)}
              className={`px-6 py-3 text-sm sm:text-base font-medium transition-all duration-300 flex items-center ${
                activeTab.title === item.title
                  ? "text-white bg-gradient-to-r from-green-500 to-green-600 shadow-lg"
                  : "bg-gray-50 text-gray-700 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600  hover:text-white"
              }`}
            >
              {item.title}
              {activeTab.title === item.title && (
                <FiChevronDown className="ml-2" />
              )}
            </button>
          ))}
        </div>

        {/* Mega Menu Content */}
        {activeTab?.columns && (
          <div className="bg-white rounded-b-lg shadow-xl p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 border border-gray-100">
            {activeTab.columns.map((col, idx) => (
              <div key={idx} className="group">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">{col.icon}</span>
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors">
                    {col.heading}
                  </h3>
                </div>
                <div className={`overflow-hidden ${shouldUseTwoColumns(col.links) ? 'h-72' : 'h-auto'}`}>
                  <ul className={`space-y-3 ${shouldUseTwoColumns(col.links) ? 'columns-2 gap-4' : ''}`}>
                    {col.links.map((link, i) => (
                      <li
                        key={i}
                        className="relative break-inside-avoid"
                        onMouseEnter={() => setHoveredLink(link)}
                        onMouseLeave={() => setHoveredLink(null)}
                      >
                        <a
                          href="#"
                          className={`flex items-center py-1.5 px-2 rounded-md transition-all ${
                            hoveredLink === link
                              ? "bg-primary/10 text-primary font-medium pl-3"
                              : "text-gray-600 hover:text-gray-800"
                          }`}
                        >
                          {hoveredLink === link && (
                            <FiChevronRight className="mr-2 text-primary text-sm" />
                          )}
                          <span className="truncate">{link}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            {/* Featured Section */}
            <div className="sm:col-span-2 lg:col-span-4 bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-lg mt-4">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-2/3 mb-4 md:mb-0">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Need help choosing?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Our education consultants can help you find the perfect
                    tutor for your needs.
                  </p>
                  <DefaultButton buttonText="Get Free Consultation" />
                </div>
                <div className="md:w-1/3 flex justify-center">
                  <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-4xl">👩‍🏫</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile/Tablet View - FAQ Style */}
      <div className="lg:hidden space-y-4">
        {menuData.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleMobileMenu(index)}
              className={`w-full px-4 py-3 text-left flex items-center justify-between ${
                mobileOpenIndex === index
                  ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
                  : "bg-gray-50 text-gray-700"
              }`}
            >
              <span className="font-medium">{item.title}</span>
              {mobileOpenIndex === index ? (
                <FiChevronUp className="ml-2" />
              ) : (
                <FiChevronDown className="ml-2" />
              )}
            </button>

            {mobileOpenIndex === index && item.columns && (
              <div className="p-4 bg-white">
                {item.columns.map((col, colIndex) => (
                  <div key={colIndex} className="mb-6 last:mb-0">
                    <div className="flex items-center mb-3">
                      <span className="text-xl mr-2">{col.icon}</span>
                      <h3 className="font-semibold text-gray-800">
                        {col.heading}
                      </h3>
                    </div>
                    {/* Removed columns-2 class for mobile view */}
                    <ul className="space-y-2 pl-8">
                      {col.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <a
                            href="#"
                            className="flex items-center py-1.5 text-gray-600 hover:text-primary transition-colors"
                          >
                            <FiChevronRight className="mr-2 text-primary text-xs" />
                            <span className="truncate">{link}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* Mobile Featured Section */}
                <div className="mt-6 bg-primary/5 p-4 rounded-lg">
                  <h3 className="font-bold text-gray-800 mb-2">
                    Need help choosing?
                  </h3>
                  <p className="text-gray-600 mb-3 text-sm">
                    Our education consultants can help you find the perfect
                    tutor.
                  </p>
                  <DefaultButton buttonText="Get Free Consultation" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FindTutorMenu;