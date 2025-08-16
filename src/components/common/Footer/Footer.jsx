import React from "react";
import {
  FaFacebookF,
  FaXTwitter,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa6";

import Footerlogo from "../../../assets/images/logo/tnmlogo.png";
import DefaultButton from "../DefaultButton/DefaultButton";

function Footer() {
  return (
    <footer className="bg-primary/60 text-white">
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
           Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos repudiandae voluptatibus quia ullam magnam voluptatum.
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

        {/* About Links */}
        <div>
          <h3 className="font-bold mb-4">About</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-secondary">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-secondary">
                Courses
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-secondary">
                News & Blogs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-secondary">
                Become a Teacher
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold mb-4">Quick Link</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-blue-600">
                Live Workshop
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Free Courses
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Addmition
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Request A Demo
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-bold mb-4">Join Our Newsletter</h3>
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
        <p>
          © Copyright 2025. All Rights Reserved by{" "}
          <span className="font-bold">TNM</span>
        </p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-blue-600">
            Terms
          </a>
          <a href="#" className="hover:text-blue-600">
            Privacy
          </a>
          <a href="#" className="hover:text-blue-600">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
