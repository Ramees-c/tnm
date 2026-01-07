import React, { useState, useEffect } from "react";
import RegisterChoice from "../../../components/common/RegisterChoice/RegisterChoice";
import TutorRegisterForm from "../../../components/studentAndTutor/TutorRegisterForm/TutorRegisterForm";
import StudentRegistrationForm from "../../../components/studentAndTutor/StudentRegistrationForm/StudentRegistrationForm";
import LoginForm from "../../../components/studentAndTutor/LoginForm/LoginForm";
import ForgotPasswordForm from "../../../components/studentAndTutor/ForgotPasswordForm/ForgotPasswordForm";

function LoginRegisterPage() {
  const [step, setStep] = useState("login"); 

  // save current step in history
  useEffect(() => {
    sessionStorage.setItem("registerStep", step);

    if (step === "login" || step === "choice") {
      // replace so browser back exits to home
      window.history.replaceState({ step }, "", "");
    } else {
      // push new history entries for tutor/student
      window.history.pushState({ step }, "", "");
    }
  }, [step]);

  // handle browser back/forward
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.step) {
        setStep(event.state.step);
      } else {
        // no state → leave auth flow and go home
        window.location.href = "/";
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const showBackground =
    step === "login" || step === "choice" || step === "forgot";

  return (
    <div
     className={`relative min-h-screen ${
        showBackground ? "bg-cover bg-center bg-no-repeat" : "bg-white"
      }`}
      style={{
        backgroundImage: showBackground ? "url('/loginbg.jpg')" : "none",
      }}
    >
      {/* Dark overlay for better contrast */}
     {showBackground && (
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      )}
      <div className="relative z-10 w-full p-4 sm:p-0">
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
          <LoginForm
            onCreateAccount={() => setStep("choice")}
            onForgotPassword={() => setStep("forgot")}
          />
        )}
        {step === "forgot" && (
          <ForgotPasswordForm onBackToLogin={() => setStep("login")} />
        )}
      </div>
    </div>
  );
}

export default LoginRegisterPage;
