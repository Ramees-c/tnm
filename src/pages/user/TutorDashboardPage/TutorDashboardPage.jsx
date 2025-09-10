import { useState } from "react";
import { ToggleLeft, ToggleRight, Bell, BarChart2, Menu } from "lucide-react";
import DashboardSidebar from "../../../components/studentAndTutor/DashboardSidebar/DashboardSidebar";

function TutorDashboardPage() {
  const [active, setActive] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-0 lg:w-72">
        <DashboardSidebar
          role="tutor"
          open={sidebarOpen}
          setOpen={setSidebarOpen}
           onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full p-4 sm:p-6 transition-all duration-300">
        <div className="max-w-6xl mx-auto">
          {/* ✅ Mobile Menu Button before Title */}
          <div className="flex items-center gap-3 mb-6">
            {/* Show only on mobile/tablet */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu size={24} />
            </button>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Tutor Dashboard
            </h1>
          </div>

          {/* Overview Cards */}
          <div className="bg-white rounded-2xl shadow p-4 sm:p-6 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-green-100 rounded-lg shadow text-center">
                <p className="text-lg font-semibold text-green-700">8</p>
                <p className="text-sm text-gray-600">Active Classes</p>
              </div>
              <div className="p-4 bg-blue-100 rounded-lg shadow text-center">
                <p className="text-lg font-semibold text-blue-700">12</p>
                <p className="text-sm text-gray-600">Students</p>
              </div>
              <div className="p-4 bg-yellow-100 rounded-lg shadow text-center">
                <p className="text-lg font-semibold text-yellow-700">4</p>
                <p className="text-sm text-gray-600">Upcoming Sessions</p>
              </div>
            </div>
          </div>

          {/* Subscription Status */}
          <div className="bg-white rounded-2xl shadow p-4 sm:p-6 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold">Subscription</h2>
              <p className="text-gray-600">
                Plan:{" "}
                <span className="font-medium text-green-600">
                  Basic Monthly
                </span>
              </p>
            </div>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700">
              Upgrade
            </button>
          </div>

          {/* Active/Inactive Toggle */}
          <div className="bg-white rounded-2xl shadow p-4 sm:p-6 mb-6 flex justify-between items-center">
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
          <div className="bg-white rounded-2xl shadow p-4 sm:p-6 mb-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
              <BarChart2 size={20} /> Stats
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
              <div className="p-4 bg-orange-100 rounded-lg shadow text-center">
                <p className="text-lg font-semibold text-orange-700">3</p>
                <p className="text-sm text-gray-600">Notifications</p>
              </div>
            </div>
          </div>

          {/* Notifications Preview */}
          <div className="bg-white rounded-2xl shadow p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
              <Bell size={20} /> Notifications
            </h2>
            <ul className="space-y-3">
              <li className="p-3 bg-gray-50 rounded-lg shadow-sm">
                📢 New student enquiry from{" "}
                <span className="font-medium">Alex</span>.
              </li>
              <li className="p-3 bg-gray-50 rounded-lg shadow-sm">
                ✅ Subscription renewed successfully.
              </li>
              <li className="p-3 bg-gray-50 rounded-lg shadow-sm">
                📅 Upcoming class scheduled for tomorrow.
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default TutorDashboardPage;
