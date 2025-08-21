import React from "react";
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

function ContactPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="bg-secondary/20 py-12 text-center mb-5">
        <h1 className="text-2xl md:text-4xl font-bold">Get in Touch</h1>
      </div>

      <div className="container">
        {/* Contact Form */}
        <div className="flex justify-center -mt-12 px-4">
          <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-4">Send us a message</h2>
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                className="border-b border-gray-300 p-2 outline-none focus:ring-0 focus:border-secondary"
              />
              <input
                type="email"
                placeholder="Email*"
                className="border-b border-gray-300 p-2 outline-none focus:ring-0 focus:border-secondary"
              />
              <input
                type="tel"
                placeholder="Phone"
                className="border-b border-gray-300 p-2 outline-none focus:ring-0 focus:border-secondary sm:col-span-2"
              />
              <textarea
                placeholder="Tell us about Project*"
                rows="4"
                className="border-b border-gray-300 p-2 outline-none focus:ring-0 focus:border-secondary sm:col-span-2"
              ></textarea>
              <button
                type="submit"
                className="bg-green-500 text-white px-5 py-2 rounded-md hover:bg-green-600 transition sm:col-span-2"
              >
                Get In Touch
              </button>
            </form>
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-center mt-16 px-4">
          <span className="text-xs md:text-sm bg-green-50 text-green-600 px-3 py-1 rounded-md uppercase">
            Have Questions?
          </span>
          <h2 className="text-2xl md:text-4xl font-bold mt-3">Contact Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {/* Card 1 */}
            <div className="border rounded-lg p-6 shadow-sm">
              <FaPhoneAlt className="text-green-500 text-2xl mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Contact Number</h3>
              <p className="text-gray-600">+12345678901</p>
              <p className="text-gray-600">+1234567892</p>
            </div>

            {/* Card 2 */}
            <div className="border rounded-lg p-6 shadow-sm">
              <FaMapMarkerAlt className="text-green-500 text-2xl mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Our Location</h3>
              <p className="text-gray-600">
                625 5th Street, The Grand Avenue 2nd Block, New York City
              </p>
            </div>

            {/* Card 3 */}
            <div className="border rounded-lg p-6 shadow-sm">
              <FaEnvelope className="text-green-500 text-2xl mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Official Email</h3>
              <p className="text-gray-600">info@site.com</p>
              <p className="text-gray-600">support@site.com</p>
            </div>
          </div>
        </div>

        {/* Google Map */}
        <div className="my-12">
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.891414872599!2d-74.0059416845949!3d40.712775779330!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a3168f9a1f5%3A0x67bbf2bb89b34d1c!2sNew%20York%2C%20USA!5e0!3m2!1sen!2sin!4v1688200000000!5m2!1sen!2sin"
            width="100%"
            height="350"
            allowFullScreen=""
            loading="lazy"
            className="border-0 w-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
