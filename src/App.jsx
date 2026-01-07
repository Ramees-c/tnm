import React, { useEffect, Suspense, lazy } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";

import { Route, Routes, useLocation } from "react-router-dom";
import Userheader from "./components/common/Userheader/Userheader";
import Footer from "./components/common/Footer/Footer";
import ProtectedRoute from "./components/common/ProtectedRoute/ProtectedRoute";
import ScrollToTop from "./components/common/ScrollToTop/ScrollToTop,jsx";
import Loading from "./components/common/Loading/Loading";

// Lazy load all pages
const UserHome = lazy(() => import("./pages/user/UserHome/UserHome"));
const AboutPage = lazy(() => import("./pages/user/AboutPage/AboutPage"));
const TermsConditions = lazy(() => import("./pages/user/TermsConditions/TermsConditions"));
const RefundPolicy = lazy(() => import("./pages/user/RefundPolicy/RefundPolicy"));
const FaqPage = lazy(() => import("./pages/user/FaqPage/FaqPage"));
const ContactPage = lazy(() => import("./pages/user/ContactPage/ContactPage"));
const BlogPge = lazy(() => import("./pages/user/BlogPage/BlogPge"));
const BlogSingle = lazy(() => import("./pages/user/BlogSingle/BlogSingle"));
const LoginRegisterPage = lazy(() => import("./pages/user/LoginRegisterPage/LoginRegisterPage"));
const TestimonialPage = lazy(() => import("./pages/user/TestimonialPage/TestimonialPage"));
const StudentDashboardPage = lazy(() => import("./pages/user/StudentDashboardPage/StudentDashboardPage"));
const TutorDashboardPage = lazy(() => import("./pages/user/TutorDashboardPage/TutorDashboardPage"));
const SubscriptionPage = lazy(() => import("./pages/user/SubscriptionPage/SubscriptionPage"));
const AssignedStudentsPage = lazy(() => import("./pages/user/AssignedStudentsPage/AssignedStudentsPage"));
const NotificationPage = lazy(() => import("./pages/user/NotificationPage/NotificationPage"));
const TutorDocumentPage = lazy(() => import("./pages/user/TutorDocumentPage/TutorDocumentPage"));
const TutorEditPage = lazy(() => import("./pages/user/TutorEditPage/TutorEditPage"));
const AssignedTutorsPage = lazy(() => import("./pages/user/AssignedTutorsPage/AssignedTutorsPage"));
const StudentDashboardAllTutorsPage = lazy(() => import("./pages/user/StudentDashboardAllTutorsPage/StudentDashboardAllTutorsPage"));
const NotFoundPage = lazy(() => import("./pages/user/NotFoundPage/NotFoundPage"));
const AllTutorsPage = lazy(() => import("./pages/user/AllTutorsPage/AllTutorsPage"));
const PrivacyPolicy = lazy(() => import("./pages/user/PrivacyPolicy/PrivacyPolicy"));
const AllCategoriesPage = lazy(() => import("./pages/user/AllCategoriesPage/AllCategoriesPage"));
const TutorDashboardAllStudents = lazy(() => import("./pages/user/TutorDashboardAllStudents/TutorDashboardAllStudents"));

function App() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const hideLayoutRoutes = [
    "/studentDashboard",
    "/tutorDashboard",
    "/register",
    "/tutorSubscription",
    "/assignedStudentsPage",
    "/tutornotification",
    "/studentnotificaton",
    "/tutorDocument",
    "/tutorEditProfile",
    "/assignedTutorsPage",
    "/studentDashbordAllTutors",
    "*",
  ];

  const shouldHideLayout = hideLayoutRoutes.some((path) =>
    path === "*"
      ? location.pathname !== "/" &&
        ![
          "/about",
          "/terms",
          "/refundPolicy",
          "/faq",
          "/privacyPolicy",
          "/contact",
          "/blog",
          "/register",
          "/testimonial",
          "/all-tutors",
          "/allCategories",
        ].includes(location.pathname) &&
      !location.pathname.startsWith("/blogSingle") // allow blog single pages
    : location.pathname.startsWith(path)
  );

  return (
    <div>
      <ScrollToTop />
      {!shouldHideLayout && <Userheader />}

      {/* Suspense fallback removed (no loader) */}
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<UserHome />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/refundPolicy" element={<RefundPolicy />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPge />} />
          <Route path="/blogSingle/:id" element={<BlogSingle />} />
          <Route path="/register" element={<LoginRegisterPage />} />
          <Route path="/testimonial" element={<TestimonialPage />} />
          <Route path="/all-tutors" element={<AllTutorsPage />} />
          <Route path="/allCategories" element={<AllCategoriesPage />} />
          <Route path="*" element={<NotFoundPage />} />

          {/* Protected Student Routes */}
          <Route
            path="/studentDashboard"
            element={
              <ProtectedRoute allowedRole="student">
                <StudentDashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Protected Tutor Routes */}
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
            path="/studentnotificaton"
            element={
              <ProtectedRoute allowedRole="student">
                <NotificationPage role="student" />
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
          <Route
            path="/tutorAllStudent"
            element={
              <ProtectedRoute allowedRole="tutor">
                <TutorDashboardAllStudents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/assignedTutorsPage"
            element={
              <ProtectedRoute allowedRole="student">
                <AssignedTutorsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/studentDashbordAllTutors"
            element={
              <ProtectedRoute allowedRole="student">
                <StudentDashboardAllTutorsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>

      {!shouldHideLayout && <Footer />}
    </div>
  );
}

export default App;
