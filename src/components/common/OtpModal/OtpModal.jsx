import React, { useEffect, useRef, useState } from "react";

function OtpModal({
  isOpen,
  onClose,
  onSubmit,
  phoneOrEmail = "",
  resendInterval = 300,
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

      // lock body scroll
      document.body.style.overflow = "hidden";

      // focus first input
      setTimeout(() => {
        firstInputRef.current?.focus?.();
      }, 120);
    } else {
      // unlock body scroll
      document.body.style.overflow = "";
    }

    // cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
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
    if (!/^\d?$/.test(val)) return; // only digit, max 1 char

    const next = [...values];
    next[idx] = val;
    setValues(next);
    setError("");

    if (val && idx < OTP_LENGTH - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      if (values[idx] === "") {
        if (idx > 0) {
          inputsRef.current[idx - 1]?.focus();
          setValues((prev) => {
            const copy = [...prev];
            copy[idx - 1] = "";
            return copy;
          });
        }
      } else {
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
      await Promise.resolve(onSubmit ? onSubmit(otp) : Promise.resolve());
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
  };

  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-labelledby="otp-title"
      role="dialog"
      aria-modal="true"
    >
      {/* backdrop - no click handler now */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* modal */}
      <div
        className="relative z-10 w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all sm:p-6"
        role="document"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 id="otp-title" className="text-lg font-semibold text-gray-800">
              Enter verification code
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              We sent a 6-digit code to{" "}
              <span className="font-medium text-gray-700">{phoneOrEmail}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-md text-secondary font-extrabold hover:text-gray-700 hover:bg-gray-100"
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
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold shadow hover:brightness-95 disabled:opacity-60"
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

          <div className="mt-3 text-xs text-gray-400 text-center">
            Tip: You can paste the code. Only numeric digits are allowed.
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtpModal;
