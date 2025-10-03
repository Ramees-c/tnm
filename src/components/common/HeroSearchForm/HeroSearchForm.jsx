import { useState, useEffect, useRef } from "react";
import axios from "axios";
import DefaultButton from "../../common/DefaultButton/DefaultButton";

function HeroSearchForm() {
  const [subjectInput, setSubjectInput] = useState("");
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [errors, setErrors] = useState({});
  const wrapperRef = useRef(null);

  const flattenCategories = (categories, rootName = "", chain = [], rootId = null, path = []) => {
    let result = [];

    categories.forEach((category) => {
      const isTop = !rootName;
      const currentRootName = rootName || category.name;
      const baseRootId = rootId ?? category.id;
      const currentPath = isTop ? [category.id] : [...path, category.id];
      const hasChildren = category.subcategories && category.subcategories.length > 0;
      const isLeaf = !hasChildren;
      const cleanChain = [...chain].filter((c) => c !== currentRootName);

      const label =
        cleanChain.length > 0
          ? `${category.name} in ${cleanChain.reverse().join(" in ")} (${currentRootName})`
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

  const fetchAndFilterSubjects = async (query) => {
    if (!query.trim()) {
      setFilteredSubjects([]);
      setShowSuggestions(false);
      return [];
    }

    try {
      const res = await axios.get("/api/category-list/");
      if (res.data && Array.isArray(res.data)) {
        const allSubcategories = flattenCategories(res.data);
        const matches = allSubcategories.filter(
          (sub) => sub.isLeaf && sub.label.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredSubjects(matches);
        setShowSuggestions(matches.length > 0);
        return matches;
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setFilteredSubjects([]);
      setShowSuggestions(false);
    }
    return [];
  };

  const handleSubjectChange = async (e) => {
    const value = e.target.value;
    setSubjectInput(value);
    setErrors((prev) => ({ ...prev, subjects: "" }));
    await fetchAndFilterSubjects(value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const results = await fetchAndFilterSubjects(subjectInput);
    console.log("Search clicked:", subjectInput, results);
    setShowSuggestions(results.length > 0);
  };

  const highlightMatch = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(
      regex,
      (match) => `<span class="text-green-400 font-bold">${match}</span>`
    );
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
    <form onSubmit={handleSearch} className="w-full lg:w-[80%] relative" ref={wrapperRef}>
      <input
        type="text"
        value={subjectInput}
        onChange={handleSubjectChange}
        placeholder="Enter Course Name"
        className="w-full px-4 py-2 pr-28 h-[50px] lg:h-[60px] rounded-md outline-none border focus:ring-0 focus:border-primary"
      />

      <div className="absolute right-1 top-1/2 transform -translate-y-1/2">
        <DefaultButton buttonText="Search" />
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && filteredSubjects.length > 0 && (
        <ul className="absolute z-50 w-full bg-white border mt-1 rounded shadow-lg max-h-60 overflow-y-auto text-start">
          {filteredSubjects.map((sub) => (
            <li
              key={sub.id}
              className="px-3 py-2 hover:bg-green-50 cursor-pointer"
              dangerouslySetInnerHTML={{
                __html: highlightMatch(sub.label, subjectInput),
              }}
              onClick={() => {
                setSubjectInput(sub.label);
                setShowSuggestions(false);
              }}
            />
          ))}
        </ul>
      )}
    </form>
  );
}

export default HeroSearchForm;
