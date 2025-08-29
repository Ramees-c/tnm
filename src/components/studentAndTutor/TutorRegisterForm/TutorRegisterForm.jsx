import { useState, useRef, useEffect } from "react";
import { FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import FormInput from "../FormInput/FormInput";
import { Upload, ImageIcon, X } from "lucide-react";
import axios from "axios";

const subjectsList = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Computer Science",
  "History",
  "Geography",
  "Economics",
  "Accountancy",
  "Political Science",
  "Sociology",
  "Psychology",
  "Business Studies",
  "Environmental Science",
];

function TutorRegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "91",
    phoneNumber: "",
    password: "",
    profilePhoto: null,
    gender: "",
    city: "",
    state: "",
    pincode: "",
    qualification: "",
    experience: "",
    hourlyRate: "",
    subjects: "",
    bio: "",
    availableDays: [],
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [preview, setPreview] = useState(null);
  const [shouldScroll, setShouldScroll] = useState(false);

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

  const handleCountryCodeChange = (value) => {
    setFormData({ ...formData, countryCode: value });
    setErrors((prev) => ({ ...prev, countryCode: "" }));
  };

  const handlePhoneChange = (e) => {
    const onlyNums = e.target.value.replace(/\D/g, "");
    setFormData({ ...formData, phoneNumber: onlyNums });
    setErrors((prev) => ({ ...prev, phoneNumber: "" }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required";

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.countryCode)
      newErrors.countryCode = "Country code is required";
    if (!formData.phoneNumber)
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
    if (!formData.experience) newErrors.experience = "Experience is required";
    if (!formData.hourlyRate) newErrors.hourlyRate = "Hourly rate is required";
    if (!formData.subjects) newErrors.subjects = "Subjects are required";
    if (!formData.availableDays || formData.availableDays.length === 0) {
      newErrors.availableDays = "Please select at least one available day";
    }
    if (!formData.bio) newErrors.bio = "Bio is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Recursive function to flatten categories and all nested subcategories
  const flattenCategories = (categories, rootCategory = "", chain = []) => {
    let result = [];

    categories.forEach((category) => {
      const currentRoot = rootCategory || category.name;

      // build label chain (exclude root from chain list)
      if (rootCategory) {
        const cleanChain = [...chain].filter((c) => c !== currentRoot);

        const label =
          cleanChain.length > 0
            ? `${category.name} in ${cleanChain
                .reverse()
                .join(" in ")} (${currentRoot})`
            : `${category.name} (${currentRoot})`;

        result.push({
          id: category.id,
          name: category.name,
          label,
          parent: currentRoot,
        });
      }

      // Recurse deeper
      if (category.subcategories && category.subcategories.length > 0) {
        result = result.concat(
          flattenCategories(category.subcategories, currentRoot, [
            ...chain,
            category.name,
          ])
        );
      }
    });

    return result;
  };

  // ✅ Subject input change
  const handleSubjectChange = async (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, subjects: value }));
    setErrors((prev) => ({ ...prev, subjects: "" }));

    if (!value.trim()) {
      setFilteredSubjects([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const res = await axios.get(
        "/api/category-list/"
      );

      if (res.data && Array.isArray(res.data)) {
        const allSubcategories = flattenCategories(res.data);

        const matches = allSubcategories.filter((sub) =>
          sub.label.toLowerCase().includes(value.toLowerCase())
        );

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
  const handleSelectSubject = (label) => {
    setFormData((prev) => ({ ...prev, subjects: label })); // full label in input
    setShowSuggestions(false);
    setFilteredSubjects([]); // clear dropdown
  };

  // ✅ Highlight typed text
  const highlightMatch = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(
      regex,
      (match) => `<span class="text-green-400 font-semibold">${match}</span>`
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setShouldScroll(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const { confirmPassword, ...rest } = formData;
      const fullPhone = `+${formData.countryCode}${formData.phoneNumber}`;

      console.log("📤 Data to submit:", { ...rest, phone: fullPhone });

      alert("Registration successful! We'll contact you soon.");
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      alert("Something went wrong. Please try again.");
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
                  name="profilePhoto"
                  accept="image/*"
                  onChange={(e) => {
                    handleChange(e);
                    if (e.target.files && e.target.files[0]) {
                      setPreview(URL.createObjectURL(e.target.files[0]));
                    }
                  }}
                  className="hidden"
                />
              </label>

              {/* Close / Remove button */}
              {preview && (
                <button
                  type="button"
                  onClick={() => {
                    setPreview(null);
                    setFormData((prev) => ({ ...prev, profilePhoto: null }));
                    document.getElementById("profilePhoto").value = "";
                  }}
                  className="mt-2 flex items-center gap-1 text-sm text-red-600 hover:text-red-700 transition"
                >
                  <X className="w-4 h-4" /> Remove
                </button>
              )}

              <p className="text-xs text-gray-500 mt-2">PNG, JPG up to 5MB</p>
            </div>

            {/* Name & Email */}
            <div ref={errorRefs.name}>
              <FormInput
                name="name"
                placeholder="Enter your Full Name"
                value={formData.name}
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
                      onChange={handleCountryCodeChange}
                      inputClass={`!w-full !h-12 !text-gray-700 !rounded-lg !outline-none !border ${
                        errors.countryCode
                          ? "!border-red-500"
                          : "!border-gray-300"
                      } focus:!ring-0 focus:!border-green-500`}
                      buttonClass={`!h-12 !rounded-lg !border ${
                        errors.countryCode
                          ? "!border-red-500"
                          : "!border-gray-300"
                      } !bg-white`}
                      dropdownClass="!bg-white !text-gray-700 !rounded-lg !border-gray-200 !shadow-md"
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
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handlePhoneChange}
                      placeholder="Phone Number *"
                      ref={errorRefs.phoneNumber}
                      className={`w-full h-12 px-4 border ${
                        errors.phoneNumber
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg placeholder-gray-400 outline-none focus:ring-0 focus:border-primary`}
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
                  className={`w-full h-12 px-4 pr-10 border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg placeholder-gray-400 outline-none focus:ring-0 focus:border-primary`}
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
                  name="experience"
                  placeholder="Teaching Experience (years) *"
                  value={formData.experience}
                  onChange={handleChange}
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
                  name="hourlyRate"
                  placeholder="Hourly Rate (₹) *"
                  value={formData.hourlyRate}
                  onChange={handleChange}
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
                ref={errorRefs.subjects}
                className="relative"
                ref={subjectRef}
              >
                <input
                  type="text"
                  name="subjects"
                  placeholder="Subjects You Teach *"
                  value={formData.subjects}
                  onChange={handleSubjectChange}
                  ref={errorRefs.subjects}
                  className={`w-full h-12 px-4 border ${
                    errors.subjects ? "border-red-500" : "border-gray-300"
                  } rounded-lg placeholder-gray-400 outline-none focus:ring-0 focus:border-primary`}
                />
                {errors.subjects && (
                  <p className="text-red-500 text-xs mt-1">{errors.subjects}</p>
                )}

                {/* ✅ Suggestions Dropdown */}
                {showSuggestions && filteredSubjects.length > 0 && (
                  <ul className="absolute w-full border rounded-lg bg-white shadow-md mt-2 max-h-60 overflow-y-auto z-10">
                    {filteredSubjects.map((sub) => (
                      <li
                        key={sub.id}
                        onClick={() => handleSelectSubject(sub.label)}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                        dangerouslySetInnerHTML={{
                          __html: highlightMatch(sub.label, formData.subjects),
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
                  const isChecked = formData.availableDays.includes(day);
                  return (
                    <label
                      key={day}
                      className={`flex items-center space-x-2 border p-2 rounded-lg cursor-pointer hover:bg-gray-50`}
                    >
                      <input
                        type="checkbox"
                        value={day}
                        checked={isChecked}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData((prev) => ({
                              ...prev,
                              availableDays: [...prev.availableDays, day],
                            }));
                          } else {
                            setFormData((prev) => ({
                              ...prev,
                              availableDays: prev.availableDays.filter(
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
                name="bio"
                placeholder="Tell us about yourself, your teaching style, and experience..."
                value={formData.bio}
                onChange={handleChange}
                ref={errorRefs.bio}
                rows="4"
                className={`w-full px-4 py-3 border ${
                  errors.bio ? "border-red-500" : "border-gray-300"
                } rounded-lg outline-none focus:ring-0 focus:border-primary transition`}
              />
              {errors.bio && (
                <p className="text-red-500 text-xs mt-1">{errors.bio}</p>
              )}
            </div>
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
