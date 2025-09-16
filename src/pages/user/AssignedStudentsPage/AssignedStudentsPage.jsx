import { useState } from "react";
import { Menu } from "lucide-react";
import DashboardSidebar from "../../../components/studentAndTutor/DashboardSidebar/DashboardSidebar";
import AssignedStudentCard from "../../../components/studentAndTutor/AssignedStudentCard/AssignedStudentCard";
import { useAuth } from "../../../Context/userAuthContext";

function AssignedStudentsPage() {
  const { userDetails } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [assignedStudents] = useState(userDetails?.assigned_students || []);

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
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg shadow bg-white hover:bg-gray-100 transition"
            >
              <Menu size={24} />
            </button>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2">
              Assigned Students
            </h1>
          </div>

          {/* Students List */}
          {assignedStudents.length > 0 ? (
            <div className="space-y-4">
              {assignedStudents.map((student, i) => (
                <AssignedStudentCard key={i} {...student} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-16">
              <p className="text-gray-500 text-lg font-medium">
                No students assigned
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default AssignedStudentsPage;
