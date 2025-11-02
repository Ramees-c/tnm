import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

function SuccessMessagePopup({
  show,
  message = "Action completed successfully!",
  onClose,
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className="flex items-center gap-2 bg-green-400 text-white px-4 py-2 rounded-full shadow-lg max-w-xs min-w-[200px]">
            {/* ✅ Only Tick Icon Animates */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <CheckCircle className="w-5 h-5" />
            </motion.div>

            <span className="text-sm font-medium truncate">{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SuccessMessagePopup;
