import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import DashboardSidebar from "../../../components/studentAndTutor/DashboardSidebar/DashboardSidebar";
import SubscriptionCard from "../../../components/studentAndTutor/SubscriptionCard/SubscriptionCard";
import { useAuth } from "../../../Context/userAuthContext";
import axios from "axios";
import ConfirmMessagePopup from "../../../components/common/ConfirmMessagePopup/ConfirmMessagePopup";
import ToastMessage from "../../../components/studentAndTutor/ToastMessage/ToastMessage";
import API_BASE from "../../../API/API";

function SubscriptionPage() {
  const { token, userDetails, refreshUserDetails, isMailVerified } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [planDetails, setPlanDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMessagePopup, setShowMessagePopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [loadingPlanId, setLoadingPlanId] = useState(null);
  const [activePlanId, setActivePlanId] = useState(null);
  const [toastOpen, setToastOpen] = useState(false);

  const showMessage = (message) => {
    setPopupMessage(message);
    setShowMessagePopup(true);
  };

  const logoUrl =
    typeof window !== "undefined"
      ? window.location.origin + "/tnmlogo.png"
      : "";

  // Fetch with caching + instant display
  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);

      // Show cached instantly
      const cached = localStorage.getItem("tutorPlans");
      if (cached) setPlanDetails(JSON.parse(cached));

      try {
        const res = await axios.get(`${API_BASE}/plans/tutors/`, {
          withCredentials: true,
        });
        setPlanDetails(res.data);
        localStorage.setItem("tutorPlans", JSON.stringify(res.data));
      } catch (err) {
        console.error("Failed to fetch plans");
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchPlans();
  }, [token]);

  // Mark active plan
  useEffect(() => {
    if (userDetails?.payment_history && planDetails.length > 0) {
      const matchedPlan = planDetails.find(
        (p) => p.plan === userDetails.payment_history.plan_name
      );
      if (matchedPlan) setActivePlanId(matchedPlan.id);
    }
  }, [userDetails, planDetails]);

  // Toast for mail verification
  useEffect(() => {
    setToastOpen(userDetails?.mail_verified === false);
  }, [userDetails]);

  // Handle plan selection + Razorpay
  const handleSelect = async (plan) => {
    if (userDetails?.mail_verified === false) {
      showMessage("Please verify your mail");
      return;
    }

    setLoadingPlanId(plan.id);
    setLoading(true);
    try {
      const upgradeRes = await axios.post(
        `${API_BASE}/upgrade-plan/`,
        { plan_id: plan.id },
        {
          withCredentials: true,
        }
      );

      const upgradeData = upgradeRes.data;
      if (upgradeData.status === "same_plan") {
        showMessage(upgradeData.message);
        return;
      }

      const orderRes = await axios.post(
        `${API_BASE}/create-order/`,
        { plan_id: plan.id, amount: upgradeData.amount_to_pay },
        {
          withCredentials: true,
        }
      );

      const orderData = orderRes.data;
      if (orderData.error) {
        showMessage("Error creating order");
        return;
      }

      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: "INR",
        name: "Plan Purchase / Upgrade",
        description:
          upgradeData.status === "calculated"
            ? "Plan Upgrade"
            : "New Subscription",
        image: logoUrl,
        order_id: orderData.order_id,
        handler: async (response) => {
          try {
            const verifyRes = await axios.post(
              `${API_BASE}/verify-payment/`,
              {
                payment_id: response.razorpay_payment_id,
                order_id: response.razorpay_order_id,
                signature: response.razorpay_signature,
                plan_id: plan.id,
              },
              {
                withCredentials: true,
              }
            );

            const verifyData = verifyRes.data;
            if (verifyData.error) {
              showMessage("Verification failed");
            } else {
              await refreshUserDetails();
              showMessage(
                `Payment Verified!\nStart: ${
                  verifyData.created_at.split(" ")[0]
                }\nExpiry: ${verifyData.expiry_date.split(" ")[0]}`
              );
            }
          } catch (err) {
            console.error("Verification API error");
            showMessage("Verification failed.");
          }
        },
        prefill: {
          name: userDetails.full_name,
          email: userDetails.email,
          contact: userDetails.mobile_number,
        },
        theme: {
          color: "#046c4e",
        },
        modal: {
          backdropclose: false,
          escape: true,
          handleback: true,
          animation: true,
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => showMessage("Payment failed"));
      rzp.open();
    } catch (err) {
      console.error("Payment process error");
      showMessage("Payment process failed.");
    } finally {
      setLoading(false);
      setLoadingPlanId(null);
    }
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

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 w-full p-4 sm:p-6 transition-all duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
              <Menu size={27} />
            </button>
            <h1 className="text-xl sm:text-3xl font-bold text-gray-800">
              Choose Your Subscription
            </h1>
          </div>

          <p className="mb-8 text-sm sm:text-lg text-gray-700 font-semibold">
            Select the plan that best fits your teaching journey.
          </p>

          {/* Show skeleton while loading */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-48 bg-gray-200 rounded-xl shadow-md"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {planDetails.map((plan) => (
                <SubscriptionCard
                  key={plan.id}
                  title={plan.plan}
                  price={plan.price}
                  features={plan.description}
                  duration={plan.duration_unit}
                  onSelect={() => handleSelect(plan)}
                  disabled={loadingPlanId === plan.id}
                  isChosen={activePlanId === plan.id}
                  userCurrentPrice={
                    userDetails?.payment_history?.actual_price || null
                  }
                />
              ))}
            </div>
          )}
        </div>

        <ConfirmMessagePopup
          isOpen={showMessagePopup}
          type="alert"
          message={popupMessage}
          onClose={() => setShowMessagePopup(false)}
        />

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

export default SubscriptionPage;
