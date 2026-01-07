import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import DashboardSidebar from "../../../components/studentAndTutor/DashboardSidebar/DashboardSidebar";
import axios from "axios";
import { useAuth } from "../../../Context/userAuthContext";
import ToastMessage from "../../../components/studentAndTutor/ToastMessage/ToastMessage";
import { useLocation } from "react-router-dom";
import API_BASE from "../../../API/API";
import StudentSmallCard from "../../../components/studentAndTutor/StudentSmallCard/StudentSmallCard";

function TutorDashboardAllStudents() {
  const { isMailVerified, userDetails, token } = useAuth();
  const location = useLocation();
  const isChangeMode = location.state?.isChangeMode || false;
  const oldTutorId = location.state?.old_tutor_id || null;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [toastOpen, setToastOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch all students
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/students_list/`, {
        withCredentials: true,
      });

      setStudents(res.data);
      setFilteredStudents(res.data);
    } catch (error) {
      console.error("Error fetching students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchStudents();
  }, [token]);

  useEffect(() => {
    setToastOpen(userDetails?.mail_verified === false);
  }, [userDetails]);

  // Search filtering
  useEffect(() => {
    if (!students.length) return;

    let filtered = students;

    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase().replace(/\s+/g, "");
      filtered = students.filter((s) => {
        const normalize = (str) => str?.toLowerCase().replace(/\s+/g, "") || "";
        const nameMatch = normalize(s.full_name).includes(query);
        const categoryMatch = s.categories?.some((cat) =>
          normalize(cat).includes(query)
        );
        const cityMatch = normalize(s.city).includes(query);
        const stateMatch = normalize(s.state).includes(query);
        const pincodeMatch = normalize(s.pincode).includes(query);
        const landmarkMatch = normalize(s.landmark).includes(query);
        const nearByTownMatch = normalize(s.near_by_town).includes(query);

        return (
          nameMatch ||
          categoryMatch ||
          cityMatch ||
          stateMatch ||
          pincodeMatch ||
          landmarkMatch ||
          nearByTownMatch
        );
      });
    }

    setFilteredStudents(filtered);
  }, [searchTerm, students]);

  // Skeleton loader
  const StudentSkeleton = () => (
    <div className="animate-pulse bg-white rounded-xl shadow p-4 w-full max-w-xs">
      <div className="h-24 bg-gray-200 rounded-md mb-3"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-0 lg:w-64 xl:w-72">
        <DashboardSidebar
          role="tutor"
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
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
              <Menu size={27} />
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2">
              All Students
            </h1>
          </div>

          {/* Search Bar */}
          <div className="flex justify-center mb-10">
            <input
              type="text"
              placeholder="Search by name, subject, city, state, or pincode..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-lg px-4 py-2 border rounded-md outline-none focus:ring-0 focus:border-primary text-xs sm:text-sm"
            />
          </div>

          {/* Students Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-2 place-items-center">
            {loading ? (
              // Show skeleton loader
              [...Array(8)].map((_, i) => <StudentSkeleton key={i} />)
            ) : filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <StudentSmallCard
                  key={student.id}
                  student={student}
                  onRefresh={fetchStudents}
                  isChangeMode={isChangeMode}
                  oldTutorId={oldTutorId}
                />
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-full">
                No students found.
              </p>
            )}
          </div>
        </div>

        {/* Toast */}
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

export default TutorDashboardAllStudents;
