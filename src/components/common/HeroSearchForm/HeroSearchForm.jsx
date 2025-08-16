import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { BsGrid3X3GapFill } from "react-icons/bs";
import DefaultButton from "../DefaultButton/DefaultButton";

function HeroSearchForm() {
  const [classValue, setClassValue] = useState("");
  const [subjectValue, setSubjectValue] = useState("");
  const [pincode, setPincode] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log({ classValue, subjectValue, pincode, location });
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full max-w-7xl mx-auto bg-transparent
             grid grid-cols-1 md:grid-cols-5 gap-0 overflow-hidden mt-5"
    >
      {/* Class */}
      <div className="flex items-center py-1 md:py-3">
        <select
          value={classValue}
          onChange={(e) => setClassValue(e.target.value)}
          className="w-full bg-white focus:outline-none text-gray-700 rounded-md cursor-pointer bg-red"
        >
          <option value="">Select Class</option>
          <option value="Class 10">Class 10</option>
          <option value="Class 11">Class 11</option>
          <option value="Class 12">Class 12</option>
        </select>
      </div>

      {/* Subject */}
      <div className="flex items-center md:px-1 py-1 md:py-3">
        <select
          value={subjectValue}
          onChange={(e) => setSubjectValue(e.target.value)}
          className="w-full bg-white focus:outline-none text-gray-700 rounded-md cursor-pointer"
        >
          <option value="">Select Subject</option>
          <option value="Math">Math</option>
          <option value="Science">Science</option>
          <option value="English">English</option>
        </select>
      </div>

      {/* Pincode */}
      <div className="flex items-center py-1 md:py-3">
        <input
          type="text"
          placeholder="Enter Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          className="w-full bg-white focus:outline-none text-gray-700 rounded-md"
        />
      </div>

      {/* Location */}
      <div className="flex items-center md:px-1 py-1 md:py-3">
        <input
          type="text"
          placeholder="Enter Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full bg-white focus:outline-none text-gray-700 rounded-md"
        />
      </div>

      <div className="flex items-center py-3">
       <div className="w-full">
        <DefaultButton buttonText="Search"  />
       </div>
      </div>
    </form>
  );
}

export default HeroSearchForm;
