import React from "react";

import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

import {
  FaFacebookF,
  FaXTwitter,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa6";

function TopHeader() {
  return (
    <div className="bg-primary text-white hidden lg:flex animate-fade-in">
      <div className="container py-3">
        <div className="flex items-center justify-between">
          <div className="flex justify-center items-center">
            <div className="flex items-center justify-center gap-2 ">
              <FaMapMarkerAlt className="text-lg text-secondary" />
              <p className="text-sm">123 Street, New York, USA</p>
            </div>
            <div className="ml-10 flex items-center justify-center gap-2">
              <FaEnvelope className="text-lg text-secondary" />

              <p className="text-sm">info@example.com</p>
            </div>
            <div className="ml-10 flex items-center justify-center gap-2">
              <FaPhoneAlt className="text-lg text-secondary" />

              <p className="text-sm">+012 345 67890</p>
            </div>
           
          </div>

           <div className="flex gap-3 ">
              <a
                href="#"
                className="bg-customBlack text-white p-2 rounded-full hover:bg-secondary transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="bg-customBlack text-white p-2 rounded-full hover:bg-secondary transition"
              >
                <FaXTwitter />
              </a>
              <a
                href="#"
                className="bg-customBlack text-white p-2 rounded-full hover:bg-secondary transition"
              >
                <FaYoutube />
              </a>
              <a
                href="#"
                className="bg-customBlack text-white p-2 rounded-full hover:bg-secondary transition"
              >
                <FaLinkedinIn />
              </a>
            </div>
        </div>
      </div>
    </div>
  );
}

export default TopHeader;
