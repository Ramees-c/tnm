import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
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
  {
    to: "/tutorDashboard",
    label: "Dashboard",
    icon: <LayoutDashboard size={20} />,
  },
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
  { to: "/studentDashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
  { to: "/assignedTutorsPage", label: "Assigned Tutors", icon: <Users size={20} /> },
  { to: "", label: "Tutors", icon: <Users size={20} /> },
  { to: "", label: "Notifications", icon: <MessageSquare size={20} /> },
];

function DashboardSidebar({ role = "student", open, setOpen }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const location = useLocation();

  const { user, handleLogout, userDetails } = useAuth(); // ✅ Get user + logout from context

  const links = role === "tutor" ? tutorLinks : studentLinks;

  const navigate = useNavigate();

  useEffect(() => {
    if (isMobile && open) {
      document.body.style.overflow = "hidden"; // 🔒 stop background scroll
    } else {
      document.body.style.overflow = "auto"; // 🔓 restore scroll
    }

    return () => {
      document.body.style.overflow = "auto"; // cleanup on unmount
    };
  }, [open, isMobile]);

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
        } w-72 lg:w-64 xl:w-72 bg-gradient-to-b from-green-600 to-green-800 text-white shadow-xl rounded-none lg:rounded-md
  transform transition-transform duration-300 z-50
  ${isMobile ? (open ? "translate-x-0" : "-translate-x-full") : "translate-x-0"}
  flex flex-col
  `}
      >
        {/* Close Button (only visible on mobile) */}
        {isMobile && (
          <button
            onClick={() => setOpen(false)}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
            title="Close Sidebar"
          >
            <X size={20} />
          </button>
        )}
        {/* Sidebar inner container with scroll */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {/* 🔹 Top-left Home Button */}
          <button
            onClick={() => navigate("/")}
            className="absolute top-3 left-2 p-2 rounded-full bg-white/20 transition"
            title="Go to Home"
          >
            <Home size={24} />
          </button>
          {/* Profile */}
          <div className="flex flex-col items-center mt-12 border-b border-white/20 relative">
            <div className="relative">
              <img
                src={
                  userDetails?.role === "student"
                    ? `${MEDIA_URL}${userDetails?.profile_photo}`
                    : `${MEDIA_URL}${userDetails?.profile_image}`
                }
                alt="Profile"
                className="w-16 h-16 lg:w-24 lg:h-24 rounded-full border-4 border-white shadow-md object-cover"
              />
              {/* Edit Button */}
              <button
                className="absolute -bottom-1 -right-1 bg-white text-green-700 p-1 rounded-full shadow hover:bg-green-100 transition-colors"
                onClick={() => setShowEdit(true)}
                title="Edit Profile"
              >
                <Edit3 size={14} />
              </button>
            </div>

            <div className="mt-3 text-center">
              <h2 className="text-md xl:text-xl font-semibold break-words max-w-full">
                {userDetails?.full_name}
              </h2>
              <p className="text-sm md:text-lg text-white/70">
                {userDetails?.role === "tutor" ? "Tutor" : "Student"}
              </p>
            </div>
          </div>

          {/* Links */}
          <nav className="px-4 py-6 space-y-2">
            {links.map(({ to, label, icon },i) => {
              const isActive = location.pathname === to;
              const isNotification = label === "Notifications"; 
    const notificationCount = userDetails?.notification_count || 0; 
              return (
                <Link
        key={i}
        to={to}
        className={`flex items-center justify-between gap-3 px-4 py-3 rounded-md transition-all text-xs lg:text-sm xl:text-md ${
          isActive
            ? "bg-white text-green-700 font-semibold shadow-md"
            : "hover:bg-white/20"
        }`}
        onClick={() => isMobile && setOpen(false)}
      >
        <div className="flex items-center gap-3">
          {icon}
          <span>{label}</span>
        </div>

        {/* 🔔 Notification Badge */}
        {isNotification && notificationCount > 0 && (
          <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {notificationCount}
          </span>
        )}
      </Link>
              );
            })}
          </nav>
        </div>

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
        type="confirm"
        message="Are you sure you want to logout?"
        onYes={handleLogout}
        onNo={handleLogoutNo}
      />

      {/* Profile Edit Popup */}
      <ProfileEditPopup
        isOpen={showEdit}
        onClose={() => setShowEdit(false)}
        initialData={user}
      />
    </>
  );
}

export default DashboardSidebar;
