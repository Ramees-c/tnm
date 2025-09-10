import React, { useState } from "react";
import RegisterChoice from "../../../components/common/RegisterChoice/RegisterChoice";
import TutorRegisterForm from "../../../components/studentAndTutor/TutorRegisterForm/TutorRegisterForm";
import StudentRegistrationForm from "../../../components/studentAndTutor/StudentRegistrationForm/StudentRegistrationForm";

function LoginRegisterPage() {
  const [step, setStep] = useState("choice"); // "choice" | "tutor" | "student"

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
