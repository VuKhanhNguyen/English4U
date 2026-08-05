"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, LogOut, Lock, X } from "lucide-react";
import {
  AuthContextType,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  UserResponse,
} from "@/types/auth";
import { apiClient } from "@/lib/api-client";
import { Button } from "@/components/ui/button";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Modals state
  const [isSessionExpiredOpen, setIsSessionExpiredOpen] = useState<boolean>(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState<boolean>(false);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

  const refreshProfile = useCallback(async () => {
    try {
      const userData = await apiClient.get<UserResponse>("/auth/me");
      setUser(userData);
    } catch {
      setUser(null);
    }
  }, []);

  const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      const response = await apiClient.post<AuthResponse>("/auth/login", credentials);
      setUser(response.user);
      return response;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterRequest): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      const response = await apiClient.post<AuthResponse>("/auth/register", data);
      return response;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoggingOut(true);
    try {
      await apiClient.post("/auth/logout");
    } catch {
      // Ignore logout errors
    } finally {
      setUser(null);
      setIsLoggingOut(false);
      setIsLoading(false);
    }
  };

  const confirmLogout = () => {
    setIsLogoutConfirmOpen(true);
  };

  const triggerSessionExpired = () => {
    setUser(null);
    setIsSessionExpiredOpen(true);
  };

  const handleConfirmLogoutClick = async () => {
    await logout();
    setIsLogoutConfirmOpen(false);
    router.push("/login");
  };

  const handleSessionExpiredOk = () => {
    setIsSessionExpiredOpen(false);
    router.push("/login");
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        await refreshProfile();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    const handleUnauthorized = () => {
      setUser(null);
      setIsSessionExpiredOpen(true);
    };

    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () => {
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
    };
  }, [refreshProfile]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        confirmLogout,
        triggerSessionExpired,
        refreshProfile,
      }}
    >
      {children}

      {/* SESSION EXPIRED POPUP MODAL */}
      <AnimatePresence>
        {isSessionExpiredOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 pointer-events-auto"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 p-4 pointer-events-auto"
            >
              <div className="liquid-glass p-6 sm:p-8 flex flex-col gap-6 relative shadow-2xl rounded-3xl border border-amber-500/20">
                <div className="liquid-glass-bg" />

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center shrink-0">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-ink">Session Expired</h3>
                    <p className="font-mono text-xs text-pale-stone mt-1">Authentication Notice</p>
                  </div>
                </div>

                <p className="text-sm font-sans text-ink/80 leading-relaxed">
                  Your session has expired. Please log in again to continue using English4U.
                </p>

                <div className="flex justify-end pt-2">
                  <Button
                    onClick={handleSessionExpiredOk}
                    className="w-full sm:w-auto h-11 px-8 p-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-mono font-bold text-xs shadow-lg cursor-pointer border-none"
                  >
                    OK
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CONFIRM LOGOUT POPUP MODAL */}
      <AnimatePresence>
        {isLogoutConfirmOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLogoutConfirmOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 pointer-events-auto"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 p-4 pointer-events-auto"
            >
              <div className="liquid-glass p-6 sm:p-8 flex flex-col gap-6 relative shadow-2xl rounded-3xl border border-rose-500/20">
                <div className="liquid-glass-bg" />
                <button
                  onClick={() => setIsLogoutConfirmOpen(false)}
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-ink/5 dark:hover:bg-white/10 text-pale-stone hover:text-ink transition-colors cursor-pointer border-none bg-transparent"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 border border-rose-500/20 flex items-center justify-center shrink-0">
                    <LogOut className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-ink">Confirm Logout</h3>
                    <p className="font-mono text-xs text-pale-stone mt-1">End Active Session</p>
                  </div>
                </div>

                <p className="text-sm font-sans text-ink/80 leading-relaxed">
                  Are you sure you want to log out of your account?
                </p>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsLogoutConfirmOpen(false)}
                    disabled={isLoggingOut}
                    className="h-11 px-6 rounded-full text-xs font-mono font-bold cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleConfirmLogoutClick}
                    disabled={isLoggingOut}
                    className="h-11 px-7 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-mono font-bold text-xs shadow-lg cursor-pointer border-none"
                  >
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
