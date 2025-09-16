import React, { useState, useRef } from "react";
import DashboardSidebar from "../../../components/studentAndTutor/DashboardSidebar/DashboardSidebar";
import { Menu, Upload, ImageIcon, X } from "lucide-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import FormInput from "../../../components/studentAndTutor/FormInput/FormInput";

function TutorEditPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    countryCode: "91",
    mobile_number: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // ✅ Validation & submit logic here
    console.log("Submitted Data:", formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setProfileImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed lg:relative z-20 inset-y-0 left-0 w-72 bg-white shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300`}
      >
        <DashboardSidebar
          role="tutor"
          open={sidebarOpen}
          setOpen={setSidebarOpen}
        />
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 w-full p-4 sm:p-6 transition-all duration-300">
        <div className="max-w-6xl mx-auto flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg shadow bg-white hover:bg-gray-100 transition"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex-1">
              Edit Profile
            </h1>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5 bg-white p-6 rounded-xl shadow"
          >
            {/* Profile Image Upload */}
            <div className="flex flex-col items-center mb-6">
              <label
                htmlFor="profilePhoto"
                className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
              >
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Preview"
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <ImageIcon className="w-8 h-8 sm:w-10 sm:h-10 mb-1 text-green-600" />
                    <p className="text-xs sm:text-sm">Edit Photo</p>
                  </div>
                )}

                <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-green-600 p-1.5 sm:p-2 rounded-full text-white shadow-md">
                  <Upload className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>

                <input
                  id="profilePhoto"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                />
              </label>

              {profileImage && (
                <button
                  type="button"
                  onClick={removeImage}
                  className="mt-2 flex items-center gap-1 text-xs sm:text-sm text-red-600 hover:text-red-700 transition"
                >
                  <X className="w-3 h-3 sm:w-4 sm:h-4" /> Remove
                </button>
              )}
            </div>

            {/* Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div>
                <FormInput
                  name="full_name"
                  placeholder="Full Name"
                  value={formData.full_name || ""}
                  onChange={handleChange}
                  hasError={errors.full_name}
                />
                {errors.full_name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.full_name}
                  </p>
                )}
              </div>

              <div>
                <FormInput
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  hasError={errors.email}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <div className="flex gap-2">
                  <div className="w-24 sm:w-28">
                    <PhoneInput
                      country={"in"}
                      value={formData.countryCode}
                      onChange={(value, country) => {
                        setFormData({
                          ...formData,
                          countryCode: country.dialCode,
                        });
                      }}
                      inputClass="!w-full !h-10 sm:!h-11 !text-gray-700 !rounded-md !outline-none !border !border-gray-300"
                      buttonClass="!h-10 sm:!h-11 !rounded-md !border !border-gray-300 !bg-white"
                      dropdownClass="!bg-white !text-gray-700 !rounded-md !border-gray-200 !shadow-md"
                      enableSearch={true}
                      inputProps={{ name: "countryCode" }}
                    />
                  </div>

                  <div className="flex-1">
                    <input
                      type="tel"
                      name="mobile_number"
                      value={formData.mobile_number}
                      onChange={handleChange}
                      placeholder="Phone Number *"
                      className="w-full py-2 px-3 sm:px-4 border border-gray-300 rounded-md placeholder-gray-400 outline-none focus:ring-0 focus:border-green-500 text-sm sm:text-base"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Phone */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex gap-3">
                  <div className="w-24 sm:w-28">
                    <PhoneInput
                      country={"in"}
                      value={formData.countryCode}
                      onChange={(value, country) => {
                        setFormData({
                          ...formData,
                          countryCode: country.dialCode,
                        });
                      }}
                      inputClass="!w-full !h-10 sm:!h-11 !text-gray-700 !rounded-md !outline-none !border !border-gray-300"
                      buttonClass="!h-10 sm:!h-11 !rounded-md !border !border-gray-300 !bg-white"
                      dropdownClass="!bg-white !text-gray-700 !rounded-md !border-gray-200 !shadow-md"
                      enableSearch={true}
                      inputProps={{ name: "countryCode" }}
                    />
                  </div>

                  <div className="flex-1">
                    <input
                      type="tel"
                      name="mobile_number"
                      value={formData.mobile_number}
                      onChange={handleChange}
                      placeholder="Phone Number *"
                      className="w-full py-2 px-3 sm:px-4 border border-gray-300 rounded-md placeholder-gray-400 outline-none focus:ring-0 focus:border-green-500 text-sm sm:text-base"
                    />
                  </div>
                </div>
              </div>
            </div> */}

            {/* Reset Password Section */}
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-md sm:text-lg font-semibold text-gray-700 mb-3">
                Reset Password
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Current Password */}
                <div className="relative">
                  <input
                    type={showPasswords.current ? "text" : "password"}
                    name="currentPassword"
                    placeholder="Current Password"
                    value={formData.currentPassword || ""}
                    onChange={handleChange}
                    className="w-full py-2 px-3 sm:px-4 border border-gray-300 rounded-md placeholder-gray-400 outline-none focus:ring-0 focus:border-green-500 text-sm sm:text-base"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("current")}
                    className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                  >
                    {showPasswords.current ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {/* New Password */}
                <div className="relative">
                  <input
                    type={showPasswords.new ? "text" : "password"}
                    name="newPassword"
                    placeholder="New Password"
                    value={formData.newPassword || ""}
                    onChange={handleChange}
                    className="w-full py-2 px-3 sm:px-4 border border-gray-300 rounded-md placeholder-gray-400 outline-none focus:ring-0 focus:border-green-500 text-sm sm:text-base"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("new")}
                    className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                  >
                    {showPasswords.new ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {/* Confirm New Password */}
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? "text" : "password"}
                    name="confirmNewPassword"
                    placeholder="Confirm New Password"
                    value={formData.confirmNewPassword || ""}
                    onChange={handleChange}
                    className="w-full py-2 px-3 sm:px-4 border border-gray-300 rounded-md placeholder-gray-400 outline-none focus:ring-0 focus:border-green-500 text-sm sm:text-base"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirm")}
                    className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                  >
                    {showPasswords.confirm ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2.5 sm:py-3 rounded-lg font-medium text-white bg-gradient-to-r from-green-500 to-green-600 shadow-md hover:shadow-lg transition text-sm sm:text-base"
            >
              Save Changes
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default TutorEditPage;
