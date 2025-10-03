import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import DashboardSidebar from "../../../components/studentAndTutor/DashboardSidebar/DashboardSidebar";
import TutorSmallCard from "../../../components/studentAndTutor/TutorSmallCard/TutorSmallCard";
import axios from "axios";
import { useAuth } from "../../../Context/userAuthContext";
import ToastMessage from "../../../components/studentAndTutor/ToastMessage/ToastMessage";

function StudentDashboardAllTutorsPage() {
  const { isMailVerified, userDetails } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tutors, setTutors] = useState([]);
  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await axios.get("/api/tutors_list/");

        // ✅ Only keep approved tutors
        const approvedTutors = res.data.filter(
          (tutor) => tutor.is_approved === true
        );

        setTutors(approvedTutors);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTutors();
  }, []);

  useEffect(() => {
    if (userDetails?.mail_verified === false) {
      setToastOpen(true);
    } else {
      setToastOpen(false);
    }
  }, [userDetails]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-0 lg:w-64 xl:w-72">
        <DashboardSidebar
          role="student"
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
              All Tutors
            </h1>
          </div>

          {/* Tutors Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-2">
            {tutors.map((tutor) => (
              <TutorSmallCard key={tutor.id} tutor={tutor} />
            ))}
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

export default StudentDashboardAllTutorsPage;
