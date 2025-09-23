import { useState } from "react";
import { Menu } from "lucide-react";
import DashboardSidebar from "../../../components/studentAndTutor/DashboardSidebar/DashboardSidebar";
import { useAuth } from "../../../Context/userAuthContext";
import AssignedTutorCard from "../../../components/studentAndTutor/AssignedTutorCard/AssignedTutorCard";

function AssignedTutorsPage() {
  const { userDetails } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [assignedTutors] = useState(
  (userDetails?.assigned_tutors || []).filter(tutor => !tutor.is_rejected)
);
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-0 lg:w-64 xl:w-72">
        <DashboardSidebar
          role="student"
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
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg shadow bg-white hover:bg-gray-100 transition"
            >
              <Menu size={24} />
            </button>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2">
              Assigned Tutors
            </h1>
          </div>

          {/* Tutors List */}
          {assignedTutors.length > 0 ? (
            <div className="space-y-4">
              {assignedTutors.map((tutor, i) => (
                <AssignedTutorCard key={tutor.id} {...tutor} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-16">
              <p className="text-gray-500 text-lg font-medium">
                No tutors assigned
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default AssignedTutorsPage;
