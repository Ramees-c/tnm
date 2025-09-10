import { useState } from "react";
import { Menu } from "lucide-react";
import DashboardSidebar from "../../../components/studentAndTutor/DashboardSidebar/DashboardSidebar";
import SubscriptionCard from "../../../components/studentAndTutor/SubscriptionCard/SubscriptionCard";

function SubscriptionPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const plans = [
    {
      title: "Basic",
      price: 499,
      features: ["5 Classes per month", "Email Support", "Community Access"],
    },
    {
      title: "Pro",
      price: 999,
      features: ["Unlimited Classes", "Priority Support", "Personal Dashboard"],
      highlighted: true,
    },
    {
      title: "Enterprise",
      price: 1999,
      features: ["Custom Features", "Dedicated Support", "Team Management"],
    },
  ];

  const handleSelect = (plan) => {
    alert(`✅ You selected ${plan} plan!`);
  };

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

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Choose Your Subscription
            </h1>
          </div>

          <p className="mb-8 text-gray-600">
            Select the plan that best fits your teaching journey.
          </p>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <SubscriptionCard
                key={i}
                title={plan.title}
                price={plan.price}
                features={plan.features}
                highlighted={plan.highlighted}
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
