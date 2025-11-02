import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Context/userAuthContext.jsx";
import { SuccessMessageProvider } from "./Context/SuccessMessageProvider.jsx";
import { TutorsProvider } from "./Context/TutorsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <SuccessMessageProvider>
         <TutorsProvider>
           <App />
         </TutorsProvider>
        </SuccessMessageProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
