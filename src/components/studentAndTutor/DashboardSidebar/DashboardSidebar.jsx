import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BookOpen,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  Edit3,
  X,
} from "lucide-react";
import ConfirmMessagePopup from "../../common/ConfirmMessagePopup/ConfirmMessagePopup";
import ProfileEditPopup from "../ProfileEditPopup/ProfileEditPopup";
import { useAuth } from "../../../Context/userAuthContext";
import axios from "axios";
import { MEDIA_URL } from "../../../API/API";

const tutorLinks = [
  { to: "/tutorDashboard", label: "Dashboard", icon: <Home size={20} /> },
  {
    to: "/tutorSubscription",
    label: "Subscription",
    icon: <BookOpen size={20} />,
  },
  {
    to: "/assignedStudentsPage",
    label: "Assigned Students",
    icon: <Users size={20} />,
  },
  { to: "/tutorDocument", label: "Documents", icon: <Edit3 size={20} /> },
  {
    to: "/tutornotification",
    label: "Notifications",
    icon: <MessageSquare size={20} />,
  },
];

const studentLinks = [
  { to: "/dashboard", label: "Dashboard", icon: <Home size={20} /> },
  { to: "/courses", label: "My Courses", icon: <BookOpen size={20} /> },
  { to: "/tutors", label: "Tutors", icon: <Users size={20} /> },
  { to: "/messages", label: "Messages", icon: <MessageSquare size={20} /> },
  { to: "/settings", label: "Settings", icon: <Settings size={20} /> },
];

function DashboardSidebar({ role = "student", open, setOpen }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const location = useLocation();

  const { user, handleLogout, userDetails } = useAuth(); // ✅ Get user + logout from context

  const links = role === "tutor" ? tutorLinks : studentLinks;

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setOpen]);

  const handleLogoutNo = () => {
    setLogoutModalOpen(false);
  };

  const handleSave = (updatedData) => {
    console.log("Updated profile:", updatedData);
    // 🔹 Optionally call API to update profile, then update context
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 bottom-0 ${
          isMobile ? "left-0" : "left-2 top-2 bottom-2"
        } w-72 bg-gradient-to-b from-green-600 to-green-800 text-white shadow-xl rounded-none lg:rounded-md
        transform transition-transform duration-300 z-50
        ${
          isMobile
            ? open
              ? "translate-x-0"
              : "-translate-x-full"
            : "translate-x-0"
        }`}
      >
        {/* Profile */}
       {/* Profile */}
<div className="flex flex-col items-center p-6 border-b border-white/20">
  <div className="relative">
    {userDetails?.role === "student" ? (
      <img
        src={`${MEDIA_URL}${userDetails?.profile_photo}`}
        alt="Profile"
        className="w-16 h-16 lg:w-24 lg:h-24 rounded-full border-4 border-white shadow-md object-cover"
      />
    ) : (
      <img
        src={`${MEDIA_URL}${userDetails?.profile_image}`}
        alt="Profile"
        className="w-16 h-16 lg:w-24 lg:h-24 rounded-full border-4 border-white shadow-md object-cover"
      />
    )}
    {/* Edit Button */}
    <button
      className="absolute -bottom-1 -right-1 bg-white text-green-700 p-1 rounded-full shadow hover:bg-green-100 transition-colors"
      onClick={() => setShowEdit(true)}
    >
      <Edit3 size={14} />
    </button>
  </div>

  <div className="mt-3 text-center">
    <h2 className="text-lg md:text-xl font-semibold break-words max-w-full">
      {userDetails?.full_name}
    </h2>
    <p className="text-sm md:text-lg text-white/70">
      {userDetails?.role === "tutor" ? "Tutor" : "Student"}
    </p>
  </div>

  {isMobile && (
    <button
      onClick={() => setOpen(false)}
      className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition"
    >
      <X size={26} />
    </button>
  )}
</div>


        {/* Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
          {links.map(({ to, label, icon }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
                  isActive
                    ? "bg-white text-green-700 font-semibold shadow-md"
                    : "hover:bg-white/20"
                }`}
                onClick={() => isMobile && setOpen(false)}
              >
                {icon}
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/20">
          <button
            onClick={() => setLogoutModalOpen(true)}
            className="flex items-center gap-3 w-full px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 transition font-medium shadow"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <ConfirmMessagePopup
        isOpen={logoutModalOpen}
        message="Are you sure you want to logout?"
        onYes={handleLogout}
        onNo={handleLogoutNo}
      />

      {/* Profile Edit Popup */}
      <ProfileEditPopup
        isOpen={showEdit}
        onClose={() => setShowEdit(false)}
        initialData={user}
        onSubmit={handleSave}
      />
    </>
  );
}

export default DashboardSidebar;
