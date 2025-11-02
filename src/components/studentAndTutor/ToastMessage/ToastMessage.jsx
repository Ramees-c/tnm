import React, { useState } from "react";
import ProfileEditPopup from "../ProfileEditPopup/ProfileEditPopup";
import { useAuth } from "../../../Context/userAuthContext";

function ToastMessage({ message, isOpen, onClose, type = "info" }) {
  const { user } = useAuth();
  const [showEdit, setShowEdit] = useState(false);

  const colors = {
    success: "bg-green-600",
    error: "bg-red-600",
    warning: "bg-red-400",
    info: "bg-blue-600",
  };

  return (
    <div>
      {/* ✅ Only show toast if it's open AND popup is NOT open */}
      {isOpen && (
        <div className="fixed top-5 right-5 z-40">
          <div
            onClick={() => setShowEdit(true)}
            className={`px-2 py-1 lg:px-4 lg:py-3 rounded-md shadow-lg text-white w-[180px] md:w-[300px] ${colors[type]} transition-transform transform flex justify-between items-center cursor-pointer`}
          >
            <span className="text-xs md:text-sm">{message}</span>
          </div>
        </div>
      )}

      {/* ✅ Profile Edit Popup */}
      <ProfileEditPopup
        isOpen={showEdit}
        onClose={() => setShowEdit(false)}
        initialData={user}
      />
    </div>
  );
}

export default ToastMessage;
