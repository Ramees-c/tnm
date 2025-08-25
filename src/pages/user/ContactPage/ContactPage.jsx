import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPaperPlane,
  FaClock,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import PageHeader from "../../../components/common/PageHeader/PageHeader";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^[0-9+\-()\s]*$/.test(formData.phone)) {
      newErrors.phone =
        "Phone number can only contain numbers and special characters (+, -, (, ), space)";
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
    if (errors.phone) setErrors({ ...errors, phone: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      console.log("Form submitted:", formData);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="w-full min-h-screen">
      <PageHeader
        title="Contact Us"
        headerBg="https://images.unsplash.com/photo-1423784346385-c1d4dac9893a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAwfHxjb250YWN0fGVufDB8fDB8fHww"
      />
      

      <div className="container mx-auto px-4 py-12">
        {/* <div className="bg-gradient-to-br from-green-500 via-green-600 to-green-700 rounded-lg p-10 text-center text-white relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/10 rounded-full"></div>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Get in Touch
          </h1>
          <p className="text-sm md:text-lg opacity-90 mx-auto">
            We'd love to hear from you. Let's start a conversation.
          </p>
        </div>
      </div> */}
        {showSuccess && (
          <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg flex items-center" data-aos="fade-up">
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Your message has been sent successfully!</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" data-aos="fade-up">
          {/* Info */}
          <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">
              Contact Information
            </h2>
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-lg text-green-600">
                <FaPhoneAlt />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Phone</h3>
                <p className="text-gray-600">+1 (234) 567-8901</p>
                <p className="text-gray-600">+1 (234) 567-8902</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-lg text-green-600">
                <FaMapMarkerAlt />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Address</h3>
                <p className="text-gray-600">
                  625 5th Street, The Grand Avenue
                  <br />
                  2nd Block, New York City
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-lg text-green-600">
                <FaEnvelope />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Email</h3>
                <p className="text-gray-600">info@site.com</p>
                <p className="text-gray-600">support@site.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-lg text-green-600">
                <FaClock />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Business Hours</h3>
                <p className="text-gray-600">Mon-Fri: 9AM - 5PM</p>
                <p className="text-gray-600">Sat: 10AM - 3PM</p>
              </div>
            </div>

            {/* Social */}
            <div className="pt-6 border-t">
              <h3 className="font-semibold text-gray-800 mb-4">Follow Us</h3>
              <div className="flex space-x-3">
                {[FaFacebook, FaTwitter, FaLinkedin, FaInstagram].map(
                  (Icon, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="bg-green-100 text-green-600 p-3 rounded-full hover:bg-green-600 hover:text-white transition"
                    >
                      <Icon />
                    </a>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Send us a message
            </h2>
            <p className="text-gray-600 mb-6">
              Fill out the form below and we'll get back to you as soon as
              possible.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } rounded-lg outline-none border focus:ring-0 focus:border-primary`}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-lg outline-none border focus:ring-0 focus:border-primary`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone *
                </label>
                <PhoneInput
                  country={"in"} // Default India
                  enableSearch={true} // Optional: allow search
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  inputProps={{
                    name: "phone",
                    required: true,
                    className: `w-full px-12 py-3 border ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    } rounded-lg outline-none border focus:ring-0 focus:border-primary`,
                    placeholder: "Your Contact Number",
                  }}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tell us about your project *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className={`w-full px-4 py-3 border ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  } rounded-lg outline-none border focus:ring-0 focus:border-primary`}
                  placeholder="Describe your project..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                <FaPaperPlane className="text-sm" />
              </button>
            </form>
          </div>
        </div>

        {/* Map */}
        <div className="mt-12" data-aos="fade-up">
          <div className="rounded-xl shadow-lg overflow-hidden">
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.891414872599!2d-74.0059416845949!3d40.712775779330!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a3168f9a1f5%3A0x67bbf2bb89b34d1c!2sNew%20York%2C%20USA!5e0!3m2!1sen!2sin!4v1688200000000!5m2!1sen!2sin"
              width="100%"
              height="400"
              loading="lazy"
              className=""
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
