import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/images/logo/tnmlogo.png";
import { FaBars } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import DefaultButton from "../DefaultButton/DefaultButton";
import MobileSidebar from "../MobileSidebar/MobileSidebar";
import axios from "axios";
import { API_URL } from "../../../API/API";

function Userheader() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [category, setCategory] = useState([]);
  const dropdownRef = useRef(null);

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  // Handle scroll to show/hide header
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowHeader(currentScrollY < lastScrollY || currentScrollY < 50);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown if click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // close dropdown logic if needed
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const getCategory = async () => {
      const data = await axios.get(`/api/tutors/subjects/`);
      setCategory(data.data);
    };
    getCategory();
  }, []);

  return (
    <header
      className={`sticky top-0 left-0 w-full z-40 bg-white py-3 transition-transform duration-300 shadow-sm ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center space-x-20 w-full md:w-auto">
            <div className="flex items-center">
              <button
                className="lg:hidden mr-4"
                onClick={() => setSidebarOpen(true)}
              >
                <FaBars size={30} />
              </button>
              <NavLink to="/" className="flex items-center">
                <img src={logo} alt="Logo" className="h-10 md:h-20" />
              </NavLink>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <ul className="flex items-center justify-center space-x-9 xl:space-x-12">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `text-sm xl:text-lg font-montserrat hover:text-primary hover:font-bold duration-300 ${
                      isActive
                        ? "text-primary font-bold"
                        : "text-gray-700 font-medium"
                    }`
                  }
                  onClick={handleClick}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `text-sm xl:text-lg  font-montserrat hover:text-primary hover:font-bold duration-300 ${
                      isActive
                        ? "text-primary font-bold"
                        : "text-gray-700 font-medium"
                    }`
                  }
                  onClick={handleClick}
                >
                  About
                </NavLink>
              </li>

              {/* Find Tutors Dropdown (just example – you can wrap NavLink inside each item in grid) */}
              <li className="group relative">
                <div className="flex items-center cursor-pointer text-sm xl:text-lg font-medium font-montserrat hover:text-primary hover:font-bold duration-300">
                  Find Tutors
                  <FiChevronDown className="ml-2 text-lg" />
                </div>
                <div
                  className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md p-6 hidden group-hover:block z-50 
                min-w-[600px] max-w-[90vw]"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-6">
                    <div>
                      <h4 className="font-bold mb-3 text-gray-800">Tuition</h4>
                      <ul className="space-y-3">
                        {category.map((item) => (
                          <li key={item.subject}>
                            <NavLink
                              to={`/tutors/${item.subject.toLowerCase()}`}
                              className={({ isActive }) =>
                                `block py-1 ${
                                  isActive ? "text-primary" : "text-gray-700"
                                }`
                              }
                            >
                              {item.subject}
                            </NavLink>
                          </li>
                        ))}

                        {/* <li>Mathamatics</li>
                        <li>Hindi</li>
                        <li>English</li>
                        <li>Botony</li>
                        <li>Zoology</li> */}
                      </ul>
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <NavLink
                  to="/blog"
                  className={({ isActive }) =>
                    `text-sm xl:text-lg font-montserrat hover:text-primary duration-300 hover:font-bold ${
                      isActive
                        ? "text-primary font-bold"
                        : "text-gray-700 font-medium"
                    }`
                  }
                  onClick={handleClick}
                >
                  Blogs
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/testimonial"
                  className={({ isActive }) =>
                    `text-sm xl:text-lg font-montserrat hover:text-primary hover:font-bold duration-300 ${
                      isActive
                        ? "text-primary font-bold"
                        : "text-gray-700 font-medium"
                    }`
                  }
                  onClick={handleClick}
                >
                  Testimonials
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `text-sm xl:text-lg font-montserrat hover:text-primary hover:font-bold duration-300 ${
                      isActive
                        ? "text-primary font-bold"
                        : "text-gray-700 font-medium"
                    }`
                  }
                  onClick={handleClick}
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Login/Register Button */}
          <div className="flex">
            <Link to="/register" onClick={handleClick}>
              <DefaultButton buttonText="Login/Register" />
            </Link>
          </div>
        </div>

        {/* Mobile Sidebar */}
        <MobileSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </nav>
    </header>
  );
}

export default Userheader;
