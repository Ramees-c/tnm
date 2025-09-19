import { X, Upload, ImageIcon } from "lucide-react";
import { useState, useEffect, useRef, use } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import FormInput from "../FormInput/FormInput";
import { useAuth } from "../../../Context/userAuthContext";
import { MEDIA_URL } from "../../../API/API";

function ProfileEditPopup({ isOpen, onClose, initialData, onSubmit }) {

  const { userDetails } = useAuth();

  console.log(userDetails, "userDetails in profile edit popup");

  const [formData, setFormData] = useState(initialData || {});
  const [errors, setErrors] = useState({});
  const [profileImage, setProfileImage] = useState(
    initialData?.profileImage || null
  );

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
      setFormData((prev) => ({ ...prev, profileImage: file }));
    }
  };

  const removeImage = () => {
    setProfileImage(null);
    setFormData((prev) => ({ ...prev, profileImage: null }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.full_name) {
      setErrors({ full_name: "Name is required" });
      return;
    }
    onSubmit({ ...formData, profileImage });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="bg-white w-full max-w-3xl rounded-md shadow-lg p-4 sm:p-6 relative lg:max-h-[90vh] xl:max-h-[100vh] overflow-y-auto scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <h2 className="text-lg sm:text-xl font-bold text-gray-700 mb-4">
          Edit Profile
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Profile Image Upload */}
          <div className="flex flex-col items-center mb-6">
            <label
              htmlFor="profilePhoto"
              className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
            >
              {profileImage ? (
                <img
                  src={userDetails?.role === "student"
                    ? `${MEDIA_URL}${userDetails?.profile_photo}`
                    : `${MEDIA_URL}${userDetails?.profile_image}`}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <FormInput
                name="full_name"
                placeholder="Full Name"
                value={userDetails.full_name || ""}
                onChange={handleChange}
                hasError={errors.full_name}
              />
              {errors.full_name && (
                <p className="text-red-500 text-xs mt-1">{errors.full_name}</p>
              )}
            </div>

            <div>
              <FormInput
                type="email"
                name="email"
                placeholder="Email"
                value={userDetails.email || ""}
                onChange={handleChange}
                hasError={errors.email}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <FormInput
                    type="tel"
                    name="mobile_number"
                    value={userDetails.mobile_number}
                    onChange={handleChange}
                    placeholder="Phone Number *"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 🔹 Reset Password Section */}
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-md sm:text-lg font-semibold text-gray-700 mb-3">
              Reset Password
            </h3>

            <div className="space-y-4">
              {/* Current Password */}
              <div className="relative">
                <FormInput
                  type={showPasswords.current ? "text" : "password"}
                  name="currentPassword"
                  placeholder="Current Password"
                  value={formData.currentPassword || ""}
                  onChange={handleChange}
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
                <FormInput
                  type={showPasswords.new ? "text" : "password"}
                  name="newPassword"
                  placeholder="New Password"
                  value={formData.newPassword || ""}
                  onChange={handleChange}
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
                <FormInput
                  type={showPasswords.confirm ? "text" : "password"}
                  name="confirmNewPassword"
                  placeholder="Confirm New Password"
                  value={formData.confirmNewPassword || ""}
                  onChange={handleChange}
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
    </div>
  );
}

export default ProfileEditPopup;
