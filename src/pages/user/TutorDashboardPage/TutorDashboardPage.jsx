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

function TutorDashboardPage() {
  const [active, setActive] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggedTutorDetails, setLoggedTutorDetails] = useState({});

  const { userDetails } = useAuth();

  useEffect(() => {
    if (userDetails?.role === "tutor") {
      setLoggedTutorDetails(userDetails);
    }
  }, [userDetails]);

  // ✅ Remove subject
  const handleRemoveSubject = (index) => {
    setSelectedSubjects((prev) => prev.filter((_, i) => i !== index));
  };

  console.log(loggedTutorDetails);

  loggedTutorDetails?.categories?.map((subject) => {
    return console.log(subject, "fsdfsdhl");
  });

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
                <p className="text-lg font-semibold text-green-700">8</p>
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
                    className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-md text-md font-medium shadow-sm"
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
          <div className="bg-white rounded-md shadow-md p-6 sm:p-8 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border border-green-100">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Subscription
              </h2>
              <div className="grid lg:grid-cols-3 gap-8 text-gray-700">
                <p className="flex items-center gap-2">
                  <CreditCard size={18} className="text-green-600" />
                  Plan:{" "}
                  <span className="font-semibold text-green-700">
                    Basic Monthly
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <CreditCard size={18} className="text-blue-600" />
                  Price: <span className="font-medium">₹499 / month</span>
                </p>
                <p className="flex items-center gap-2">
                  <Calendar size={18} className="text-purple-600" />
                  Start Date: <span className="font-medium">01 Sep 2025</span>
                </p>
                <p className="flex items-center gap-2">
                  <Calendar size={18} className="text-red-600" />
                  Expiry Date:{" "}
                  <span className="font-medium text-red-500">30 Sep 2025</span>
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-green-600" />
                  Status:{" "}
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                    Active
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <ArrowUpCircle size={18} className="text-indigo-600" />
                  Next Billing: <span className="font-medium">01 Oct 2025</span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-lg shadow hover:bg-green-700 transition">
                <ArrowUpCircle size={18} /> Upgrade
              </button>
            </div>
          </div>

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
