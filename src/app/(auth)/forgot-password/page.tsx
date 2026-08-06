"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { OTPVerifyForm } from "@/components/auth/OTPVerifyForm";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { useLanguage } from "@/components/providers/language-provider";

type ResetStep = "EMAIL" | "OTP" | "RESET";

export default function ForgotPasswordPage() {
  const { translate } = useLanguage();

  const [step, setStep] = useState<ResetStep>("EMAIL");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleEmailSubmitted = (submittedEmail: string) => {
    setEmail(submittedEmail);
    setStep("OTP");
  };

  const handleOtpVerified = (verifiedEmail: string, verifiedOtp: string) => {
    setEmail(verifiedEmail);
    setOtp(verifiedOtp);
    setStep("RESET");
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden bg-paper-canvas text-ink">
      {/* Background Glow Effects */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-lg relative z-10 py-4">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
            <div className="w-13 h-13 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/30 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-7 h-7" />
            </div>
            <span className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              English4U
            </span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
            {step === "EMAIL" && translate("Account Recovery")}
            {step === "OTP" && translate("Security Verification")}
            {step === "RESET" && translate("Set New Password")}
          </h1>
          <p className="text-xs sm:text-sm text-pale-stone dark:text-gray-400 mt-2 font-sans">
            {step === "EMAIL" && translate("Step 1 of 3: Enter your registered email")}
            {step === "OTP" && translate("Step 2 of 3: Verify 6-digit OTP code")}
            {step === "RESET" && translate("Step 3 of 3: Create your new password")}
          </p>
        </div>

        {/* Liquid Glass Auth Card */}
        <div className="liquid-glass p-8 sm:p-10 md:p-12 shadow-2xl rounded-3xl border border-white/20 dark:border-white/10">
          {step === "EMAIL" && (
            <ForgotPasswordForm onSuccess={handleEmailSubmitted} />
          )}

          {step === "OTP" && (
            <OTPVerifyForm
              email={email}
              onSuccess={handleOtpVerified}
              onBackToEmail={() => setStep("EMAIL")}
            />
          )}

          {step === "RESET" && (
            <ResetPasswordForm email={email} otp={otp} />
          )}
        </div>

        {/* Footer info */}
        <p className="text-center text-xs text-pale-stone dark:text-gray-500 mt-8 font-sans">
          &copy; {new Date().getFullYear()} English4U. All rights reserved.
        </p>
      </div>
    </main>
  );
}
