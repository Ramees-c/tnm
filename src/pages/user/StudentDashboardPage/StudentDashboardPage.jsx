import { useEffect, useState } from "react";
import {
  Bell,
  Menu,
  Users,
  X,
  BookOpen,
  Heart,
} from "lucide-react";

import FormInput from "../../../components/studentAndTutor/FormInput/FormInput";
import DashboardSidebar from "../../../components/studentAndTutor/DashboardSidebar/DashboardSidebar";
import DefaultButton from "../../../components/common/DefaultButton/DefaultButton";
import TutorSmallCard from "../../../components/studentAndTutor/TutorSmallCard/TutorSmallCard";
import { useAuth } from "../../../Context/userAuthContext";
import axios from "axios";
import ToastMessage from "../../../components/studentAndTutor/ToastMessage/ToastMessage";
import API_BASE from "../../../API/API";
import HorizontalTutorList from "../../../components/studentAndTutor/HorizontalTutorList/HorizontalTutorList";

function StudentDashboardPage() {
  const { userDetails, token, refreshUserDetails, isMailVerified } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [recommentedTutors, setRecommentedTutors] = useState([]);
  const [toastOpen, setToastOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [tutors, setTutors] = useState([]);
  const [FavouriteTutors, setFavouriteTutors] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [refreshFavourites, setRefreshFavourites] = useState(false);
  const [refreshNotifications, setRefreshNotifications] = useState(false);

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

  const getFavouriteTutors = async () => {
    const res = await axios.get(`${API_BASE}/student/favorite-tutors/`, {
      withCredentials: true,
    });
    setFavouriteTutors(res.data);
  };

  useEffect(() => {
    getFavouriteTutors();
  }, [token, refreshFavourites]);

  useEffect(() => {
    if (userDetails?.mail_verified === false) {
      setToastOpen(true);
    } else {
      setToastOpen(false);
    }
  }, [userDetails]);

  const fetchRecommentedStudents = async () => {
    try {
      const res = await axios.get(`${API_BASE}/recommendations/`, {
        withCredentials: true,
      });

      setRecommentedTutors(res.data.recommendations);
    } catch (err) {
      console.error("Failed to load recommented tutors");
    }
  };

  useEffect(() => {
    fetchRecommentedStudents();
  }, [token]);

  // Filter tutors based on multiple fields
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredTutors([]);
      setHasSearched(false);
      return;
    }

    const fetchTutors = async () => {
      setLoading(true);
      setHasSearched(true);

      try {
        const res = await axios.get(
          `${API_BASE}/tutors/search/?q=${searchQuery.trim()}`,
          {
            withCredentials: true,
          }
        );
        setFilteredTutors(res.data);
      } catch (err) {
        console.error("Search failed");
        setFilteredTutors([]);
      } finally {
        setLoading(false);
      }
    };

    // debounce typing (300ms delay)
    const debounce = setTimeout(fetchTutors, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery, token]);

  // Filter tutors based on multiple fields
  const handleSearch = async (e) => {
    e.preventDefault();

    const query = searchQuery.trim();
    if (!query) {
      setFilteredTutors([]); 
      setHasSearched(true); 
      return;
    }

    setLoading(true);
    setHasSearched(true);

    try {
      const res = await axios.get(`${API_BASE}/tutors/search/?q=${query}`, {
        withCredentials: true,
      });

      setFilteredTutors(res.data);
    } catch (err) {
      console.error("Search failed");
      setFilteredTutors([]);
    } finally {
      setLoading(false);
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

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-0 lg:w-72">
        <DashboardSidebar
          role="student"
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full lg:w-[calc(100%-18rem)] p-4 sm:p-6 transition-all duration-300 min-h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Mobile Menu Button + Title */}
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
              <Menu size={27} />
            </button>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Student Dashboard
            </h1>
          </div>

          {/* Quick Stats */}
          <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-sm p-3 sm:p-5 mb-8 transition-all duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Assigned Tutors */}
              <div className="p-3 sm:p-4 bg-gradient-to-br from-green-100 to-green-200 rounded-md shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 flex items-center justify-center bg-green-500/20 rounded-full">
                    <Users />
                  </div>
                  <p className="text-3xl font-extrabold text-green-700">
                    {userDetails?.tutors?.length || 0}
                  </p>
                  <p className="text-sm font-medium text-gray-800">
                    Assigned Tutors
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
                    {userDetails?.categories?.length || 0}
                  </p>
                  <p className="text-sm font-medium text-gray-800">
                    Selected Subjects
                  </p>
                </div>
              </div>

              {/* Favourite Tutors */}
              <div className="p-6 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-md shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 flex items-center justify-center bg-yellow-500/20 rounded-full">
                    <Heart />
                  </div>
                  <p className="text-3xl font-extrabold text-yellow-700">
                    {FavouriteTutors?.length || 0}
                  </p>
                  <p className="text-sm font-medium text-gray-800">
                    Favourite Tutors
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
                  const mainCategory = parts[0]; // Big text
                  const subCategory = parts[1] || ""; // Only the first "in" after main

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

          <div className="bg-white rounded-md shadow-sm p-2 sm:p-6 mb-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Find Tutors
            </h2>

            {/* Search & Filter */}
            <form
              className="flex flex-col sm:flex-row gap-4"
              onSubmit={handleSearch}
            >
              <div className="flex-1">
                <FormInput
                  name="search"
                  placeholder="Search tutors by name, subjects, city, state or pincode..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} // 🔹 dynamic update
                />
              </div>
              <DefaultButton buttonText="Search" type="submit" />
            </form>

            {/* Tutors Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-4">
              {loading ? (
                <p className="col-span-full text-center">Loading...</p>
              ) : !hasSearched ? (
                <p className="col-span-full text-center text-gray-500 text-xs md:text-sm">
                  Search result
                </p>
              ) : filteredTutors.length > 0 ? (
                filteredTutors.map((tutor) => (
                  <TutorSmallCard key={tutor.id} tutor={tutor} search={true} />
                ))
              ) : (
                <p className="col-span-full text-gray-500 text-center">
                  No tutors found.
                </p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-md shadow-sm p-2 sm:p-6 mb-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Recommended Tutors
            </h2>

            <HorizontalTutorList
              tutors={recommentedTutors}
              setRefreshFavourites={setRefreshFavourites}
            />
          </div>

          <div className="bg-white rounded-md shadow-sm p-2 sm:p-6 mb-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Favourite Tutors
            </h2>

            {FavouriteTutors && FavouriteTutors.length > 0 ? (
              <HorizontalTutorList
                tutors={FavouriteTutors}
                setRefreshFavourites={setRefreshFavourites}
              />
            ) : (
              <div className="text-gray-500 text-xs sm:text-sm text-center py-6">
                You haven’t added any favourite tutors yet.
              </div>
            )}
          </div>

          {/* Notifications Preview */}
          <div className="bg-white rounded-md shadow-sm p-2 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
              Notifications
            </h2>
            {notifications.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
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

export default StudentDashboardPage;
