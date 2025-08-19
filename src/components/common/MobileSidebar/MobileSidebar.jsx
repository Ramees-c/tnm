import { FiHome, FiUser, FiBook, FiStar, FiMail, FiX } from "react-icons/fi";

import logo from "../../../assets/images/logo/tnmlogo.png"

const MobileSidebar = ({ isOpen, onClose }) => {
  // Navigation items with React Icons
  const navItems = [
    { name: "Home", icon: <FiHome className="text-primary" /> },
    { name: "About", icon: <FiUser className="text-primary" /> },
    { name: "Blogs", icon: <FiBook className="text-primary" /> },
    { name: "Testimonials", icon: <FiStar className="text-primary" /> },
    { name: "Contact", icon: <FiMail className="text-primary" /> },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="flex items-center">
              <img
                src={logo}
                alt="Company Logo"
                className="w-16 object-contain"
              />
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <FiX size={25} className="text-black" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-4">
          <ul className="space-y-1">
            {navItems.map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="flex items-center p-3 rounded-md hover:bg-secondary/60 transition-colors duration-200 group"
                >
                  <span className="group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <span className="ml-3 font-medium text-gray-700 group-hover:text-primary">
                    {item.name}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default MobileSidebar;
