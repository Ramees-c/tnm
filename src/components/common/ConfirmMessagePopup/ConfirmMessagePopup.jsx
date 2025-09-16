import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { AlertCircle, MessageCircle  } from "lucide-react"; // ✅ Added HelpCircle

function ConfirmMessagePopup({
  isOpen,
  message,
  onYes,
  onNo,
  onClose,
  type = "confirm", // "confirm" | "alert"
}) {
  // ✅ Prevent background scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative bg-white rounded-md shadow-2xl w-11/12 max-w-sm p-6 z-10 transform transition-all scale-90 opacity-0 animate-popup">
        {/* Icon (changes by type) */}
        <div className="flex justify-center mb-4">
          {type === "alert" ? (
            <MessageCircle  size={48} className="text-green-600 animate-pulse" />
          ) : (
            <AlertCircle size={48} className="text-red-600 animate-pulse" />
          )}
        </div>

        {/* Message */}
        <p className="text-gray-800 text-center mb-6 text-sm md:text-lg">
          {message}
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          {type === "confirm" ? (
            <>
              <button
                onClick={onNo}
                className="px-5 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-md shadow hover:from-green-600 hover:to-green-700 transition font-medium"
              >
                No
              </button>
              <button
                onClick={onYes}
                className="px-5 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-md shadow-lg hover:from-red-600 hover:to-red-700 transition font-medium"
              >
                Yes
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-md shadow hover:from-green-600 hover:to-green-700 transition font-medium"
            >
              OK
            </button>
          )}
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes popup {
            0% { transform: scale(0.9); opacity: 0; }
            50% { transform: scale(1.05); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-popup {
            animation: popup 0.25s ease-out forwards;
          }
        `}
      </style>
    </div>,
    document.body
  );
}

export default ConfirmMessagePopup;
