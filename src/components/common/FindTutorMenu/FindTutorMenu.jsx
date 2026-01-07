import React, { useState, useEffect } from "react";
import { FiChevronDown, FiChevronRight, FiChevronUp } from "react-icons/fi";
import axios from "axios";
import API_BASE from "../../../API/API";

import { useNavigate } from "react-router-dom";

function FindTutorMenu() {
  const navigate = useNavigate();

  // state
  const [menuData, setMenuData] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [mobileOpenIndex, setMobileOpenIndex] = useState(null);

  // Category fetching
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/category-list/`);
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

  // In mobile toggle
  const toggleMobileMenu = (index) => {
    setMobileOpenIndex(mobileOpenIndex === index ? null : index);
  };

  // Category click redirect to all tutors page
  const handleCategoryClick = (categoryName) => {
    navigate(`/all-tutors?category=${encodeURIComponent(categoryName)}`, {
      state: { hideHeroSearch: true },
    });
  };

  return (
    // Find tutor menu component in home page
    <div className="w-full mx-auto px-4 pb-16">
      {/* Desktop View */}
      <div className="hidden lg:block">
        {/* Tabs */}
        <div className="flex flex-wrap rounded-t-md overflow-hidden">
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

        {/* Desktop Mega Menu */}
        {activeTab?.columns && (
          <div className="bg-white rounded-b-md shadow-sm p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 border border-t-0 border-gray-200">
            {activeTab.columns
              .filter((col) => col.links && col.links.length > 0)
              .slice(0, 9)
              .map((col, idx) => {
                const linksToShow = col.links.slice(0, 10);
                const firstColumn = linksToShow.slice(0, 5);
                const secondColumn = linksToShow.slice(5, 10);

                return (
                  <div key={idx}>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-4 border-b border-gray-100 pb-1">
                      {col.heading}
                    </h3>

                    <div className="flex gap-4 flex-wrap sm:flex-nowrap">
                      {/* First Column */}
                      <ul className="space-y-2 w-full sm:w-1/2">
                        {firstColumn.map((link, i) => {
                          const hoverKey = `${idx}-${i}-${link}`;

                          return (
                            <li key={hoverKey}>
                              <button
                                onClick={() => handleCategoryClick(link)}
                                onMouseEnter={() => setHoveredLink(hoverKey)}
                                onMouseLeave={() => setHoveredLink(null)}
                                className={`w-full text-left flex items-center gap-2 py-1 rounded-md transition-all duration-200 text-sm ${
                                  hoveredLink === hoverKey
                                    ? "bg-green-50 text-green-600 font-medium shadow-inner"
                                    : "text-gray-700 hover:bg-green-50 hover:text-green-600"
                                }`}
                              >
                                {hoveredLink === hoverKey && (
                                  <FiChevronRight className="text-green-600" />
                                )}
                                <span>{link}</span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>

                      {/* Second Column */}
                      {secondColumn.length > 0 && (
                        <ul className="space-y-2 w-full sm:w-1/2">
                          {secondColumn.map((link, i) => {
                            const hoverKey = `${idx}-2-${i}-${link}`;

                            return (
                              <li key={hoverKey}>
                                <button
                                  onClick={() => handleCategoryClick(link)}
                                  onMouseEnter={() => setHoveredLink(hoverKey)}
                                  onMouseLeave={() => setHoveredLink(null)}
                                  className={`w-full text-left flex items-center gap-2 py-1 rounded-md transition-all duration-200 text-sm ${
                                    hoveredLink === hoverKey
                                      ? "bg-green-50 text-green-600 font-medium shadow-inner"
                                      : "text-gray-700 hover:bg-green-50 hover:text-green-600"
                                  }`}
                                >
                                  {hoveredLink === hoverKey && (
                                    <FiChevronRight className="text-green-600" />
                                  )}
                                  <span>{link}</span>
                                </button>
                              </li>
                            );
                          })}
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
      <div className="lg:hidden space-y-1">
        {menuData.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-md overflow-hidden"
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
              <div className="p-2 bg-white">
                {item.columns.map((col, colIndex) => (
                  <div key={colIndex} className="mb-4 last:mb-0">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {col.heading}
                    </h3>
                    <ul className="space-y-2 pl-4">
                      {col.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <button
                            onClick={() => handleCategoryClick(link)}
                            className="flex items-center py-1.5 text-gray-600 hover:text-primary transition-colors"
                          >
                            <FiChevronRight className="mr-2 text-primary text-xs" />
                            <span className="truncate">{link}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FindTutorMenu;
