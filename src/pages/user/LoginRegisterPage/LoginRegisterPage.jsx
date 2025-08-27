import React, { useState } from "react";
import RegisterChoice from "../../../components/common/RegisterChoice/RegisterChoice";
import TutorRegisterForm from "../../../components/studentAndTutor/TutorRegisterForm/TutorRegisterForm";

function LoginRegisterPage() {
  const [step, setStep] = useState("choice");
  return (
    <div className="container">
      {step === "choice" && (
        <RegisterChoice onRegisterClick={() => setStep("registerForm")} />
      )}
      {step === "registerForm" && <TutorRegisterForm />}
    </div>
  );
}

export default LoginRegisterPage;
