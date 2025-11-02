import React, { useState } from "react";
import FormInput from "../FormInput/FormInput";
import DefaultButton from "../../common/DefaultButton/DefaultButton";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../../../assets/images/logo/tnmlogo.png";
import axios from "axios";
import { useAuth } from "../../../Context/userAuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import API_BASE from "../../../API/API";

function LoginForm({ onCreateAccount, onForgotPassword }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" });
    setServerError("");
  };

  // ✅ Validation
  const validate = () => {
    let newErrors = {};

    if (!formData.identifier.trim()) {
      newErrors.identifier = "Email or phone is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Only check email validity
      if (!emailRegex.test(formData.identifier)) {
        // If not email, treat as phone without regex validation
        if (isNaN(formData.identifier)) {
          newErrors.identifier = "Enter a valid email or phone number";
        }
      }
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Submit
  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setServerError("");

    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let payload = { password: formData.password };
      if (emailRegex.test(formData.identifier)) {
        payload.email = formData.identifier;
      } else {
        payload.mobile_number = formData.identifier;
      }

      const response = await axios.post(`${API_BASE}/login/`, payload);

      if (response.data.role === "admin") {
        setServerError("Admins are not allowed to login from here.");
        setIsLoading(false);
        return;
      }

      if (response.data.token) {
        login(response.data); // save token
      } else {
        setServerError("No token received. Please try again.");
        setIsLoading(false);
        return;
      }

      // ✅ Redirect after login
      const redirectPath = location.state?.redirect; // <--- important

      if (redirectPath) {
        navigate(redirectPath, { replace: true });
      } else {
        // normal dashboard
        if (response.data.role === "student") {
          navigate("/studentDashboard", { replace: true });
        } else if (response.data.role === "tutor") {
          if (response?.data?.is_approved) {
            navigate("/tutorDashboard", { replace: true });
          } else {
            setServerError(
              "Your account is not approved yet. Please wait for admin approval."
            );
          }
        } else {
          setServerError("Unknown role. Please contact support.");
        }
      }
    } catch (error) {
      setServerError(
        error.response?.data?.non_field_errors ||
          "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg bg-white rounded-md shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 py-3 text-center">
          <div className="flex items-center justify-center mb-2">
            <div className="bg-white p-2 rounded-full mr-3">
              <img src={logo} alt="Logo" className="w-7 h-7 object-contain" />
            </div>
            <h1 className="text-2xl font-bold text-white">Login</h1>
          </div>
          <p className="text-green-200 mt-1 text-sm">
            Sign in to continue your journey
          </p>
        </div>

        {/* Form */}
        <div className="p-4 md:p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email or Phone */}
            <div>
              <label
                htmlFor="identifier"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email or Phone
              </label>
              <FormInput
                type="text"
                name="identifier"
                id="identifier"
                placeholder="Enter email or phone"
                value={formData.identifier}
                onChange={handleChange}
              />
              {errors.identifier && (
                <p className="text-red-500 text-xs mt-1">{errors.identifier}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <p
                  onClick={onForgotPassword}
                  className="text-sm text-green-500 hover:underline transition-colors duration-200 cursor-pointer"
                >
                  Forgot Password?
                </p>
              </div>
              <div className="relative">
                <FormInput
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Server error */}
            {serverError && (
              <p className="text-red-600 text-sm text-center">{serverError}</p>
            )}

            {/* Login Button */}
            <div className="pt-2">
              <DefaultButton
                buttonText={isLoading ? "Signing in..." : "Login"}
                type="submit"
                buttonFullwidth={true}
                disabled={isLoading}
                className={`transition-all duration-300 ${
                  isLoading ? "opacity-75" : "hover:shadow-md"
                }`}
              />
            </div>

            {/* Sign up option */}
            <div className="text-center text-sm text-gray-600 mt-6">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={onCreateAccount}
                className="font-medium text-green-500 hover:underline transition-colors duration-200"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
