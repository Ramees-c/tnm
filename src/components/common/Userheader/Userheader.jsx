import { useState, useEffect, useRef } from "react";
import logo from "../../../assets/images/logo/tnmlogo.png";
import {
  FaBars,
  FaTimes,
  FaSearch,
  //   FaLongArrowRight,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaBehance,
} from "react-icons/fa";
import { HiChevronDown } from "react-icons/hi";
import DefaultButton from "../DefaultButton/DefaultButton";

function Userheader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSideMenu = () => setIsSideMenuOpen(!isSideMenuOpen);
  const [isScrolled, setIsScrolled] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const options = ["Tutor", "Student"];
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
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
      className={`sticky top-0 z-40 bg-white py-3 transition-shadow duration-300 ${
        isScrolled ? "shadow-sm" : "shadow-none"
      }`}
    >
      {/* Main Navigation */}
      <nav className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo and Search (Left Side) */}
          <div className="flex items-center space-x-20 w-full md:w-auto">
            <div className="flex items-center">
              <button className="lg:hidden mr-4" onClick={toggleMenu}>
                {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </button>
              <a href="/" className="flex items-center">
                <img src={logo} alt="Logo" className="h-10 md:h-20" />
              </a>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <ul className="flex items-center justify-center space-x-16">
              <li className="text-lg font-medium">Home</li>
              <li className="text-lg font-medium">About</li>
              {/* Demos Dropdown */}
              <li className="group relative">
                <li className="flex items-center hover:text-blue-500 cursor-pointer text-lg font-medium">
                  Find Tutors
                </li>
                <div className="fixed right-0 mt-0 w-[95vw] max-w-[78.125vw] bg-white shadow-lg rounded-md p-4 hidden group-hover:block z-50 mr-10">
                  <div className="grid grid-cols-4 gap-6">
                    {/* Column 1 */}
                    <div>
                      <h4 className="font-bold mb-3 text-gray-800">
                       Lorem, ipsum.
                      </h4>
                      <ul className="space-y-3">
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                           Lorem, ipsum.
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Lorem, ipsum.
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Lorem, ipsum.
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Lorem, ipsum.
                          </a>
                        </li>
                      </ul>
                    </div>

                    {/* Column 2 */}
                    <div>
                      <h4 className="font-bold mb-3 text-gray-800">
                       Lorem, ipsum.
                      </h4>
                      <ul className="space-y-3">
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                           Lorem, ipsum.
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Lorem, ipsum.
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Lorem, ipsum.
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Lorem, ipsum.
                          </a>
                        </li>
                      </ul>
                    </div>

                    {/* Column 3 */}
                   <div>
                      <h4 className="font-bold mb-3 text-gray-800">
                       Lorem, ipsum.
                      </h4>
                      <ul className="space-y-3">
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                           Lorem, ipsum.
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Lorem, ipsum.
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Lorem, ipsum.
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Lorem, ipsum.
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold mb-3 text-gray-800">
                       Lorem, ipsum.
                      </h4>
                      <ul className="space-y-3">
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                           Lorem, ipsum.
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Lorem, ipsum.
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Lorem, ipsum.
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Lorem, ipsum.
                          </a>
                        </li>
                      </ul>
                    </div>
                   <div>
                      <h4 className="font-bold mb-3 text-gray-800">
                       Lorem, ipsum.
                      </h4>
                      <ul className="space-y-3">
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                           Lorem, ipsum.
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Lorem, ipsum.
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Lorem, ipsum.
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Lorem, ipsum.
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold mb-3 text-gray-800">
                       Lorem, ipsum.
                      </h4>
                      <ul className="space-y-3">
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                           Lorem, ipsum.
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Lorem, ipsum.
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Lorem, ipsum.
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Lorem, ipsum.
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold mb-3 text-gray-800">
                       Lorem, ipsum.
                      </h4>
                      <ul className="space-y-3">
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                           Lorem, ipsum.
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Lorem, ipsum.
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Lorem, ipsum.
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Lorem, ipsum.
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li className="text-lg font-medium">Contact</li>
            </ul>
          </div>

          <div className="flex">
            <div className="relative w-36 lg:w-40" ref={dropdownRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-3 py-2 border-2 border-primary rounded-md bg-white text-left cursor-pointer flex justify-between items-center text-xs xl:text-md"
              >
                Login/Register
                <HiChevronDown
                  className={`w-5 h-5 ml-2 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              {isOpen && (
                <ul className="absolute w-full mt-1 border-2 border-primary rounded-md bg-white shadow-lg">
                  {options.map((option) => (
                    <li
                      key={option}
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      className="px-3 py-2 hover:bg-primary hover:text-white cursor-pointer text-xs xl:text-md"
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Side Menu Toggle */}
            <button
              className="ml-10 p-2 hover:text-blue-500 hidden lg:block"
              onClick={toggleSideMenu}
            >
              <div className="flex flex-col space-y-1">
                <span className="w-7 h-0.5 bg-current"></span>
                <span className="w-7 h-0.5 bg-current"></span>
                <span className="w-7 h-0.5 bg-current"></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div>
          {isMenuOpen && (
            <div className="fixed inset-y-0 left-0 w-[60%] bg-white shadow-lg z-30 transform transition-transform duration-300 ease-in-out translate-x-0">
              <div className="p-6 h-full overflow-y-auto">
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                  onClick={toggleMenu}
                >
                  <FaTimes size={20} />
                </button>

                <div className="mb-8">
                  <div className="logo mb-6">
                    <img src={logo} alt="Logo" className="h-16" />
                  </div>
                </div>

                <div className="mb-8">
                  <ul className="space-y-4">
                    <li className="text-lg font-medium">Home</li>
                    <li className="text-lg font-medium">About</li>
                    <li className="text-lg font-medium">Contact</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-bold mb-4">Follow Us</h4>
                  <ul className="flex space-x-4">
                    <li>
                      <a href="#" className="text-gray-600 hover:text-blue-500">
                        <FaFacebookF size={18} />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-600 hover:text-blue-500">
                        <FaTwitter size={18} />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-600 hover:text-blue-500">
                        <FaLinkedinIn size={18} />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-600 hover:text-blue-500">
                        <FaBehance size={18} />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Side Menu */}
      {isSideMenuOpen && (
        <div className="fixed inset-y-0 right-0 w-[24vw] bg-white shadow-lg z-30 transform transition-transform duration-300 ease-in-out translate-x-0">
          <div className="p-6 h-full overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={toggleSideMenu}
            >
              <FaTimes size={20} />
            </button>

            <div className="mb-8">
              <div className="logo mb-6">
                <img src={logo} alt="Logo" className="h-16" />
              </div>
              <p className="text-gray-600 mb-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                natus vel blanditiis quisquam nam nobis!
              </p>
            </div>

            <div className="mb-8">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="text-gray-700">Kannur, Kerala</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-700">example@gmail.com</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div>
                    <p className="text-sm text-gray-500">Contact</p>
                    <p className="text-gray-700">+12-34-5678-9101</p>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Follow Us</h4>
              <ul className="flex space-x-4">
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-500">
                    <FaFacebookF size={18} />
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-500">
                    <FaTwitter size={18} />
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-500">
                    <FaLinkedinIn size={18} />
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-500">
                    <FaBehance size={18} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Overlay */}
      {(isMenuOpen || isSideMenuOpen) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => {
            if (isMenuOpen) setIsMenuOpen(false);
            if (isSideMenuOpen) setIsSideMenuOpen(false);
          }}
        ></div>
      )}
    </header>
  );
}

export default Userheader;
