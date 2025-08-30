import React from "react";

function OtpModal({
  isOpen,
  onClose,
  onSubmit,
  phoneOrEmail = "",
  resendInterval = 60,
}) {
  const OTP_LENGTH = 6;
  const [values, setValues] = useState(Array(OTP_LENGTH).fill(""));
  const inputsRef = useRef([]);
  const firstInputRef = useRef(null);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(resendInterval);
  const [canResend, setCanResend] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // reset when opened
  useEffect(() => {
    if (isOpen) {
      setValues(Array(OTP_LENGTH).fill(""));
      setError("");
      setCountdown(resendInterval);
      setCanResend(false);
      setIsSubmitting(false);

      // focus first input when modal opens
      setTimeout(() => {
        firstInputRef.current?.focus?.();
      }, 120);
    }
  }, [isOpen, resendInterval]);

  // countdown timer
  useEffect(() => {
    if (!isOpen) return;
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }
    const t = setTimeout(() => setCountdown((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown, isOpen]);

  // helpers
  const joinOtp = () => values.join("").trim();

  const handleChange = (e, idx) => {
    const val = e.target.value;
    // accept only digits (and max 1 char)
    if (!/^\d?$/.test(val)) return;

    const next = [...values];
    next[idx] = val;
    setValues(next);
    setError("");

    // move focus
    if (val && idx < OTP_LENGTH - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
    // if cleared, keep focus
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      if (values[idx] === "") {
        // move back
        if (idx > 0) {
          inputsRef.current[idx - 1]?.focus();
          setValues((prev) => {
            const copy = [...prev];
            copy[idx - 1] = "";
            return copy;
          });
        }
      } else {
        // clear current cell
        setValues((prev) => {
          const copy = [...prev];
          copy[idx] = "";
          return copy;
        });
      }
    } else if (e.key === "ArrowLeft" && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    } else if (e.key === "ArrowRight" && idx < OTP_LENGTH - 1) {
      inputsRef.current[idx + 1]?.focus();
    } else if (e.key === "Enter") {
      submitOtp();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData("text");
    const digits = text.replace(/\D/g, "").slice(0, OTP_LENGTH).split("");
    if (digits.length === 0) return;
    const next = Array(OTP_LENGTH).fill("");
    digits.forEach((d, i) => (next[i] = d));
    setValues(next);
    // focus next empty
    const firstEmpty =
      digits.length >= OTP_LENGTH ? OTP_LENGTH - 1 : digits.length;
    inputsRef.current[firstEmpty]?.focus();
  };

  const submitOtp = async () => {
    const otp = joinOtp();
    if (otp.length !== OTP_LENGTH) {
      setError("Please enter a 6-digit code");
      return;
    }
    setIsSubmitting(true);
    setError("");
    try {
      // call parent onSubmit (user typically performs API call)
      await Promise.resolve(onSubmit ? onSubmit(otp) : Promise.resolve());
      // leave closing to parent or close here:
      // onClose && onClose();
    } catch (err) {
      setError(err?.message || "Verification failed. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    setCanResend(false);
    setCountdown(resendInterval);
    setValues(Array(OTP_LENGTH).fill(""));
    setError("");
    // caller should trigger API to resend OTP
    try {
      if (typeof onSubmit === "function") {
        // no-op: some apps provide a separate onResend; if you need one, pass it
      }
    } catch (err) {
      console.error("resend failed", err);
    }
  };

  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-labelledby="otp-title"
      role="dialog"
      aria-modal="true"
    >
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* modal */}
      <div
        className="relative z-10 w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all sm:p-6"
        role="document"
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2
                id="otp-title"
                className="text-lg font-semibold text-gray-800"
              >
                Enter verification code
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                We sent a 6-digit code to{" "}
                <span className="font-medium text-gray-700">
                  {phoneOrEmail}
                </span>
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="p-2 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100"
            >
              ✕
            </button>
          </div>

          {/* OTP inputs */}
          <div className="mt-6">
            <div
              className="flex items-center justify-center gap-3"
              onPaste={handlePaste}
            >
              {values.map((val, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    inputsRef.current[idx] = el;
                    if (idx === 0) firstInputRef.current = el;
                  }}
                  inputMode="numeric"
                  pattern="\d*"
                  maxLength={1}
                  value={val}
                  onChange={(e) => handleChange(e, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className={
                    "w-12 sm:w-14 h-12 sm:h-14 text-center text-lg sm:text-xl font-medium rounded-xl border transition focus:scale-105 focus:outline-none " +
                    (val
                      ? "border-green-400 bg-green-50"
                      : "border-gray-200 bg-white")
                  }
                  aria-label={`Digit ${idx + 1}`}
                />
              ))}
            </div>

            {error && (
              <p className="mt-3 text-center text-sm text-red-600">{error}</p>
            )}

            {/* actions */}
            <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={submitOtp}
                disabled={isSubmitting}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold shadow hover:brightness-95 disabled:opacity-60"
              >
                {isSubmitting ? "Verifying..." : "Verify"}
              </button>

              <button
                onClick={() => {
                  setValues(Array(OTP_LENGTH).fill(""));
                  firstInputRef.current?.focus();
                  setError("");
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border text-sm text-gray-700 hover:bg-gray-50"
              >
                Clear
              </button>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
              <div>
                <span>
                  Didn’t receive it?{" "}
                  {canResend ? (
                    <button
                      onClick={handleResend}
                      className="text-green-600 font-medium hover:underline"
                    >
                      Resend
                    </button>
                  ) : (
                    <span className="font-mono text-gray-500">
                      {String(countdown).padStart(2, "0")}s
                    </span>
                  )}
                </span>
              </div>

              <div>
                <button
                  onClick={onClose}
                  className="text-xs text-gray-500 hover:underline"
                >
                  Cancel
                </button>
              </div>
            </div>

            {/* subtle help */}
            <div className="mt-3 text-xs text-gray-400 text-center">
              Tip: You can paste the code. Only numeric digits are allowed.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtpModal;
