import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

import DefaultButton from "../../common/DefaultButton/DefaultButton"

function HeroSearchForm() {
  const [department, setDepartment] = useState("Computer CSE");
  const [courseName, setCourseName] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log({ department, courseName });
  };
  return (
    <form onSubmit={handleSearch} className="w-full lg:w-[80%]">
      <div className="relative w-full">
        {/* Text Input */}
        <input
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          placeholder="Enter Course Name"
          className="w-full px-4 py-2 pr-28 lg:h-[60px] rounded-md outline-none border"
        />

        {/* Search Button */}
        {/* <button
          type="submit"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-1.5 rounded-md transition-colors"
        >
          Search
        </button> */}

        <div className="absolute right-1 top-1/2 transform -translate-y-1/2 ">
          <DefaultButton buttonText="Search" />
        </div>
      </div>
    </form>
  );
}

export default HeroSearchForm;
