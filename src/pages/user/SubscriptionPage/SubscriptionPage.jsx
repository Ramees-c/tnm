import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import DashboardSidebar from "../../../components/studentAndTutor/DashboardSidebar/DashboardSidebar";
import SubscriptionCard from "../../../components/studentAndTutor/SubscriptionCard/SubscriptionCard";
import { useAuth } from "../../../Context/userAuthContext";
import axios from "axios";

function SubscriptionPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [planDetails, setPlanDetails] = useState([]);

  const { token } = useAuth();

  useEffect(() => {
    const getPlanDetails = async () => {
      const res = await axios
        .get("/api/plans/tutors/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((res) => {
          setPlanDetails(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch profile:", err);
        });
    };
    getPlanDetails();
  }, []);

  console.log(planDetails, "planDetails");

  const handleSelect = (plan) => {
    alert(`✅ You selected ${plan} plan!`);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-0 lg:w-64 xl:w-72">
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
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg shadow bg-white hover:bg-gray-100 transition"
            >
              <Menu size={24} />
            </button>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Choose Your Subscription
            </h1>
          </div>

          <p className="mb-8 text-gray-600">
            Select the plan that best fits your teaching journey.
          </p>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {planDetails?.map((plan) => (
              <SubscriptionCard
                key={plan}
                title={plan.plan}
                price={plan.price}
                features={plan.description}
                duration={plan.duration_unit}
                onSelect={() => handleSelect(plan.title)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default SubscriptionPage;
