import React, { useState, useEffect } from "react";
import RegisterChoice from "../../../components/common/RegisterChoice/RegisterChoice";
import TutorRegisterForm from "../../../components/studentAndTutor/TutorRegisterForm/TutorRegisterForm";
import StudentRegistrationForm from "../../../components/studentAndTutor/StudentRegistrationForm/StudentRegistrationForm";
import LoginForm from "../../../components/studentAndTutor/LoginForm/LoginForm";

function LoginRegisterPage() {
  // 👉 default to "login"
  const [step, setStep] = useState(() => {
    return sessionStorage.getItem("registerStep") || "login";
  });

  useEffect(() => {
    sessionStorage.setItem("registerStep", step);
  }, [step]);

  useEffect(() => {
    if (!sessionStorage.getItem("registerStep")) {
      setStep("login");
    }
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
          onCreateAccount={() => setStep("login")}
        />
      )}

      {step === "tutor" && <TutorRegisterForm />}
      {step === "student" && <StudentRegistrationForm />}
      {step === "login" && (
        <LoginForm onCreateAccount={() => setStep("choice")} />
      )}
    </div>
  );
}

export default LoginRegisterPage;
