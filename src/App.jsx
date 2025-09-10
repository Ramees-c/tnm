import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";

import UserHome from "./pages/user/UserHome/UserHome";
import { Route, Routes, useLocation } from "react-router-dom";
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

function App() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  // 🔹 Paths where header/footer should be hidden
  const hideLayoutRoutes = ["/studentDashboard", "/tutorDashboard", "/register", "/tutorSubscription", "/assignedStudentsPage", "/tutornotification", "/tutorDocument"];

  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <div>
      {!shouldHideLayout && <Userheader />}
      <Routes>
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
        <Route path="/studentDashboard" element={<StudentDashboardPage />} />
        <Route path="/tutorDashboard" element={<TutorDashboardPage />} />
        <Route path="/tutorSubscription" element={<SubscriptionPage />} />
        <Route path="/assignedStudentsPage" element={<AssignedStudentsPage />} />
        <Route path="/tutornotification" element={<NotificationPage role="tutor" />} />
        <Route path="/tutorDocument" element={<TutorDocumentPage />} />
      </Routes>
      {!shouldHideLayout && <Footer />}
    </div>
  );
}

export default App;
