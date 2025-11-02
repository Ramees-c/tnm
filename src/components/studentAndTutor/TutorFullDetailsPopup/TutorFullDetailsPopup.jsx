import React, { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  BookOpen,
  MapPin,
  Award,
  DollarSign,
  Calendar,
  User,
  Briefcase,
  FileText,
  X,
  Landmark,
  Building2,
} from "lucide-react";
import API_BASE, { MEDIA_URL } from "../../../API/API";

import axios from "axios";
import { useAuth } from "../../../Context/userAuthContext";
import ConfirmMessagePopup from "../../common/ConfirmMessagePopup/ConfirmMessagePopup";
import { useNavigate } from "react-router-dom";
import { useSuccessMessage } from "../../../Context/SuccessMessageProvider";
import ContactAdminPopup from "../ContactAdminPopup/ContactAdminPopup";

function TutorFullDetailsPopup({
  isOpen,
  onClose,
  tutor,
  media,
  onRefresh,
  isChangeMode,
  oldTutorId,
}) {
  const navigate = useNavigate();

  const [showFullBio, setShowFullBio] = useState(false);
  const [studentPlan, setStudentPlan] = useState([]);
  const [showMessagePopup, setShowMessagePopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { token, userDetails, refreshUserDetails } = useAuth();
  const { showSuccess } = useSuccessMessage();

  const [showAdminPopup, setShowAdminPopup] = useState(false);

  const adminEmails = ["info@tutor-nearme.com", "admin@tutor-nearme.com"];
  const adminPhones = ["+916282228560", "+918590228560"];

  const showMessage = (message) => {
    setPopupMessage(message);
    setShowMessagePopup(true);
  };

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (isOpen) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      body.style.paddingRight = `${scrollBarWidth}px`; // prevent layout shift
    } else {
      html.style.overflow = "";
      body.style.overflow = "";
      body.style.paddingRight = "";
    }

    return () => {
      html.style.overflow = "";
      body.style.overflow = "";
      body.style.paddingRight = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const getStudentPlan = async () => {
      const res = await axios.get(`${API_BASE}/plans/students/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setStudentPlan(res.data);
    };

    getStudentPlan();
  }, [token]);

  if (!isOpen) return null;

  const availableDaysArray =
    typeof tutor.available_days === "string"
      ? tutor.available_days.split(",")
      : Array.isArray(tutor.available_days)
      ? tutor.available_days
      : [];

  // ✅ Razorpay Payment Handler
  const handlePayTutor = async () => {
    try {
      // 1️⃣ Create order
      const createOrderRes = await axios.post(
        `${API_BASE}/create-order/`,
        {
          tutor_id: tutor.tutor_id,
          plan_id: studentPlan[0]?.id,
          amount: studentPlan[0]?.price,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      const { order_id, amount, currency, key } = createOrderRes.data;

      // 2️⃣ Open Razorpay popup
      const options = {
        key: key,
        amount: amount.toString(),
        currency: currency || "INR",
        name: "Tutor Payment",
        description: `Payment to ${tutor.full_name}`,
        image: "/logo.png", // optional
        order_id: order_id,
        handler: async function (response) {
          // 3️⃣ Verify Payment
          const verifyRes = await axios.post(
            `${API_BASE}/verify-payment/`,
            {
              payment_id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
              signature: response.razorpay_signature,
              plan_id: studentPlan[0]?.id,
            },
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );

          showMessage("Payment successful: " + verifyRes.data.message);
          if (onRefresh) onRefresh();
          await refreshUserDetails();
        },
        prefill: {
          name: userDetails?.full_name,
          email: userDetails?.email,
          contact: userDetails?.mobile_number,
        },
        theme: {
          color: "#16a34a",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

      razorpay.on("payment.failed", function (response) {
        showMessage("Payment Failed: " + response.error.description);
      });
    } catch (error) {
      console.error("Payment error:", error);
      showMessage(error.response?.data.error || "Failed to process payment.");
    }
  };

  const handleChangeTutor = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${API_BASE}/change-tutor/`,
        {
          old_tutor_id: oldTutorId,
          new_tutor_id: tutor.tutor_id,
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      );

      await refreshUserDetails();
      if (onRefresh) onRefresh();
      navigate(`/assignedTutorsPage`);

      onClose();
      showSuccess("Tutor changed successfully!");
    } catch (error) {
      console.error("Change Tutor Error:", error);
      showMessage(
        error.response?.data?.detail ||
          error.response?.data?.new_tutor_id ||
          "Failed to change tutor. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 p-4">
      <div className="bg-white rounded-md shadow-2xl w-full max-w-2xl p-3 md:p-6 relative overflow-y-auto max-h-[90vh] scrollbar-hide transform transition-transform duration-300 scale-100">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black transition-colors"
          onClick={onClose}
        >
          <X size={22} />
        </button>

        {/* Top Section */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-left">
          <img
            src={
              media
                ? `${MEDIA_URL}${tutor.profile_image}`
                : `${tutor.profile_image}`
            }
            alt={tutor.full_name}
            className="w-20 h-20 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-green-200 shadow-md flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600 truncate">
              {tutor.full_name}
            </h2>

            {tutor.qualification && (
              <div className="flex items-center gap-2 mt-1">
                <Award size={17} className="text-green-500" />
                <span className="truncate text-xs sm:text-sm font-medium text-gray-800">
                  {tutor.qualification}
                </span>
              </div>
            )}

            {(tutor.city || tutor.state) && (
              <div className="flex items-center gap-2 mt-1">
                <MapPin size={17} className="text-green-500" />
                <span className="truncate text-xs sm:text-sm font-medium text-gray-800">
                  {[tutor.city, tutor.state].filter(Boolean).join(", ")}
                </span>
              </div>
            )}
            <div>
              {/* ✅ Added Nearby Town and Landmark */}
              {(tutor.near_by_town || tutor.landmark) && (
                <div className="flex flex-col gap-1 mt-1 text-gray-800 text-xs sm:text-sm">
                  {tutor.near_by_town && (
                    <div className="flex items-center gap-2">
                      <Building2
                        size={15}
                        className="text-green-500 flex-shrink-0"
                      />
                      <span className="font-medium">
                        Nearby Town:{" "}
                        <span className="font-normal">
                          {tutor.near_by_town}
                        </span>
                      </span>
                    </div>
                  )}
                  {tutor.landmark && (
                    <div className="flex items-center gap-2">
                      <Landmark
                        size={15}
                        className="text-green-500 flex-shrink-0"
                      />
                      <span className="font-medium">
                        Landmark:{" "}
                        <span className="font-normal">{tutor.landmark}</span>
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {tutor.hourly_rate && (
            <div className="text-sm md:text-lg font-bold text-green-700 mt-2 sm:mt-0 whitespace-nowrap flex items-center gap-1">
              ₹{tutor.hourly_rate}/hr
            </div>
          )}
        </div>

        <div>
          {/* Info Badges */}
          <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-gray-600 mt-3 justify-start">
            {tutor.gender && (
              <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full hover:scale-105 transition-transform">
                <User size={14} />
                <span className="text-xs sm:text-sm">{tutor.gender}</span>
              </div>
            )}
            {tutor.experience_years !== null &&
              tutor.experience_years !== undefined && (
                <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full hover:scale-105 transition-transform">
                  <Briefcase size={14} />
                  <span className="text-xs sm:text-sm">
                    {tutor.experience_years} yrs exp
                  </span>
                </div>
              )}
          </div>
        </div>

        {tutor.categories && tutor.categories.length > 0 ? (
          <div className="mt-4">
            <h4 className="text-sm sm:text-base font-semibold text-gray-700 mb-2 text-center sm:text-left">
              Selected Subjects
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              {tutor.categories.map((category, idx) => {
                const parts = category.split(" in ");
                const mainCategory = parts[0];
                const subCategory = parts[1] || "";

                return (
                  <div
                    key={idx}
                    className="bg-green-50 border border-green-200 rounded-md p-1 flex flex-col hover:shadow-sm transition-shadow duration-300"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-green-700">
                      {mainCategory}
                    </span>
                    {subCategory && (
                      <span className="text-xs sm:text-xs text-green-900 mt-1">
                        {subCategory}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-sm italic mt-2 text-center sm:text-left">
            No subjects selected yet.
          </p>
        )}

        {/* Available Days */}
        {availableDaysArray.length > 0 && (
          <div className="mt-4 text-left">
            <h4 className="text-sm font-semibold text-gray-800 mb-2">
              Available Days
            </h4>
            <div className="flex flex-wrap items-center gap-2">
              <Calendar size={14} className="text-green-500" />
              {availableDaysArray.map((day, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium"
                >
                  {day.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Contact Info */}
        {tutor.mobile_number !== null && tutor.mobile_number && (
          <div className="mt-4 text-left">
            <h4 className="text-sm font-semibold text-gray-800 mb-2">
              Contact Info
            </h4>
            <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 text-gray-600 text-xs sm:text-sm">
              {tutor.email && (
                <a
                  href={`mailto:${tutor.email}`}
                  className="flex items-center gap-2 break-all hover:text-green-700 font-medium"
                >
                  <Mail size={16} className="text-green-500 flex-shrink-0" />
                  <span className="truncate">{tutor.email}</span>
                </a>
              )}
              {tutor.mobile_number && (
                <a
                  href={`tel:${tutor.mobile_number}`}
                  className="flex items-center gap-2 break-all hover:text-green-700 font-medium"
                >
                  <Phone size={16} className="text-green-500 flex-shrink-0" />
                  <span>{tutor.mobile_number}</span>
                </a>
              )}
            </div>
          </div>
        )}

        {/* Bio / Description */}
        {tutor.description && (
          <div className="mt-4 text-left">
            <h4 className="text-sm font-semibold text-gray-800 mb-2">Bio</h4>
            <div className="flex items-start gap-2 text-gray-800 text-xs sm:text-sm">
              <p className="flex-1">
                {showFullBio || tutor.description.length <= 150
                  ? tutor.description
                  : tutor.description.slice(0, 150) + "..."}
                {tutor.description.length > 150 && (
                  <button
                    onClick={() => setShowFullBio(!showFullBio)}
                    className="ml-1 text-green-600 underline text-xs"
                  >
                    {showFullBio ? "Show less" : "Read more"}
                  </button>
                )}
              </p>
            </div>
          </div>
        )}

        {/* Action Message + Buttons */}
        {!isChangeMode && tutor?.id !== userDetails?.tutors?.[0]?.id && (
          <div className="mt-6 text-center sm:text-start">
            <p className="text-xs sm:text-xs text-gray-600 mb-3">
              Contact details for this tutor are available after payment. You
              can either proceed with payment or contact the admin for further
              assistance.
            </p>

            <div className="flex flex-col sm:flex-row justify-center sm:justify-start gap-3">
              <button
                onClick={handlePayTutor}
                className="px-5 py-2 bg-green-600 text-white rounded-md text-sm sm:text-base font-semibold shadow-md hover:bg-green-700 transition-all w-full"
              >
                Pay ₹{studentPlan[0]?.price}/-
              </button>

              <button
                onClick={() => setShowAdminPopup(true)}
                className="px-5 py-2 border border-green-600 text-green-700 rounded-md text-sm sm:text-base font-semibold hover:bg-green-50 transition-all w-full"
              >
                Contact Admin
              </button>
            </div>
          </div>
        )}

        {/* Only show Change Tutor button in Change Mode */}
        {isChangeMode && (
          <div className="mt-4 text-center">
            <button
              onClick={handleChangeTutor}
              className={`px-4 py-2 w-full rounded-md text-white font-semibold transition-colors
        ${
          loading
            ? "bg-gradient-to-r from-green-500 to-green-600 cursor-not-allowed"
            : "bg-gradient-to-r from-green-500 to-green-600"
        }`}
              disabled={loading}
            >
              {loading ? "Changing..." : "Select this Tutor"}
            </button>
          </div>
        )}

        <ConfirmMessagePopup
          isOpen={showMessagePopup}
          type="alert"
          message={popupMessage}
          onClose={() => setShowMessagePopup(false)}
        />

        <ContactAdminPopup
          isOpen={showAdminPopup}
          onClose={() => setShowAdminPopup(false)}
          adminEmails={adminEmails}
          adminPhones={adminPhones}
        />
      </div>
    </div>
  );
}

export default TutorFullDetailsPopup;
