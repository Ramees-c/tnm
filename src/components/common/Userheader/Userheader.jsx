import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/images/logo/tnmlogo.png";
import { FaBars } from "react-icons/fa";
import DefaultButton from "../DefaultButton/DefaultButton";
import MobileSidebar from "../MobileSidebar/MobileSidebar";
import { useAuth } from "../../../Context/userAuthContext";

function Userheader() {
  const { userDetails } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
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

  return (
    <div>
      <header
        className={`sticky top-0 left-0 w-full  bg-white py-3 transition-transform duration-300 shadow-sm ${
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
                  <FaBars size={25} />
                </button>
                <NavLink to="/" className="flex items-center">
                  <img src={logo} alt="Logo" className="h-14 md:h-20" />
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

                <li>
                  <NavLink
                    to="/allCategories"
                    className={({ isActive }) =>
                      `text-sm xl:text-lg font-montserrat hover:text-primary duration-300 hover:font-bold ${
                        isActive
                          ? "text-primary font-bold"
                          : "text-gray-700 font-medium"
                      }`
                    }
                    onClick={handleClick}
                  >
                    Subjects
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

            {/* Login/Register OR Dashboard Button */}
            <div className="flex">
              {userDetails && userDetails.role ? (
                // If userDetails exists and has a valid role, show Dashboard
                <Link
                  to={
                    userDetails.role === "tutor"
                      ? "/tutorDashboard"
                      : userDetails.role === "student"
                      ? "/studentDashboard"
                      : "/" // fallback
                  }
                  onClick={handleClick}
                >
                  <DefaultButton buttonText="Dashboard" />
                </Link>
              ) : (
                // If userDetails is empty/null/invalid, show Login/Register
                <Link to="/register" onClick={handleClick}>
                  <DefaultButton buttonText="Login/Register" />
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Sidebar */}
        </nav>
      </header>
      <div>
        <MobileSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </div>
    </div>
  );
}

export default Userheader;
