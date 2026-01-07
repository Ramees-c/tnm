import { useEffect, useState } from "react";
import {
  ToggleLeft,
  ToggleRight,
  Bell,
  Menu,
  X,
  Users,
  BookOpen,
} from "lucide-react";

import { CreditCard, Calendar, CheckCircle, ArrowUpCircle } from "lucide-react";
import DashboardSidebar from "../../../components/studentAndTutor/DashboardSidebar/DashboardSidebar";
import { useAuth } from "../../../Context/userAuthContext";
import { Link } from "react-router-dom";
import axios from "axios";
import ToastMessage from "../../../components/studentAndTutor/ToastMessage/ToastMessage";
import ConfirmMessagePopup from "../../../components/common/ConfirmMessagePopup/ConfirmMessagePopup";
import API_BASE from "../../../API/API";

function TutorDashboardPage() {
  const [active, setActive] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggedTutorDetails, setLoggedTutorDetails] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [toastOpen, setToastOpen] = useState(false);
  const [confirmActiveModalOpen, setConfirmActiveModalOpen] = useState(false);
  const [refreshNotifications, setRefreshNotifications] = useState(false);

  const { userDetails, token, isMailVerified, refreshUserDetails } = useAuth();

  useEffect(() => {
    if (userDetails?.role === "tutor") {
      setLoggedTutorDetails(userDetails);
      // take active status from backend
      if (typeof userDetails.active_inactive !== "undefined") {
        setActive(userDetails.active_inactive);
      }
    }
  }, [userDetails]);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`${API_BASE}/latest_notify/`, {
        withCredentials: true,
      });

      // Update only if data changed 
      setNotifications((prev) => {
        const prevIds = prev
          .map((n) => n.id)
          .sort()
          .join(",");
        const newIds = res.data
          .map((n) => n.id)
          .sort()
          .join(",");
        return prevIds === newIds ? prev : res.data;
      });
    } catch (err) {
      console.error("Failed to load notifications");
    }
  };

  useEffect(() => {
    if (!token) return;

    fetchNotifications();

    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, [token, refreshNotifications]);

  useEffect(() => {
    if (userDetails?.mail_verified === false) {
      setToastOpen(true);
    } else {
      setToastOpen(false);
    }
  }, [userDetails]);

  

  // Function to calculate months between two dates
  const getDurationInMonths = (created_at, expiry_date) => {
    if (!created_at || !expiry_date) return "";

    // Parse DD-MM-YYYY
    const [cDay, cMonth, cYear] = created_at.split(" ")[0].split("-");
    const [eDay, eMonth, eYear] = expiry_date.split(" ")[0].split("-");

    const startDate = new Date(`${cYear}-${cMonth}-${cDay}`);
    const endDate = new Date(`${eYear}-${eMonth}-${eDay}`);

    // Calculate difference in months
    let months;
    months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
    months -= startDate.getMonth();
    months += endDate.getMonth();

    // If partial month, round up
    if (endDate.getDate() >= startDate.getDate()) months += 0;
    else months -= 1;

    return months;
  };

  function timeAgo(dateString) {
    const [day, month, yearAndTime] = dateString.split("-");
    const [year, time, ampm] = yearAndTime.split(" ");
    const dateObj = new Date(`${year}-${month}-${day} ${time} ${ampm}`);

    const diff = Date.now() - dateObj.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return "Just now";
  }

  // Delete notification API
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/notify-delete/${id}/`, {
        withCredentials: true,
      });
      // Update UI immediately
      setNotifications((prev) => prev.filter((note) => note.id !== id));
      await refreshUserDetails();
    } catch (err) {
      console.error("Failed to delete notification");
    }
  };

  // Add this function inside TutorDashboardPage
  const handleToggleActive = async () => {
    try {
      const newStatus = !active;
      const res = await axios.post(
        `${API_BASE}/tutor_active_inactive/`,
        { active_inactive: newStatus },
        {
          withCredentials: true,
        }
      );

      // update state from backend response
      setActive(res.data.active_inactive);
      setConfirmActiveModalOpen(false);

      // refresh user details in global context
      await refreshUserDetails();
    } catch (err) {
      console.error("Failed to update active status");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-0 lg:w-64 xl:w-72">
        <DashboardSidebar
          role="tutor"
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 w-full p-4 sm:p-6 transition-all duration-300">
        <div className="max-w-6xl mx-auto">
          {/*  Mobile Menu Button before Title */}
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
              <Menu size={24} />
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Tutor Dashboard
            </h1>
          </div>

          {/* Overview Cards */}
          <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-sm p-3 sm:p-5 mb-8 transition-all duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Assigned Students */}
              <div className="p-6 bg-gradient-to-br from-blue-100 to-blue-200 rounded-md shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-500/20 rounded-full">
                   <Users />
                  </div>
                  <p className="text-3xl font-extrabold text-blue-700">
                    {loggedTutorDetails?.assigned_students?.length || 0}
                  </p>
                  <p className="text-sm font-medium text-gray-800">
                    Assigned Students
                  </p>
                </div>
              </div>

              {/* Selected Subjects */}
              <div className="p-6 bg-gradient-to-br from-purple-100 to-purple-200 rounded-md shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 flex items-center justify-center bg-purple-500/20 rounded-full">
                   <BookOpen />
                  </div>
                  <p className="text-3xl font-extrabold text-purple-700">
                    {loggedTutorDetails?.categories?.length || 0}
                  </p>
                  <p className="text-sm font-medium text-gray-800">
                    Selected Subjects
                  </p>
                </div>
              </div>

              {/* Notifications */}
              <div className="p-6 bg-gradient-to-br from-green-100 to-green-200 rounded-md shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 flex items-center justify-center bg-green-500/20 rounded-full">
                    <Bell />
                  </div>
                  <p className="text-3xl font-extrabold text-green-700">
                    {notifications?.length || 0}
                  </p>
                  <p className="text-sm font-medium text-gray-800">
                    Notifications
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Selected Subjects Section */}
          <div className="bg-white rounded-md shadow-sm p-4 sm:p-6 mb-6">
            <h2 className="text-lg sm:text-2xl font-bold mb-4 text-gray-800">
              Selected Subjects
            </h2>

            {userDetails?.categories?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {userDetails.categories.map((category, idx) => {
                  const parts = category.split(" in ");
                  const mainCategory = parts[0]; 
                  const subCategory = parts[1] || ""; 

                  return (
                    <div
                      key={idx}
                      className="bg-green-50 border border-green-200 rounded-md p-2 flex flex-col hover:shadow-sm transition-shadow duration-300"
                    >
                      <span className="text-sm sm:text-base font-semibold text-green-700">
                        {mainCategory}
                      </span>
                      {subCategory && (
                        <span className="text-xs sm:text-sm text-green-900 mt-1">
                          {subCategory}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-400 text-sm italic">
                No subjects selected yet.
              </p>
            )}
          </div>

          {/* Subscription Status */}
          {userDetails?.payment_history ? (
            <div className="bg-white rounded-md shadow-sm p-2 sm:p-8 mb-6 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 border border-green-100">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold mb-4">
                  Subscription
                </h2>
                <div className="grid xl:grid-cols-3 gap-3 xl:gap-8 text-gray-700 text-xs sm:text-sm">
                  <p className="flex items-center gap-2 font-medium">
                    <CreditCard size={18} className="text-green-600" />
                    Plan:{" "}
                    <span className="font-bold text-green-700 text-xs sm:text-sm">
                      {userDetails.payment_history.plan_name}
                    </span>
                  </p>
                  <p className="flex items-center font-medium gap-2">
                    <CreditCard size={18} className="text-blue-600" />
                    Price:{" "}
                    <span className="font-medium text-xs sm:text-sm">
                      {userDetails.payment_history.actual_price} /{" "}
                      {getDurationInMonths(
                        userDetails.payment_history.created_at,
                        userDetails.payment_history.expiry_date
                      )}{" "}
                      months
                    </span>
                  </p>
                  <p className="flex items-center font-medium gap-2">
                    <Calendar size={18} className="text-purple-600" />
                    Start Date:{" "}
                    <span className="font-medium text-xs sm:text-sm">
                      {userDetails.payment_history.created_at?.split(" ")[0]}
                    </span>
                  </p>
                  <p className="flex items-center font-medium gap-2">
                    <Calendar size={18} className="text-red-600" />
                    Expiry Date:{" "}
                    <span className="font-medium text-red-500 text-xs sm:text-sm">
                      {userDetails.payment_history.expiry_date?.split(" ")[0]}
                    </span>
                  </p>
                  <p className="flex items-center font-medium gap-2">
                    <CheckCircle size={18} className="text-green-600" />
                    Status:{" "}
                    <span className="px-2 py-0.5 rounded-full text-xs sm:text-sm font-semibold bg-green-100 text-green-700">
                      Active
                    </span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/tutorSubscription">
                  <button className="flex items-center gap-2 bg-green-600 text-white px-2 py-2 sm:px-5 sm:py-2.5 rounded-md shadow hover:bg-green-700 transition text-xs sm:text-sm">
                    <ArrowUpCircle size={16} /> Upgrade
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-md shadow-sm p-6 sm:p-8 mb-6 text-center text-gray-600">
              No plan subscribed
            </div>
          )}

          {/* Active/Inactive Toggle */}
          <div className="bg-white rounded-md shadow-sm p-2 sm:p-6 mb-6 flex justify-between items-center">
            <h2 className="text-lg sm:text-xl font-semibold">Profile Status</h2>

            {active === null ? (
              <span className="text-gray-500 text-xs sm:text-sm italic">
                Loading...
              </span>
            ) : (
              <button
                onClick={() => setConfirmActiveModalOpen(true)}
                className="flex items-center gap-2 py-1 px-3 sm:px-4 sm:py-2 rounded-md shadow-sm bg-gray-100 hover:bg-gray-200 text-xs sm:text-sm"
              >
                {active ? (
                  <>
                    <ToggleRight size={18} className="text-green-600" /> Active
                  </>
                ) : (
                  <>
                    <ToggleLeft size={20} className="text-red-600" /> Inactive
                  </>
                )}
              </button>
            )}
          </div>

          {/* Confirm Popup */}
          <ConfirmMessagePopup
            isOpen={confirmActiveModalOpen}
            type="confirm"
            message={`Are you sure you want to mark your profile as ${
              active ? "Inactive" : "Active"
            }?`}
            onYes={handleToggleActive}
            onNo={() => setConfirmActiveModalOpen(false)}
          />


          {/* Notifications Preview */}
          <div className="bg-white rounded-md shadow-sm p-2 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
              Notifications
            </h2>

            {notifications.length === 0 ? (
              <div className="text-center py-6 text-gray-500 text-xs sm:text-sm">
                No notifications found.
              </div>
            ) : (
              <div className="space-y-4">
                {notifications.map((note) => (
                  <div
                    key={note.id}
                    className="p-3 bg-green-100 rounded-md shadow-sm flex items-center gap-3"
                  >
                    <Bell size={18} className="text-green-600" />

                    {/* Message + Time */}
                    <div className="flex-1">
                      <p className="text-gray-800 text-xs md:text-sm">
                        {note.message}
                      </p>
                      <span className="text-xs text-gray-500">
                        {timeAgo(note.created_at)}
                      </span>
                    </div>

                    {/* Close Button */}
                    <button
                      onClick={() => handleDelete(note.id)}
                      className="p-1 rounded-full hover:bg-red-200 transition"
                    >
                      <X size={18} className="text-red-600" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {toastOpen && (
          <ToastMessage
            message={isMailVerified}
            isOpen={toastOpen}
            onClose={() => setToastOpen(false)}
            type="warning"
          />
        )}
      </main>
    </div>
  );
}

export default TutorDashboardPage;
