"use client";

import React, { useState, useRef, useEffect } from "react";
import { Loader2, ArrowRight, AlertCircle, RefreshCw, CheckCircle2, ArrowLeft } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { useLanguage } from "@/components/providers/language-provider";

interface OTPVerifyFormProps {
  email: string;
  onSuccess: (email: string, otp: string) => void;
  onBackToEmail: () => void;
}

export const OTPVerifyForm: React.FC<OTPVerifyFormProps> = ({
  email,
  onSuccess,
  onBackToEmail,
}) => {
  const { translate } = useLanguage();

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendSuccess, setResendSuccess] = useState<string | null>(null);

  // Resend Timer State (60s)
  const [countdown, setCountdown] = useState<number>(60);
  const [isResending, setIsResending] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    // Only accept numeric inputs
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    // Take the last entered character if multiple typed
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next field if typed
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("");
      setOtp(digits);
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResendSuccess(null);

    const fullOtp = otp.join("");
    if (fullOtp.length !== 6) {
      setError(translate("Please enter all 6 digits of the OTP code."));
      return;
    }

    setIsLoading(true);

    try {
      await apiClient.post("/auth/verify-otp", { email, otp: fullOtp });
      onSuccess(email, fullOtp);
    } catch (err: unknown) {
      if (err && typeof err === "object" && "message" in err) {
        setError(String(err.message));
      } else {
        setError(translate("Invalid or expired OTP code."));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0 || isResending) return;

    setError(null);
    setResendSuccess(null);
    setIsResending(true);

    try {
      await apiClient.post("/auth/forgot-password", { email });
      setResendSuccess(translate("A new OTP code has been sent to your email."));
      setCountdown(60);
      setOtp(Array(6).fill(""));
      inputRefs.current[0]?.focus();
    } catch (err: unknown) {
      if (err && typeof err === "object" && "message" in err) {
        setError(String(err.message));
      } else {
        setError(translate("Failed to resend OTP. Please try again."));
      }
    } finally {
      setIsResending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold font-heading text-ink">
          {translate("Enter Verification Code")}
        </h2>
        <p className="text-xs sm:text-sm text-pale-stone font-sans">
          {translate("We've sent a 6-digit verification code to")}{" "}
          <strong className="text-ink dark:text-white font-mono">{email}</strong>
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm animate-fade-in my-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {resendSuccess && (
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm animate-fade-in my-2">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{resendSuccess}</span>
        </div>
      )}

      {/* 6 Digit Inputs */}
      <div className="flex justify-between items-center gap-2 sm:gap-3 py-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className="w-11 sm:w-13 h-13 sm:h-15 text-center text-xl sm:text-2xl font-bold font-mono bg-paper-canvas/60 dark:bg-zinc-900/60 border border-border/80 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition shadow-sm text-ink dark:text-white"
          />
        ))}
      </div>

      {/* Resend Timer & Button */}
      <div className="flex items-center justify-between text-xs sm:text-sm">
        <button
          type="button"
          onClick={onBackToEmail}
          className="inline-flex items-center gap-1.5 text-pale-stone hover:text-ink transition cursor-pointer border-none bg-transparent font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{translate("Change Email")}</span>
        </button>

        <button
          type="button"
          onClick={handleResend}
          disabled={countdown > 0 || isResending}
          className={`inline-flex items-center gap-1.5 font-semibold transition cursor-pointer border-none bg-transparent ${
            countdown > 0 || isResending
              ? "text-pale-stone cursor-not-allowed opacity-60"
              : "text-blue-600 dark:text-blue-400 hover:underline"
          }`}
        >
          {isResending ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <RefreshCw className="w-3.5 h-3.5" />
          )}
          <span>
            {countdown > 0
              ? `${translate("Resend code in")} ${countdown}s`
              : translate("Resend OTP")}
          </span>
        </button>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 px-5 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold text-sm sm:text-base rounded-2xl shadow-xl shadow-blue-500/25 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer border-none"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>{translate("Verifying...")}</span>
            </>
          ) : (
            <>
              <span>{translate("Verify Code")}</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};
