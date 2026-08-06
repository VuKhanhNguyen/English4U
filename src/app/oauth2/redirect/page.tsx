"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/components/providers/language-provider";

export default function OAuth2RedirectPage() {
  const router = useRouter();
  const { refreshProfile } = useAuth();
  const { translate } = useLanguage();

  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const handleOAuth2Callback = async () => {
      try {
        // Fetch current user profile after OAuth2 cookie is set by Spring Boot
        await refreshProfile();
        setIsSuccess(true);
        setTimeout(() => {
          window.location.href = "/home";
        }, 1000);
      } catch (err: unknown) {
        if (err && typeof err === "object" && "message" in err) {
          setError(String(err.message));
        } else {
          setError(translate("OAuth2 authentication failed. Please try again."));
        }
        setTimeout(() => {
          window.location.href = "/login?error=oauth2_failed";
        }, 2500);
      }
    };

    handleOAuth2Callback();
  }, [refreshProfile, router, translate]);

  return (
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-paper-canvas text-ink">
      <div className="w-full max-w-md p-8 sm:p-10 liquid-glass rounded-3xl border border-white/20 dark:border-white/10 shadow-2xl text-center space-y-6">
        {error ? (
          <div className="space-y-4 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 flex items-center justify-center mx-auto shadow-lg">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-ink">{translate("Authentication Failed")}</h2>
            <p className="text-xs sm:text-sm text-pale-stone">{error}</p>
            <p className="text-xs text-pale-stone/70">{translate("Redirecting to login...")}</p>
          </div>
        ) : isSuccess ? (
          <div className="space-y-4 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-ink">{translate("Authentication Successful!")}</h2>
            <p className="text-xs sm:text-sm text-pale-stone">{translate("Welcome back! Redirecting to English4U...")}</p>
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in py-4">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto" />
            <h2 className="text-xl font-bold text-ink">{translate("Completing Sign In...")}</h2>
            <p className="text-xs sm:text-sm text-pale-stone">{translate("Please wait while we set up your session.")}</p>
          </div>
        )}
      </div>
    </main>
  );
}
