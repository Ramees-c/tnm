import { useEffect, useState } from "react";
import {
  ToggleLeft,
  ToggleRight,
  Bell,
  BarChart2,
  Menu,
  X,
} from "lucide-react";

import { CreditCard, Calendar, CheckCircle, ArrowUpCircle } from "lucide-react";
import DashboardSidebar from "../../../components/studentAndTutor/DashboardSidebar/DashboardSidebar";
import { useAuth } from "../../../Context/userAuthContext";
import { Link } from "react-router-dom";
import axios from "axios";
import ToastMessage from "../../../components/studentAndTutor/ToastMessage/ToastMessage";

function TutorDashboardPage() {
  const [active, setActive] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggedTutorDetails, setLoggedTutorDetails] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [toastOpen, setToastOpen] = useState(false);

  const { userDetails, token, isMailVerified } = useAuth();


  useEffect(() => {
    if (userDetails?.role === "tutor") {
      setLoggedTutorDetails(userDetails);
    }
  }, [userDetails]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get("/api/notify/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        // take only latest 5
        setNotifications(res.data.slice(0, 5));
      } catch (err) {
        console.error("Failed to load notifications", err);
        setError("Unable to fetch notifications.");
      }
    };

    fetchNotifications();
  }, [token]);

   useEffect(() => {
    if (isMailVerified) {
      setToastOpen(true);
    }
  }, [isMailVerified]);

  // ✅ Remove subject
  const handleRemoveSubject = (index) => {
    setSelectedSubjects((prev) => prev.filter((_, i) => i !== index));
  };

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
          {/* ✅ Mobile Menu Button before Title */}
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
              <Menu size={24} />
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Tutor Dashboard
            </h1>
          </div>

          {/* Overview Cards */}
          <div className="bg-white rounded-md shadow p-4 sm:p-6 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-100 rounded-lg shadow text-center">
                <p className="text-lg font-semibold text-blue-700">
                  {loggedTutorDetails?.assigned_students?.length || 0}
                </p>
                <p className="text-sm text-gray-600">Assigned Students</p>
              </div>
              <div className="p-4 bg-yellow-100 rounded-lg shadow text-center">
                <p className="text-lg font-semibold text-yellow-700">
                  {loggedTutorDetails?.categories?.length || 0}
                </p>
                <p className="text-sm text-gray-600">Selected Subjects</p>
              </div>
              <div className="p-4 bg-green-100 rounded-lg shadow text-center">
                <p className="text-lg font-semibold text-green-700">
                  {notifications.length || 0}
                </p>
                <p className="text-sm text-gray-600">Notifications</p>
              </div>
            </div>
          </div>

          {/* ✅ Selected Subjects Section */}
          <div className="bg-white rounded-md shadow p-4 sm:p-6 mb-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-3">
              Selected Subjects
            </h2>

            {loggedTutorDetails?.categories?.length > 0 ? (
              <div className="flex flex-col gap-5 rounded-md p-3 bg-gray-50">
                {loggedTutorDetails?.categories?.map((subject) => (
                  <span
                    key={subject.id}
                    className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-md text-sm md:text-md font-medium shadow-sm"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm italic">
                No subjects selected yet.
              </p>
            )}
          </div>

          {/* Subscription Status */}
          {userDetails?.payment_history ? (
            <div className="bg-white rounded-md shadow-md p-6 sm:p-8 mb-6 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 border border-green-100">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Subscription
                </h2>
                <div className="grid xl:grid-cols-3 gap-8 text-gray-700">
                  <p className="flex items-center gap-2">
                    <CreditCard size={18} className="text-green-600" />
                    Plan:{" "}
                    <span className="font-semibold text-green-700">
                      {userDetails.payment_history.plan_name}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <CreditCard size={18} className="text-blue-600" />
                    Price:{" "}
                    <span className="font-medium text-sm md:text-md">
                      {userDetails.payment_history.actual_price} /{" "}
                      {getDurationInMonths(
                        userDetails.payment_history.created_at,
                        userDetails.payment_history.expiry_date
                      )}{" "}
                      months
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar size={18} className="text-purple-600" />
                    Start Date:{" "}
                    <span className="font-medium text-sm md:text-md">
                      {userDetails.payment_history.created_at?.split(" ")[0]}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar size={18} className="text-red-600" />
                    Expiry Date:{" "}
                    <span className="font-medium text-red-500 text-sm md:text-md">
                      {userDetails.payment_history.expiry_date?.split(" ")[0]}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle size={18} className="text-green-600" />
                    Status:{" "}
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      Active
                    </span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/tutorSubscription">
                  <button className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-lg shadow hover:bg-green-700 transition text-sm md:text-md">
                    <ArrowUpCircle size={18} /> Upgrade
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-md shadow-md p-6 sm:p-8 mb-6 text-center text-gray-600">
              No plan subscribed
            </div>
          )}

          {/* Active/Inactive Toggle */}
          <div className="bg-white rounded-md shadow p-4 sm:p-6 mb-6 flex justify-between items-center">
            <h2 className="text-lg sm:text-xl font-semibold">Profile Status</h2>
            <button
              onClick={() => setActive(!active)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg shadow bg-gray-100 hover:bg-gray-200"
            >
              {active ? (
                <>
                  <ToggleRight size={20} className="text-green-600" /> Active
                </>
              ) : (
                <>
                  <ToggleLeft size={20} className="text-red-600" /> Inactive
                </>
              )}
            </button>
          </div>

          {/* Stats Section */}
          <div className="bg-white rounded-md shadow p-4 sm:p-6 mb-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
              <BarChart2 size={20} /> Stats
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-purple-100 rounded-lg shadow text-center">
                <p className="text-lg font-semibold text-purple-700">150</p>
                <p className="text-sm text-gray-600">Profile Visits</p>
              </div>
              <div className="p-4 bg-pink-100 rounded-lg shadow text-center">
                <p className="text-lg font-semibold text-pink-700">20</p>
                <p className="text-sm text-gray-600">Enquiries</p>
              </div>
              <div className="p-4 bg-indigo-100 rounded-lg shadow text-center">
                <p className="text-lg font-semibold text-indigo-700">5</p>
                <p className="text-sm text-gray-600">Reviews</p>
              </div>
            </div>
          </div>

          {/* Notifications Preview */}
          <div className="bg-white rounded-md shadow p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
              Notifications
            </h2>
            <div className="space-y-4">
              {notifications.map((note) => (
                <div
                  key={note.id}
                  className="p-3 bg-green-100 rounded-md shadow-sm flex items-center gap-3"
                >
                  <Bell size={18} className="text-green-600" />

                  {/* Message + Time */}
                  <div className="flex-1">
                    <p className="text-gray-800">{note.message}</p>
                    <span className="text-xs text-gray-500">
                      {" "}
                      {timeAgo(note.created_at)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
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
