import { useState, useRef, useEffect } from "react";
import { FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import FormInput from "../FormInput/FormInput";
import { Upload, ImageIcon, X } from "lucide-react";
import axios from "axios";

const initialFormData = {
  full_name: "",
  email: "",
  password: "",
  gender: "",
  countryCode: "91",
  mobile_number: "",
  city: "",
  state: "",
  pincode: "",
  qualification: "",
  experience_years: "",
  hourly_rate: "",
  description: "",
  available_days: [],
  profile_image: null,
  categories: [],
};

function TutorRegisterForm() {
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

  const errorRefs = {
    name: useRef(null),
    email: useRef(null),
    countryCode: useRef(null),
    phoneNumber: useRef(null),
    password: useRef(null),
    confirmPassword: useRef(null),
    gender: useRef(null),
    city: useRef(null),
    state: useRef(null),
    pincode: useRef(null),
    qualification: useRef(null),
    experience: useRef(null),
    hourlyRate: useRef(null),
    subjects: useRef(null),
    bio: useRef(null),
    availableDays: useRef(null),
  };

  const subjectRef = useRef(null);
  // Scroll to first error field when errors change
  useEffect(() => {
    if (!shouldScroll) return; // 🚫 don’t scroll while typing

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

    setShouldScroll(false); // reset flag
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

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear error
  };

const handleProfileInputChange = (e) => {
  handleChange(e); // keeps existing formData updates

  if (
    e.target.name === "profile_image" &&
    e.target.files &&
    e.target.files[0]
  ) {
    const file = e.target.files[0];

    // ✅ Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setErrors((prev) => ({
        ...prev,
        profile_image: "File size should not exceed 5MB",
      }));
      setFormData((prev) => ({ ...prev, profile_image: null }));
      setPreview(null);
      e.target.value = "";
      return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      // ✅ Check for landscape orientation
      if (img.width <= img.height) {
        setErrors((prev) => ({
          ...prev,
          profile_image: "Image must be landscape (width > height)",
        }));
        setFormData((prev) => ({ ...prev, profile_image: null }));
        setPreview(null);
        e.target.value = "";
      } else {
        setFormData((prev) => ({ ...prev, profile_image: file }));
        setErrors((prev) => ({ ...prev, profile_image: "" }));
        setPreview(img.src); // ✅ show preview
      }
    };
  }
};


  const handleCountryCodeChange = (value) => {
    setFormData({ ...formData, countryCode: value });
    setErrors((prev) => ({ ...prev, countryCode: "" }));
  };

  const handlePhoneChange = (e) => {
    const onlyNums = e.target.value.replace(/\D/g, "");
    setFormData({ ...formData, mobile_number: onlyNums });
    setErrors((prev) => ({ ...prev, phoneNumber: "" }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.full_name.trim()) newErrors.name = "Full name is required";

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.countryCode)
      newErrors.countryCode = "Country code is required";
    if (!formData.mobile_number)
      newErrors.phoneNumber = "Phone number is required";

    if (!formData.gender) newErrors.gender = "Gender is required";

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one special character";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.pincode) newErrors.pincode = "Pincode is required";
    if (!formData.qualification)
      newErrors.qualification = "Qualification is required";
    if (!formData.experience_years)
      newErrors.experience = "Experience is required";
    if (!formData.hourly_rate) newErrors.hourlyRate = "Hourly rate is required";
    if (!formData.categories || formData.categories.length === 0) {
      newErrors.subjects = "Subjects are required";
    }
    if (!formData.available_days || formData.available_days.length === 0) {
      newErrors.availableDays = "Please select at least one available day";
    }
    if (!formData.description) newErrors.bio = "Bio is required";

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
    setErrors((prev) => ({ ...prev, subjects: "" }));

    if (!value.trim()) {
      setFilteredSubjects([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const res = await axios.get("/api/category-list/");
      if (res.data && Array.isArray(res.data)) {
        const allSubcategories = flattenCategories(res.data);

        // ✅ Only show leaf subjects
        const matches = allSubcategories.filter((sub) => {
          const query = value.toLowerCase();
          return sub.isLeaf && sub.label.toLowerCase().includes(query);
        });

        setFilteredSubjects(matches);
        setShowSuggestions(matches.length > 0);
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

  // ✅ Select subject
  const handleSelectSubject = (subject) => {
    // ✅ Save the full path of IDs (root -> ... -> selected)
    setFormData((prev) => ({
      ...prev,
      categories: [...subject.pathIds], // ensures proper full hierarchy
    }));

    // ✅ Keep the readable label in the input for the user
    setSubjectInput(subject.label);

    // ✅ Clear subject error (if any)
    setErrors((prev) => ({ ...prev, subjects: "" }));

    setShowSuggestions(false);
    setFilteredSubjects([]);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setShouldScroll(true);
      return;
    }

    setIsSubmitting(true);
    setFormMessage({ type: "", text: "" });

    try {
      const { countryCode, mobile_number, categories, ...rest } = formData;
      const formDataToSend = new FormData();

      Object.keys(rest).forEach((key) => {
        if (rest[key] !== null && rest[key] !== undefined) {
          formDataToSend.append(key, rest[key]);
        }
      });

      formDataToSend.append("mobile_number", `+${countryCode}${mobile_number}`);

      if (Array.isArray(categories)) {
        categories.forEach((cat) => {
          formDataToSend.append("categories", cat);
        });
      }

      if (formData.profile_image && formData.profile_image instanceof File) {
        formDataToSend.append("profile_image", formData.profile_image);
      }

      const res = await axios.post("/api/register/tutor/", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Success:", res.data);
      setFormMessage({
        type: "success",
        text: res.data?.message || "✅ Registration successful!",
      });

      // 🔹 Reset form after success
      setFormData(initialFormData); // ⬅️ replace manual reset with this
      setErrors({});
      setConfirmPassword(""); // ⬅️ clear confirm password
      setSubjectInput("");
      setFilteredSubjects([]);
      setPreview(null); // ⬅️ clear image preview
    } catch (error) {
      console.error(
        "❌ Error submitting form:",
        error.response?.data || error.message
      );

      if (error.response?.data) {
        const apiErrors = error.response.data;
        let newErrors = {};

        Object.keys(apiErrors).forEach((field) => {
          const message = Array.isArray(apiErrors[field])
            ? apiErrors[field][0]
            : apiErrors[field];

          if (field === "full_name") newErrors.name = message;
          else if (field === "mobile_number") newErrors.phoneNumber = message;
          else if (field === "experience_years") newErrors.experience = message;
          else if (field === "hourly_rate") newErrors.hourlyRate = message;
          else if (field === "categories") newErrors.subjects = message;
          else if (field === "description") newErrors.bio = message;
          else newErrors[field] = message;
        });

        setErrors((prev) => ({ ...prev, ...newErrors }));
        setShouldScroll(true);

        setFormMessage({
          type: "error",
          text: "⚠️ Please correct the highlighted errors and try again.",
        });
      } else {
        setFormMessage({
          type: "error",
          text: "❌ Something went wrong. Please try again later.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 text-center">
          <h2 className="text-2xl font-bold text-white">Tutor Registration</h2>
          <p className="text-white mt-2">
            Share your knowledge and inspire students
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
              Personal Information
            </h3>

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
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <ImageIcon className="w-10 h-10 mb-1 text-green-600" />
                    <p className="text-xs">Upload Photo</p>
                  </div>
                )}

                {/* Upload button overlay */}
                <div className="absolute bottom-2 right-2 bg-green-600 p-2 rounded-full text-white shadow-md">
                  <Upload className="w-4 h-4" />
                </div>

                {/* File input */}
                <input
                  id="profilePhoto"
                  type="file"
                  name="profile_image"
                  accept="image/*"
                  onChange={handleProfileInputChange}
                  className="hidden"
                />
              </label>

              {/* Close / Remove button */}
              {preview && (
                <button
                  type="button"
                  onClick={() => {
                    setPreview(null);
                    setFormData((prev) => ({ ...prev, profile_image: null }));
                    document.getElementById("profilePhoto").value = "";
                  }}
                  className="mt-2 flex items-center gap-1 text-sm text-red-600 hover:text-red-700 transition"
                >
                  <X className="w-4 h-4" /> Remove
                </button>
              )}

              <p className="text-xs text-gray-500 mt-2">PNG, JPG up to 5MB</p>
              {errors.profile_image && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.profile_image}
                </p>
              )}
            </div>

            {/* Name & Email */}
            <div ref={errorRefs.name}>
              <FormInput
                name="full_name"
                placeholder="Enter your Full Name"
                value={formData.full_name}
                onChange={handleChange}
                hasError={errors.name}
                innerRef={errorRefs.name}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div ref={errorRefs.email}>
              <FormInput
                type="email"
                name="email"
                placeholder="Enter your Email"
                value={formData.email}
                onChange={handleChange}
                hasError={errors.email}
                innerRef={errorRefs.email}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone + Gender */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div ref={errorRefs.phoneNumber}>
                <div className="flex gap-3">
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

                  <div className="flex-1">
                    <input
                      type="tel"
                      name="mobile_number"
                      value={formData.mobile_number}
                      onChange={handlePhoneChange}
                      placeholder="Phone Number *"
                      ref={errorRefs.phoneNumber}
                      className={`w-full py-2 px-4 border ${
                        errors.phoneNumber
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-md placeholder-gray-400 outline-none focus:ring-0 focus:border-primary`}
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>
                </div>
              </div>

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

            {/* Password + Confirm Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative" ref={errorRefs.password}>
                <FormInput
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password *"
                  value={formData.password}
                  onChange={handleChange}
                  hasError={errors.password}
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

              <div className="relative" ref={errorRefs.confirmPassword}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password *"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setErrors((prev) => ({ ...prev, confirmPassword: "" })); // ✅ clear error while typing
                  }}
                  ref={errorRefs.confirmPassword}
                  className={`w-full py-2 px-4 pr-10 border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md placeholder-gray-400 outline-none focus:ring-0 focus:border-primary`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3.5 text-gray-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Location & Professional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
              Location Information
            </h3>
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

            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mt-6">
              Professional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div ref={errorRefs.qualification}>
                <FormInput
                  name="qualification"
                  placeholder="Highest Qualification *"
                  value={formData.qualification}
                  onChange={handleChange}
                  hasError={errors.qualification}
                  innerRef={errorRefs.qualification}
                />
                {errors.qualification && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.qualification}
                  </p>
                )}
              </div>
              <div ref={errorRefs.experience}>
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
                  innerRef={errorRefs.experience}
                />

                {errors.experience && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.experience}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div ref={errorRefs.hourlyRate}>
                <FormInput
                  type="text" // 👈 stays text
                  name="hourly_rate"
                  placeholder="Hourly Rate (₹) *"
                  value={formData.hourly_rate}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      // ✅ allow only digits
                      handleChange(e); // call your existing handler
                    }
                  }}
                  hasError={errors.hourlyRate}
                  innerRef={errorRefs.hourlyRate}
                />
                {errors.hourlyRate && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.hourlyRate}
                  </p>
                )}
              </div>

              <div
                ref={(el) => {
                  errorRefs.subjects.current = el;
                  subjectRef.current = el;
                }}
                className="relative"
              >
                <input
                  type="text"
                  name="categories"
                  placeholder="Subjects You Teach *"
                  value={subjectInput}
                  onChange={handleSubjectChange}
                  ref={errorRefs.subjects}
                  className={`w-full py-2 px-4 border ${
                    errors.subjects ? "border-red-500" : "border-gray-300"
                  } rounded-md placeholder-gray-400 outline-none focus:ring-0 focus:border-primary`}
                  autoComplete="off"
                  autoCorrect="off"
                />
                {errors.subjects && (
                  <p className="text-red-500 text-xs mt-1">{errors.subjects}</p>
                )}

                {/* ✅ Suggestions Dropdown */}
                {showSuggestions && filteredSubjects.length > 0 && (
                  <ul className="absolute w-full border rounded-md bg-white shadow-md mt-2 max-h-60 overflow-y-auto z-10">
                    {filteredSubjects.map((sub) => (
                      <li
                        key={sub.id}
                        onClick={() => handleSelectSubject(sub)}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                        dangerouslySetInnerHTML={{
                          __html: highlightMatch(sub.label, subjectInput),
                        }}
                      />
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div ref={errorRefs.availableDays}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Days *
              </label>
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
                      className={`flex items-center space-x-2 border p-2 rounded-md cursor-pointer hover:bg-gray-50`}
                    >
                      <input
                        type="checkbox"
                        value={day}
                        checked={isChecked}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData((prev) => ({
                              ...prev,
                              available_days: [...prev.available_days, day],
                            }));
                          } else {
                            setFormData((prev) => ({
                              ...prev,
                              available_days: prev.available_days.filter(
                                (d) => d !== day
                              ),
                            }));
                          }
                          setErrors((prev) => ({ ...prev, availableDays: "" })); // ✅ clear error
                        }}
                        className="h-4 w-4 text-green-600 outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 active:ring-0 active:ring-offset-0 appearance-none checked:bg-green-600 checked:border-green-600"
                      />
                      <span
                        className={`${
                          isChecked ? "text-black font-medium" : "text-gray-400"
                        }`}
                      >
                        {day}
                      </span>
                    </label>
                  );
                })}
              </div>

              {errors.availableDays && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.availableDays}
                </p>
              )}
            </div>

            <div ref={errorRefs.bio}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio *
              </label>
              <textarea
                name="description"
                placeholder="Tell us about yourself, your teaching style, and experience..."
                value={formData.description}
                onChange={handleChange}
                ref={errorRefs.bio}
                rows="4"
                className={`w-full px-4 py-3 border ${
                  errors.bio ? "border-red-500" : "border-gray-300"
                } rounded-md outline-none focus:ring-0 focus:border-primary transition`}
              />
              {errors.bio && (
                <p className="text-red-500 text-xs mt-1">{errors.bio}</p>
              )}
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
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 px-6 rounded-xl font-medium text-white transition-all flex items-center justify-center ${
              isSubmitting
                ? "bg-green-400 cursor-not-allowed"
                : "bg-gradient-to-r from-green-500 to-teal-600 shadow-md hover:shadow-lg"
            }`}
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin h-5 w-5 text-white mr-2" />
                Processing...
              </>
            ) : (
              "Create Tutor Profile"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default TutorRegisterForm;
