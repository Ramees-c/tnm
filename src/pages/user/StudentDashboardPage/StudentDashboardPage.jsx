import { useEffect, useState } from "react";
import {
  Bell,
  Menu,
  Search,
  Star,
  History,
  Users,
  Send,
  X,
} from "lucide-react";

import FormInput from "../../../components/studentAndTutor/FormInput/FormInput";
import DashboardSidebar from "../../../components/studentAndTutor/DashboardSidebar/DashboardSidebar";
import DefaultButton from "../../../components/common/DefaultButton/DefaultButton";
import TutorSmallCard from "../../../components/studentAndTutor/TutorSmallCard/TutorSmallCard";
import { useAuth } from "../../../Context/userAuthContext";
import axios from "axios";
import ToastMessage from "../../../components/studentAndTutor/ToastMessage/ToastMessage";

const tutors = [
  {
    id: 1,
    name: "John Doe",
    subject: "Mathematics",
    experience: 5,
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    name: "Sarah Lee",
    subject: "Science",
    experience: 3,
    image:
      "https://plus.unsplash.com/premium_photo-1689977927774-401b12d137d6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 3,
    name: "David Smith",
    subject: "English",
    experience: 4,
    image:
      "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 4,
    name: "Emma Watson",
    subject: "Coding",
    experience: 6,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 5,
    name: "Michael Johnson",
    subject: "Physics",
    experience: 7,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 6,
    name: "Sophia Brown",
    subject: "Chemistry",
    experience: 2,
    image: "https://randomuser.me/api/portraits/women/50.jpg",
  },
  {
    id: 7,
    name: "James Wilson",
    subject: "Biology",
    experience: 8,
    image: "https://randomuser.me/api/portraits/men/41.jpg",
  },
  {
    id: 8,
    name: "Olivia Taylor",
    subject: "History",
    experience: 5,
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 9,
    name: "William Martinez",
    subject: "Geography",
    experience: 3,
    image: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  {
    id: 10,
    name: "Ava Garcia",
    subject: "English",
    experience: 6,
    image: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    id: 11,
    name: "Daniel Rodriguez",
    subject: "Mathematics",
    experience: 9,
    image: "https://randomuser.me/api/portraits/men/21.jpg",
  },
  {
    id: 12,
    name: "Mia Hernandez",
    subject: "Science",
    experience: 4,
    image: "https://randomuser.me/api/portraits/women/33.jpg",
  },
  {
    id: 13,
    name: "Benjamin Clark",
    subject: "Coding",
    experience: 2,
    image: "https://randomuser.me/api/portraits/men/55.jpg",
  },
  {
    id: 14,
    name: "Charlotte Lewis",
    subject: "Chemistry",
    experience: 5,
    image: "https://randomuser.me/api/portraits/women/25.jpg",
  },
  {
    id: 15,
    name: "Henry Walker",
    subject: "Physics",
    experience: 7,
    image: "https://randomuser.me/api/portraits/men/66.jpg",
  },
  {
    id: 16,
    name: "Amelia Hall",
    subject: "Biology",
    experience: 3,
    image: "https://randomuser.me/api/portraits/women/88.jpg",
  },
  {
    id: 17,
    name: "Elijah Allen",
    subject: "History",
    experience: 6,
    image: "https://randomuser.me/api/portraits/men/80.jpg",
  },
  {
    id: 18,
    name: "Harper Young",
    subject: "Geography",
    experience: 2,
    image: "https://randomuser.me/api/portraits/women/60.jpg",
  },
  {
    id: 19,
    name: "Lucas King",
    subject: "Mathematics",
    experience: 4,
    image: "https://randomuser.me/api/portraits/men/70.jpg",
  },
  {
    id: 20,
    name: "Isabella Scott",
    subject: "English",
    experience: 5,
    image: "https://randomuser.me/api/portraits/women/90.jpg",
  },
];

function StudentDashboardPage() {
  const { userDetails, token, refreshUserDetails, isMailVerified } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [recommentedTutors, setRecommentedTutors] = useState([]);
  const [toastOpen, setToastOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [tutors, setTutors] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const recommendedTutorsList = [
    {
      id: 1,
      full_name: "Ananya Sharma",
      email: "ananya.sharma@example.com",
      mobile_number: "+91 9876543210",
      gender: "Female",
      city: "Bengaluru",
      state: "Karnataka",
      qualification: "M.Sc. Mathematics",
      categories: ["Mathematics", "Physics"],
      profile_image: "https://randomuser.me/api/portraits/women/44.jpg",
      is_approved: true,
      mail_verified: true,
    },
    {
      id: 2,
      full_name: "Rahul Verma",
      email: "rahul.verma@example.com",
      mobile_number: "+91 9123456789",
      gender: "Male",
      city: "Mumbai",
      state: "Maharashtra",
      qualification: "B.Tech Computer Science",
      categories: ["Programming", "Data Structures", "Web Development"],
      profile_image: "https://randomuser.me/api/portraits/men/32.jpg",
      is_approved: true,
      mail_verified: false,
    },
    {
      id: 3,
      full_name: "Priya Nair",
      email: "priya.nair@example.com",
      mobile_number: "+91 9988776655",
      gender: "Female",
      city: "Kochi",
      state: "Kerala",
      qualification: "Ph.D. English Literature",
      categories: ["English", "Creative Writing"],
      profile_image: "https://randomuser.me/api/portraits/women/68.jpg",
      is_approved: false,
      mail_verified: true,
    },
  ];

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

  // useEffect(() => {
  //   const fetchRecommentedStudents = async () => {
  //     try {
  //       const res = await axios.get("/api/recommendations/", {
  //         headers: {
  //           Authorization: `Token ${token}`,
  //         },
  //       });

  //       console.log(res.data.recommendations, "sfjkd");
  //       setRecommentedTutors(res.data.recommendations, "sfjkd")
  //     } catch (err) {
  //       console.error("Failed to load recommented tutors", err);
  //     }
  //   };

  //   fetchRecommentedStudents();
  // }, [token]);

  // ✅ Fetch all approved tutors on mount
  // Filter tutors based on multiple fields
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredTutors([]);
      setHasSearched(false); // no query typed
      return;
    }

    const fetchTutors = async () => {
      setLoading(true);
      setHasSearched(true);

      try {
        const res = await axios.get(
          `/api/tutors/search/?q=${searchQuery.trim()}`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setFilteredTutors(res.data);
      } catch (err) {
        console.error("Search failed", err);
        setFilteredTutors([]);
      } finally {
        setLoading(false);
      }
    };

    // Optional: debounce typing (300ms delay)
    const debounce = setTimeout(fetchTutors, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery, token]);

  // 🔹 Filter tutors based on multiple fields
  const handleSearch = async (e) => {
    e.preventDefault();

    const query = searchQuery.trim();
    if (!query) {
      setFilteredTutors([]); // do not show all tutors
      setHasSearched(true); // still show "Search result"
      return;
    }

    setLoading(true);
    setHasSearched(true);

    try {
      const res = await axios.get(`/api/tutors/search/?q=${query}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setFilteredTutors(res.data);
    } catch (err) {
      console.error("Search failed", err);
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
          {/* ✅ Mobile Menu Button + Title */}
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
              <Menu size={27} />
            </button>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Student Dashboard
            </h1>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-green-100 rounded-md shadow text-center">
              <p className="text-lg font-semibold text-green-700">
                {userDetails?.tutors?.length || 0}
              </p>
              <p className="text-sm text-gray-600">Assigned Tutors</p>
            </div>
            <div className="p-4 bg-purple-100 rounded-md shadow text-center">
              <p className="text-lg font-semibold text-purple-700">
                {userDetails?.categories?.length || 0}
              </p>
              <p className="text-sm text-gray-600">Selected Subjects</p>
            </div>
            <div className="p-4 bg-blue-100 rounded-md shadow text-center">
              <p className="text-lg font-semibold text-blue-700">7</p>
              <p className="text-sm text-gray-600">Recommended Tutors</p>
            </div>
            <div className="p-4 bg-yellow-100 rounded-md shadow text-center">
              <p className="text-lg font-semibold text-yellow-700">4</p>
              <p className="text-sm text-gray-600">Favourite Tutors</p>
            </div>
          </div>

          {/* ✅ Selected Subjects Section */}
          <div className="bg-white rounded-md shadow p-4 sm:p-6 mb-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-3">
              Selected Subjects
            </h2>

            {userDetails?.categories?.length > 0 ? (
              <div className="flex flex-wrap gap-3 rounded-md p-3 bg-gray-50">
                {userDetails.categories.map((category, idx) => (
                  <span
                    key={idx}
                    className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-md text-sm md:text-md font-medium shadow-sm"
                  >
                    {category}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm italic">
                No subjects selected yet.
              </p>
            )}
          </div>

          <div className="bg-white rounded-md shadow p-6 mb-6">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-4">
              {loading ? (
                <p className="col-span-full text-center">Loading...</p>
              ) : !hasSearched ? (
                <p className="col-span-full text-center text-gray-500">
                  Search result
                </p>
              ) : filteredTutors.length > 0 ? (
                filteredTutors.map((tutor) => (
                  <TutorSmallCard key={tutor.id} tutor={tutor} />
                ))
              ) : (
                <p className="col-span-full text-gray-500 text-center">
                  No tutors found.
                </p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-md shadow p-6 mb-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Recommended Tutors
            </h2>

            <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
              {recommendedTutorsList.map((tutor) => (
                <TutorSmallCard tutor={tutor} />
              ))}
            </div>
          </div>

          {/* <div className="bg-white rounded-md shadow p-6 mb-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Popular Tutors
            </h2>

            <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
              {tutors.map((tutor) => (
                <TutorSmallCard
                  key={tutor.id}
                  image={tutor.image}
                  name={tutor.name}
                  subject={tutor.subject}
                  experience={tutor.experience}
                />
              ))}
            </div>
          </div> */}

          {/* Notifications Preview */}
          <div className="bg-white rounded-md shadow p-4 sm:p-6">
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
