import React, { useState } from "react";

const menuData = [
  {
    title: "Online Classes",
    active: true,
    columns: [
      {
        heading: "Tuitions",
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
  { title: "Languages" },
  { title: "Hobby Classes" },
  { title: "IT Courses" },
  { title: "Exam Coaching" },
];

function FindTutorMenu() {
  const [activeTab, setActiveTab] = useState(menuData[0]);
  return (
    <div className="py-20">
      {/* Tabs */}
      <div className="flex flex-wrap">
        {menuData.map((item) => (
          <button
            key={item.title}
            onClick={() => setActiveTab(item)}
            className={`px-4 py-2 border-r border-gray-300 text-sm sm:text-base ${
              activeTab.title === item.title
                ? "text-white bg-primary font-semibold"
                : "bg-gray-100 text-gray-700 hover:bg-primary hover:text-white duration-300"
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>

      {/* Mega Menu Content */}
      {activeTab?.columns && (
        <div className="bg-white shadow-md p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-0 border border-t-0 border-gray-300">
          {activeTab.columns.map((col, idx) => (
            <div key={idx}>
              <h3 className="font-semibold mb-3">{col.heading}</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                {col.links.map((link, i) => (
                  <li
                    key={i}
                    className="hover:text-primary cursor-pointer transition-colors"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FindTutorMenu;
