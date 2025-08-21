import { useState, useEffect, useRef } from "react";
import logo from "../../../assets/images/logo/tnmlogo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import DefaultButton from "../DefaultButton/DefaultButton";
import MobileSidebar from "../MobileSidebar/MobileSidebar";

function Userheader() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`sticky top-0 left-0 w-full z-40 bg-white py-3 transition-transform duration-300 shadow-sm ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Main Navigation */}
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
              <a href="/" className="flex items-center">
                <img src={logo} alt="Logo" className="h-10 md:h-20" />
              </a>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center ">
            <ul className="flex items-center justify-center space-x-9 xl:space-x-12 ">
              <li className="text-sm xl:text-md font-medium font-montserrat">Home</li>
              <li className="text-sm xl:text-md font-medium font-montserrat">About</li>

              {/* Find Tutors Dropdown */}
              <li className="group relative">
                <div className="flex items-center hover:text-primary cursor-pointer text-sm xl:text-md font-medium font-montserrat">
                  Find Tutors
                  <FiChevronDown className="ml-2 text-lg" />
                </div>
                <div className="fixed right-0 mt-0 w-[95vw] max-w-[78.125vw] bg-white shadow-lg rounded-md p-4 hidden group-hover:block z-50 mr-10 ">
                  <div className="grid grid-cols-4 gap-6">
                    {/* Column 1 */}
                    <div>
                      <h4 className="font-bold mb-3 text-gray-800">
                        Lorem, ipsum.
                      </h4>
                      <ul className="space-y-3">
                        {[...Array(4)].map((_, i) => (
                          <li key={i}>
                            <a
                              href="#"
                              className="hover:text-blue-500 transition-colors duration-200 block py-1"
                            >
                              Lorem, ipsum.
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Repeat similar structure for other columns */}
                    {[...Array(7)].map((_, colIndex) => (
                      <div key={colIndex}>
                        <h4 className="font-bold mb-3 text-gray-800">
                          Lorem, ipsum.
                        </h4>
                        <ul className="space-y-3">
                          {[...Array(4)].map((_, i) => (
                            <li key={i}>
                              <a
                                href="#"
                                className="hover:text-blue-500 transition-colors duration-200 block py-1"
                              >
                                Lorem, ipsum.
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </li>

              <li className="text-sm xl:text-md font-medium font-montserrat">Blogs</li>
              <li className="text-sm xl:text-md font-medium font-montserrat">
                Testimonials
              </li>
              <li className="text-sm xl:text-md font-medium font-montserrat">Contact</li>
            </ul>
          </div>

          {/* Login/Register Button */}
          <div className="flex">
            <DefaultButton buttonText="Login/Register" />
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
