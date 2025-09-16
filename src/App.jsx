import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";

import { Route, Routes, useLocation } from "react-router-dom";
import UserHome from "./pages/user/UserHome/UserHome";
import AboutPage from "./pages/user/AboutPage/AboutPage";
import Userheader from "./components/common/Userheader/Userheader";
import Footer from "./components/common/Footer/Footer";
import TermsConditions from "./pages/user/TermsConditions/TermsConditions";
import RefundPolicy from "./pages/user/RefundPolicy/RefundPolicy";
import FaqPage from "./pages/user/FaqPage/FaqPage";
import ContactPage from "./pages/user/ContactPage/ContactPage";
import BlogPge from "./pages/user/BlogPage/BlogPge";
import BlogSingle from "./pages/user/BlogSingle/BlogSingle";
import LoginRegisterPage from "./pages/user/LoginRegisterPage/LoginRegisterPage";
import TestimonialPage from "./pages/user/TestimonialPage/TestimonialPage";
import StudentDashboardPage from "./pages/user/StudentDashboardPage/StudentDashboardPage";
import TutorDashboardPage from "./pages/user/TutorDashboardPage/TutorDashboardPage";
import SubscriptionPage from "./pages/user/SubscriptionPage/SubscriptionPage";
import AssignedStudentsPage from "./pages/user/AssignedStudentsPage/AssignedStudentsPage";
import NotificationPage from "./pages/user/NotificationPage/NotificationPage";
import TutorDocumentPage from "./pages/user/TutorDocumentPage/TutorDocumentPage";
import TutorEditPage from "./pages/user/TutorEditPage/TutorEditPage";
import ProtectedRoute from "./components/common/ProtectedRoute/ProtectedRoute";

function App() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  // 🔹 Hide header/footer for all dashboard or auth-related pages
  const hideLayoutRoutes = [
    "/studentDashboard",
    "/tutorDashboard",
    "/register",
    "/tutorSubscription",
    "/assignedStudentsPage",
    "/tutornotification",
    "/tutorDocument",
    "/tutorEditProfile",
  ];

  // ✅ also hides for nested routes (e.g., /tutorDashboard/settings)
  const shouldHideLayout = hideLayoutRoutes.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <div>
      {!shouldHideLayout && <Userheader />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<UserHome />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/refundPolicy" element={<RefundPolicy />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogPge />} />
        <Route path="/blogSingle" element={<BlogSingle />} />
        <Route path="/register" element={<LoginRegisterPage />} />
        <Route path="/testimonial" element={<TestimonialPage />} />

        {/* 🔒 Protected Student Routes */}
        <Route
          path="/studentDashboard"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentDashboardPage />
            </ProtectedRoute>
          }
        />

        {/* 🔒 Protected Tutor Routes */}
        <Route
          path="/tutorDashboard"
          element={
            <ProtectedRoute allowedRole="tutor">
              <TutorDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tutorSubscription"
          element={
            <ProtectedRoute allowedRole="tutor">
              <SubscriptionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assignedStudentsPage"
          element={
            <ProtectedRoute allowedRole="tutor">
              <AssignedStudentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tutornotification"
          element={
            <ProtectedRoute allowedRole="tutor">
              <NotificationPage role="tutor" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tutorDocument"
          element={
            <ProtectedRoute allowedRole="tutor">
              <TutorDocumentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tutorEditProfile"
          element={
            <ProtectedRoute allowedRole="tutor">
              <TutorEditPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      {!shouldHideLayout && <Footer />}
    </div>
  );
}

export default App;
