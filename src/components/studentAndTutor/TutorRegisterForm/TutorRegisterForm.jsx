// import { useState } from "react";
// import { FaSpinner } from "react-icons/fa";
// import FormInput from "../FormInput/FormInput";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";

// function TutorRegisterForm() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     countryCode: "91", // default India 🇮🇳
//     phoneNumber: "",
//     gender: "",
//     category: "",
//     location: "",
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Country Code change
//   const handleCountryCodeChange = (value, country) => {
//     setFormData({ ...formData, countryCode: value });
//   };

//   // Phone Number change
//   const handlePhoneChange = (e) => {
//     const onlyNums = e.target.value.replace(/\D/g, ""); // remove non-numeric
//     setFormData({ ...formData, phoneNumber: onlyNums });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     // Combine country code + phone number before sending
//     const fullPhone = `+${formData.countryCode}${formData.phoneNumber}`;
//     const submitData = { ...formData, phone: fullPhone };

//     await new Promise((resolve) => setTimeout(resolve, 1500));

//     console.log(submitData);
//     setIsSubmitting(false);

//     alert("Registration successful! We'll contact you soon.");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center py-8">
//       <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-center">
//           <h2 className="text-xl font-bold text-white">Join as a Tutor</h2>
//           <p className="text-white mt-2 text-xs md:text-sm">
//             Share your knowledge and inspire students
//           </p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="p-6 space-y-5">
//           <FormInput
//             name="name"
//             placeholder="Enter your Full Name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />

//           <FormInput
//             type="email"
//             name="email"
//             placeholder="Enter your Email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />

//           {/* ✅ Country Code + Phone in separate columns */}
//           <div className="grid grid-cols-3 gap-3">
//             <div className="col-span-1">
//               <PhoneInput
//                 country={"in"}
//                 value={formData.countryCode}
//                 onChange={handleCountryCodeChange}
//                 inputClass="!w-full !h-11 !text-gray-700 !rounded-md !outline-none !border !cursor-pointer !border-gray-300 focus:!ring-0 focus:!border-primary"
//                 buttonClass="!h-11"
//                 dropdownClass="!bg-white !text-gray-700"
//                 enableSearch={true}
//                 inputProps={{
//                   name: "countryCode",
//                   required: true,
//                 }}
//               />
//             </div>
//             <div className="col-span-2">
//               <input
//                 type="tel"
//                 name="phoneNumber"
//                 value={formData.phoneNumber}
//                 onChange={handlePhoneChange}
//                 placeholder="Enter your Phone Number"
//                 className="w-full px-4 py-2 flex justify-between items-center border placeholder-gray-400 border-gray-300 rounded-md cursor-pointer outline-none focus:ring-0 bg-white focus:border-primary transition"
//                 required
//               />
//             </div>
//           </div>

//           <FormInput
//             name="gender"
//             placeholder="Select Gender"
//             value={formData.gender}
//             onChange={handleChange}
//             select
//             options={[
//               { label: "Select Gender", value: "" },
//               { label: "Male", value: "male" },
//               { label: "Female", value: "female" },
//               { label: "Other", value: "other" },
//             ]}
//             required
//           />

//           <FormInput
//             name="category"
//             placeholder="Subject or Category you Teach"
//             value={formData.category}
//             onChange={handleChange}
//             required
//           />

