"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, Loader2, CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { useLanguage } from "@/components/providers/language-provider";

interface ResetPasswordFormProps {
  email: string;
  otp: string;
  onSuccess?: () => void;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  email,
  otp,
  onSuccess,
}) => {
  const router = useRouter();
  const { translate } = useLanguage();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword.length < 6) {
      setError(translate("Password must be at least 6 characters."));
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(translate("Passwords do not match."));
      return;
    }

    setIsLoading(true);

    try {
      await apiClient.post("/auth/reset-password", {
        email,
        otp,
        newPassword,
      });

      setIsSuccess(true);

      if (onSuccess) {
        onSuccess();
      } else {
        setTimeout(() => {
          router.push("/login?reset=success");
        }, 2000);
      }
    } catch (err: unknown) {
      if (err && typeof err === "object" && "message" in err) {
        setError(String(err.message));
      } else {
        setError(translate("Failed to reset password. Please try again."));
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center space-y-6 py-4 animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center mx-auto shadow-lg">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold font-heading text-ink">
            {translate("Password Reset Successful!")}
          </h2>
          <p className="text-xs sm:text-sm text-pale-stone font-sans">
            {translate("Your password has been updated and all active sessions were logged out for security. You can now log in with your new password.")}
          </p>
        </div>
        <div className="pt-4">
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="w-full py-4 px-5 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold text-sm sm:text-base rounded-2xl shadow-xl shadow-blue-500/25 transition flex items-center justify-center gap-2 cursor-pointer border-none"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>{translate("Go to Login")}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold font-heading text-ink">
          {translate("Reset Your Password")}
        </h2>
        <p className="text-xs sm:text-sm text-pale-stone font-sans">
          {translate("Create a strong new password for your account.")}
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm animate-fade-in my-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* New Password Input */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-pale-stone dark:text-gray-400 mb-2">
          {translate("New Password")}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
            <Lock className="w-4.5 h-4.5" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            placeholder="••••••••"
            className="w-full pl-11 pr-11 py-3.5 bg-paper-canvas/60 dark:bg-zinc-900/60 border border-border/80 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm font-sans"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition bg-transparent border-none cursor-pointer"
          >
            {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
          </button>
        </div>
      </div>

      {/* Confirm Password Input */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-pale-stone dark:text-gray-400 mb-2">
          {translate("Confirm New Password")}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
            <Lock className="w-4.5 h-4.5" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="••••••••"
            className="w-full pl-11 pr-11 py-3.5 bg-paper-canvas/60 dark:bg-zinc-900/60 border border-border/80 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm font-sans"
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
              <span>{translate("Updating Password...")}</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-5 h-5" />
              <span>{translate("Reset Password")}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
