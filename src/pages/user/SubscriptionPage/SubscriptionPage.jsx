import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import DashboardSidebar from "../../../components/studentAndTutor/DashboardSidebar/DashboardSidebar";
import SubscriptionCard from "../../../components/studentAndTutor/SubscriptionCard/SubscriptionCard";
import { useAuth } from "../../../Context/userAuthContext";
import axios from "axios";
import ConfirmMessagePopup from "../../../components/common/ConfirmMessagePopup/ConfirmMessagePopup";
import ToastMessage from "../../../components/studentAndTutor/ToastMessage/ToastMessage";

function SubscriptionPage() {
  const { token, userDetails, refreshUserDetails, isMailVerified } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [planDetails, setPlanDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showMessagePopup, setShowMessagePopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const [loadingPlanId, setLoadingPlanId] = useState(null);

  const [activePlanId, setActivePlanId] = useState(null);

  const [toastOpen, setToastOpen] = useState(false);

  const showMessage = (message) => {
    setPopupMessage(message);
    setShowMessagePopup(true);
  };

  useEffect(() => {
    const getPlanDetails = async () => {
      try {
        const res = await axios.get("/api/plans/tutors/", {
          headers: { Authorization: `Token ${token}` },
        });
        setPlanDetails(res.data);
      } catch (err) {
        console.error("Failed to fetch plans:", err);
      }
    };
    getPlanDetails();
  }, [token]);

  useEffect(() => {
    if (userDetails?.payment_history && planDetails.length > 0) {
      // ✅ Example: match by plan name (adjust if your API returns other field)
      const matchedPlan = planDetails.find(
        (p) => p.plan === userDetails.payment_history.plan_name
      );

      if (matchedPlan) {
        setActivePlanId(matchedPlan.id); // now it matches correct plan.id
      }
    }
  }, [userDetails, planDetails]);

  useEffect(() => {
    if (userDetails?.mail_verified === false) {
      setToastOpen(true);
    } else {
      setToastOpen(false);
    }
  }, [userDetails]);

  const handleSelect = async (plan) => {
    if (userDetails?.mail_verified === false) {
      showMessage("Please verify your mail");
      return; // stop here
    }
    setLoadingPlanId(plan.id);
    setLoading(true);
    try {
      // Step 1: Check upgrade or new subscription
      const upgradeRes = await axios.post(
        "/api/upgrade-plan/",
        { plan_id: plan.id },
        { headers: { Authorization: `Token ${token}` } }
      );

      const upgradeData = upgradeRes.data;

      if (upgradeData.status === "same_plan") {
        showMessage(upgradeData.message);
        setLoading(false);
        return;
      }

      const amountToPay = upgradeData.amount_to_pay;

      // Step 2: Create Razorpay order
      const orderRes = await axios.post(
        "/api/create-order/",
        { plan_id: plan.id, amount: amountToPay },
        { headers: { Authorization: `Token ${token}` } }
      );

      const orderData = orderRes.data;

      if (orderData.error) {
        showMessage("Error creating order");
        setLoading(false);
        return;
      }

      // Step 3: Open Razorpay checkout
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: "INR",
        name: "Plan Purchase / Upgrade",
        description:
          upgradeData.status === "calculated"
            ? "Plan Upgrade"
            : "New Subscription",
        order_id: orderData.order_id,

        handler: async (response) => {
          console.log("Razorpay response:", response);

          if (!response.razorpay_payment_id || !response.razorpay_signature) {
            showMessage("Payment not completed, cannot verify.");
            return;
          }

          try {
            const payload = {
              payment_id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
              signature: response.razorpay_signature,
              plan_id: plan.id,
            };

            const verifyRes = await axios.post(
              "/api/verify-payment/",
              payload,
              {
                headers: { Authorization: `Token ${token}` },
              }
            );

            const verifyData = verifyRes.data;

            if (verifyData.error) {
              showMessage("Verification failed");
            } else {
              await refreshUserDetails();
              showMessage(
                `Payment Verified!
Start: ${verifyData.created_at.split(" ")[0]}
Expiry: ${verifyData.expiry_date.split(" ")[0]}`
              );
            }
          } catch (err) {
            console.error("Verification API error:", err);

            // Handle server errors gracefully
            if (err.response) {
              // Server returned 500 or other error
              console.error("Server response data:", err.response.data);
              showMessage(`Verification failed.`);
            } else if (err.request) {
              console.error("No response from server:", err.request);
              showMessage("Verification failed.");
            } else {
              console.error("Error setting up request:", err.message);
              showMessage("Verification failed.");
            }
          }
        },

        prefill: {
          name: userDetails.full_name,
          email: userDetails.email,
          contact: userDetails.mobile_number,
        },
        theme: {
          color: "#046c4e",
          backdrop_color: "#ffffff",
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);
        showMessage(`Payment failed`);
      });

      rzp.open();
    } catch (err) {
      console.error("Payment process error:", err);
      showMessage("Payment process failed.");
    } finally {
      setLoadingPlanId(null);
      setLoading(false);
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

      {/* Overlay */}
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
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              Choose Your Subscription
            </h1>
          </div>

          <p className="mb-8 text-xs md:text-sm text-gray-600">
            Select the plan that best fits your teaching journey.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
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
