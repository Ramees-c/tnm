import React, { useState, useEffect } from "react";
import { FiChevronDown, FiChevronRight, FiChevronUp } from "react-icons/fi";
import DefaultButton from "../DefaultButton/DefaultButton";
import axios from "axios";

function FindTutorMenu() {
  const [menuData, setMenuData] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [mobileOpenIndex, setMobileOpenIndex] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/api/category-list/");
        const mappedData = data.map((category) => {
          const columns = category.subcategories.map((subcat) => ({
            heading: subcat.name,
            links: subcat.subcategories.map((sub) => sub.name),
          }));
          return { title: category.name, columns };
        });
        setMenuData(mappedData);
        if (mappedData.length) setActiveTab(mappedData[0]);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const toggleMobileMenu = (index) => {
    setMobileOpenIndex(mobileOpenIndex === index ? null : index);
  };

  const shouldUseTwoColumns = (links) => links.length >= 8;

  return (
    <div className="w-full mx-auto px-4 pb-16">
      {/* Desktop View */}
      <div className="hidden lg:block">
        {/* Tabs */}
        <div className="flex flex-wrap rounded-t-lg overflow-hidden shadow-sm border border-gray-200">
          {menuData.map((item) => (
            <button
              key={item.title}
              onClick={() => setActiveTab(item)}
              className={`px-6 py-3 text-sm sm:text-base font-medium transition-all duration-300 flex items-center border-r last:border-r-0 ${
                activeTab?.title === item.title
                  ? "text-white bg-gradient-to-r from-green-500 to-green-600 shadow"
                  : "bg-gray-50 text-gray-700 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600 hover:text-white"
              }`}
            >
              {item.title}
              {activeTab?.title === item.title && (
                <FiChevronDown className="ml-2" />
              )}
            </button>
          ))}
        </div>

        {/* Mega Menu */}
        {/* Desktop Mega Menu */}
        {/* Desktop Mega Menu */}
        {activeTab?.columns && (
          <div className="bg-white rounded-b-lg shadow-lg p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 border border-t-0 border-gray-200">
            {activeTab.columns
              .filter((col) => col.links && col.links.length > 0) // Only show columns with links
              .slice(0, 9) // Take only the first 9 valid columns
              .map((col, idx) => {
                // Take only first 10 links
                const linksToShow = col.links.slice(0, 10);

                // Split into two columns with 5 items each
                const firstColumn = linksToShow.slice(0, 5);
                const secondColumn = linksToShow.slice(5, 10);

                return (
                  <div key={idx}>
                    <h3 className="text-sm font-semibold text-gray-800 mb-3">
                      {col.heading}
                    </h3>

                    <div className="flex gap-4">
                      {/* First Column */}
                      <ul className="space-y-2">
                        {firstColumn.map((link, i) => (
                          <li
                            key={i}
                            onMouseEnter={() => setHoveredLink(link)}
                            onMouseLeave={() => setHoveredLink(null)}
                          >
                            <a
                              href="#"
                              className={`flex items-center py-1.5 px-2 rounded-md transition-all text-sm whitespace-normal ${
                                hoveredLink === link
                                  ? "bg-primary/10 text-primary font-medium pl-3"
                                  : "text-gray-600 hover:text-gray-800"
                              }`}
                              title={link}
                            >
                              {hoveredLink === link && (
                                <FiChevronRight className="mr-2 text-primary text-sm" />
                              )}
                              <span>{link}</span>
                            </a>
                          </li>
                        ))}
                      </ul>

                      {/* Second Column */}
                      {secondColumn.length > 0 && (
                        <ul className="space-y-2">
                          {secondColumn.map((link, i) => (
                            <li
                              key={i}
                              onMouseEnter={() => setHoveredLink(link)}
                              onMouseLeave={() => setHoveredLink(null)}
                            >
                              <a
                                href="#"
                                className={`flex items-center py-1.5 px-2 rounded-md transition-all text-sm whitespace-normal ${
                                  hoveredLink === link
                                    ? "bg-primary/10 text-primary font-medium pl-3"
                                    : "text-gray-600 hover:text-gray-800"
                                }`}
                                title={link}
                              >
                                {hoveredLink === link && (
                                  <FiChevronRight className="mr-2 text-primary text-sm" />
                                )}
                                <span>{link}</span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      {/* Mobile View */}
      <div className="lg:hidden space-y-4">
        {menuData.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleMobileMenu(index)}
              className={`w-full px-4 py-3 text-left flex items-center justify-between font-medium transition-colors ${
                mobileOpenIndex === index
                  ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
                  : "bg-gray-50 text-gray-700"
              }`}
            >
              {item.title}
              {mobileOpenIndex === index ? <FiChevronUp /> : <FiChevronDown />}
            </button>

            {mobileOpenIndex === index && item.columns && (
              <div className="p-4 bg-white">
                {item.columns.map((col, colIndex) => (
                  <div key={colIndex} className="mb-4 last:mb-0">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {col.heading}
                    </h3>
                    <ul className="space-y-2 pl-4">
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

                <div className="mt-4 bg-primary/5 p-4 rounded-lg">
                  <h3 className="font-bold text-gray-800 mb-2">
                    Need help choosing?
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
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
