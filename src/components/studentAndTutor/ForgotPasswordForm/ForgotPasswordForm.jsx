import React, { useState } from "react";
import DefaultButton from "../../common/DefaultButton/DefaultButton";
import FormInput from "../FormInput/FormInput";
import axios from "axios";
import OtpModal from "../../common/OtpModal/OtpModal";

import { useNavigate } from "react-router-dom";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSuccessMessage } from "../../../Context/SuccessMessageProvider";
import API_BASE from "../../../API/API";

function ForgotPasswordForm({ onBackToLogin }) {
  const { showSuccess } = useSuccessMessage();

  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({}); // field-level errors

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpError, setOtpError] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isSendingOtp, setIsSendingOtp] = useState(false);

  const validate = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Identifier validation
    if (!identifier.trim()) {
      errors.identifier = "Email or phone number is required";
    } else if (!emailRegex.test(identifier) && isNaN(identifier)) {
      errors.identifier = "Enter a valid email or phone number";
    }

    // Password validation
    if (!newPassword) {
      errors.newPassword = "Password is required";
    } else if (newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters";
    } else if (!/[0-9]/.test(newPassword)) {
      errors.newPassword = "Password must contain at least one number";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
      errors.newPassword =
        "Password must contain at least one special character";
    }

    // Confirm password validation
    if (!confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Step 1: Request OTP
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSendingOtp(true);

    try {
      const response = await axios.post(`${API_BASE}/forget-password/`, {
        step: "request_otp",
        identifier,
      });
      setShowOtpModal(true);
    } catch (err) {
      console.log(err);

      setFieldErrors({
        identifier: err.response?.data?.error || "Something went wrong",
      });
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Resend OTP (without validating password again)
  const handleResendOtp = async () => {
    setOtpError("");
    try {
      const response = await axios.post(`${API_BASE}/forget-password/`, {
        step: "request_otp",
        identifier,
      });
      console.log("Resend response:", response.data);
    } catch (err) {
      setOtpError(err.response?.data?.error || "Failed to resend OTP");
    }
  };

  // Step 2: Verify OTP + reset password
  const handleOtpVerify = async (enteredOtp) => {
    setOtpError("");
    if (!validate()) return;

    try {
      const response = await axios.post(`${API_BASE}/forget-password/`, {
        step: "verify_otp",
        identifier,
        otp: enteredOtp,
        new_password: newPassword,
      });
      setShowOtpModal(false);
      onBackToLogin();
      setIdentifier("");
      setNewPassword("");
      setConfirmPassword("");
      setFieldErrors({});
      showSuccess("password reset successful!");
    } catch (err) {
      setOtpError("Invalid OTP");
      throw err;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-md shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-green-600 py-5 text-center">
          <h1 className="text-2xl font-bold text-white">Reset Password</h1>
          <p className="text-green-100 mt-1 text-sm">
            Enter your email/phone, new password and confirm password
          </p>
        </div>

        <div className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Identifier */}
            <div>
              <label
                htmlFor="identifier"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email or Phone
              </label>
              <FormInput
                type="text"
                id="identifier"
                placeholder="Enter email or phone"
                value={identifier}
                hasError={fieldErrors.identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
              {fieldErrors.identifier && (
                <p className="text-red-500 text-xs mt-1">
                  {fieldErrors.identifier}
                </p>
              )}
            </div>

            {/* New Password */}
            <div className="relative">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                New Password
              </label>
              <FormInput
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                placeholder="Enter new password"
                value={newPassword}
                hasError={fieldErrors.newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 top-[40%] right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {fieldErrors.newPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {fieldErrors.newPassword}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <FormInput
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm new password"
                value={confirmPassword}
                hasError={fieldErrors.confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 top-[40%] right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {fieldErrors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {fieldErrors.confirmPassword}
                </p>
              )}
            </div>

            <DefaultButton
              buttonText={isSendingOtp ? "Sending..." : "Send OTP"}
              type="submit"
              buttonFullwidth
              disabled={isSendingOtp}
            />
          </form>

          <div className="text-center text-sm text-gray-600 mt-6">
            Remembered your password?{" "}
            <button
              type="button"
              onClick={onBackToLogin}
              className="font-medium text-green-500 hover:underline transition-colors duration-200"
            >
              Back to Login
            </button>
          </div>
        </div>

        {showOtpModal && (
          <OtpModal
            isOpen={showOtpModal}
            phoneOrEmail={identifier}
            onClose={() => setShowOtpModal(false)}
            onSubmit={handleOtpVerify}
            onResend={handleResendOtp}
            otpError={otpError}
            setOtpError={setOtpError}
          />
        )}
      </div>
    </div>
  );
}

export default ForgotPasswordForm;