//           <FormInput
//             name="location"
//             placeholder="Pincode or Locality (e.g., 560076 or JP Nagar)"
//             value={formData.location}
//             onChange={handleChange}
//             required
//           />

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all flex items-center justify-center ${
//               isSubmitting
//                 ? "bg-green-300 cursor-not-allowed"
//                 : "bg-gradient-to-r from-green-500 to-green-600 shadow-md hover:shadow-lg"
//             }`}
//           >
//             {isSubmitting ? (
//               <>
//                 <FaSpinner className="animate-spin h-5 w-5 text-white mr-2" />
//                 Processing...
//               </>
//             ) : (
//               "Create Tutor Profile"
//             )}
//           </button>

//           <p className="text-xs text-center text-gray-500 mt-4">
//             By signing up, you agree to our{" "}
//             <a href="#" className="text-primary hover:underline font-bold">
//               Terms of Use
//             </a>{" "}
//             and{" "}
//             <a href="#" className="text-primary hover:underline font-bold">
//               Privacy Policy
//             </a>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default TutorRegisterForm;

import { useState } from "react";
import { FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import FormInput from "../FormInput/FormInput";

import { Upload, ImageIcon, X } from "lucide-react";

function TutorRegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "91",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
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
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0], // store only one file (first one)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value, // for text, email, password, etc.
      });
    }
  };

  const handleCountryCodeChange = (value) => {
    setFormData({ ...formData, countryCode: value });
  };

  const handlePhoneChange = (e) => {
    const onlyNums = e.target.value.replace(/\D/g, "");
    setFormData({ ...formData, phoneNumber: onlyNums });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      setIsSubmitting(false);
      return;
    }

    const fullPhone = `+${formData.countryCode}${formData.phoneNumber}`;
    const submitData = { ...formData, phone: fullPhone };

    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log(submitData);
    setIsSubmitting(false);
    alert("Registration successful! We'll contact you soon.");
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
          {/* Personal Information Section */}
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
                    document.getElementById("profilePhoto").value = ""; // reset input
                  }}
                  className="mt-2 flex items-center gap-1 text-sm text-red-600 hover:text-red-700 transition"
                >
                  <X className="w-4 h-4" /> Remove
                </button>
              )}

              <p className="text-xs text-gray-500 mt-2">PNG, JPG up to 5MB</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                name="name"
                placeholder="Enter your Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <FormInput
                type="email"
                name="email"
                placeholder="Enter your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <div className="w-28">
                  <PhoneInput
                    country={"in"}
                    value={formData.countryCode}
                    onChange={handleCountryCodeChange}
                    inputClass="!w-full !h-12 !text-gray-700 !rounded-lg !outline-none !border !border-gray-300 focus:!ring-0 focus:!border-green-500"
                    buttonClass="!h-12 !rounded-lg !border-gray-300 !bg-white"
                    dropdownClass="!bg-white !text-gray-700 !rounded-lg !border-gray-200 !shadow-md"
                    enableSearch={true}
                    inputProps={{
                      name: "countryCode",
                      required: true,
                    }}
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="Phone Number *"
                    className="w-full h-12 px-4 border border-gray-300 rounded-lg outline-none focus:ring-0 focus:border-primary"
                    required
                  />
                </div>
              </div>

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
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <FormInput
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password *"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3.5 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="relative">
                <FormInput
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password *"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3.5 text-gray-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </div>

          {/* Location Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
              Location Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormInput
                name="city"
                placeholder="City *"
                value={formData.city}
                onChange={handleChange}
                required
              />
              <FormInput
                name="state"
                placeholder="State *"
                value={formData.state}
                onChange={handleChange}
                required
              />
              <FormInput
                name="pincode"
                placeholder="Pincode *"
                value={formData.pincode}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Professional Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
              Professional Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                name="qualification"
                placeholder="Highest Qualification *"
                value={formData.qualification}
                onChange={handleChange}
                required
              />
              <FormInput
                name="experience"
                placeholder="Teaching Experience (years) *"
                value={formData.experience}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                name="hourlyRate"
                placeholder="Hourly Rate (₹) *"
                value={formData.hourlyRate}
                onChange={handleChange}
                required
              />
              <FormInput
                name="subjects"
                placeholder="Subjects You Teach *"
                value={formData.subjects}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio *
              </label>
              <textarea
                name="bio"
                placeholder="Tell us about yourself, your teaching style, and experience..."
                value={formData.bio}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-0 focus:border-primary transition"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
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

          <p className="text-xs text-center text-gray-500 mt-4">
            By signing up, you agree to our{" "}
            <a href="#" className="text-green-600 hover:underline font-medium">
              Terms of Use
            </a>{" "}
            and{" "}
            <a href="#" className="text-green-600 hover:underline font-medium">
              Privacy Policy
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default TutorRegisterForm;
