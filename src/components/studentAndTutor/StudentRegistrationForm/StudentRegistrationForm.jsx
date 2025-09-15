import { useState, useRef, useEffect } from "react";
import { FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import FormInput from "../FormInput/FormInput";
import { Upload, ImageIcon, X } from "lucide-react";
import axios from "axios";
import OtpModal from "../../common/OtpModal/OtpModal";
import { useNavigate } from "react-router-dom";

const initialFormData = {
  full_name: "",
  email: "",
  password: "",
  countryCode: "91",
  mobile_number: "",
  city: "",
  state: "",
  pincode: "",
  qualification: "",
  categories: [],
  profile_photo: null,
  gender: "",
};

function StudentRegistrationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [preview, setPreview] = useState(null);

  const [shouldScroll, setShouldScroll] = useState(false);
  const [subjectInput, setSubjectInput] = useState("");
  const [formMessage, setFormMessage] = useState({ type: "", text: "" });

  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [pendingFormData, setPendingFormData] = useState(null);

  const errorRefs = {
    full_name: useRef(null),
    email: useRef(null),
    countryCode: useRef(null),
    mobile_number: useRef(null),
    password: useRef(null),
    confirmPassword: useRef(null),
    city: useRef(null),
    state: useRef(null),
    pincode: useRef(null),
    qualification: useRef(null),
    categories: useRef(null),
    gender: useRef(null),
  };

  const subjectRef = useRef(null);

  // scroll to first error
  useEffect(() => {
    if (!shouldScroll) return;
    const firstErrorKey = Object.keys(errors)[0];
    if (
      firstErrorKey &&
      errors[firstErrorKey] &&
      errorRefs[firstErrorKey]?.current
    ) {
      setTimeout(() => {
        errorRefs[firstErrorKey].current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        errorRefs[firstErrorKey].current.focus({ preventScroll: true });
      }, 100);
    }
    setShouldScroll(false);
  }, [errors, shouldScroll]);

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

  // handle form field change
  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleProfileInputChange = (e) => {
    handleChange(e);
    if (e.target.name === "profile_photo" && e.target.files[0]) {
      const file = e.target.files[0];
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        setErrors((prev) => ({
          ...prev,
          profile_photo: "File size should not exceed 5MB",
        }));
        setFormData((prev) => ({ ...prev, profile_photo: null }));
        setPreview(null);
        e.target.value = "";
        return;
      }
      setFormData((prev) => ({ ...prev, profile_photo: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleCountryCodeChange = (value) => {
    setFormData({ ...formData, countryCode: value });
    setErrors((prev) => ({ ...prev, countryCode: "" }));
  };

  const handlePhoneChange = (e) => {
    const onlyNums = e.target.value.replace(/\D/g, "");
    setFormData({ ...formData, mobile_number: onlyNums });
    setErrors((prev) => ({ ...prev, mobile_number: "" }));
  };

  // ✅ Validation
  const validateForm = () => {
    let newErrors = {};
    if (!formData.full_name.trim())
      newErrors.full_name = "Full name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.countryCode || formData.countryCode.trim() === "")
      newErrors.countryCode = "Country code is required";
    if (!formData.mobile_number)
      newErrors.mobile_number = "Phone number is required"; // fixed
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.pincode) newErrors.pincode = "Pincode is required";
    if (!formData.qualification)
      newErrors.qualification = "Qualification is required"; // fixed
    if (!formData.categories || formData.categories.length === 0) {
      newErrors.categories = "Subjects are required"; // fixed
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Recursive function to flatten categories and all nested subcategories
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

      // 🔹 Preserve the very first rootId across recursion
      const baseRootId = rootId ?? category.id;

      // 🔹 Always build path starting from top-most root
      const currentPath = isTop ? [category.id] : [...path, category.id];

      const hasChildren =
        category.subcategories && category.subcategories.length > 0;
      const isLeaf = !hasChildren;

      if (isTop) {
        // ✅ Root-level item
        result.push({
          id: category.id,
          name: category.name,
          label: category.name,
          parent: null,
          pathIds: [category.id], // root path starts with itself
          hasChildren,
          isLeaf, // 🔹 add leaf flag
        });
      } else {
        // ✅ Sub-level item with same "in ... (Root)" label format
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
          isLeaf, // 🔹 add leaf flag
        });
      }

      // 🔹 Recurse deeper if subcategories exist
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

  // ✅ Subject input change
  const handleSubjectChange = async (e) => {
    const value = e.target.value;
    setSubjectInput(value);
    setErrors((prev) => ({ ...prev, categories: "" }));

    try {
      const res = await axios.get("/api/category-list/");
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
      console.error("Error fetching categories:", error);
      setFilteredSubjects([]);
      setShowSuggestions(false);
    }
  };

  // ✅ Add subject
  // ✅ Add subject
  const handleSelectSubject = (subject) => {
    if (selectedSubjects.some((s) => s.id === subject.id)) {
      setShowSuggestions(false);
      return;
    }

    const updatedSubjects = [...selectedSubjects, subject];
    setSelectedSubjects(updatedSubjects);

    // ✅ Only leaf IDs, not full path
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

  // ✅ Remove subject
  // ✅ Remove subject
  const removeSubject = (id) => {
    const updatedSubjects = selectedSubjects.filter((s) => s.id !== id);
    setSelectedSubjects(updatedSubjects);

    // ✅ Only leaf IDs
    const leafIds = updatedSubjects.map((s) => s.id);

    setFormData((prev) => ({
      ...prev,
      categories: leafIds,
    }));
  };

  // ✅ Highlight typed text
  // ✅ Highlight typed text inside suggestion
  const highlightMatch = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(
      regex,
      (match) => `<span class="text-green-400 font-bold">${match}</span>` // highlight color
    );
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setShouldScroll(true);
      return;
    }

    setIsSubmitting(true);
    setFormMessage({ type: "", text: "" });
    setErrors({});

    try {
      const { countryCode, mobile_number, email, profile_photo, ...rest } =
        formData;
      const phoneWithCode = `+${countryCode}${mobile_number}`;

      // ✅ Call send OTP API
      const response = await axios.post("/api/send-otp/", {
        email,
        mobile_number: phoneWithCode,
      });

      if (response.data?.message === "OTP sent successfully.") {
        // ✅ Only proceed if OTP sent
        const pending = {
          ...rest,
          email,
          mobile_number: phoneWithCode,
          profile_photo: profile_photo instanceof File ? profile_photo : null,
        };

        setPendingFormData(pending);
        setShowOtpPopup(true); // open modal only now
        setOtpError("");
      } else {
        // Backend responded but OTP not sent
        setFormMessage({
          type: "error",
          text: response.data?.error || "❌ Failed to send OTP.",
        });
        setShowOtpPopup(false);
      }
    } catch (error) {
      const apiErrors = error.response?.data || {};

      if (apiErrors.email) {
        setErrors((prev) => ({ ...prev, email: apiErrors.email }));
      }
      if (apiErrors.mobile_number) {
        setErrors((prev) => ({
          ...prev,
          mobile_number: apiErrors.mobile_number,
        }));
      }

      setFormMessage({
        type: "error",
        text: apiErrors.error || "❌ Failed to send OTP. Try again.",
      });
      setShowOtpPopup(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ Resend OTP
  const sendOtp = async () => {
    try {
      await axios.post("/api/send-otp/", {
        email: formData.email,
        mobile_number: `+${formData.countryCode}${formData.mobile_number}`,
      });
      setOtpError("✅ OTP resent successfully.");
    } catch {
      setOtpError("❌ Failed to resend OTP. Please try again.");
    }
  };

  // ✅ OTP Verify
  const handleOtpVerify = async (enteredOtp) => {
    try {
      if (!pendingFormData) throw new Error("No form data found.");

      // Build FormData from pendingFormData
      const fd = new FormData();

      Object.keys(pendingFormData).forEach((key) => {
        const val = pendingFormData[key];

        if (key === "categories" && Array.isArray(val)) {
          val.forEach((id) => fd.append("categories", id));
        } else if (key === "profile_photo") {
          if (val instanceof File) fd.append("profile_photo", val);
        } else {
          if (val !== null && val !== undefined) fd.append(key, val);
        }
      });

      // Append OTP
      fd.append("otp", enteredOtp);

      // Call student registration API
      const res = await axios.post("/api/register/student/", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.token) {
        setShowOtpPopup(false);
        setOtpError("");

        // Save token & reset form
        localStorage.setItem("authToken", res.data.token);
        setFormData(initialFormData);
        setConfirmPassword("");
        setSelectedSubjects([]);
        setPreview(null);
        setFilteredSubjects([]);
        setErrors({});
        setPendingFormData(null);

        navigate("/studentDashboard");
      }
    } catch (err) {
      console.error(
        "❌ Student Registration Error:",
        err.response?.data || err.message
      );

      const apiErrors = err.response?.data;

      // OTP-specific error
      if (apiErrors?.otp) {
        setOtpError(
          Array.isArray(apiErrors.otp) ? apiErrors.otp[0] : apiErrors.otp
        );
        return;
      }

      // fallback for invalid/expired OTP
      setOtpError("❌ Invalid or expired OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8">
      <div className="w-full max-w-4xl bg-white rounded-md shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-center">
          <h2 className="text-2xl font-bold text-white">
            Student Registration
          </h2>
          <p className="text-white mt-2">
            Start your learning journey with top tutors
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-2 md:p-8 space-y-6">
          {/* Profile Photo */}
          <div className="flex flex-col items-center pb-6">
            <label
              htmlFor="profilePhoto"
              className="relative w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-32 h-32 rounded-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center text-gray-500">
                  <ImageIcon className="w-10 h-10 mb-1 text-green-600" />
                  <p className="text-xs">Upload Photo</p>
                </div>
              )}
              <div className="absolute bottom-2 right-2 bg-green-600 p-2 rounded-full text-white shadow-md">
                <Upload className="w-4 h-4" />
              </div>
              <input
                id="profilePhoto"
                type="file"
                name="profile_photo"
                accept="image/*"
                onChange={handleProfileInputChange}
                className="hidden"
              />
            </label>
            {preview && (
              <button
                type="button"
                onClick={() => {
                  setPreview(null);
                  setFormData((prev) => ({ ...prev, profile_photo: null }));
                }}
                className="mt-2 flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
              >
                <X className="w-4 h-4" /> Remove
              </button>
            )}
            {errors.profile_photo && (
              <p className="text-red-500 text-xs mt-1">
                {errors.profile_photo}
              </p>
            )}
          </div>

          {/* Full Name */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1" ref={errorRefs.full_name}>
              <FormInput
                name="full_name"
                placeholder="Full Name *"
                value={formData.full_name}
                onChange={handleChange}
                hasError={errors.full_name}
                innerRef={errorRefs.full_name}
              />
              {errors.full_name && (
                <p className="text-red-500 text-xs mt-1">{errors.full_name}</p>
              )}
            </div>

            {/* Email */}
            <div className="flex-1" ref={errorRefs.email}>
              <FormInput
                name="email"
                type="email"
                placeholder="Email *"
                value={formData.email}
                onChange={handleChange}
                hasError={errors.email}
                innerRef={errorRefs.email}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Phone + Gender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Phone */}
            <div ref={errorRefs.phoneNumber}>
              <div className="flex gap-3">
                {/* Country Code */}
                <div className="w-28" ref={errorRefs.countryCode}>
                  <PhoneInput
                    country={"in"}
                    value={formData.countryCode}
                    onChange={(value, country) => {
                      setFormData({
                        ...formData,
                        countryCode: country.dialCode,
                      });
                      setErrors((prev) => ({ ...prev, countryCode: "" }));
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
                      ref: errorRefs.countryCode,
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
                    onChange={handlePhoneChange}
                    placeholder="Phone Number *"
                    ref={errorRefs.mobile_number} // ✅ fixed
                    className={`w-full py-2 px-4 border ${
                      errors.mobile_number
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md placeholder-gray-400 outline-none focus:ring-0 focus:border-green-500`}
                  />
                  {errors.mobile_number && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.mobile_number}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Gender */}
            <div ref={errorRefs.gender}>
              <FormInput
                name="gender"
                placeholder="Select Gender"
                value={formData.gender}
                onChange={handleChange}
                select
                options={[
                  { label: "Select Gender *", value: "" },
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                  { label: "Other", value: "other" },
                ]}
                hasError={errors.gender}
                innerRef={errorRefs.gender}
              />
              {errors.gender && (
                <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Password */}
            <div ref={errorRefs.password} className="relative">
              <FormInput
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password *"
                value={formData.password}
                onChange={handleChange}
                hasError={errors.password}
                innerRef={errorRefs.password}
              />
              <span
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div ref={errorRefs.confirmPassword} className="relative">
              <FormInput
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password *"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, confirmPassword: "" })); // ✅ clear error
                }}
                hasError={errors.confirmPassword}
                innerRef={errorRefs.confirmPassword}
              />
              <span
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Qualification */}
            <div ref={errorRefs.qualification}>
              <FormInput
                name="qualification"
                placeholder="Qualification *"
                value={formData.qualification}
                onChange={handleChange}
                hasError={errors.qualification} // ✅ fixed
                innerRef={errorRefs.qualification} // ✅ fixed
              />
              {errors.qualification && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.qualification}
                </p>
              )}
            </div>

            <div
              ref={(el) => {
                errorRefs.categories.current = el;
                subjectRef.current = el;
              }}
              className="relative"
            >
              <input
                type="text"
                name="categories"
                placeholder="Subjects You Want to Learn*"
                value={subjectInput}
                onChange={handleSubjectChange}
                onFocus={handleSubjectChange}
                ref={errorRefs.categories}
                className={`w-full py-2 px-4 border ${
                  errors.categories ? "border-red-500" : "border-gray-300"
                } rounded-md placeholder-gray-400 outline-none focus:ring-0 focus:border-primary`}
                autoComplete="off"
                autoCorrect="off"
              />
              {errors.categories && (
                <p className="text-red-500 text-xs mt-1">{errors.categories}</p>
              )}

              {/* Suggestions Dropdown */}
              {showSuggestions && (
                <ul className="absolute w-full border rounded-md bg-white shadow-md mt-2 max-h-48 overflow-y-auto z-10">
                  {filteredSubjects.length > 0 ? (
                    filteredSubjects.map((sub) => (
                      <li
                        key={sub.id}
                        onClick={() => handleSelectSubject(sub)}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                        dangerouslySetInnerHTML={{
                          __html: highlightMatch(sub.label, subjectInput),
                        }}
                      />
                    ))
                  ) : (
                    <li className="px-4 py-2 text-gray-400 text-sm italic">
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
                      className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-md text-sm"
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

          {/* City / State / Pincode */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div ref={errorRefs.city}>
              <FormInput
                name="city"
                placeholder="City *"
                value={formData.city}
                onChange={handleChange}
                hasError={errors.city}
                innerRef={errorRefs.city}
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-1">{errors.city}</p>
              )}
            </div>
            <div ref={errorRefs.state}>
              <FormInput
                name="state"
                placeholder="State *"
                value={formData.state}
                onChange={handleChange}
                hasError={errors.state}
                innerRef={errorRefs.state}
              />
              {errors.state && (
                <p className="text-red-500 text-xs mt-1">{errors.state}</p>
              )}
            </div>
            <div ref={errorRefs.pincode}>
              <FormInput
                name="pincode"
                placeholder="Pincode *"
                value={formData.pincode}
                onChange={handleChange}
                hasError={errors.pincode}
                innerRef={errorRefs.pincode}
              />
              {errors.pincode && (
                <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>
              )}
            </div>
          </div>

          {formMessage.text && (
            <div
              className={`mb-4 p-3 rounded ${
                formMessage.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {formMessage.text}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 px-6 rounded-xl font-medium text-white transition-all flex items-center justify-center ${
              isSubmitting
                ? "bg-green-400 cursor-not-allowed"
                : "bg-gradient-to-r from-green-500 to-green-600 shadow-md hover:shadow-lg"
            }`}
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin h-5 w-5 text-white mr-2" />
                Processing...
              </>
            ) : (
              "Create Student Profile"
            )}
          </button>
        </form>

        {/* OTP Popup */}
        {showOtpPopup && (
          <OtpModal
            isOpen={showOtpPopup}
            phoneOrEmail={`${formData.email} / +${formData.countryCode}${formData.mobile_number}`}
            onClose={() => setShowOtpPopup(false)}
            onSubmit={handleOtpVerify}
            onResend={sendOtp}
            otpError={otpError}
            setOtpError={setOtpError}
          />
        )}
      </div>
    </div>
  );
}

export default StudentRegistrationForm;
