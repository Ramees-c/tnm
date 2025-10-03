import { useState, useEffect } from "react";
import { Bell, Menu, X } from "lucide-react";
import DashboardSidebar from "../../../components/studentAndTutor/DashboardSidebar/DashboardSidebar";
import axios from "axios";
import { useAuth } from "../../../Context/userAuthContext";
import Loading from "../../../components/common/Loading/Loading";
import ToastMessage from "../../../components/studentAndTutor/ToastMessage/ToastMessage";

function NotificationPage({ role = "tutor" }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");
  const [toastOpen, setToastOpen] = useState(false);

  const { token, isMailVerified, refreshUserDetails, userDetails } = useAuth();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get("/api/notify/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setNotifications(res.data);
      } catch (err) {
        console.error("Failed to load notifications", err);
        setError("Unable to fetch notifications.");
      }
    };

    fetchNotifications();
  }, [token]);

  useEffect(() => {
    if (userDetails?.mail_verified === false) {
      setToastOpen(true);
    } else {
      setToastOpen(false);
    }
  }, [userDetails]);

  // Delete notification API
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/notify-delete/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      // Update UI immediately
      setNotifications((prev) => prev.filter((note) => note.id !== id));
      await refreshUserDetails();
    } catch (err) {
      console.error("Failed to delete notification", err);
    }
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
          role={role}
          open={sidebarOpen}
          setOpen={setSidebarOpen}
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
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu size={27} />
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2">
              Notifications
            </h1>
          </div>

          {/* Content */}
          <div className="space-y-4">
            {notifications.length === 0 ? (
              <div className="text-center py-10 text-gray-500 flex flex-col items-center gap-2">
                <Bell size={32} className="text-gray-400" />
                <p className="text-sm sm:text-base">
                  No notifications available
                </p>
              </div>
            ) : (
              notifications.map((note) => (
                <div
                  key={note.id}
                  className="p-3 bg-green-100 rounded-md shadow-sm flex items-center gap-3 justify-between"
                >
                  {/* Left Side */}
                  <div className="flex items-center gap-3 flex-1">
                    <Bell size={18} className="text-green-600" />
                    <div>
                      <p className="text-gray-800 text-sm md:text-md">
                        {note.message}
                      </p>
                      <span className="text-xs text-gray-500">
                        {timeAgo(note.created_at)}
                      </span>
                    </div>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="p-1 rounded-full hover:bg-red-200 transition"
                  >
                    <X size={18} className="text-red-600" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {toastOpen && (
        <ToastMessage
          message={isMailVerified}
          isOpen={toastOpen}
          onClose={() => setToastOpen(false)}
          type="warning"
        />
      )}
    </div>
  );
}

export default NotificationPage;
