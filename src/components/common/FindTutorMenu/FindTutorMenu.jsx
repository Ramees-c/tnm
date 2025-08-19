import React, { useState } from "react";
import { FiChevronDown, FiChevronRight, FiChevronUp } from "react-icons/fi";
import DefaultButton from "../DefaultButton/DefaultButton";

const menuData = [
  {
    title: "Online Classes",
    active: true,
    columns: [
      {
        heading: "Tuitions",
        icon: "📚",
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
        ],
      },
      {
        heading: "Languages",
        icon: "🌎",
        links: [
          "Spoken English",
          "French Language",
          "Spanish Language",
          "German Language",
          "Hindi Language",
          "IELTS",
          "PTE",
          "TOEFL",
        ],
      },
      {
        heading: "Hobbies",
        icon: "🎨",
        links: [
          "Singing",
          "Yoga",
          "Dance",
          "Guitar",
          "Personality Development Training",
        ],
      },
      {
        heading: "More",
        icon: "➕",
        links: [
          "Online Tuitions",
          "Online Language Classes",
          "Online Hobby Classes",
          "Online IT Coaching",
          "Online Exam Entrance Coaching",
        ],
      },
    ],
  },
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
        ],
      },
      {
        heading: "Languages",
        icon: "🗣️",
        links: [
          "Spoken English",
          "French Language",
          "Spanish Language",
          "German Language",
          "Hindi Language",
          "IELTS",
          "PTE",
          "TOEFL",
        ],
      },
      {
        heading: "Hobbies",
        icon: "🎭",
        links: [
          "Singing",
          "Yoga",
          "Dance",
          "Guitar",
          "Personality Development Training",
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
        ],
      },
      {
        heading: "Test Prep",
        icon: "📝",
        links: ["IELTS", "PTE", "TOEFL", "GRE", "GMAT"],
      },
    ],
  },
  {
    title: "Hobby Classes",
    columns: [
      {
        heading: "Creative Arts",
        icon: "🎨",
        links: ["Singing", "Dance", "Guitar", "Piano", "Painting"],
      },
      {
        heading: "Wellness",
        icon: "🧘",
        links: ["Yoga", "Meditation", "Zumba", "Pilates"],
      },
    ],
  },
  {
    title: "IT Courses",
    columns: [
      {
        heading: "Programming",
        icon: "💻",
        links: ["Python", "JavaScript", "Java", "C++", "Web Development"],
      },
      {
        heading: "Data Science",
        icon: "📊",
        links: ["Machine Learning", "Data Analysis", "AI", "Big Data"],
      },
    ],
  },
  {
    title: "Exam Coaching",
    columns: [
      {
        heading: "Entrance Exams",
        icon: "🎯",
        links: ["JEE", "NEET", "GATE", "CAT"],
      },
      {
        heading: "Study Abroad",
        icon: "✈️",
        links: ["SAT", "GRE", "GMAT", "TOEFL"],
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
                <ul className="space-y-3">
                  {col.links.map((link, i) => (
                    <li
                      key={i}
                      className="relative"
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
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
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
                    <ul className="space-y-2 pl-8">
                      {col.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <a
                            href="#"
                            className="flex items-center py-1.5 text-gray-600 hover:text-primary transition-colors"
                          >
                            <FiChevronRight className="mr-2 text-primary text-xs" />
                            {link}
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
                  {/* <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md text-sm shadow-sm transition-colors">
                    Get Free Consultation
                  </button> */}
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
