"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Loader2, ArrowRight, AlertCircle, ArrowLeft } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { useLanguage } from "@/components/providers/language-provider";

interface ForgotPasswordFormProps {
  onSuccess: (email: string) => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onSuccess }) => {
  const { translate } = useLanguage();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await apiClient.post("/auth/forgot-password", { email });
      onSuccess(email);
    } catch (err: unknown) {
      if (err && typeof err === "object" && "message" in err) {
        setError(String(err.message));
      } else {
        setError(translate("Failed to send OTP. Please check your email address."));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold font-heading text-ink">
          {translate("Forgot Password?")}
        </h2>
        <p className="text-xs sm:text-sm text-pale-stone font-sans">
          {translate("Enter your registered email address and we'll send you a 6-digit verification code to reset your password.")}
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm animate-fade-in my-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Email Input */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-pale-stone dark:text-gray-400 mb-2">
          {translate("Email Address")}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
            <Mail className="w-4.5 h-4.5" />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder={translate("Enter your email")}
            className="w-full pl-11 pr-4 py-3.5 bg-paper-canvas/60 dark:bg-zinc-900/60 border border-border/80 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm font-sans"
          />
        </div>
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
              <span>{translate("Sending OTP...")}</span>
            </>
          ) : (
            <>
              <span>{translate("Send Verification Code")}</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>

      {/* Back to Login Link */}
      <div className="pt-2 text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-xs font-semibold text-pale-stone hover:text-ink transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{translate("Back to Login")}</span>
        </Link>
      </div>
    </form>
  );
};
