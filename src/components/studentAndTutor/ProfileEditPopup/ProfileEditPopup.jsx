import { X, Upload, ImageIcon } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import FormInput from "../FormInput/FormInput";
import axios from "axios";
import { MEDIA_URL } from "../../../API/API";
import { useAuth } from "../../../Context/userAuthContext";
import OtpModal from "../../common/OtpModal/OtpModal";
import Loading from "../../common/Loading/Loading";

function ProfileEditPopup({ isOpen, onClose }) {
  const { token, refreshUserDetails } = useAuth();

  const [formData, setFormData] = useState({
    profile_image: null,
    countryCode: "91",
  });
  const [errors, setErrors] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [originalPhone, setOriginalPhone] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");

  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [pendingEmail, setPendingEmail] = useState("");
  const [imageKey, setImageKey] = useState(null);

  const fileInputRef = useRef(null);

  // const imageKey = formData.role === "tutor" ? "profile_image" : "profile_photo";

  // 🔹 Fetch user details when popup opens
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setErrors("")
      fetchUserDetails();
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/profile/edit/`, {
        headers: { Authorization: `Token ${token}` },
      });

      const data = res.data;

      setFormData({
        ...data,
        is_mail_verified: data.is_mail_verified,
        email_verified_initial: data.is_mail_verified,
      });

      setOriginalPhone(data.mobile_number || "");
      setOriginalEmail(data.email || "");

      // Determine image key immediately after fetching API
      const key = data.role === "tutor" ? "profile_image" : "profile_photo";
      setImageKey(key);

      // Set profile image immediately
      setProfileImage(data[key] ? `${MEDIA_URL}${data[key]}` : null);
    } catch (error) {
      console.error("Failed to fetch user details ❌", error);
    } finally {
      setLoading(false);
    }
  };

  // console.log(formData.profile_image);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile_number") {
      const onlyNums = value.replace(/\D/g, "");
      const isSame = onlyNums.trim() === (originalPhone || "").trim();
      setFormData((prev) => ({
        ...prev,
        [name]: onlyNums,
        is_phone_verified: isSame,
      }));
    } else if (name === "email") {
      const trimmedValue = value.trim();
      const isSameAsOriginal = trimmedValue === originalEmail.trim();

      setFormData((prev) => ({
        ...prev,
        [name]: trimmedValue,
        // Always recalc verification status
        is_mail_verified: isSameAsOriginal
          ? prev.email_verified_initial
          : false,
        email_verified_initial:
          prev.email_verified_initial ?? prev.is_mail_verified, // keep initial API value
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setFormData((prev) => ({ ...prev, [imageKey]: null }));
      setProfileImage(null);
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setErrors((prev) => ({
        ...prev,
        [imageKey]: "File size should not exceed 5MB",
      }));
      setFormData((prev) => ({ ...prev, [imageKey]: null }));
      setProfileImage(null);
      e.target.value = "";
      return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      if (img.width <= img.height) {
        setErrors((prev) => ({
          ...prev,
          [imageKey]: "Image must be landscape (width > height)",
        }));
        setFormData((prev) => ({ ...prev, [imageKey]: null }));
        setProfileImage(null);
        e.target.value = "";
      } else {
        setFormData((prev) => ({ ...prev, [imageKey]: file }));
        setErrors((prev) => ({ ...prev, [imageKey]: "" }));
        setProfileImage(img.src);
      }
    };
  };

  const removeImage = () => {
    setProfileImage(null);
    setFormData((prev) => ({ ...prev, [imageKey]: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const requestEmailOtp = async () => {
    if (!formData.email) return;

    try {
      const res = await axios.post(
        "/api/profile/request-change-contact/",
        { email: formData.email }, // send email
        { headers: { Authorization: `Token ${token}` } }
      );

      console.log("OTP sent ✅", res.data);
      setPendingEmail(formData.email);
      setShowOtpPopup(true); // open OTP modal
    } catch (err) {
      console.error(
        err.response?.data?.non_field_errors?.[0] ||
        "Failed to send OTP. Try again.",
      );
       setErrors((prev) => ({
      ...prev,
      email:
        err.response?.data?.non_field_errors?.[0] ||
        "Failed to send OTP. Try again.",
    }));
    }
  };

  const requestPhoneOtp = async () => {
    // If user hasn't selected country code, fallback to 91
    const countryCode = formData.countryCode || "91";
    const mobileNumber = formData.mobile_number || "";

    if (!mobileNumber) return;

    // Combine country code + phone number
    const fullNumber = `+${countryCode}${mobileNumber}`;

    try {
      const res = await axios.post(
        "/api/profile/request-change-contact/",
        { mobile_number: fullNumber }, // send full number with country code
        { headers: { Authorization: `Token ${token}` } }
      );

      console.log("Phone OTP sent ✅", res.data);
      setPendingEmail(fullNumber); // save with country code to show in OTP modal
      setShowOtpPopup(true); // open OTP modal
    } catch (err) {
      console.error(
        "Failed to request phone OTP ❌",
        err.response?.data.non_field_errors
      );
        setErrors((prev) => ({
      ...prev,
      mobile_number:
        err.response?.data?.non_field_errors?.[0] ||
        "Failed to send OTP. Try again.",
    }));
    }

   
  };

  const handleOtpVerify = async (otp) => {
    try {
      const contactType = /^\+?[0-9]+$/.test(pendingEmail) ? "mobile" : "email";

      const res = await axios.post(
        "/api/profile/verify-change-contact/",
        {
          otp,
          contact_type: contactType,
        },
        { headers: { Authorization: `Token ${token}` } }
      );

      console.log(`${contactType} verified ✅`, res.data);

      // Update formData based on type
      if (contactType === "email") {
        setFormData((prev) => ({
          ...prev,
          is_mail_verified: true,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          is_phone_verified: true,
        }));
      }

      setShowOtpPopup(false);
      setOtpError("");
    } catch (err) {
      console.error(
        "OTP verification failed ❌",
        err.response?.data || err.message
      );
      setOtpError("Invalid OTP. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSubmitError(""); // clear old error

    const { currentPassword, newPassword, confirmNewPassword } = formData;
    const allEmpty = !currentPassword && !newPassword && !confirmNewPassword;
    const passwordErrors = {};

    // password validation (same as before)
    if (!allEmpty) {
      if (!currentPassword)
        passwordErrors.currentPassword = "Current password is required";
      if (!newPassword) passwordErrors.newPassword = "New password is required";
      if (!confirmNewPassword)
        passwordErrors.confirmNewPassword = "Confirm new password is required";

      if (newPassword) {
        if (newPassword.length < 8)
          passwordErrors.newPassword =
            "Password must be at least 8 characters long";
        else if (!/[0-9]/.test(newPassword))
          passwordErrors.newPassword =
            "Password must contain at least one number";
        else if (!/[!@#$%^&*(),.?\":{}|<>]/.test(newPassword))
          passwordErrors.newPassword =
            "Password must contain at least one special character";
      }

      if (
        newPassword &&
        confirmNewPassword &&
        newPassword !== confirmNewPassword
      ) {
        passwordErrors.confirmNewPassword = "Passwords do not match";
      }
    }

    if (Object.keys(passwordErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...passwordErrors }));
      return;
    }

    try {
      const form = new FormData();
      form.append("full_name", formData.full_name || "");

      if (formData[imageKey] instanceof File) {
        // ✅ send actual dynamic key
        form.append(imageKey, formData[imageKey]);
      } else if (formData[imageKey] === "") {
        form.append(imageKey, "");
      }
      // else: don't append → keep current image

      await axios.put(`/api/profile/update/`, form, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Password update if fields are filled
      if (!allEmpty) {
        const passwordForm = new FormData();
        passwordForm.append("current_password", currentPassword);
        passwordForm.append("new_password", newPassword);
        passwordForm.append("confirm_new_password", confirmNewPassword);

        await axios.put(`/api/change-password/`, passwordForm, {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }
      await refreshUserDetails();
      onClose();
    } catch (error) {
      console.error("Profile or password update failed ❌", error);
      setSubmitError(
        error.response?.data?.error ||
          "Failed to update profile or password. Please try again."
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div
        className="bg-white w-full max-w-3xl rounded-md shadow-lg p-4 sm:p-6 relative lg:max-h-[90vh] 2xl:max-h-[100vh] overflow-y-auto scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-50 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg sm:text-xl font-bold text-gray-700 mb-4">
          Edit Profile
        </h2>

        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <Loading />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
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
              {errors[imageKey] && (
                <p className="mt-2 text-xs text-red-600 text-center">
                  {errors[imageKey]}
                </p>
              )}
            </div>

            {/* Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <FormInput
                  name="full_name"
                  placeholder="Full Name"
                  value={formData.full_name || ""}
                  onChange={handleChange}
                  hasError={errors.full_name}
                />
              </div>
              <div className="relative">
                {/* Email Input */}
                <FormInput
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  hasError={
                    errors.email ||
                    (formData.email &&
                      (formData.email !== originalEmail ||
                        formData.is_mail_verified === false))
                  }
                  className="pr-20"
                />

                {/* Verify Button */}
                {formData.email && formData.is_mail_verified === false && (
                  <>
                    <button
                      type="button"
                      onClick={requestEmailOtp}
                      className="absolute right-2 top-1/3 -translate-y-1/2 bg-red-600 text-white text-xs px-3 py-1 rounded-md hover:bg-red-700 transition"
                    >
                      Verify
                    </button>
                    <p className="mt-1 text-xs text-red-600">
                      {errors.email ? errors.email : "Email is not verified"}
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-3">
                {/* Country Code */}
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

                {/* Phone Input */}
                <div className="flex-1 relative">
                  <FormInput
                    type="tel"
                    name="mobile_number"
                    value={formData.mobile_number || ""}
                    onChange={handleChange}
                    placeholder="Phone Number *"
                    hasError={
                      errors.mobile_number ||
                      formData.is_phone_verified === false
                    }
                    className="pr-20"
                  />

                  {/* Verify Button */}
                  {formData.mobile_number &&
                    formData.is_phone_verified === false && (
                      <button
                        type="button"
                        onClick={requestPhoneOtp}
                        className="absolute right-3 top-1/3 -translate-y-1/2 text-xs px-3 py-1 rounded bg-red-600 hover:bg-red-700 transition text-white"
                      >
                        Verify
                      </button>
                    )}

                  {(errors.mobile_number ||
  (formData.mobile_number && formData.is_phone_verified === false)) && (
  <p className="mt-1 text-xs text-red-600">
    {errors.mobile_number ||
      "Phone number is not verified"}
  </p>
)}
                </div>
              </div>
            </div>

            {/* Reset Password */}
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-md sm:text-lg font-semibold text-gray-700 mb-3">
                Reset Password
              </h3>

              <div className="space-y-4">
                <div className="relative">
                  <FormInput
                    type={showPasswords.current ? "text" : "password"}
                    name="currentPassword"
                    placeholder="Current Password"
                    value={formData.currentPassword || ""}
                    onChange={handleChange}
                    hasError={!!errors.currentPassword}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("current")}
                    className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                  >
                    {showPasswords.current ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  {errors.currentPassword && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.currentPassword}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <FormInput
                    type={showPasswords.new ? "text" : "password"}
                    name="newPassword"
                    placeholder="New Password"
                    value={formData.newPassword || ""}
                    onChange={handleChange}
                    hasError={!!errors.newPassword}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("new")}
                    className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                  >
                    {showPasswords.new ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  {errors.newPassword && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.newPassword}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <FormInput
                    type={showPasswords.confirm ? "text" : "password"}
                    name="confirmNewPassword"
                    placeholder="Confirm New Password"
                    value={formData.confirmNewPassword || ""}
                    onChange={handleChange}
                    hasError={!!errors.confirmNewPassword}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirm")}
                    className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                  >
                    {showPasswords.confirm ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  {errors.confirmNewPassword && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.confirmNewPassword}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {submitError && (
              <div
                className={`mb-4 p-3 rounded ${
                  submitError.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {submitError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 sm:py-3 rounded-lg font-medium text-white bg-gradient-to-r from-green-500 to-green-600 shadow-md hover:shadow-lg transition text-sm sm:text-base"
            >
              Save Changes
            </button>
          </form>
        )}
      </div>

      <OtpModal
        isOpen={showOtpPopup}
        phoneOrEmail={pendingEmail} // shows email or phone dynamically
        onClose={() => setShowOtpPopup(false)}
        onSubmit={handleOtpVerify} // send OTP verify
        onResend={() => {
          // resend OTP based on type
          if (/^[0-9]+$/.test(pendingEmail)) {
            requestPhoneOtp();
          } else {
            requestEmailOtp();
          }
        }}
        otpError={otpError}
        setOtpError={setOtpError}
      />
    </div>
  );
}

export default ProfileEditPopup;
