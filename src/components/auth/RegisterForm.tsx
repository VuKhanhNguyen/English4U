"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SocialLoginButtons } from "@/components/auth/SocialLoginButtons";
import { User, Mail, Lock, Eye, EyeOff, Loader2, UserPlus, AlertCircle, CheckCircle2, Globe } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/components/providers/language-provider";

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...props}>
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

const GitHubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

export const RegisterForm: React.FC = () => {
  const router = useRouter();
  const { register } = useAuth();
  const { lang, setLang, translate } = useLanguage();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Password strength meter logic
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { score: 0, label: "", color: "bg-gray-200 dark:bg-gray-700" };
    let score = 0;
    if (pwd.length >= 6) score += 1;
    if (pwd.length >= 10) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    if (score <= 2) return { score, label: translate("Weak"), color: "bg-red-500" };
    if (score === 3 || score === 4) return { score, label: translate("Medium"), color: "bg-yellow-500" };
    return { score, label: translate("Strong"), color: "bg-emerald-500" };
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const trimmedFullName = fullName.trim();
    const fullNameRegex = /^[\p{L}]+(\s+[\p{L}]+)*$/u;

    if (!trimmedFullName || !fullNameRegex.test(trimmedFullName)) {
      setError(
        translate("Full name must contain only letters and spaces, without numbers or special characters")
      );
      return;
    }

    // Client-side validations
    if (password.length < 6) {
      setError(translate("Password must be at least 6 characters."));
      return;
    }

    if (password !== confirmPassword) {
      setError(translate("Passwords do not match"));
      return;
    }

    setIsLoading(true);

    try {
      await register({ fullName: trimmedFullName, email, password });
      setSuccessMessage(translate("Registration Successful"));
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err: unknown) {
      if (err && typeof err === "object" && "message" in err) {
        setError(String(err.message));
      } else {
        setError(translate("Registration Failed. Please try again."));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = (provider: "google" | "github") => {
    const backendHost = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1").replace(/\/api\/v1\/?$/, "");
    window.location.href = `${backendHost}/oauth2/authorization/${provider}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7">
      {/* EN / VI Language Switch Toggle */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-ink/10 dark:border-white/10">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-ink">
          <Globe className="w-4 h-4 text-blue-500" />
          <span>{translate("Language")}</span>
        </div>
        <div className="flex items-center p-1 rounded-full bg-paper-canvas/80 dark:bg-zinc-900/80 border border-zinc-200/50 dark:border-zinc-800 text-[11px] font-mono font-bold shadow-inner">
          <button
            type="button"
            onClick={() => setLang("en")}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer border-none ${
              lang === "en"
                ? "bg-blue-600 text-white shadow-md font-bold"
                : "text-pale-stone hover:text-ink bg-transparent"
            }`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setLang("vi")}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer border-none ${
              lang === "vi"
                ? "bg-blue-600 text-white shadow-md font-bold"
                : "text-pale-stone hover:text-ink bg-transparent"
            }`}
          >
            VI
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm animate-fade-in my-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMessage && (
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm animate-fade-in my-2">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Full Name */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-pale-stone dark:text-gray-400 mb-2">
          {translate("Full Name")}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
            <User className="w-4.5 h-4.5" />
          </div>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            placeholder={translate("Enter your full name")}
            className="w-full pl-11 pr-4 py-3.5 bg-paper-canvas/60 dark:bg-zinc-900/60 border border-border/80 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm font-sans"
          />
        </div>
      </div>

      {/* Email */}
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

      {/* Password */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-pale-stone dark:text-gray-400 mb-2">
          {translate("Password")}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
            <Lock className="w-4.5 h-4.5" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

        {/* Password Strength Indicator */}
        {password && (
          <div className="space-y-1 pt-2">
            <div className="flex justify-between items-center text-[11px] text-gray-500">
              <span>{translate("Password Strength")}:</span>
              <span className="font-semibold">{strength.label}</span>
            </div>
            <div className="w-full h-1.5 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${strength.color}`}
                style={{ width: `${(strength.score / 5) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-pale-stone dark:text-gray-400 mb-2">
          {translate("Confirm Password")}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
            <Lock className="w-4.5 h-4.5" />
          </div>
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="••••••••"
            className="w-full pl-11 pr-11 py-3.5 bg-paper-canvas/60 dark:bg-zinc-900/60 border border-border/80 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm font-sans"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition bg-transparent border-none cursor-pointer"
          >
            {showConfirmPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
          </button>
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
              <span>{translate("Registering...")}</span>
            </>
          ) : (
            <>
              <UserPlus className="w-5 h-5" />
              <span>{translate("Register")}</span>
            </>
          )}
        </button>
      </div>

      {/* Social Buttons */}
      <SocialLoginButtons />

      {/* Bottom Switch Link */}
      <p className="text-center text-xs sm:text-sm text-pale-stone dark:text-gray-400 font-sans pt-4">
        {translate("Already have an account?")}{" "}
        <Link
          href="/login"
          className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
        >
          {translate("Sign In")}
        </Link>
      </p>
    </form>
  );
};
