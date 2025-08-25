import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaXTwitter,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa6";

import DesignedLogo from "../../../assets/images/copyright-logo.png";

import Footerlogo from "../../../assets/images/logo/tnmlogo.png";
import DefaultButton from "../DefaultButton/DefaultButton";

function Footer() {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };
  return (
    <footer className="bg-primary/75 text-white">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-300">
        {/* Logo & About */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img
              src={Footerlogo}
              alt="Learna Logo"
              className="w-24 object-contain"
            />
          </div>
          <p className="text-sm mb-6">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Dignissimos repudiandae voluptatibus quia ullam magnam voluptatum.
          </p>
          <div className="flex gap-3">
            <a
              href="#"
              className="bg-primary text-white p-2 rounded-full hover:bg-secondary transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="bg-primary text-white p-2 rounded-full hover:bg-secondary transition"
            >
              <FaXTwitter />
            </a>
            <a
              href="#"
              className="bg-primary text-white p-2 rounded-full hover:bg-secondary transition"
            >
              <FaYoutube />
            </a>
            <a
              href="#"
              className="bg-primary text-white p-2 rounded-full hover:bg-secondary transition"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-4 text-lg">Quick Links</h3>
          <ul className="space-y-2 text-md">
            <li>
              <Link
                to="/"
                className="hover:text-primary hover:font-bold"
                onClick={handleClick}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-primary hover:font-bold"
                onClick={handleClick}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className="hover:text-primary hover:font-bold"
                onClick={handleClick}
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                to="/testimonial"
                className="hover:text-primary hover:font-bold"
                onClick={handleClick}
              >
                Testimonials
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-primary hover:font-bold"
                onClick={handleClick}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4 text-lg">Resources</h3>
          <ul className="space-y-2 text-md">
            <li>
              <Link to="/faq" className="hover:text-primary hover:font-bold"  onClick={handleClick}>
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-primary hover:font-bold"  onClick={handleClick}>
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link
                to="/refundPolicy"
                className="hover:text-primary hover:font-bold"  onClick={handleClick}
              >
                Refund Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-bold mb-4 text-lg">Join Our Newsletter</h3>
          <p className="text-sm mb-4">
            Join our subscribers list to get the latest news and special offers.
          </p>
          <form className="flex flex-col mb-3">
            <input
              type="email"
              placeholder="Your Email"
              className="flex-1 p-2 rounded-md border border-gray-300 focus:outline-none text-black mb-3"
            />
            <DefaultButton buttonText="Submit" buttonSmall={true} />
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-center text-sm">
        <p className="text-xs md:text-sm lg:text-md">
          © Copyright {new Date().getFullYear()}. All Rights Reserved by
          <span className="font-bold text-primary"> TUTOR NEAR ME</span>
        </p>
        <div className="flex gap-3 mt-3 md:mt-0">
          <p className="text-xs md:text-sm lg:text-md">Design By</p>
          <a
            href="http://www.dhanwis.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={DesignedLogo}
              alt="Dhanwis TechInfo Solutions"
              className="w-16 lg:w-24"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
