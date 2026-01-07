import React, { useState, useEffect } from "react";
import teacherImg from "../../../assets/images/icons/tutor.png";
import studentImg from "../../../assets/images/icons/student.png";
import ChoiceCard from "../../../pages/user/ChoiceCard/ChoiceCard";
import { HiAcademicCap, HiBookOpen } from "react-icons/hi";
import { CheckCircle } from "lucide-react";

function RegisterChoice({ onTutorClick, onStudentClick, onCreateAccount }) {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 md:py-0">
      <section className="w-full max-w-5xl flex flex-col items-center justify-center">
        {/* Heading */}
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-white mb-2">
            How would you like to get started?
          </h2>
          <p className="text-center text-white mb-10 text-sm md:text-md">
            Join our platform to either share your knowledge or expand your
            skills
          </p>
        </div>

        {/* Card Container */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-1 lg:gap-8 w-full">
          {/* Tutor Card */}
          <div>
            <ChoiceCard
              image={teacherImg}
              title="I want to teach"
              description="Share your expertise, create courses, and inspire the next generation of learners"
              buttonText="CREATE YOUR PROFILE"
              buttonColor="bg-blue-600 hover:bg-blue-700"
              cardColor="from-blue-50 to-indigo-50"
              icon={<HiAcademicCap className="w-8 h-8 text-blue-600 mb-3" />}
              onRegisterClick={onTutorClick}
            />
          </div>

          {/* Divider */}
          <div className="my-6 lg:my-0 flex items-center justify-center relative">
            <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full shadow-lg z-10 border-4 border-green-100">
              <span className="text-xl font-bold text-gray-600">OR</span>
            </div>
            <div className="hidden lg:block absolute h-48 w-1 bg-gradient-to-b from-green-200 to-blue-200 -z-10"></div>
          </div>

          {/* Student Card */}
          <div>
            <ChoiceCard
              image={studentImg}
              title="I want to Learn"
              description="Discover expert tutors, personalized lessons, and achieve your learning goals"
              buttonText="CREATE YOUR PROFILE"
              buttonColor="bg-green-500 hover:bg-green-600"
              cardColor="from-green-50 to-teal-50"
              icon={<HiBookOpen className="w-8 h-8 text-green-600 mb-3" />}
              onRegisterClick={onStudentClick}
            />
          </div>
        </div>

        {/* Extra Info */}
        <div className={`mt-16 text-center`}>
          <p className="text-white mb-4">
            Already have an account?{" "}
            <span
              className="text-green-400 font-bold hover:underline cursor-pointer"
              onClick={onCreateAccount}
            >
              Sign In
            </span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-2 text-green-400 font-medium">
              <CheckCircle size={16} /> Highly Qualified Tutors
            </span>
            <span className="flex items-center gap-2 text-green-400 font-medium">
              <CheckCircle size={16} /> Wide Range of Subjects
            </span>
            <span className="flex items-center gap-2 text-green-400 font-medium">
              <CheckCircle size={16} /> Safe & Secure Payments
            </span>
            <span className="flex items-center gap-2 text-green-400 font-medium">
              <CheckCircle size={16} /> Personalized Learning Plans
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RegisterChoice;
