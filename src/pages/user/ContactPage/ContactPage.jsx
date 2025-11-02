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
import { FaX } from "react-icons/fa6";
import API_BASE from "../../../API/API";


import pageBanner from "../../../assets/images/page_banner/contact.png"

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        ...formData,
        phone: formData.phone.startsWith("+")
          ? formData.phone
          : `+${formData.phone}`,
      };

      const response = await fetch(`${API_BASE}/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data = {};
      try {
        data = await response.json();
      } catch (err) {
        // If response is empty or non-JSON
        data = {};
      }

      if (response.ok) {
        // Success
        setFormData({ name: "", email: "", phone: "", message: "" });
        setErrors({});
        setShowSuccess(true);

        // Hide after 3 seconds
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        // Backend validation errors
        if (data) {
          const backendErrors = {};
          for (let key in data) {
            backendErrors[key] = Array.isArray(data[key])
              ? data[key].join(" ")
              : data[key];
          }
          setErrors(backendErrors);
        } else {
          alert("Something went wrong. Please try again later.");
        }
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen">
      <PageHeader
        title="Contact Us"
        headerBg={pageBanner}
      />

      <div className="container mx-auto px-4 py-12">
        {showSuccess && (
          <div className="fixed top-4 right-4 z-50 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md shadow-lg flex items-center">
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

        <div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          data-aos="fade-up"
        >
          {/* Info */}
          <div className="bg-white rounded-md shadow-lg p-5 sm:p-8 space-y-6">
            <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold text-gray-800 border-b pb-4">
              Contact Information
            </h2>
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-lg text-green-600">
                <FaPhoneAlt />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Phone</h3>
                <p className="text-sm sm:text-base">
                  <a
                    href="tel:+916282228560"
                    className="text-gray-600 hover:text-green-600"
                  >
                    +91 6282 2285 60
                  </a>
                </p>
                <p className="text-sm sm:text-base">
                  <a
                    href="tel:+918590228560"
                    className="text-gray-600 hover:text-green-600"
                  >
                    +91 8590 2285 60
                  </a>
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-lg text-green-600">
                <FaMapMarkerAlt />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Address</h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Sreerosh Green Acres
                  <br />
                  Mathukoth, Varam
                  <br />
                  Kannur, 670594
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-lg text-green-600">
                <FaEnvelope />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Email</h3>
                <p className="text-sm sm:text-base">
                  <a
                    href="mailto:info@tutor-nearme.com"
                    className="text-gray-600 hover:text-green-600"
                  >
                    info@tutor-nearme.com
                  </a>
                </p>
                <p className="text-sm sm:text-base">
                  <a
                    href="mailto:admin@tutor-nearme.com"
                    className="text-gray-600 hover:text-green-600"
                  >
                    admin@tutor-nearme.com
                  </a>
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-lg text-green-600">
                <FaClock />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Business Hours</h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Available 24/7
                </p>
              </div>
            </div>

            {/* Social */}
            <div className="pt-6 border-t">
              <h3 className="font-semibold text-gray-800 mb-4">Follow Us</h3>
              <div className="flex space-x-3">
                {[
                  {
                    icon: FaFacebook,
                    url: "https://www.facebook.com/profile.php?id=61578906604625&mibextid=ZbWKwL",
                  },
                  { icon: FaX, url: "#" },
                  {
                    icon: FaLinkedin,
                    url: "https://www.linkedin.com/in/tnm-network-tutor-near-me-3b2287376?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
                  },
                  {
                    icon: FaInstagram,
                    url: "https://www.instagram.com/tnm_network?igsh=Nmk0dWNobjZwenA3",
                  },
                ].map(({ icon: Icon, url }, idx) => (
                  <a
                    key={idx}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-100 text-green-600 p-3 rounded-full hover:bg-green-600 hover:text-white transition"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 bg-white rounded-md shadow-lg p-3 sm:p-8">
            <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Send us a message
            </h2>
            <p className="text-gray-600 mb-6 text-xs sm:text-base">
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
                    className={`w-full px-4 py-3 border text-xs sm:text-base rounded-md ${
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
                    className={`w-full px-4 py-3 border text-xs sm:text-base rounded-md ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-lg outline-none border focus:ring-0 focus:border-primary`}
                    placeholder="Enter your email"
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
                  country={"in"}
                  enableSearch={true}
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  countryCodeEditable={false}
                  disableCountryCode={false}
                  inputProps={{
                    name: "phone",
                    required: true,
                    className: `w-full px-12 py-3 border text-xs sm:text-base rounded-md ${
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
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className={`w-full px-4 py-3 border text-xs sm:text-base rounded-md ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  } rounded-lg outline-none border focus:ring-0 focus:border-primary`}
                  placeholder="Type your message here..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r text-sm sm:text-base from-green-500 to-green-600 text-white font-semibold py-3 px-6 rounded-md hover:shadow-lg hover:-translate-y-0.5 transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                <FaPaperPlane className="text-sm" />
              </button>
            </form>
          </div>
        </div>

        {/* Map */}
        <div className="mt-12" data-aos="fade-up">
          <div className="rounded-md shadow-lg overflow-hidden">
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3904.1444572854025!2d75.42630067510531!3d11.895027788330074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba43c98dda4185b%3A0x747ca4b01a657490!2sSreerosh%20Green%20Acres!5e0!3m2!1sen!2sin!4v1760527283104!5m2!1sen!2sin"
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
