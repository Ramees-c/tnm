import { useState, useEffect } from "react";
import { Bell, Menu } from "lucide-react";
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

  const { token, isMailVerified } = useAuth();

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
      } finally {
      }
    };

    fetchNotifications();
  }, [token]);

  useEffect(() => {
    if (isMailVerified) {
      setToastOpen(true);
    }
  }, [isMailVerified]);

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
    <div className="flex min-h-screen bg-gray-50">
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
              className="lg:hidden p-2 rounded-lg shadow bg-white hover:bg-gray-100 transition"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2">
              Notifications
            </h1>
          </div>

          {/* Content */}

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
