import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

function FormInput({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  options = [],
  select = false,
  className = "",
  hasError,
}) {
  const [open, setOpen] = useState(false);

  // Custom Select Dropdown
  if (select) {
    const handleSelect = (val) => {
      onChange({ target: { name, value: val } });
      setOpen(false);
    };

    return (
      <div className={`relative w-full ${className}`}>
        {/* Selected value */}
        <div
          onClick={() => setOpen(!open)}
          className={`w-full px-4 py-2 flex justify-between items-center border rounded-md cursor-pointer bg-white hover:border-primary transition ${ hasError ? "border-red-500" : "border-gray-300"} ` }
        >
          <span className={value ? "text-gray-800" : "text-gray-400"}>
            {value
              ? options.find((o) => o.value === value)?.label
              : placeholder}
          </span>
          <FaChevronDown
            className={`text-gray-500 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>

        {/* Dropdown list */}
        {open && (
          <ul className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-md max-h-60 overflow-auto">
            {options.map((opt, i) => (
              <li
                key={i}
                onClick={() => handleSelect(opt.value)}
                className="px-4 py-2 cursor-pointer hover:bg-primary/10 text-gray-700"
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  // Normal input
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2 rounded-md outline-none border placeholder-gray-400 focus:ring-0 focus:border-primary ${className} ${
        hasError ? "border-red-500" : "border-gray-300"
      }`}
    />
  );
}

export default FormInput;
