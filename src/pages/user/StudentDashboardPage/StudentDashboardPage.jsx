import { useState } from "react";
import { Bell, Menu, Search, Star, History, Users, Send } from "lucide-react";

import FormInput from "../../../components/studentAndTutor/FormInput/FormInput";
import DashboardSidebar from "../../../components/studentAndTutor/DashboardSidebar/DashboardSidebar";
import DefaultButton from "../../../components/common/DefaultButton/DefaultButton";
import TutorSmallCard from "../../../components/studentAndTutor/TutorSmallCard/TutorSmallCard";
import { useAuth } from "../../../Context/userAuthContext";

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
  const { userDetails } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  console.log(userDetails, "userDetails in student dashboard");
  

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
              <Menu size={24} />
            </button>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Student Dashboard
            </h1>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-green-100 rounded-md shadow text-center">
              <p className="text-lg font-semibold text-green-700">{userDetails?.assigned_tutors?.length || 0}</p>
              <p className="text-sm text-gray-600">Assigned Tutors</p>
            </div>
            <div className="p-4 bg-blue-100 rounded-md shadow text-center">
              <p className="text-lg font-semibold text-blue-700">7</p>
              <p className="text-sm text-gray-600">Recommended Tutors</p>
            </div>
            <div className="p-4 bg-yellow-100 rounded-md shadow text-center">
              <p className="text-lg font-semibold text-yellow-700">4</p>
              <p className="text-sm text-gray-600">Favourite Tutors</p>
            </div>
            <div className="p-4 bg-purple-100 rounded-md shadow text-center">
              <p className="text-lg font-semibold text-purple-700">10</p>
              <p className="text-sm text-gray-600">Notifications</p>
            </div>
          </div>

          <div className="bg-white rounded-md shadow p-6 mb-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Find Tutors
            </h2>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1">
                <FormInput
                  name="search"
                  placeholder="Search tutors by name, subject, or city..."
                />
              </div>

              {/* Search Button */}
              <DefaultButton buttonText="Search" />
            </div>
          </div>

          <div className="bg-white rounded-md shadow p-6 mb-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Recommended Tutors
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
          </div>


          <div className="bg-white rounded-md shadow p-6 mb-6">
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
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-md shadow p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
              <Bell size={20} /> Notifications
            </h2>
            <ul className="space-y-3">
              <li className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <Bell size={18} className="text-green-600" /> New tutor available:{" "}
                <span className="font-medium">Mr. Sharma</span>
              </li>
              <li className="p-3 bg-gray-50 rounded-lg shadow-sm">
                ✅ Your enquiry was sent successfully.
              </li>
              <li className="p-3 bg-gray-50 rounded-lg shadow-sm">
                ⭐ You added <span className="font-medium">Ms. Priya</span> to
                favourites.
              </li>
              <li className="p-3 bg-gray-50 rounded-lg shadow-sm">
                📅 Demo class scheduled for tomorrow at 6 PM.
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default StudentDashboardPage;
