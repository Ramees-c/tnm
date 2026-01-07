import { X, Upload, ImageIcon, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import FormInput from "../FormInput/FormInput";
import axios from "axios";
import API_BASE, { MEDIA_URL } from "../../../API/API";
import { useAuth } from "../../../Context/userAuthContext";
import OtpModal from "../../common/OtpModal/OtpModal";
import Loading from "../../common/Loading/Loading";
import { useSuccessMessage } from "../../../Context/SuccessMessageProvider";

function ProfileEditPopup({ isOpen, onClose }) {
  const { token, refreshUserDetails } = useAuth();
  const { showSuccess } = useSuccessMessage();

  const [formData, setFormData] = useState({
    profile_image: null,
    countryCode: "91",
    available_days: [],
  });

  const [errors, setErrors] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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

  const [pincodeSuggestions, setPincodeSuggestions] = useState([]);
  const [showPincodeSuggestions, setShowPincodeSuggestions] = useState(false);
  const [pincodeTimeout, setPincodeTimeout] = useState(null);
  const [isPincodeLoading, setIsPincodeLoading] = useState(false);

  const [subjectInput, setSubjectInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const [filteredSubjects, setFilteredSubjects] = useState([]);

  const [otpLoading, setOtpLoading] = useState(false);

  const fileInputRef = useRef(null);

  const errorRefs = {
    subjects: useRef(null),
    pincode: useRef(null),
  };

  const subjectRef = useRef(null);

  // const imageKey = formData.role === "tutor" ? "profile_image" : "profile_photo";

  // Fetch user details when popup opens
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (isOpen) {
      setSubmitError("");
      // Prevent background scroll
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      setErrors("");
      fetchUserDetails();
    } else {
      // Restore scroll
      html.style.overflow = "";
      body.style.overflow = "";
    }

    return () => {
      html.style.overflow = "";
      body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        errorRefs.pincode.current &&
        !errorRefs.pincode.current.contains(event.target)
      ) {
        setShowPincodeSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (subjectRef.current && !subjectRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch user details
  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/profile/edit/`, {
        withCredentials: true,
      });

      const data = res.data;

      setFormData({
        ...data,
        is_mail_verified: data.is_mail_verified,
        email_verified_initial: data.is_mail_verified,
        available_days: Array.isArray(data.available_days)
          ? data.available_days.map((d) => d.trim())
          : typeof data.available_days === "string"
          ? data.available_days.split(",").map((d) => d.trim())
          : [],
      });

      setOriginalPhone(data.mobile_number || "");
      setOriginalEmail(data.email || "");

      const key = data.role === "tutor" ? "profile_image" : "profile_photo";
      setImageKey(key);
      setProfileImage(data[key] ? `${data[key]}` : null);

      // Fetch all categories from API
      const categoriesRes = await axios.get(`${API_BASE}/category-list/`);
      const allCategories = categoriesRes.data
        ? flattenCategories(categoriesRes.data)
        : [];

      // Map selected category IDs to category objects
      if (data.categories && data.categories.length > 0) {
        const preSelected = allCategories.filter((cat) => {
          // Replace last "(...)" with " in ...", keep other parentheses
          let normalizedLabel = cat.label
            .replace(/\s*\(([^()]+)\)$/, " in $1")
            .toLowerCase()
            .trim();

          return data.categories.some(
            (selected) => selected.toLowerCase().trim() === normalizedLabel
          );
        });

        setSelectedSubjects(preSelected); 
        setFormData((prev) => ({
          ...prev,
          categories: [...data.categories], 
        }));
      }
    } catch (error) {
      console.error("Failed to fetch user details");
    } finally {
      setLoading(false);
    }
  };

  // onChange
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

  // onChange - pincode
  const handlePincodeChange = async (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, pincode: value }));

    if (value.length < 3) {
      setPincodeSuggestions([]);
      setShowPincodeSuggestions(false);
      return;
    }

    setIsPincodeLoading(true);

    try {
      const res = await axios.get(`${API_BASE}/pincode_search/?q=${value}`);
      setPincodeSuggestions(res.data || []);
      setShowPincodeSuggestions(true);
    } catch (err) {
      console.error("Pincode search error");
      setPincodeSuggestions([]);
      setShowPincodeSuggestions(false);
    } finally {
      setIsPincodeLoading(false);
    }
  };

  // Select pincode
  const handleSelectPincode = (pin) => {
    // Update formData with selected pincode
    setFormData((prev) => ({ ...prev, pincode: pin.pincode }));
    setShowPincodeSuggestions(false); // close dropdown
  };

  // Pincode highlight
  const highlightPincodeMatch = (text, query) => {
    if (!query) return text;
    // Escape regex special characters from query
    const escapedQuery = query.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    const regex = new RegExp(`(${escapedQuery})`, "gi");
    return text.replace(
      regex,
      (match) => `<span class="text-green-500 font-bold">${match}</span>`
    );
  };

  // Image upload
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

  // Remove image
 const removeImage = () => {
    setProfileImage(null);
    setFormData((prev) => ({ ...prev, [imageKey]: null }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Password visibility
  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Recursive function to flatten categories and all nested subcategories
  const flattenCategories = (
    categories,
    rootName = "",
    chain = [],
    rootId = null,
    path = []
  ) => {
    let result = [];

    categories.forEach((category) => {
      const isTop = !rootName;
      const currentRootName = rootName || category.name;

      // Preserve the very first rootId across recursion
      const baseRootId = rootId ?? category.id;

      // Always build path starting from top-most root
      const currentPath = isTop ? [category.id] : [...path, category.id];

      const hasChildren =
        category.subcategories && category.subcategories.length > 0;
      const isLeaf = !hasChildren;

      if (isTop) {
        // Root-level item
        result.push({
          id: category.id,
          name: category.name,
          label: category.name,
          parent: null,
          pathIds: [category.id], // root path starts with itself
          hasChildren,
          isLeaf, // add leaf flag
        });
      } else {
        // Sub-level item with same "in ... (Root)" label format
        const cleanChain = [...chain].filter((c) => c !== currentRootName);

        const label =
          cleanChain.length > 0
            ? `${category.name} in ${cleanChain
                .reverse()
                .join(" in ")} (${currentRootName})`
            : `${category.name} (${currentRootName})`;

        result.push({
          id: category.id,
          name: category.name,
          label,
          parent: currentRootName,
          pathIds: [baseRootId, ...currentPath.slice(1)],
          hasChildren,
          isLeaf, // add leaf flag
        });
      }

      // Recurse deeper if subcategories exist
      if (hasChildren) {
        result = result.concat(
          flattenCategories(
            category.subcategories,
            currentRootName,
            [...chain, category.name],
            baseRootId, // keep passing the very first root id
            currentPath
          )
        );
      }
    });

    return result;
  };

  // Subject input change
  const handleSubjectChange = async (e) => {
    const value = e.target.value;
    setSubjectInput(value);
    setErrors((prev) => ({ ...prev, subjects: "" }));

    try {
      const res = await axios.get(`${API_BASE}/category-list/`);
      if (res.data && Array.isArray(res.data)) {
        const allSubcategories = flattenCategories(res.data);
        const query = value.toLowerCase();

        // Show all leaf subjects if input is empty
        const matches = allSubcategories.filter(
          (sub) => sub.isLeaf && sub.label.toLowerCase().includes(query)
        );

        setFilteredSubjects(matches);
        setShowSuggestions(true);
      } else {
        setFilteredSubjects([]);
        setShowSuggestions(false);
      }
    } catch (error) {
      console.error("Error fetching categories");
      setFilteredSubjects([]);
      setShowSuggestions(false);
    }
  };

  // Select subject
  const handleSelectSubject = (subject) => {
    if (selectedSubjects.some((s) => s.id === subject.id)) {
      setShowSuggestions(false);
      return;
    }

    const updatedSubjects = [...selectedSubjects, subject];
    setSelectedSubjects(updatedSubjects);

    // Only leaf IDs, not full path
    const leafIds = updatedSubjects.map((s) => s.id);

    setFormData((prev) => ({
      ...prev,
      categories: leafIds,
    }));

    setSubjectInput("");
    setErrors((prev) => ({ ...prev, subjects: "" }));
    setShowSuggestions(false);
    setFilteredSubjects([]);
  };

  // Remove subject
  const removeSubject = (id) => {
    const updatedSubjects = selectedSubjects.filter((s) => s.id !== id);
    setSelectedSubjects(updatedSubjects);

    // Only leaf IDs
    const leafIds = updatedSubjects.map((s) => s.id);

    setFormData((prev) => ({
      ...prev,
      categories: leafIds,
    }));
  };

  // Highlight match
  const highlightMatch = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(
      regex,
      (match) => `<span class="text-green-400 font-bold">${match}</span>` // highlight color
    );
  };

  // Email OTP request
  const requestEmailOtp = async () => {
    if (!formData.email) return;

    try {
      setOtpLoading(true);
      const res = await axios.post(
        `${API_BASE}/profile/request-change-contact/`,
        { email: formData.email }, // send email
        {
          withCredentials: true,
        }
      );

      setPendingEmail(formData.email);
      setShowOtpPopup(true);
      setOtpLoading(false);
    } catch (err) {
      console.error("Failed to send OTP. Try again.");
      setOtpLoading(false);
      setErrors((prev) => ({
        ...prev,
        email:
          err.response?.data?.non_field_errors?.[0] ||
          "Failed to send OTP. Try again.",
      }));
    }
  };

  // Phone OTP request
  const requestPhoneOtp = async () => {
    // If user hasn't selected country code, fallback to 91
    const countryCode = formData.countryCode || "91";
    const mobileNumber = formData.mobile_number || "";

    if (!mobileNumber) return;

    // Combine country code + phone number
    const fullNumber = `+${countryCode}${mobileNumber}`;

    try {
      setOtpLoading(true);
      const res = await axios.post(
        `${API_BASE}/profile/request-change-contact/`,
        { mobile_number: fullNumber }, // send full number with country code
        {
          withCredentials: true,
        }
      );

      setPendingEmail(fullNumber); // save with country code to show in OTP modal
      setShowOtpPopup(true); // open OTP modal
      setOtpLoading(false);
    } catch (err) {
      console.error("Failed to request phone OTP");
      setOtpLoading(false);
      setErrors((prev) => ({
        ...prev,
        mobile_number:
          err.response?.data?.non_field_errors?.[0] ||
          "Failed to send OTP. Try again.",
      }));
    }
  };

  // OTP verify
  const handleOtpVerify = async (otp) => {
    try {
      const contactType = /^\+?[0-9]+$/.test(pendingEmail) ? "mobile" : "email";

      const res = await axios.post(
        `${API_BASE}/profile/verify-change-contact/`,
        {
          otp,
          contact_type: contactType,
        },
        {
          withCredentials: true,
        }
      );

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

      await refreshUserDetails();
      setShowOtpPopup(false);
      setOtpError("");
      showSuccess("verified successfully!");
    } catch (err) {
      console.error("OTP verification failed");
      setOtpError("Invalid OTP. Please try again.");
    }
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSubmitError("");
    setSubmitting(true);

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
      setSubmitting(false);
      return;
    }

    try {
      const form = new FormData();
      form.append("full_name", formData.full_name || "");
      form.append("gender", formData.gender || "");
      form.append("city", formData.city || "");
      form.append("state", formData.state || "");
      form.append("pincode", formData.pincode || "");
      form.append("qualification", formData.qualification || "");
      form.append("hourly_rate", formData.hourly_rate || "");
      form.append("experience_years", formData.experience_years || "");
      form.append("description", formData.description || "");
      form.append("landmark", formData.landmark || "");
      form.append("near_by_town", formData.near_by_town || "");

      if (selectedSubjects.length > 0) {
        selectedSubjects.forEach((cat) => {
          form.append("categories", cat.id);
        });
      }

      form.append(
        "available_days",
        JSON.stringify(formData.available_days || [])
      );

       if (formData[imageKey] instanceof File) {
        form.append(imageKey, formData[imageKey]);
      } else if (formData[imageKey] === null) {
        form.append(imageKey, "");
      }

      await axios.put(`${API_BASE}/profile/update/`, form, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await new Promise((r) => setTimeout(r, 200));
      await refreshUserDetails();
      showSuccess("Profile updated successfully!");
      onClose();

      // Password update if fields are filled
      if (!allEmpty) {
        const passwordForm = new FormData();
        passwordForm.append("current_password", currentPassword);
        passwordForm.append("new_password", newPassword);
        passwordForm.append("confirm_new_password", confirmNewPassword);

        await axios.put(`${API_BASE}/change-password/`, passwordForm, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      await refreshUserDetails();
      showSuccess("Profile updated successfully!");
      onClose();
    } catch (error) {
      console.error("Profile update failed");

      let errorMessage = "Failed to update profile. Please try again.";

      if (error.response?.data) {
        const data = error.response.data;

        // Pick the first field with an error
        const firstField = Object.keys(data)[0];
        const firstError =
          Array.isArray(data[firstField]) && data[firstField].length > 0
            ? data[firstField][0]
            : data[firstField];

        if (firstField && firstError) {
          // Convert snake_case → "Full name"
          const readableField = firstField
            .replace(/_/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase());

          errorMessage = `${readableField}: ${firstError}`;
        }
      }

      setSubmitError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-2 sm:px-4 py-4 sm:py-6">
      <div
        className="
  bg-white 
  w-full 
  max-w-[95%] sm:max-w-2xl lg:max-w-3xl 
  rounded-md 
  shadow-lg 
  p-2 sm:p-6 md:p-8 
  relative 
  max-h-[90vh] 
  overflow-y-auto 
  scrollbar-hide 
  animate-scaleIn
"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-50 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <h1 className="text-lg sm:text-xl font-bold text-gray-700 mb-4">
          Edit Profile
        </h1>

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
                className="relative w-20 h-20 sm:w-32 sm:h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
              >
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Preview"
                    className="w-20 h-20 sm:w-32 sm:h-32 rounded-full object-cover"
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
                      disabled={otpLoading}
                      className="absolute right-2 top-1/3 -translate-y-1/2 bg-red-600 text-white text-xs px-3 py-1 rounded-md hover:bg-red-700 transition"
                    >
                      {otpLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        "Verify"
                      )}
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
                    inputClass="!w-full !h-8 sm:!h-9 !text-gray-700 !text-xs sm:!text-sm !rounded-md !outline-none !border !border-gray-300"
                    buttonClass="!h-8 sm:!h-9 !rounded-md !border !border-gray-300 !bg-white"
                    dropdownClass="!bg-white !text-gray-700 !rounded-md !border-gray-200 !shadow-md !text-xs sm:!text-sm"
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
                        disabled={otpLoading}
                        className="absolute right-3 top-1/3 -translate-y-1/2 text-xs px-1 py-1 sm:px-3 sm:py-1 rounded bg-red-600 hover:bg-red-700 transition text-white"
                      >
                        {otpLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          "Verify"
                        )}
                      </button>
                    )}

                  {(errors.mobile_number ||
                    (formData.mobile_number &&
                      formData.is_phone_verified === false)) && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.mobile_number || "Phone number is not verified"}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <FormInput
                  name="gender"
                  placeholder="Select Gender"
                  value={formData.gender || ""}
                  onChange={handleChange}
                  select
                  options={[
                    { label: "Select Gender *", value: "" },
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                    { label: "Other", value: "other" },
                  ]}
                />
              </div>
            </div>

            {/* Location & Professional Information */}
            <div className="space-y-4">
              <h3 className="text-sm md:text-base font-semibold text-gray-700 border-b pb-2">
                Location Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <FormInput
                    name="city"
                    placeholder="City *"
                    value={formData.city || ""}
                    onChange={handleChange}
                    hasError={errors.city}
                  />
                </div>

                <div>
                  <FormInput
                    name="state"
                    placeholder="State *"
                    value={formData.state || ""}
                    onChange={handleChange}
                    hasError={errors.state}
                  />
                </div>

                <div className="relative" ref={errorRefs.pincode}>
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode *"
                    value={formData.pincode}
                    onChange={handlePincodeChange}
                    className={`w-full py-2 px-4 border ${
                      errors.pincode ? "border-red-500" : "border-gray-300"
                    } rounded-md placeholder-gray-400 outline-none focus:ring-0 focus:border-primary text-xs sm:text-sm placeholder:text-xs sm:placehoder:text-sm`}
                    autoComplete="off"
                  />

                  {/* Dropdown suggestions */}
                  {showPincodeSuggestions && (
                    <ul className="absolute w-full border rounded-md bg-white shadow-md mt-2 max-h-60 overflow-y-auto z-10">
                      {isPincodeLoading ? (
                        <li className="px-4 py-2 text-gray-500 text-xs sm:text-sm italic">
                          Loading...
                        </li>
                      ) : pincodeSuggestions.length > 0 ? (
                        pincodeSuggestions.map((pin) => (
                          <li
                            key={pin.id}
                            onMouseDown={(e) => {
                              e.preventDefault(); // prevent input blur
                              handleSelectPincode(pin);
                            }}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-xs sm:text-sm"
                            dangerouslySetInnerHTML={{
                              __html: `${highlightPincodeMatch(
                                pin.pincode,
                                formData.pincode
                              )} - ${highlightPincodeMatch(
                                pin.office_name,
                                formData.pincode
                              )}`,
                            }}
                          />
                        ))
                      ) : (
                        <li className="px-4 py-2 text-gray-400 text-xs sm:text-sm italic">
                          No pincodes found
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <FormInput
                    name="landmark"
                    placeholder="landmark *"
                    value={formData.landmark || ""}
                    onChange={handleChange}
                    hasError={errors.landmark}
                  />
                </div>

                <div>
                  <FormInput
                    name="near_by_town"
                    placeholder="Near by town *"
                    value={formData.near_by_town || ""}
                    onChange={handleChange}
                    hasError={errors.near_by_town}
                  />
                </div>
              </div>
            </div>

            <h3 className="text-sm md:text-base font-semibold text-gray-700 border-b pb-2 mt-6">
              {formData.role === "tutor"
                ? "Professional Information"
                : "Academic Information"}
            </h3>

            <div
              className={`grid grid-cols-1 gap-4 ${
                formData.role === "tutor" ? "md:grid-cols-2" : "md:grid-cols-1"
              }`}
            >
              <div>
                <FormInput
                  name="qualification"
                  placeholder="Highest Qualification *"
                  value={formData.qualification}
                  onChange={handleChange}
                  hasError={errors.qualification}
                />
              </div>

              {formData.role === "tutor" && (
                <div>
                  <FormInput
                    name="experience_years"
                    placeholder="Teaching Experience (years) *"
                    value={formData.experience_years}
                    onChange={(e) => {
                      const onlyNums = e.target.value.replace(/[^0-9]/g, ""); // ✅ allow digits only
                      setFormData((prev) => ({
                        ...prev,
                        experience_years: onlyNums,
                      }));
                      setErrors((prev) => ({ ...prev, experience: "" })); // clear error while typing
                    }}
                    hasError={errors.experience}
                  />
                </div>
              )}
            </div>

            <div
              className={`grid grid-cols-1 gap-4 ${
                formData.role === "tutor" ? "md:grid-cols-2" : "md:grid-cols-1"
              }`}
            >
              {formData.role === "tutor" && (
                <div>
                  <FormInput
                    type="text"
                    name="hourly_rate"
                    placeholder="Hourly Rate (₹) *"
                    value={formData.hourly_rate}
                    onChange={(e) => {
                      handleChange(e);
                      setErrors((prev) => ({ ...prev, hourlyRate: "" }));
                    }}
                    hasError={errors.hourlyRate}
                  />
                </div>
              )}

              <div
                ref={(el) => {
                  errorRefs.subjects.current = el;
                  subjectRef.current = el;
                }}
                className="relative"
              >
                {/* Input */}
                <input
                  type="text"
                  name="categories"
                  placeholder={`${
                    formData.role === "tutor"
                      ? "Subjects You Want to Teach*"
                      : "Subjects You Want to Learn*"
                  }`}
                  value={subjectInput}
                  onChange={handleSubjectChange}
                  onFocus={handleSubjectChange}
                  className={`w-full py-2 px-4 border ${
                    errors.subjects ? "border-red-500" : "border-gray-300"
                  } rounded-md placeholder-gray-400 placeholder:text-xs sm:placeholder:text-sm text-xs sm:text-sm outline-none focus:ring-0 focus:border-primary`}
                  autoComplete="off"
                  autoCorrect="off"
                />

                {/* Suggestions Dropdown */}
                {showSuggestions && (
                  <ul className="absolute w-full border rounded-md bg-white shadow-md mt-2 max-h-60 overflow-y-auto z-10">
                    {filteredSubjects.length > 0 ? (
                      filteredSubjects.map((sub) => (
                        <li
                          key={sub.id}
                          onClick={() => handleSelectSubject(sub)}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-xs sm:text-sm"
                          dangerouslySetInnerHTML={{
                            __html: highlightMatch(sub.label, subjectInput),
                          }}
                        />
                      ))
                    ) : (
                      <li className="px-4 py-2 text-gray-400 text-xs sm:text-sm italic">
                        No subjects found
                      </li>
                    )}
                  </ul>
                )}

                {/* Selected Subjects Chips */}
                {selectedSubjects.length > 0 && (
                  <div className="flex flex-wrap gap-2 border rounded-md p-2 mt-2">
                    {selectedSubjects.map((sub) => (
                      <span
                        key={sub.id}
                        className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs sm:text-sm"
                      >
                        {sub.label}
                        <button
                          type="button"
                          onClick={() => removeSubject(sub.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {formData.role === "tutor" && (
              <div>
                <h3 className="text-sm md:text-lg font-semibold text-gray-700 border-b pb-2 mt-6">
                  Available Days
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ].map((day) => {
                    const isChecked = formData.available_days.includes(day);
                    return (
                      <label
                        key={day}
                        className={`flex text-xs sm:text-sm items-center space-x-2 border p-2 rounded-md cursor-pointer hover:bg-gray-50`}
                      >
                        <input
                          type="checkbox"
                          value={day}
                          checked={isChecked}
                          onChange={() => {
                            setFormData((prev) => {
                              const isSelected =
                                prev.available_days.includes(day);
                              const updatedDays = isSelected
                                ? prev.available_days.filter((d) => d !== day)
                                : [...prev.available_days, day];

                              return { ...prev, available_days: updatedDays };
                            });

                            setErrors((prev) => ({
                              ...prev,
                              availableDays: "",
                            }));
                          }}
                          className="h-4 w-4 text-green-600 outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 active:ring-0 active:ring-offset-0 appearance-none checked:bg-green-600 checked:border-green-600 text-xs sm:text-sm"
                        />
                        <span
                          className={`${
                            isChecked
                              ? "text-black font-medium"
                              : "text-gray-400"
                          }`}
                        >
                          {day}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {formData.role === "tutor" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio *
                </label>
                <textarea
                  name="description"
                  placeholder="Tell us about yourself, your teaching style, and experience..."
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className={`w-full px-4 py-3 border text-xs sm:text-sm ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  } rounded-md outline-none focus:ring-0 focus:border-primary transition`}
                />
              </div>
            )}

            {/* Reset Password */}
            <h3 className="text-sm md:text-base font-semibold text-gray-700 border-b pb-2 mt-6">
              Reset Password
            </h3>
            <div>
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
              disabled={submitting}
              className={`w-full py-2.5 sm:py-3 rounded-lg font-medium text-white bg-gradient-to-r from-green-500 to-green-600 shadow-md hover:shadow-lg transition text-sm sm:text-base ${
                submitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {submitting ? "Saving..." : "Save Changes"}
            </button>
          </form>
        )}
      </div>

      <OtpModal
        isOpen={showOtpPopup}
        phoneOrEmail={pendingEmail}
        onClose={() => setShowOtpPopup(false)}
        onSubmit={handleOtpVerify}
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

       <style jsx>{`
        .animate-scaleIn {
          transform: scale(0.8);
          animation: scaleIn 0.45s forwards;
        }
        @keyframes scaleIn {
          to {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}

export default ProfileEditPopup;
