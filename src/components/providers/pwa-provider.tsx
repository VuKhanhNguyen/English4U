"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { showToast } from "@/components/ui/toast";
import { useLanguage } from "@/components/providers/language-provider";

interface PwaContextType {
  isInstallable: boolean;
  isInstalled: boolean;
  installApp: () => void;
}

const PwaContext = createContext<PwaContextType | undefined>(undefined);

export function PwaProvider({ children }: { children: React.ReactNode }) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showIosModal, setShowIosModal] = useState(false);
  const { translate, lang } = useLanguage();

  useEffect(() => {
    // 1. Check if already installed / running standalone
    const isStandalone = 
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;
    
    setIsInstalled(isStandalone);

    // 2. Handle beforeinstallprompt event (Chrome, Edge, Android)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    // 3. Handle appinstalled event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
      
      showToast({
        title: lang === "vi" ? "Cài đặt thành công" : "App Installed",
        message: lang === "vi" 
          ? "Ứng dụng English4U đã được thêm vào màn hình chính." 
          : "English4U has been added to your home screen.",
        variant: "success",
        position: "top-right",
      });
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    // 4. Register Service Worker
    if ("serviceWorker" in navigator) {
      // Register after page load to prevent blocking initial load
      const registerSW = () => {
        navigator.serviceWorker.register("/sw.js")
          .then((reg) => {
            console.log("Service Worker registered successfully with scope:", reg.scope);
          })
          .catch((err) => {
            console.error("Service Worker registration failed:", err);
          });
      };

      if (document.readyState === "complete") {
        registerSW();
      } else {
        window.addEventListener("load", registerSW);
        return () => window.removeEventListener("load", registerSW);
      }
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, [lang]);

  // Check if user is on iOS device
  const isIos = () => {
    if (typeof window === "undefined") return false;
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  };

  const installApp = () => {
    // If we have a saved chrome/edge/android prompt
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null);
        setIsInstallable(false);
      });
    } 
    // If it's an iOS device and not already in standalone mode
    else if (isIos() && !isInstalled) {
      setShowIosModal(true);
    } 
    // Fallback if not installable or already installed
    else {
      showToast({
        title: lang === "vi" ? "Thông báo" : "Notice",
        message: lang === "vi" 
          ? "Ứng dụng này đã được cài đặt hoặc trình duyệt của bạn không hỗ trợ cài đặt tự động. Vui lòng kiểm tra menu trình duyệt."
          : "This app is already installed or your browser doesn't support automatic installation. Please check your browser menu.",
        variant: "default",
        position: "top-right",
      });
    }
  };

  return (
    <PwaContext.Provider value={{ isInstallable: isInstallable || (isIos() && !isInstalled), isInstalled, installApp }}>
      {children}

      {/* iOS Manual Installation Guide Sheet */}
      <AnimatePresence>
        {showIosModal && (
          <div className="fixed inset-0 z-9999 flex items-end md:items-center justify-center pointer-events-none">
            {/* Dark/Blur Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowIosModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md pointer-events-auto"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ y: "100%", scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: "100%", scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-full max-w-md bg-paper-canvas border border-white/20 dark:border-white/10 rounded-t-lg md:rounded-lg p-6 shadow-2xl pointer-events-auto flex flex-col gap-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowIosModal(false)}
                className="absolute top-4 right-4 p-2 rounded-md hover:bg-off-black/5 dark:hover:bg-white/10 text-ink/75 hover:text-ink transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title & Description */}
              <div className="flex flex-col items-center text-center mt-2">
                <img
                  src="/imgs/logo2.png"
                  alt="English4U Logo"
                  className="w-16 h-16 rounded-md mb-3 shadow-md"
                />
                <h3 className="text-lg font-bold text-ink">
                  {lang === "vi" ? "Cài đặt English4U trên iOS" : "Install English4U on iOS"}
                </h3>
                <p className="text-xs text-ink/60 mt-1">
                  {lang === "vi" 
                    ? "Thêm vào màn hình chính của bạn chỉ với 2 bước nhanh chóng"
                    : "Add to your home screen in just 2 quick steps"}
                </p>
              </div>

              <hr className="border-t border-off-black/10 dark:border-white/10" />

              {/* Steps */}
              <div className="flex flex-col gap-4 text-sm text-ink">
                {/* Step 1 */}
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-md bg-off-black/5 dark:bg-white/10 flex items-center justify-center font-bold text-ink shrink-0">
                    1
                  </div>
                  <div className="flex flex-col gap-1 justify-center pt-0.5">
                    <p className="font-medium">
                      {lang === "vi" ? "Nhấn nút Chia sẻ trong Safari" : "Tap the Share button in Safari"}
                    </p>
                    <p className="text-xs text-ink/60 flex items-center gap-1.5 mt-1">
                      {lang === "vi" ? "Biểu tượng ở thanh công cụ dưới:" : "Find this icon in your menu bar:"}
                      <span className="inline-flex p-1 rounded-md bg-off-black/5 dark:bg-white/10 text-ink">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-4 h-4"
                        >
                          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                          <polyline points="16 6 12 2 8 6" />
                          <line x1="12" y1="2" x2="12" y2="15" />
                        </svg>
                      </span>
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-md bg-off-black/5 dark:bg-white/10 flex items-center justify-center font-bold text-ink shrink-0">
                    2
                  </div>
                  <div className="flex flex-col gap-1 justify-center pt-0.5">
                    <p className="font-medium">
                      {lang === "vi" ? "Chọn 'Thêm vào MH chính'" : "Select 'Add to Home Screen'"}
                    </p>
                    <p className="text-xs text-ink/60 flex items-center gap-1.5 mt-1">
                      {lang === "vi" ? "Cuộn xuống tìm dòng:" : "Scroll down and select:"}
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-off-black/5 dark:bg-white/10 font-bold text-[10px]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-3 h-3"
                        >
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                          <line x1="12" y1="8" x2="12" y2="16" />
                          <line x1="8" y1="12" x2="16" y2="12" />
                        </svg>
                        {lang === "vi" ? "Thêm vào MH chính" : "Add to Home Screen"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Close Action Button */}
              <button
                onClick={() => setShowIosModal(false)}
                className="w-full h-11 rounded-lg bg-ink text-paper-canvas hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer font-bold text-sm flex items-center justify-center mt-2 shadow-sm"
              >
                {lang === "vi" ? "Đã hiểu" : "Got it"}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PwaContext.Provider>
  );
}

export function usePwa() {
  const context = useContext(PwaContext);
  if (context === undefined) {
    throw new Error("usePwa must be used within a PwaProvider");
  }
  return context;
}
