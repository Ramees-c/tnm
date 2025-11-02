import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Mail, Phone } from "lucide-react";

function ContactAdminPopup({ isOpen, onClose, adminEmails = [], adminPhones = [] }) {
  // Scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[20000] flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Modal */}
      <div className="relative z-10 bg-white rounded-md shadow-md w-full max-w-md md:max-w-lg lg:max-w-xl p-3 sm:p-5 flex flex-col items-center text-center animate-scaleIn overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black transition-colors"
        >
          <X size={22} />
        </button>

        {/* Header */}
        <h2 className="text-lg sm:text-xl font-bold text-green-700 mb-2">
          Contact Admin
        </h2>
        <p className="text-gray-600 text-xs sm:text-sm mb-6">
          You can reach out to the admin using the following details:
        </p>

        {/* Emails */}
        <div className="flex flex-col gap-3 sm:gap-4 w-full mb-4">
          {adminEmails.map((email, index) => (
            <a
              key={index}
              href={`mailto:${email}`}
              className="flex items-center gap-3 bg-green-50 text-green-700 px-4 py-3 rounded-md font-medium hover:bg-green-100 transition-colors"
            >
              <Mail size={18} />
              <span className="truncate text-sm sm:text-base">{email}</span>
            </a>
          ))}
        </div>

        {/* Phones */}
        <div className="flex flex-col gap-3 sm:gap-4 w-full">
          {adminPhones.map((phone, index) => (
            <a
              key={index}
              href={`tel:${phone}`}
              className="flex items-center gap-3 bg-green-50 text-green-700 px-4 py-3 rounded-md font-medium hover:bg-green-100 transition-colors"
            >
              <Phone size={18} />
              <span className="truncate text-sm sm:text-base">{phone}</span>
            </a>
          ))}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-6 px-5 py-2 bg-green-600 text-white rounded-md font-semibold shadow hover:bg-green-700 transition-all"
        >
          Close
        </button>
      </div>

      <style jsx>{`
        .animate-scaleIn {
          transform: scale(0.8);
          animation: scaleIn 0.25s forwards;
        }
        @keyframes scaleIn {
          to {
            transform: scale(1);
          }
        }
      `}</style>
    </div>,
    document.body
  );
}

export default ContactAdminPopup;
