import { useState } from "react";
import logo from "../../../assets/images/logo/tnmlogo.png"
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

function Userheader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSideMenu = () => setIsSideMenuOpen(!isSideMenuOpen);

  return (
    <header className="sticky top-0 z-40 bg-white py-5">
      {/* Main Navigation */}
      <nav className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo and Search (Left Side) */}
          <div className="flex items-center space-x-20 w-full md:w-auto">
            <div className="flex items-center">
              <button
                className="md:hidden mr-4"
                onClick={toggleMenu}
              >
                {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </button>
              <a href="/" className="flex items-center">
                <img
                  src={logo}
                  alt="Logo"
                  className="h-10 md:h-20"
                />
              </a>
            </div>

            <form className="hidden md:flex items-center ml-4 relative">
              <input
                type="text"
                placeholder="Search"
                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[300px]"
              />
              <button
                type="submit"
                className=" text-gray-500 absolute right-3"
              >
                <FaSearch />
              </button>
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <ul className="flex space-x-16">
              {/* Demos Dropdown */}
             <li className="group relative">
                <button className="flex items-center px-3 py-2 hover:text-blue-500">
                  Demos
                </button>
                <div className="fixed right-0 mt-0 w-[95vw] max-w-[78.125vw] bg-white shadow-lg rounded-md p-4 hidden group-hover:block z-50 mr-10">
                  <div className="grid grid-cols-4 gap-6">
                    {/* Column 1 */}
                    <div>
                      <h4 className="font-bold mb-3 text-gray-800">
                        Main Layouts
                      </h4>
                      <ul className="space-y-3">
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Main Home
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Digital Course Hub
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Online Academy
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Distance Learning
                          </a>
                        </li>
                      </ul>
                    </div>

                    {/* Column 2 */}
                    <div>
                      <h4 className="font-bold mb-3 text-gray-800">
                        Education Types
                      </h4>
                      <ul className="space-y-3">
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Digital Education
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Remote Training
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            University Classic
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Kindergarten
                          </a>
                        </li>
                      </ul>
                    </div>

                    {/* Column 3 */}
                    <div>
                      <h4 className="font-bold mb-3 text-gray-800">
                        Specialized
                      </h4>
                      <ul className="space-y-3">
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Professional Courses
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Language Learning
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            STEM Education
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Vocational Training
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold mb-3 text-gray-800">
                        Specialized
                      </h4>
                      <ul className="space-y-3">
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Professional Courses
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Language Learning
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            STEM Education
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Vocational Training
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold mb-3 text-gray-800">
                        Specialized
                      </h4>
                      <ul className="space-y-3">
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Professional Courses
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Language Learning
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            STEM Education
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Vocational Training
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold mb-3 text-gray-800">
                        Specialized
                      </h4>
                      <ul className="space-y-3">
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Professional Courses
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Language Learning
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            STEM Education
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Vocational Training
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold mb-3 text-gray-800">
                        Specialized
                      </h4>
                      <ul className="space-y-3">
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Professional Courses
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Language Learning
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            STEM Education
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Vocational Training
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>

              <li className="group relative">
                <button className="flex items-center px-3 py-2 hover:text-blue-500">
                  Demos
                </button>
                <div className="fixed right-0 mt-0 w-[95vw] max-w-[78.125vw] bg-white shadow-lg rounded-md p-4 hidden group-hover:block z-50 mr-10">
                  <div className="grid grid-cols-4 gap-6">
                    {/* Column 1 */}
                    <div>
                      <h4 className="font-bold mb-3 text-gray-800">
                        Main Layouts
                      </h4>
                      <ul className="space-y-3">
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Main Home
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Digital Course Hub
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Online Academy
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Distance Learning
                          </a>
                        </li>
                      </ul>
                    </div>

                    {/* Column 2 */}
                    <div>
                      <h4 className="font-bold mb-3 text-gray-800">
                        Education Types
                      </h4>
                      <ul className="space-y-3">
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Digital Education
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Remote Training
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            University Classic
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Kindergarten
                          </a>
                        </li>
                      </ul>
                    </div>

                    {/* Column 3 */}
                    <div>
                      <h4 className="font-bold mb-3 text-gray-800">
                        Specialized
                      </h4>
                      <ul className="space-y-3">
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Professional Courses
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Language Learning
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            STEM Education
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Vocational Training
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold mb-3 text-gray-800">
                        Specialized
                      </h4>
                      <ul className="space-y-3">
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Professional Courses
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Language Learning
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            STEM Education
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Vocational Training
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold mb-3 text-gray-800">
                        Specialized
                      </h4>
                      <ul className="space-y-3">
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Professional Courses
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Language Learning
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            STEM Education
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Vocational Training
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold mb-3 text-gray-800">
                        Specialized
                      </h4>
                      <ul className="space-y-3">
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Professional Courses
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Language Learning
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            STEM Education
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Vocational Training
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold mb-3 text-gray-800">
                        Specialized
                      </h4>
                      <ul className="space-y-3">
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Professional Courses
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Language Learning
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            STEM Education
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Vocational Training
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li className="group relative">
                <button className="flex items-center px-3 py-2 hover:text-blue-500">
                  Demos
                </button>
                <div className="fixed right-0 mt-0 w-[95vw] max-w-[78.125vw] bg-white shadow-lg rounded-md p-4 hidden group-hover:block z-50 mr-10">
                  <div className="grid grid-cols-4 gap-6">
                    {/* Column 1 */}
                    <div>
                      <h4 className="font-bold mb-3 text-gray-800">
                        Main Layouts
                      </h4>
                      <ul className="space-y-3">
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Main Home
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Digital Course Hub
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Online Academy
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Distance Learning
                          </a>
                        </li>
                      </ul>
                    </div>

                    {/* Column 2 */}
                    <div>
                      <h4 className="font-bold mb-3 text-gray-800">
                        Education Types
                      </h4>
                      <ul className="space-y-3">
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Digital Education
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Remote Training
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            University Classic
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Kindergarten
                          </a>
                        </li>
                      </ul>
                    </div>

                    {/* Column 3 */}
                    <div>
                      <h4 className="font-bold mb-3 text-gray-800">
                        Specialized
                      </h4>
                      <ul className="space-y-3">
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Professional Courses
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Language Learning
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            STEM Education
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Vocational Training
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold mb-3 text-gray-800">
                        Specialized
                      </h4>
                      <ul className="space-y-3">
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Professional Courses
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Language Learning
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            STEM Education
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Vocational Training
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold mb-3 text-gray-800">
                        Specialized
                      </h4>
                      <ul className="space-y-3">
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Professional Courses
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Language Learning
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            STEM Education
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Vocational Training
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold mb-3 text-gray-800">
                        Specialized
                      </h4>
                      <ul className="space-y-3">
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Professional Courses
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Language Learning
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            STEM Education
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Vocational Training
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold mb-3 text-gray-800">
                        Specialized
                      </h4>
                      <ul className="space-y-3">
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Professional Courses
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Language Learning
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            STEM Education
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-blue-500 transition-colors duration-200 block py-1"
                          >
                            Vocational Training
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            </ul>

            {/* Side Menu Toggle */}
            <button
              className="ml-10 p-2 hover:text-blue-500"
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
          <div className="md:hidden shadow-lg rounded-md mt-2 p-4 bg-white">
            <div className="mb-4">
              <form className="flex items-center">
                <input
                  type="text"
                  placeholder="Search"
                  className="flex-1 px-4 py-2 rounded-l border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition"
                >
                  <FaSearch />
                </button>
              </form>
            </div>

            <ul className="space-y-2">
              <li className="border-b border-gray-200 pb-2">
                <button className="w-full text-left py-2 font-medium">
                  Demos
                </button>
                <ul className="pl-4 mt-2 space-y-2">
                  <li>
                    <a href="#" className="block py-1">
                      Main Home
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block py-1">
                      Digital Course Hub
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block py-1">
                      Online Academy
                    </a>
                  </li>
                </ul>
              </li>
              <li className="border-b border-gray-200 pb-2">
                <button className="w-full text-left py-2 font-medium">
                  Courses
                </button>
                <ul className="pl-4 mt-2 space-y-2">
                  <li>
                    <a href="#" className="block py-1">
                      Course Style One
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block py-1">
                      Course Style Two
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block py-1">
                      Course Details
                    </a>
                  </li>
                </ul>
              </li>
              <li className="border-b border-gray-200 pb-2">
                <button className="w-full text-left py-2 font-medium">
                  Pages
                </button>
                <ul className="pl-4 mt-2 space-y-2">
                  <li>
                    <a href="#" className="block py-1">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block py-1">
                      Instructor
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block py-1">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </li>
              <li className="border-b border-gray-200 pb-2">
                <button className="w-full text-left py-2 font-medium">
                  Blog
                </button>
                <ul className="pl-4 mt-2 space-y-2">
                  <li>
                    <a href="#" className="block py-1">
                      Blog Standard
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block py-1">
                      Blog With Sidebar
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#" className="block py-2 font-medium">
                  Contact
                </a>
              </li>
            </ul>
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
                <img
                  src="assets/img/logo-light.png"
                  alt="Logo"
                  className="h-10"
                />
              </div>
              <p className="text-gray-600 mb-6">
                Arrived compass prepare an on as. Reasonable particular on my it
                in sympathize. Size now easy eat hand how.
              </p>
            </div>

            <div className="mb-8">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div>
                    <p className="text-sm text-gray-500">
                      Address
                    </p>
                    <p className="text-gray-700">
                      California, TX 70240
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div>
                    <p className="text-sm text-gray-500">
                      Email
                    </p>
                    <p className="text-gray-700">
                      support@validtheme.com
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div>
                    <p className="text-sm text-gray-500">
                      Contact
                    </p>
                    <p className="text-gray-700">
                      +44-20-7328-4499
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h4 className="text-lg font-bold mb-4">Get Subscribed!</h4>
              <form>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your e-mail"
                    className="flex-1 px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition"
                  >
                    {/* <FaLongArrowRight /> */}
                  </button>
                </div>
              </form>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Follow Us</h4>
              <ul className="flex space-x-4">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-500"
                  >
                    <FaFacebookF size={18} />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-500"
                  >
                    <FaTwitter size={18} />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-500"
                  >
                    <FaLinkedinIn size={18} />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-500"
                  >
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
          className="fixed inset-0 bg-black bg-opacity-50 -z-20 md:z-20"
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
