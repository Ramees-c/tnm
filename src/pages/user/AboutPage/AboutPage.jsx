import React, { useEffect } from "react";
import PlatformOverview from "../../../components/common/PlatformOverview/PlatformOverview";

// About section image
import aboutImg from "../../../assets/images/about-2.jpg";
// CEO section
import CEOSection from "../../../components/common/CEOSection/CEOSection";
// Vission Mission
import VisionMission from "../../../components/common/VisionMission/VisionMission";
// Page header
import PageHeader from "../../../components/common/PageHeader/PageHeader";
// Page banner
import pageBanner from "../../../assets/images/page_banner/about.png"

function AboutPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);
  return (
    <div>
      {/* Page header */}
      <PageHeader
        title="About Us"
        headerBg={pageBanner}
      />
      <div className="container">
        {/* About section */}
        <section className="w-full pt-16" data-aos="fade-up">
          <div className="mx-auto grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-10 items-center lg:px-12">
            {/* Left Image */}
            <div className="flex justify-center xl:justify-center h-full">
              <img
                src={aboutImg}
                alt="Students"
                className="w-full max-w-[500px] lg:max-w-[600px] rounded-md shadow-xl object-cover transform transition duration-500"
              />
            </div>

            {/* Right Content */}
            <div className="">
              <h2 className="text-xl sm:text-4xl 2xl:text-4xl font-bold text-gray-900 mb-6">
                Our commitment to Connecting
                <span className="text-green-600"> Learners and Tutors</span>
              </h2>

              <p className="text-gray-600 text-xs sm:text-sm lg:text-lg leading-relaxed mb-8">
                At Tutor-Near Me, we are dedicated to making quality education
                accessible for every student. Our platform bridges the gap
                between learners and expert tutors, offering personalized
                guidance across a wide range of subjects, languages, and exam
                preparation.
                <br />
                We focus on providing a seamless experience where students can
                find tutors who match their learning style and preferences. By
                simplifying the process of connecting students with skilled
                tutors, we empower learners to take control of their academic
                journey and achieve their goals efficiently.
                <br />
                Our approach emphasizes flexibility, convenience, and
                professionalism, ensuring that every interaction between student
                and tutor is productive and rewarding. With a commitment to
                excellence, we strive to create an environment where learning
                becomes engaging, effective, and tailored to each student’s
                needs.
                <br />
                Through our platform, students gain access to a trusted network
                of tutors, allowing them to enhance their knowledge, improve
                skills, and build confidence in their academic pursuits.
              </p>
            </div>
          </div>
        </section>


        {/* Platform overview */}
        <div data-aos="fade-up">
          <PlatformOverview />
        </div>

        {/* Vission Mission */}
        <div data-aos="fade-up">
          <VisionMission />
        </div>

        {/* CEO section */}
        <div className="py-16" data-aos="fade-up">
          <CEOSection />
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
