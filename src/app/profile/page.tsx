"use client";

import React, { useState, useRef } from "react";
import NextLink from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/components/providers/language-provider";
import { useTheme } from "@/components/providers/theme-provider";
import { useAnimation } from "@/components/providers/animation-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { showToast } from "@/components/ui/toast";
import { apiClient } from "@/lib/api-client";
import LiquidShaderBackground from "@/components/ui/LiquidShaderBackground";
import GlitchText from "@/components/GlitchText";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  User,
  Mail,
  Shield,
  Calendar,
  LogOut,
  Home,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  RefreshCw,
  BadgeCheck,
  BookOpen,
  Sliders,
  Sun,
  Moon,
  Lock,
  ArrowRight,
  Zap,
  Globe,
  Edit2,
  X,
  Camera,
  ImageIcon
} from "lucide-react";

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading, logout, confirmLogout, refreshProfile } = useAuth();
  const { translate, lang } = useLanguage();
  const { theme } = useTheme();
  const { animationEnabled } = useAnimation();

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [fullNameInput, setFullNameInput] = useState("");

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    showToast({
      title: "Copied!",
      message: `${fieldName} copied to clipboard`,
      variant: "success",
    });
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshProfile();
      showToast({
        title: "Refreshed",
        message: "Profile data updated successfully.",
        variant: "success",
      });
    } catch {
      showToast({
        title: "Error",
        message: "Failed to refresh profile.",
        variant: "error",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast({ title: "Error", message: "Only image files are allowed.", variant: "error" });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      showToast({ title: "Error", message: "File size exceeds 10MB limit.", variant: "error" });
      return;
    }

    setIsUploadingAvatar(true);
    showToast({ title: "Uploading Avatar", message: "Uploading your new avatar to Cloudinary...", variant: "default" });

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "english4u/avatars");

      const uploadRes = await apiClient.post<{ url: string }>("/upload/image", formData);

      if (uploadRes.url) {
        await apiClient.put("/users/profile", { avatarUrl: uploadRes.url });
        await refreshProfile();
        showToast({ title: "Success!", message: "Avatar updated successfully!", variant: "success" });
      }
    } catch (err: any) {
      showToast({ title: "Upload Failed", message: err.message || "Failed to update avatar.", variant: "error" });
    } finally {
      setIsUploadingAvatar(false);
      if (avatarInputRef.current) avatarInputRef.current.value = "";
    }
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast({ title: "Error", message: "Only image files are allowed.", variant: "error" });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      showToast({ title: "Error", message: "File size exceeds 10MB limit.", variant: "error" });
      return;
    }

    setIsUploadingCover(true);
    showToast({ title: "Uploading Cover", message: "Uploading cover photo to Cloudinary...", variant: "default" });

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "english4u/covers");

      const uploadRes = await apiClient.post<{ url: string }>("/upload/image", formData);

      if (uploadRes.url) {
        await apiClient.put("/users/profile", { coverUrl: uploadRes.url });
        await refreshProfile();
        showToast({ title: "Success!", message: "Cover photo updated successfully!", variant: "success" });
      }
    } catch (err: any) {
      showToast({ title: "Upload Failed", message: err.message || "Failed to update cover photo.", variant: "error" });
    } finally {
      setIsUploadingCover(false);
      if (coverInputRef.current) coverInputRef.current.value = "";
    }
  };

  const handleSaveName = async () => {
    if (!fullNameInput.trim()) return;
    try {
      await apiClient.put("/users/profile", { fullName: fullNameInput.trim() });
      await refreshProfile();
      setIsEditModalOpen(false);
      showToast({ title: "Profile Updated", message: "Display name updated successfully!", variant: "success" });
    } catch (err: any) {
      showToast({ title: "Update Failed", message: err.message || "Failed to update name.", variant: "error" });
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen relative overflow-x-clip bg-paper-canvas dark:bg-black text-ink">
        <Navbar />
        <LiquidShaderBackground src="/imgs/backgroundLiquid.png" className="opacity-50 dark:opacity-30 pointer-events-none" />
        <main className="flex-grow pt-[160px] pb-24 z-10 flex items-center justify-center">
          <div className="liquid-glass p-8 flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            <p className="font-mono text-xs text-pale-stone">Loading Profile...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="flex flex-col min-h-screen relative overflow-x-clip bg-paper-canvas dark:bg-black text-ink">
        <Navbar />
        <LiquidShaderBackground src="/imgs/backgroundLiquid.png" className="opacity-50 dark:opacity-30 pointer-events-none" />
        <main className="flex-grow pt-[160px] pb-24 z-10 relative flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full liquid-glass p-8 sm:p-10 text-center flex flex-col items-center gap-6"
          >
            <div className="liquid-glass-bg" />
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 shadow-inner">
              <User className="w-8 h-8" />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="font-heading text-2xl sm:text-3xl font-normal">Access Denied</h1>
              <p className="font-sans text-xs sm:text-sm text-pale-stone">
                Please log in to your English4U account to view and manage your profile.
              </p>
            </div>
            <NextLink href="/login" className="w-full">
              <Button className="w-full h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold cursor-pointer shadow-lg hover:shadow-xl transition-all border-none">
                {translate("Login")}
              </Button>
            </NextLink>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  const createdDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "August 2026";

  return (
    <div className="flex flex-col min-h-screen relative overflow-x-clip bg-paper-canvas dark:bg-black text-ink">
      <Navbar />
      <LiquidShaderBackground src="/imgs/backgroundLiquid.png" className="opacity-50 dark:opacity-30 pointer-events-none" />

      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={avatarInputRef}
        accept="image/*"
        onChange={handleAvatarUpload}
        className="hidden"
      />
      <input
        type="file"
        ref={coverInputRef}
        accept="image/*"
        onChange={handleCoverUpload}
        className="hidden"
      />

      <main className="flex-grow pt-[140px] pb-24 z-10 relative">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10 flex flex-col gap-8 md:gap-12">
          
          {/* Breadcrumb Home > Profile */}
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 350, damping: 25, delay: 0.1 }}
            className="w-max mt-2.5 mb-2"
          >
            <Breadcrumb className="px-4 py-2 rounded-full bg-paper-canvas/50 dark:bg-zinc-950/30 backdrop-blur-md border border-off-black/10 dark:border-white/10 shadow-sm text-xs select-none font-mono">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" asChild>
                    <NextLink href="/" className="group inline-flex items-center gap-1.5 hover:text-ink transition-all duration-200 hover:bg-atmosphere-wash/50 dark:hover:bg-white/10 px-2.5 py-0.5 rounded-full -mx-1">
                      <Home className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-200" />
                      {translate("Home")}
                    </NextLink>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-pale-stone font-medium inline-flex items-center gap-1.5 px-2.5 py-0.5">
                    <User className="w-3.5 h-3.5 text-pale-stone" />
                    {translate("Profile")}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </motion.div>

          {/* Page Heading Section */}
          <div className="flex flex-col items-start gap-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-max px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs border border-blue-500/20 font-mono uppercase tracking-wider font-bold flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{translate("Account Overview")}</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="font-heading text-4xl sm:text-6xl md:text-7xl tracking-tight font-normal leading-[1.05] pb-1"
            >
              <GlitchText className="text-gradient-heading" enableOnHover={false}>
                User Profile.
              </GlitchText>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="font-mono text-xs sm:text-sm md:text-base text-pale-stone max-w-2xl leading-relaxed mt-1"
            >
            {translate("Manage your profile details, avatar, cover photo, learning progress, and preferences.")}
            </motion.p>
          </div>

          {/* Divider Line */}
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
            className="w-full h-[1px] bg-ink/10 dark:bg-white/10 origin-left"
          />

          {/* FACEBOOK-STYLE HERO PROFILE CARD BANNER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="liquid-glass relative overflow-hidden rounded-[28px] shadow-2xl flex flex-col"
          >
            <div className="liquid-glass-bg" />

            {/* UPPER AREA: COVER PHOTO (High Impact & Increased Height) */}
            <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden bg-gradient-to-r from-blue-600/30 via-indigo-600/30 to-sky-400/30 dark:from-blue-600/40 dark:via-indigo-600/40 dark:to-sky-400/40 group shrink-0">
              {user.coverUrl ? (
                <img
                  src={user.coverUrl}
                  alt="Cover Photo"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-[#0055d4]/20 via-[#475569]/20 to-[#3b82f6]/20 relative">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
                  <span className="font-mono text-xs sm:text-sm text-pale-stone/70 tracking-widest uppercase flex items-center gap-2">
                    <ImageIcon className="w-5 h-5" />
                    Default Cover Gradient
                  </span>
                </div>
              )}

              {/* Left Cover Photo Button */}
              <button
                onClick={() => coverInputRef.current?.click()}
                disabled={isUploadingCover}
                className="absolute top-4 right-4 sm:bottom-4 sm:top-auto px-4 py-2.5 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md text-white text-xs sm:text-sm font-mono font-bold flex items-center gap-2 border border-white/20 shadow-xl cursor-pointer transition-all hover:scale-105 active:scale-95 disabled:opacity-50 z-10"
              >
                <Camera className={`w-4 h-4 ${isUploadingCover ? "animate-spin" : ""}`} />
                <span>{isUploadingCover ? translate("Uploading...") : translate("Edit Cover")}</span>
              </button>
            </div>

            {/* LOWER AREA: OVERLAPPING AVATAR & USER METADATA BASE */}
            <div className="relative px-6 sm:px-10 pb-8 pt-0 flex flex-col md:flex-row items-center md:items-end justify-between gap-6 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md">
              
              {/* Left: Overlapping Avatar + User Info */}
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 sm:gap-8 text-center sm:text-left w-full md:w-auto">
                
                {/* Overlapping Avatar Container (PROMINENT LARGE FACEBOOK-STYLE AVATAR) */}
                <div className="relative shrink-0 -mt-24 sm:-mt-28 md:-mt-32 z-20">
                  <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52 rounded-full p-2 bg-paper-canvas dark:bg-zinc-950 shadow-2xl ring-4 sm:ring-8 ring-paper-canvas dark:ring-zinc-950 relative overflow-hidden flex items-center justify-center mb-[15px]">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-amber-500 flex items-center justify-center text-white text-5xl sm:text-6xl font-bold font-mono overflow-hidden shadow-inner shrink-0">
                      {user.avatarUrl ? (
                        <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                      ) : user.fullName ? (
                        user.fullName.charAt(0).toUpperCase()
                      ) : (
                        user.email.charAt(0).toUpperCase()
                      )}
                    </div>
                  </div>

                  {/* Edit Avatar Camera Button Overlay */}
                  <button
                    onClick={() => avatarInputRef.current?.click()}
                    disabled={isUploadingAvatar}
                    className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 p-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-2xl border-4 border-paper-canvas dark:border-zinc-950 cursor-pointer transition-all hover:scale-110 active:scale-95 disabled:opacity-50 z-30"
                    title="Change Avatar"
                  >
                    <Camera className={`w-5 h-5 ${isUploadingAvatar ? "animate-spin" : ""}`} />
                  </button>

                  <div className="absolute top-3 right-3 p-2 rounded-full bg-emerald-500 text-white shadow-lg border-2 border-paper-canvas dark:border-zinc-950 z-30" title="Active Account">
                    <BadgeCheck className="w-5 h-5" />
                  </div>
                </div>

                {/* User Name & Metadata Chips */}
                <div className="flex flex-col gap-2 pt-2 md:pt-4 min-w-0 mb-6 ml-6">
                  <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                    <h2 className="font-heading text-2xl sm:text-3xl font-normal text-ink truncate">
                      {user.fullName || translate("User Account")}
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] border border-emerald-500/20 font-mono font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      {translate("Active")}
                    </span>
                  </div>

                  <p className="font-mono text-xs sm:text-sm text-pale-stone truncate flex items-center justify-center sm:justify-start gap-2">
                    <span>{user.email}</span>
                    <button
                      onClick={() => handleCopy(user.email, "Email")}
                      className="p-1 rounded-lg hover:bg-ink/5 dark:hover:bg-white/10 text-pale-stone hover:text-ink transition-colors cursor-pointer"
                      title="Copy Email"
                    >
                      {copiedField === "Email" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </p>

                  {/* Metadata Chips */}
                  <div className="flex items-center justify-center sm:justify-start gap-2 pt-1 flex-wrap">
                    {user.roles && user.roles.map((role) => (
                      <span
                        key={role}
                        className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[11px] border border-blue-500/20 font-mono font-bold uppercase tracking-wider"
                      >
                        {role}
                      </span>
                    ))}
                    <span className="px-3 py-1 rounded-full bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 text-[11px] border border-zinc-500/20 font-mono font-medium">
                      ID: #{user.id}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[11px] border border-purple-500/20 font-mono font-medium">
                      {translate("Member")}: {createdDate}
                    </span>
                  </div>
                </div>

              </div>

              {/* Right: Action Buttons */}
              <div className="flex flex-col items-center gap-3 w-full md:w-auto justify-center md:justify-end pt-2 md:pt-4 mb-6">
                <Button
                  variant="outline"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="h-11 px-4 rounded-full bg-white/10 dark:bg-white/5 border border-zinc-200/50 dark:border-zinc-800/50 hover:bg-off-black/5 dark:hover:bg-white/10 text-ink text-xs font-mono font-bold flex items-center gap-2 cursor-pointer transition-all"
                >
                  <RefreshCw className={`w-4 h-4 text-blue-500 ${isRefreshing ? "animate-spin" : ""}`} />
                  <span>{isRefreshing ? translate("Syncing...") : translate("Refresh")}</span>
                </Button>

                <Button
                  onClick={confirmLogout}
                  className="h-11 px-5 rounded-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-mono font-bold flex items-center gap-2 cursor-pointer transition-all border-none"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{translate("Logout")}</span>
                </Button>
              </div>

            </div>
          </motion.div>

          {/* MAIN DASHBOARD GRID (Asymmetric 5 cols / 7 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Account Details & Security Cards (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              
              {/* Account Credentials Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                className="liquid-glass p-6 sm:p-10 relative overflow-hidden"
              >
                <div className="liquid-glass-bg" />
                <div className="relative z-10 flex flex-col gap-6">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-ink/10 dark:border-white/10 pb-4 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-normal text-ink">{translate("Account Info")}</h3>
                        <p className="font-mono text-[11px] text-pale-stone">{translate("Personal credentials")}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setFullNameInput(user.fullName || "");
                        setIsEditModalOpen(true);
                      }}
                      className="p-2 rounded-xl bg-ink/5 dark:bg-white/5 hover:bg-ink/10 dark:hover:bg-white/10 text-ink text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer border-none"
                      title="Edit Profile Name"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-blue-500" />
                      <span>{translate("Edit")}</span>
                    </button>
                  </div>

                  {/* Info List */}
                  <div className="flex flex-col gap-4 pt-2 font-mono text-xs">
                    
                    {/* Full Name */}
                    <div className="p-4 rounded-2xl bg-white/5 dark:bg-black/20 border border-zinc-200/50 dark:border-zinc-800/50 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <span className="text-[10px] text-pale-stone uppercase tracking-wider block mb-0.5">{translate("Full Name")}</span>
                        <span className="font-semibold text-ink text-sm truncate block">{user.fullName || translate("Not set")}</span>
                      </div>
                      <button
                        onClick={() => handleCopy(user.fullName || "", "Full Name")}
                        className="p-2 rounded-xl hover:bg-ink/5 dark:hover:bg-white/10 text-pale-stone hover:text-ink transition-colors cursor-pointer border-none bg-transparent"
                        title="Copy Name"
                      >
                        {copiedField === "Full Name" ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Email */}
                    <div className="p-4 rounded-2xl bg-white/5 dark:bg-black/20 border border-zinc-200/50 dark:border-zinc-800/50 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <span className="text-[10px] text-pale-stone uppercase tracking-wider block mb-0.5">{translate("Email Address")}</span>
                        <span className="font-semibold text-ink text-sm truncate block">{user.email}</span>
                      </div>
                      <button
                        onClick={() => handleCopy(user.email, "Email")}
                        className="p-2 rounded-xl hover:bg-ink/5 dark:hover:bg-white/10 text-pale-stone hover:text-ink transition-colors cursor-pointer border-none bg-transparent"
                        title="Copy Email"
                      >
                        {copiedField === "Email" ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Account ID */}
                    <div className="p-4 rounded-2xl bg-white/5 dark:bg-black/20 border border-zinc-200/50 dark:border-zinc-800/50 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] text-pale-stone uppercase tracking-wider block mb-0.5">{translate("System User ID")}</span>
                        <span className="font-semibold text-ink text-sm">#{user.id}</span>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                        {translate("Verified")}
                      </span>
                    </div>

                    {/* Joined Date */}
                    <div className="p-4 rounded-2xl bg-white/5 dark:bg-black/20 border border-zinc-200/50 dark:border-zinc-800/50 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] text-pale-stone uppercase tracking-wider block mb-0.5">{translate("Member Since")}</span>
                        <span className="font-semibold text-ink text-sm">{createdDate}</span>
                      </div>
                      <Calendar className="w-4 h-4 text-pale-stone" />
                    </div>

                  </div>
                </div>
              </motion.div>

              {/* Security & Authentication Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                className="liquid-glass p-6 sm:p-10 relative overflow-hidden"
              >
                <div className="liquid-glass-bg" />
                <div className="relative z-10 flex flex-col gap-6">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-ink/10 dark:border-white/10 pb-4 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                        <Lock className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-normal text-ink">{translate("Security & Auth")}</h3>
                        <p className="font-mono text-[11px] text-pale-stone">{translate("Spring Boot JWT Cookie Protection")}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 pt-2 font-mono text-xs">
                    <div className="p-4 rounded-2xl bg-white/5 dark:bg-black/20 border border-zinc-200/50 dark:border-zinc-800/50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Shield className="w-4 h-4 text-emerald-500" />
                        <div>
                          <span className="font-bold text-ink block">{translate("Encrypted Session")}</span>
                          <span className="text-[10px] text-pale-stone">{translate("HTTP-Only Bearer Cookie Token")}</span>
                        </div>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                        {translate("Secure")}
                      </span>
                    </div>

                    <Button
                      onClick={() => {
                        showToast({
                          title: "Security Action",
                          message: "Password change feature is enabled via Auth API.",
                          variant: "default",
                        });
                      }}
                      className="w-full h-11 rounded-xl bg-white/10 dark:bg-white/5 hover:bg-off-black/5 dark:hover:bg-white/10 border border-zinc-200/50 dark:border-zinc-800/50 text-ink text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Lock className="w-4 h-4 text-amber-500" />
                      <span>{translate("Change Password")}</span>
                    </Button>
                  </div>

                </div>
              </motion.div>

            </div>

            {/* Right Column: Learning Journey & System Diagnostics (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              
              {/* Learning Journey & Destinations Overview Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                className="liquid-glass p-6 sm:p-10 relative overflow-hidden"
              >
                <div className="liquid-glass-bg" />
                <div className="relative z-10 flex flex-col gap-6">
                  
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-ink/10 dark:border-white/10 pb-4 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-500 border border-sky-500/20">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-normal text-ink">{translate("Learning Destinations")}</h3>
                        <p className="font-mono text-[11px] text-pale-stone">{translate("Grammar, Vocabulary & Phrasal Verbs")}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-mono font-bold border border-sky-500/20">
                      {translate("B1, B2, C1 & C2")}
                    </span>
                  </div>

                  {/* Destination Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    
                    {/* Destination B1 */}
                    <NextLink href="/destination/b1" className="group">
                      <div className="p-5 rounded-2xl bg-white/5 dark:bg-black/20 border border-zinc-200/50 dark:border-zinc-800/50 hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all duration-300 flex flex-col gap-3 h-full">
                        <div className="flex items-center justify-between">
                          <span className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono font-bold text-xs flex items-center justify-center border border-blue-500/20">
                            B1
                          </span>
                          <ArrowRight className="w-4 h-4 text-pale-stone group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                        </div>
                        <div>
                          <h4 className="font-heading text-base font-normal text-ink group-hover:text-blue-500 transition-colors">
                            Destination B1
                          </h4>
                          <p className="font-mono text-[11px] text-pale-stone mt-1">{translate("Intermediate Grammar & Vocabulary")}</p>
                        </div>
                        <span className="mt-auto px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/20 w-max">
                          {translate("Ready")}
                        </span>
                      </div>
                    </NextLink>

                    {/* Destination B2 */}
                    <NextLink href="/destination/b2" className="group">
                      <div className="p-5 rounded-2xl bg-white/5 dark:bg-black/20 border border-zinc-200/50 dark:border-zinc-800/50 hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all duration-300 flex flex-col gap-3 h-full">
                        <div className="flex items-center justify-between">
                          <span className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono font-bold text-xs flex items-center justify-center border border-indigo-500/20">
                            B2
                          </span>
                          <ArrowRight className="w-4 h-4 text-pale-stone group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                        </div>
                        <div>
                          <h4 className="font-heading text-base font-normal text-ink group-hover:text-indigo-500 transition-colors">
                            Destination B2
                          </h4>
                          <p className="font-mono text-[11px] text-pale-stone mt-1">{translate("Vantage Upper-Intermediate")}</p>
                        </div>
                        <span className="mt-auto px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/20 w-max">
                          {translate("Ready")}
                        </span>
                      </div>
                    </NextLink>

                    {/* Destination C1 & C2 */}
                    <div className="p-5 rounded-2xl bg-white/5 dark:bg-black/20 border border-zinc-200/50 dark:border-zinc-800/50 flex flex-col gap-3 h-full opacity-80">
                      <div className="flex items-center justify-between">
                        <span className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono font-bold text-xs flex items-center justify-center border border-amber-500/20">
                          C1
                        </span>
                        <Zap className="w-4 h-4 text-amber-500" />
                      </div>
                      <div>
                        <h4 className="font-heading text-base font-normal text-ink">
                          Destination C1 & C2
                        </h4>
                        <p className="font-mono text-[11px] text-pale-stone mt-1">{translate("Advanced Master Class")}</p>
                      </div>
                      <span className="mt-auto px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-mono font-bold border border-amber-500/20 w-max">
                        {translate("Under Dev")}
                      </span>
                    </div>

                  </div>

                </div>
              </motion.div>

              {/* System Preferences & App Diagnostics Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                className="liquid-glass p-6 sm:p-10 relative overflow-hidden"
              >
                <div className="liquid-glass-bg" />
                <div className="relative z-10 flex flex-col gap-6">
                  
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-ink/10 dark:border-white/10 pb-4 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20">
                        <Sliders className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-normal text-ink">{translate("System Preferences")}</h3>
                        <p className="font-mono text-[11px] text-pale-stone">{translate("UI Engine & Locale settings")}</p>
                      </div>
                    </div>
                  </div>

                  {/* Settings Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 font-mono text-xs">
                    
                    {/* Theme */}
                    <div className="p-4 rounded-2xl bg-white/5 dark:bg-black/20 border border-zinc-200/50 dark:border-zinc-800/50 flex flex-col gap-2">
                      <span className="text-[10px] text-pale-stone uppercase tracking-wider">{translate("Theme Mode")}</span>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-ink capitalize">{theme}</span>
                        {theme === "dark" ? <Moon className="w-4 h-4 text-yellow-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
                      </div>
                    </div>

                    {/* Animation */}
                    <div className="p-4 rounded-2xl bg-white/5 dark:bg-black/20 border border-zinc-200/50 dark:border-zinc-800/50 flex flex-col gap-2">
                      <span className="text-[10px] text-pale-stone uppercase tracking-wider">{translate("Animation Engine")}</span>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-ink">{animationEnabled ? translate("Active (ON)") : translate("Disabled (OFF)")}</span>
                        <Zap className={`w-4 h-4 ${animationEnabled ? "text-emerald-500" : "text-pale-stone"}`} />
                      </div>
                    </div>

                    {/* Language */}
                    <div className="p-4 rounded-2xl bg-white/5 dark:bg-black/20 border border-zinc-200/50 dark:border-zinc-800/50 flex flex-col gap-2">
                      <span className="text-[10px] text-pale-stone uppercase tracking-wider">{translate("Language")}</span>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-ink">{lang === "en" ? translate("English (EN)") : translate("Vietnamese (VI)")}</span>
                        <Globe className="w-4 h-4 text-blue-500" />
                      </div>
                    </div>

                  </div>

                </div>
              </motion.div>

            </div>

          </div>

        </div>
      </main>

      {/* EDIT PROFILE MODAL */}
      <AnimatePresence>
        {isEditModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 pointer-events-auto"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-50 p-4 pointer-events-auto"
            >
              <div className="liquid-glass p-6 sm:p-8 flex flex-col gap-6 relative shadow-2xl">
                <div className="liquid-glass-bg" />
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-ink/5 dark:hover:bg-white/10 text-pale-stone hover:text-ink transition-colors cursor-pointer border-none bg-transparent"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
                    <Edit2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-normal text-ink">{translate("Edit Full Name")}</h3>
                    <p className="font-mono text-xs text-pale-stone">{translate("Update your profile display name")}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[11px] uppercase tracking-wider text-pale-stone">
                    {translate("Full Name")}
                  </label>
                  <input
                    type="text"
                    value={fullNameInput}
                    onChange={(e) => setFullNameInput(e.target.value)}
                    placeholder={translate("Enter your full name")}
                    className="w-full bg-white/5 dark:bg-black/20 border border-zinc-200/50 dark:border-zinc-800 rounded-xl px-4 py-3 text-ink font-sans text-sm outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditModalOpen(false)}
                    className="h-11 px-5 rounded-full text-xs font-mono font-bold cursor-pointer"
                  >
                    {translate("Cancel")}
                  </Button>
                  <Button
                    onClick={handleSaveName}
                    className="h-11 px-6 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-mono font-bold shadow-md cursor-pointer border-none"
                  >
                    {translate("Save Changes")}
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
