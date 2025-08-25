import React, { useState, useEffect } from "react";
import teacherImg from "../../../assets/images/logo/tnmlogo.png";
import studentImg from "../../../assets/images/logo/tnmlogo.png";
import ChoiceCard from "../../../pages/user/ChoiceCard/ChoiceCard";

function RegisterChoice() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <section className="w-full max-w-5xl flex flex-col items-center justify-center">
        {/* Animated Heading */}
        <div
          className={`transition-all duration-700 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-2">
            What are you looking for?
          </h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            Join our platform to either share your knowledge or expand your
            skills
          </p>
        </div>

        {/* Card Container */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 w-full">
          {/* Teacher Card */}
          <div
            className={`transition-all duration-700 delay-150 transform ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }`}
          >
            <ChoiceCard
              image={teacherImg}
              title="I am looking to Teach"
              description="Share your expertise, create courses, and inspire the next generation of learners"
              buttonText="CREATE YOUR PROFILE"
              buttonColor="bg-blue-600 hover:bg-blue-700"
              cardColor="from-blue-50 to-indigo-50"
              icon={
                <svg
                  className="w-10 h-10 text-blue-600 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l-9 5m9-5v6"
                  ></path>
                </svg>
              }
            />
          </div>

          {/* OR Divider */}
          <div className="my-6 lg:my-0 flex items-center justify-center relative">
            <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full shadow-lg z-10 border-4 border-green-100">
              <span className="text-xl font-bold text-gray-600">OR</span>
            </div>
            <div className="hidden lg:block absolute h-48 w-1 bg-gradient-to-b from-green-200 to-blue-200 -z-10"></div>
          </div>

          {/* Student Card */}
          <div
            className={`transition-all duration-700 delay-300 transform ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }`}
          >
            <ChoiceCard
              image={studentImg}
              title="I am looking to Learn"
              description="Discover expert tutors, personalized lessons, and achieve your learning goals"
              buttonText="POST YOUR REQUIREMENT"
              buttonColor="bg-green-500 hover:bg-green-600"
              cardColor="from-green-50 to-teal-50"
              icon={
                <svg
                  className="w-10 h-10 text-green-600 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  ></path>
                </svg>
              }
            />
          </div>
        </div>

        {/* Additional Info */}
        <div
          className={`mt-16 text-center transition-all duration-700 delay-500 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="text-gray-600 mb-4">
            Already have an account?{" "}
            <a href="#" className="text-blue-600 font-medium hover:underline">
              Sign In
            </a>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center">
              <svg
                className="w-4 h-4 text-green-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              5000+ Expert Tutors
            </span>
            <span className="flex items-center">
              <svg
                className="w-4 h-4 text-green-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              100+ Subjects
            </span>
            <span className="flex items-center">
              <svg
                className="w-4 h-4 text-green-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              Secure Payments
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RegisterChoice;
