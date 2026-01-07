import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

// Create context
const SuccessMessageContext = createContext();

// Custom hook for usage
export const useSuccessMessage = () => useContext(SuccessMessageContext);

// Provider component
export const SuccessMessageProvider = ({ children }) => {
  const [toast, setToast] = useState({ show: false, message: "" });

  // Show toast function
  const showSuccess = useCallback((message) => {
    setToast({ show: true, message });

    // Auto-hide after 2.5s
    setTimeout(() => setToast({ show: false, message: "" }), 2500);
  }, []);

  return (
    <SuccessMessageContext.Provider value={{ showSuccess }}>
      {children}

      {/* Toast UI */}
      <AnimatePresence>
  {toast.show && (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="fixed top-5 left-[45%] transform -translate-x-1/2 z-50 pointer-events-none"
    >
      <div className="flex items-center gap-2 bg-green-400 text-white px-4 py-2 rounded-full shadow-lg max-w-xs sm:max-w-sm w-full text-center mx-auto">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <CheckCircle className="w-5 h-5" />
        </motion.div>
        <span className="text-sm font-medium truncate">{toast.message}</span>
      </div>
    </motion.div>
  )}
</AnimatePresence>

    </SuccessMessageContext.Provider>
  );
};
