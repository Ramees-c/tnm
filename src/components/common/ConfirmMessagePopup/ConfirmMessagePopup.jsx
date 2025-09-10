import React from "react";
import { createPortal } from "react-dom";
import { AlertCircle } from "lucide-react";

function ConfirmMessagePopup({ isOpen, message, onYes, onNo }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative bg-white rounded-md shadow-2xl w-11/12 max-w-sm p-6 z-10 transform transition-all scale-90 opacity-0 animate-popup">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <AlertCircle size={48} className="text-red-600 animate-bounce" />
        </div>

        {/* Message */}
        <p className="text-gray-800 text-center mb-6 text-sm sm:text-base">{message}</p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={onNo}
            className="px-5 py-2 bg-gray-100 text-gray-700 rounded-md shadow hover:bg-gray-200 transition font-medium"
          >
            No
          </button>
          <button
            onClick={onYes}
            className="px-5 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-md shadow-lg hover:from-red-600 hover:to-red-700 transition font-medium"
          >
            Yes
          </button>
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
