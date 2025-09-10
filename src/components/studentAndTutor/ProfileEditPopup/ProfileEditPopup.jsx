import { X, Upload, ImageIcon } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import FormInput from "../FormInput/FormInput";

function ProfileEditPopup({ isOpen, onClose, initialData, onSubmit }) {
  const [formData, setFormData] = useState(initialData || {});
  const [errors, setErrors] = useState({});
  const [profileImage, setProfileImage] = useState(
    initialData?.profileImage || null
  );

  const fileInputRef = useRef(null);

  // 🔹 Disable background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

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

  // 🔹 Handle Image Upload
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={(e) => e.stopPropagation()} // stop background click
    >
      <div
        className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <h2 className="text-xl font-bold text-gray-700 mb-4">Edit Profile</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Profile Image Upload */}
          <div className="flex flex-col items-center mb-6">
            <label
              htmlFor="profilePhoto"
              className="relative w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
            >
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Preview"
                  className="w-32 h-32 rounded-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-500">
                  <ImageIcon className="w-10 h-10 mb-1 text-green-600" />
                  <p className="text-xs">Edit Photo</p>
                </div>
              )}

              {/* Upload button overlay */}
              <div className="absolute bottom-2 right-2 bg-green-600 p-2 rounded-full text-white shadow-md">
                <Upload className="w-4 h-4" />
              </div>

              {/* Hidden File Input */}
              <input
                id="profilePhoto"
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageUpload}
              />
            </label>

            {/* Remove Button */}
            {profileImage && (
              <button
                type="button"
                onClick={removeImage}
                className="mt-2 flex items-center gap-1 text-sm text-red-600 hover:text-red-700 transition"
              >
                <X className="w-4 h-4" /> Remove
              </button>
            )}
          </div>
          {/* Name, Email & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <FormInput
                name="full_name"
                placeholder="Full Name"
                value={formData.full_name || ""}
                onChange={handleChange}
                hasError={errors.full_name}
              />
              {errors.full_name && (
                <p className="text-red-500 text-xs mt-1">{errors.full_name}</p>
              )}
            </div>

            {/* Email */}
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

           
          </div>

          {/* City & State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {/* Phone (Country Code + Number) */}
            <div >
              <div className="flex gap-3">
                {/* Country Code */}
                <div className="w-28" >
                  <PhoneInput
                    country={"in"}
                    value={formData.countryCode}
                    onChange={(value, country) => {
                      setFormData({
                        ...formData,
                        countryCode: country.dialCode,
                      });
                     
                    }}
                    inputClass={`!w-full !h-11 !text-gray-700 !rounded-md !outline-none !border ${
                      errors.countryCode
                        ? "!border-red-500"
                        : "!border-gray-300"
                    } focus:!ring-0 focus:!border-green-500`}
                    buttonClass={`!h-12 !rounded-md !border ${
                      errors.countryCode
                        ? "!border-red-500"
                        : "!border-gray-300"
                    } !bg-white`}
                    dropdownClass="!bg-white !text-gray-700 !rounded-md !border-gray-200 !shadow-md"
                    enableSearch={true}
                    inputProps={{
                      name: "countryCode",
                      
                    }}
                  />
                  {errors.countryCode && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.countryCode}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="flex-1">
                  <input
                    type="tel"
                    name="mobile_number"
                    value={formData.mobile_number}
                    placeholder="Phone Number *"
                    className={`w-full py-2 px-4 border ${
                      errors.phoneNumber ? "border-red-500" : "border-gray-300"
                    } rounded-md placeholder-gray-400 outline-none focus:ring-0 focus:border-green-500`}
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>
              </div>
            </div>
             <div className="relative" ref={errorRefs.password}>
                <FormInput
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password *"
                  value={formData.password}
                  innerRef={errorRefs.password}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3.5 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              name="description"
              placeholder="Write something about yourself..."
              value={formData.description || ""}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-md outline-none focus:ring-0 focus:border-green-500 transition"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-medium text-white bg-gradient-to-r from-green-500 to-green-600 shadow-md hover:shadow-lg transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileEditPopup;
