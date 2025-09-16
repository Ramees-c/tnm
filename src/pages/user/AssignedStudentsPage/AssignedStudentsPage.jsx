import { useState } from "react";
import { Menu, Users } from "lucide-react";
import DashboardSidebar from "../../../components/studentAndTutor/DashboardSidebar/DashboardSidebar";
import AssignedStudentCard from "../../../components/studentAndTutor/AssignedStudentCard/AssignedStudentCard";
import { useAuth } from "../../../Context/userAuthContext";

function AssignedStudentsPage() {
  const { userDetails } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [assignedStudents, setAssignedStudents] = useState(
    userDetails?.assigned_students || []
  );

  const students = [
    {
      name: "Alex Johnson",
      subject: "Mathematics",
      email: "alex@example.com",
      phone: "+91 98765 43210",
      nextClass: "Tomorrow, 5 PM",
      photo:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Sara Khan",
      subject: "Physics",
      email: "sara@example.com",
      phone: "+91 99887 76655",
      nextClass: "Friday, 7 PM",
      photo:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Rahul Mehta",
      subject: "Chemistry",
      email: "rahul@example.com",
      phone: "+91 91234 56789",
      nextClass: "Monday, 6 PM",
      photo:
        "https://media.istockphoto.com/id/116192438/photo/one-indian-it-software-engineer-white-collar-worker-computer-people.webp?a=1&b=1&s=612x612&w=0&k=20&c=yCT6pKSUFtfymcCnUzx6SeSqS8yrWLDeVYZH8mOcJ3c=",
    },
  ];

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
          <div className="space-y-4">
            {assignedStudents.map((student, i) => (
              <AssignedStudentCard key={i} {...student} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default AssignedStudentsPage;
