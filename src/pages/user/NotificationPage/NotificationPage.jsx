import { useState } from "react";
import { Bell, Menu } from "lucide-react";
import DashboardSidebar from "../../../components/studentAndTutor/DashboardSidebar/DashboardSidebar";

const notifications = [
  {
    id: 1,
    type: "info",
    icon: <Bell size={18} className="text-green-600" />,
    message: "New student enquiry from Alex Johnson.",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "success",
    icon: <Bell size={18} className="text-green-600" />,
    message: "Subscription renewed successfully.",
    time: "Yesterday",
  },
  {
    id: 3,
    type: "warning",
    icon: <Bell size={18} className="text-green-600" />,
    message: "Upcoming class scheduled for Friday at 7 PM.",
    time: "3 days ago",
  },
  {
    id: 4,
    type: "error",
    icon: <Bell size={18} className="text-green-600" />,
    message: "Payment failed. Please update billing details.",
    time: "1 week ago",
  },
];

function NotificationPage({ role = "tutor" }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
          {/* Header with Mobile Menu */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg shadow bg-white hover:bg-gray-100 transition"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2">
              {role === "tutor" ? "Tutor" : "Student"} Notifications
            </h1>
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {notifications.map((note) => (
              <div
                key={note.id}
                className="bg-white rounded-md shadow p-4 flex items-center gap-3 hover:shadow-md transition"
              >
                {/* Icon wrapper for alignment */}
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100">
                  {note.icon}
                </div>

                {/* Message + Time */}
                <div className="flex-1">
                  <p className="text-gray-800">{note.message}</p>
                  <span className="text-xs text-gray-500">{note.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default NotificationPage;
