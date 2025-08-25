import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";

import UserHome from "./pages/user/UserHome/UserHome";
import { Route, Routes } from "react-router-dom";
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

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800, 
      easing: "ease-in-out", 
      once: true, 
    });
  }, []);
  return (
    <div>
      <Userheader />
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
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
