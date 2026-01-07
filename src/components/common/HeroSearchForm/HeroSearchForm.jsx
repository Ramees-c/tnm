import { useState, useEffect, useRef } from "react";
import axios from "axios";
import DefaultButton from "../../common/DefaultButton/DefaultButton";
import API_BASE from "../../../API/API";

import { useNavigate } from "react-router-dom";

function HeroSearchForm() {
  const navigate = useNavigate();
  const [subjectInput, setSubjectInput] = useState("");
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [errors, setErrors] = useState({});
  const wrapperRef = useRef(null);

  // --- flattenCategories (keep your implementation) ---
  const flattenCategories = (
    categories,
    rootName = "",
    chain = [],
    rootId = null,
    path = []
  ) => {
    let result = [];

    categories.forEach((category) => {
      const isTop = !rootName;
      const currentRootName = rootName || category.name;
      const baseRootId = rootId ?? category.id;
      const currentPath = isTop ? [category.id] : [...path, category.id];
      const hasChildren =
        category.subcategories && category.subcategories.length > 0;
      const isLeaf = !hasChildren;
      const cleanChain = [...chain].filter((c) => c !== currentRootName);

      const label =
        cleanChain.length > 0
          ? `${category.name} in ${cleanChain
              .reverse()
              .join(" in ")} (${currentRootName})`
          : isTop
          ? category.name
          : `${category.name} (${currentRootName})`;

      result.push({
        id: category.id,
        name: category.name,
        label,
        parent: isTop ? null : currentRootName,
        pathIds: [baseRootId, ...currentPath.slice(1)],
        hasChildren,
        isLeaf,
      });

      if (hasChildren) {
        result = result.concat(
          flattenCategories(
            category.subcategories,
            currentRootName,
            [...chain, category.name],
            baseRootId,
            currentPath
          )
        );
      }
    });

    return result;
  };

  // --- helper to escape regex chars ---
  const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // --- highlight function that returns JSX parts (safe) ---
  const highlightMatchJSX = (text, query) => {
    if (!query) return text;
    const escaped = escapeRegExp(query);
    const parts = text.split(new RegExp(`(${escaped})`, "ig"));
    return parts.map((part, idx) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={idx} className="text-green-400 font-bold">
          {part}
        </span>
      ) : (
        <span key={idx}>{part}</span>
      )
    );
  };

  // --- fetch and filter subjects ---
  const fetchAndFilterSubjects = async (query) => {
    if (!query.trim()) {
      setFilteredSubjects([]);
      setShowSuggestions(false);
      return [];
    }

    // ensure dropdown opens even if there are zero matches
    setShowSuggestions(true);

    try {
      const res = await axios.get(`${API_BASE}/category-list/`);
      if (res.data && Array.isArray(res.data)) {
        const allSubcategories = flattenCategories(res.data);
        const matches = allSubcategories.filter(
          (sub) =>
            sub.isLeaf && sub.label.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredSubjects(matches);
        // keep showSuggestions true (so we can show "No subjects found" when matches.length === 0)
        return matches;
      }
    } catch (error) {
      console.error("Error fetching categories");
      setFilteredSubjects([]);
    }
    return [];
  };

  // --- input change ---
  const handleSubjectChange = (e) => {
    const value = e.target.value;
    setSubjectInput(value);
    setErrors((prev) => ({ ...prev, subjects: "" }));
   
    fetchAndFilterSubjects(value);
  };

  // --- form submit (Search button) ---
  const handleSearch = async (e) => {
    e.preventDefault();
    const matches = await fetchAndFilterSubjects(subjectInput);

    if (matches.length > 0) {
      navigate(`/all-tutors?category=${encodeURIComponent(matches[0].name)}`, {
        state: { hideHeroSearch: true },
      });
      setShowSuggestions(false);
    } else {
      // Keep dropdown open to show "No subjects found"
      setShowSuggestions(true);
    }
  };

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <form
      onSubmit={handleSearch}
      className="w-full lg:w-[80%] relative"
      ref={wrapperRef}
    >
      <input
        type="text"
        value={subjectInput}
        onChange={handleSubjectChange}
        placeholder="Enter Course Name"
        className="w-full px-4 py-2 pr-[7.5rem] h-[50px] lg:h-[60px] rounded-md outline-none border focus:ring-0 focus:border-primary"
        aria-label="Search subjects"
      />

      <div className="absolute right-2 top-1/2 -translate-y-1/2">
        <DefaultButton buttonText="Search" />
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <ul className="absolute z-50 w-full bg-white border mt-1 rounded shadow-lg max-h-60 overflow-y-auto text-start">
          {filteredSubjects.length > 0 ? (
            filteredSubjects.map((sub) => (
              <li
                key={sub.id}
                className="px-3 py-2 hover:bg-green-50 cursor-pointer text-xs md:text-sm"
                onClick={() => {
                  setSubjectInput(sub.label);
                  setShowSuggestions(false);
                  navigate(
                    `/all-tutors?category=${encodeURIComponent(sub.name)}`,
                    {
                      state: { hideHeroSearch: true },
                    }
                  );
                }}
              >
                {highlightMatchJSX(sub.label, subjectInput)}
              </li>
            ))
          ) : (
            <li className="px-3 py-2 text-gray-500 text-xs md:text-sm italic">
              No subjects found
            </li>
          )}
        </ul>
      )}
    </form>
  );
}

export default HeroSearchForm;
