import React, { useState, useEffect } from "react";
import RegisterChoice from "../../../components/common/RegisterChoice/RegisterChoice";
import TutorRegisterForm from "../../../components/studentAndTutor/TutorRegisterForm/TutorRegisterForm";
import StudentRegistrationForm from "../../../components/studentAndTutor/StudentRegistrationForm/StudentRegistrationForm";

function LoginRegisterPage() {
  // ✅ Initialize from sessionStorage (for refresh) or default to choice
  const [step, setStep] = useState(() => {
    return sessionStorage.getItem("registerStep") || "choice";
  });

  // ✅ Save current step to sessionStorage on step change
  useEffect(() => {
    sessionStorage.setItem("registerStep", step);
  }, [step]);

  // ✅ Reset to choice when navigating to this page normally
  useEffect(() => {
    // Only reset if no session storage (first visit)
    if (!sessionStorage.getItem("registerStep")) {
      setStep("choice");
    }

    // Clear sessionStorage when leaving the page
    return () => {
      sessionStorage.removeItem("registerStep");
    };
  }, []);

  return (
    <div className="container">
      {step === "choice" && (
        <RegisterChoice
          onTutorClick={() => setStep("tutor")}
          onStudentClick={() => setStep("student")}
        />
      )}

      {step === "tutor" && <TutorRegisterForm />}
      {step === "student" && <StudentRegistrationForm />}
    </div>
  );
}

export default LoginRegisterPage;
