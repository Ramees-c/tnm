import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE from "../../../API/API";

function AllCategoriesPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // ✅ new

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/category-list/`);

        const formatted = data.map((category) => {
          const allSubs =
            category.subcategories?.flatMap(
              (sub) => sub.subcategories?.map((s) => s.name) || []
            ) || [];

          return {
            title: category.name,
            subs: allSubs.filter(Boolean),
          };
        });

        setCategories(formatted);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false); // ✅ end loading
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate(`/all-tutors?category=${encodeURIComponent(categoryName)}`, {
      state: { hideHeroSearch: true },
    });
  };

  const highlightMatch = (text, term) => {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="text-green-600 font-semibold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const filteredCategories = categories
    .map((category) => {
      const matchedSubs = category.subs.filter((sub) =>
        sub.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (
        category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        matchedSubs.length > 0
      ) {
        return { ...category, subs: matchedSubs };
      }
      return null;
    })
    .filter(Boolean);

  // ✅ Skeleton loader (modern shimmer style)
  const Skeleton = () => (
    <div className="animate-pulse space-y-8">
      {[...Array(5)].map((_, i) => (
        <div key={i}>
          <div className="h-5 bg-gray-300 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[...Array(5)].map((_, j) => (
              <div
                key={j}
                className="h-4 bg-gray-200 rounded w-3/4"
              ></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
          Explore <span className="text-green-600">All Subjects</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
          Find the perfect subject that matches your learning goals.
        </p>
      </div>

      {/* Search Input */}
      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search by category or subject..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-lg px-4 py-2 border rounded-md outline-none focus:ring-0 focus:border-green-500 text-xs sm:text-sm"
        />
      </div>

      {/* Main Box */}
      <div className="bg-white border border-gray-200 rounded-md shadow-md p-3 sm:p-5 md:p-10">
        {loading ? (
          <Skeleton /> // ✅ show loader while fetching
        ) : filteredCategories.length === 0 ? (
          <p className="text-center text-gray-500">No categories found.</p>
        ) : (
          filteredCategories.map((category, index) => (
            <div key={index} className="mb-10 last:mb-0">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-5 border-l-4 border-green-500 pl-3">
                {highlightMatch(category.title, searchTerm)}
              </h2>
              {category.subs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 pl-4">
                  {category.subs.map((sub, subIndex) => (
                    <div
                      onClick={() => handleCategoryClick(sub)}
                      key={subIndex}
                      className="hover:text-green-600 transition-colors duration-200 cursor-pointer text-gray-700 text-sm"
                    >
                      {highlightMatch(sub, searchTerm)}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm pl-4">
                  No subcategories available.
                </p>
              )}
              {index !== filteredCategories.length - 1 && (
                <hr className="my-8 border-gray-200" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AllCategoriesPage;
