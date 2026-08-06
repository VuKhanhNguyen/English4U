"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, Settings, Sun, Moon, X, User, LogOut, ChevronRight, LogIn, UserPlus, Sparkles, Globe, Home, Compass, FolderOpen, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/language-provider";
import { useTheme } from "@/components/providers/theme-provider";
import { useAnimation } from "@/components/providers/animation-provider";
import { showToast } from "@/components/ui/toast";
import { usePwa } from "@/components/providers/pwa-provider";
import { useAuth } from "@/context/AuthContext";
import GlassSurface from "@/components/GlassSurface";

export function Navbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, confirmLogout } = useAuth();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const [isSettingsHovered, setIsSettingsHovered] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isMobileDestinationsOpen, setIsMobileDestinationsOpen] = React.useState(false);
  const userMenuRef = React.useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const { lang, setLang, translate } = useLanguage();
  const { animationEnabled, setAnimationEnabled } = useAnimation();
  const { isInstallable, isInstalled, installApp } = usePwa();
  const isDark = theme === "dark";
  const blueColor = isDark ? "#60a5fa" : "#1b4fa3";
  const whiteColor = isDark ? "#ffffff" : "#475569";
  const yellowColor = isDark ? "#ea580c" : "#ea580c";

  const activeTab = React.useMemo(() => {
    if (!pathname) return "home";
    if (pathname === "/" || pathname === "/home") return "home";
    if (pathname.startsWith("/destination")) return "destination";
    if (pathname.startsWith("/resources")) return "resources";
    if (pathname.startsWith("/contact")) return "contact";
    if (pathname.startsWith("/profile") || pathname.startsWith("/login") || pathname.startsWith("/register")) return "profile";
    return "home";
  }, [pathname]);

  const mobileNavItems = React.useMemo(() => [
    {
      id: "home",
      label: translate("Home"),
      href: "/home",
      icon: Home,
      activeBg: "bg-purple-100/90 border-purple-300 text-purple-900 dark:bg-purple-500/25 dark:border-purple-500/40 dark:text-purple-200",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      id: "destination",
      label: "Destination",
      href: "/destination/b1",
      icon: Compass,
      activeBg: "bg-amber-100/90 border-amber-300 text-amber-900 dark:bg-amber-500/25 dark:border-amber-500/40 dark:text-amber-200",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
    {
      id: "resources",
      label: translate("Resources"),
      href: "/resources",
      icon: FolderOpen,
      activeBg: "bg-emerald-100/90 border-emerald-300 text-emerald-900 dark:bg-emerald-500/25 dark:border-emerald-500/40 dark:text-emerald-200",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      id: "contact",
      label: translate("Contact"),
      href: "/contact",
      icon: Mail,
      activeBg: "bg-rose-100/90 border-rose-300 text-rose-900 dark:bg-rose-500/25 dark:border-rose-500/40 dark:text-rose-200",
      iconColor: "text-rose-600 dark:text-rose-400",
    },
    {
      id: "profile",
      label: isAuthenticated ? (user?.fullName?.split(" ")[0] || "Profile") : translate("Login"),
      href: isAuthenticated ? "/profile" : "/login",
      icon: User,
      activeBg: "bg-cyan-100/90 border-cyan-300 text-cyan-900 dark:bg-cyan-500/25 dark:border-cyan-500/40 dark:text-cyan-200",
      iconColor: "text-cyan-600 dark:text-cyan-400",
    },
  ], [translate, isAuthenticated, user]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
        setIsSettingsHovered(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getGradientStyle = (index: number): React.CSSProperties => {
    let background = "";
    if (index === 0) {
      background = `linear-gradient(to right, ${blueColor} 0%, ${blueColor} 40%, ${whiteColor} 140%)`;
    } else if (index === 1) {
      background = `linear-gradient(to right, ${blueColor} -40%, ${whiteColor} 50%, ${yellowColor} 140%)`;
    } else if (index === 2) {
      background = `linear-gradient(to right, ${whiteColor} -20%, ${yellowColor} 100%)`;
    } else if (index === 3) {
      background = `linear-gradient(to right, ${whiteColor} -100%, ${yellowColor} 10%, ${yellowColor} 100%)`;
    } else {
      // Full Blue -> White -> Yellow gradient
      background = `linear-gradient(to right, ${blueColor} 0%, ${whiteColor} 50%, ${yellowColor} 100%)`;
    }

    return {
      backgroundImage: background,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      display: "inline-block",
    };
  };
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8 pointer-events-none font-abc-diatype-mono">
      <GlassSurface
        width="100%"
        height={64}
        borderRadius={9999}
        borderWidth={0.06}
        brightness={isDark ? 40 : 80}
        opacity={isDark ? 0.85 : 0.95}
        blur={12}
        displace={0.4}
        backgroundOpacity={isDark ? 0.15 : 0.08}
        saturation={1.2}
        distortionScale={-140}
        className="mx-auto max-w-6xl w-full pointer-events-auto shadow-[4px_4px_20px_0px_var(--shadow-3d-color)]"
        style={{ overflow: "visible" }}
      >
        <div className="w-full h-full flex items-center justify-between px-3 md:px-5 relative z-10">

        <Link
          href="/"
          className="flex items-center relative z-10"
        >
          <motion.img
            src="/imgs/logo2.png"
            alt="English4U Logo"
            className="h-[50px] w-auto"
            whileHover={{
              y: [0, -4, 0],
              transition: {
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4 relative z-10">
          <Link
            href="/home"
            className="text-sm font-normal text-off-black px-[10px] py-[8px] hover:underline hover:decoration-off-black transition-all"
          >
            <span className="text-grad-about" style={getGradientStyle(0)}>{translate("Home")}</span>
          </Link>

          {/* Hover-activated dropdown */}
          <div
            className="relative py-2"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-normal text-off-black px-[10px] py-[8px] hover:underline hover:decoration-off-black transition-all outline-none cursor-pointer">
              <span className="text-grad-destination" style={getGradientStyle(1)}>Destination</span>{" "}
              <ChevronDown
                className={`w-[16px] h-[16px] transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.92, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -8, scale: 0.92, filter: "blur(4px)" }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 18,
                    mass: 0.8
                  }}
                  className="absolute left-0 top-full min-w-[180px] z-50 mt-2 rounded-[24px] overflow-hidden p-4 border border-zinc-200/50 dark:border-zinc-800/50 pointer-events-auto shadow-xl"
                >
                  {/* Glass Backdrop Layer */}
                  <div
                    className="absolute inset-0 z-0 overflow-hidden rounded-[24px]"
                    style={{
                      backdropFilter: "blur(10px)",
                      filter: "url(#glass-distortion)",
                      isolation: "isolate",
                    }}
                  />
                  {/* Tint Overlay Layer */}
                  <div
                    className="absolute inset-0 z-10 transition-colors duration-300"
                    style={{
                      background: theme === "dark" ? "rgba(15, 15, 16, 0.55)" : "rgba(255, 255, 255, 0.45)",
                    }}
                  />
                  {/* Outer & Inner Specular Border Highlight */}
                  <div
                    className="absolute inset-0 z-20 rounded-[24px] overflow-hidden pointer-events-none"
                    style={{
                      boxShadow:
                        theme === "dark"
                          ? "inset 1px 1px 1px 0 rgba(255, 255, 255, 0.15), inset -1px -1px 1px 1px rgba(0, 0, 0, 0.3)"
                          : "inset 2px 2px 1px 0 rgba(255, 255, 255, 0.5), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.3)",
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-30 flex flex-col gap-1 w-full text-ink">
                    <motion.div
                      whileHover={{ scale: 1.03, x: 4 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className="w-full"
                    >
                      <Link
                        href="/destination/b1"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block text-sm px-4 py-2 outline-none hover:bg-off-black/5 dark:hover:bg-white/10 rounded-full cursor-pointer text-ink transition-colors duration-200 font-normal"
                      >
                        Destination B1
                      </Link>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.03, x: 4 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className="w-full"
                    >
                      <Link
                        href="/destination/b2"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block text-sm px-4 py-2 outline-none hover:bg-off-black/5 dark:hover:bg-white/10 rounded-full cursor-pointer text-ink transition-colors duration-200 font-normal"
                      >
                        Destination B2
                      </Link>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.03, x: 4 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className="w-full"
                    >
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setIsDropdownOpen(false);
                          showToast({
                            title: "Under Development",
                            message: "Destination C1 & C2 is currently under development. Stay tuned!",
                            variant: "warning",
                            position: "top-right",
                          });
                        }}
                        className="w-full text-left block text-sm px-4 py-2 outline-none hover:bg-off-black/5 dark:hover:bg-white/10 rounded-full cursor-pointer text-ink transition-colors duration-200 font-normal"
                      >
                        Destination C1 & C2
                      </button>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link
            href="/resources"
            className="text-sm font-normal text-off-black px-[10px] py-[8px] hover:underline hover:decoration-off-black transition-all"
          >
            <span className="text-grad-resources" style={getGradientStyle(2)}>{translate("Resources")}</span>
          </Link>
          <Link
            href="/contact"
            className="text-sm font-normal text-off-black px-[10px] py-[8px] hover:underline hover:decoration-off-black transition-all"
          >
            <span className="text-grad-contact" style={getGradientStyle(3)}>{translate("Contact")}</span>
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4 relative z-10" ref={userMenuRef}>
          {!isAuthenticated || !user ? (
            <div className="flex items-center gap-2">
              <Button
                asChild
                variant="ghost"
                className="h-[36px] px-4 rounded-full text-off-black bg-transparent hover:bg-off-black/5 dark:hover:bg-white/10 flex items-center gap-1.5 cursor-pointer font-bold border border-transparent hover:border-zinc-200/50 dark:hover:border-zinc-800/50 transition-all"
              >
                <Link href="/login">
                  <LogIn className="w-[16px] h-[16px] text-blue-500" />
                  <span style={getGradientStyle(0)}>{translate("Login")}</span>
                </Link>
              </Button>
              <Button
                asChild
                className="h-[36px] px-4 rounded-full text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg flex items-center gap-1.5 cursor-pointer font-bold transition-all border-none"
              >
                <Link href="/register">
                  <UserPlus className="w-[16px] h-[16px]" />
                  <span>{translate("Register")}</span>
                </Link>
              </Button>
            </div>
          ) : (
            <div className="relative">
              <Button
                variant="outline"
                className="h-[38px] px-3.5 rounded-full text-off-black bg-white/10 dark:bg-zinc-900/40 hover:bg-off-black/5 dark:hover:bg-white/10 flex items-center gap-2 cursor-pointer font-bold border border-zinc-200/50 dark:border-zinc-800/50 transition-all shadow-sm"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className="w-6 h-6 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-amber-500 flex items-center justify-center text-white text-[11px] font-bold shadow-xs">
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : user.fullName ? (
                    user.fullName.charAt(0).toUpperCase()
                  ) : (
                    user.email.charAt(0).toUpperCase()
                  )}
                </div>
                <span className="max-w-[130px] truncate text-sm font-bold" style={getGradientStyle(4)}>
                  {user.fullName || user.email.split("@")[0]}
                </span>
                <ChevronDown
                  className={`w-[16px] h-[16px] transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`}
                />
              </Button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.94, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -8, scale: 0.94, filter: "blur(4px)" }}
                    transition={{ type: "spring", stiffness: 350, damping: 22, mass: 0.8 }}
                    className="absolute right-0 top-full min-w-[230px] z-50 mt-2 rounded-[24px] overflow-visible p-3 border border-zinc-200/50 dark:border-zinc-800/50 flex flex-col gap-1 pointer-events-auto shadow-2xl"
                  >
                    {/* Glass Backdrop Layer */}
                    <div
                      className="absolute inset-0 z-0 overflow-hidden rounded-[24px]"
                      style={{
                        backdropFilter: "blur(12px)",
                        filter: "url(#glass-distortion)",
                        isolation: "isolate",
                      }}
                    />
                    {/* Tint Overlay Layer */}
                    <div
                      className="absolute inset-0 z-10 transition-colors duration-300 rounded-[24px]"
                      style={{
                        background: theme === "dark" ? "rgba(15, 15, 16, 0.75)" : "rgba(255, 255, 255, 0.75)",
                      }}
                    />
                    {/* Outer & Inner Specular Border Highlight */}
                    <div
                      className="absolute inset-0 z-20 rounded-[24px] overflow-hidden pointer-events-none"
                      style={{
                        boxShadow:
                          theme === "dark"
                            ? "inset 1px 1px 1px 0 rgba(255, 255, 255, 0.15), inset -1px -1px 1px 1px rgba(0, 0, 0, 0.3)"
                            : "inset 2px 2px 1px 0 rgba(255, 255, 255, 0.5), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.3)",
                      }}
                    />

                    {/* Content */}
                    <div className="relative z-30 flex flex-col gap-1 w-full text-ink">
                      {/* User Info Header */}
                      <div className="px-3 py-2 border-b border-off-black/10 dark:border-white/10 mb-1">
                        <p className="text-xs font-bold text-ink truncate">{user.fullName || "User"}</p>
                        <p className="text-[11px] text-ink/60 truncate">{user.email}</p>
                      </div>

                      {/* Item 1: Profile */}
                      <motion.div whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 400 }}>
                        <Link
                          href="/profile"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold hover:bg-off-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer text-ink"
                        >
                          <User className="w-4 h-4 text-blue-500" />
                          <span>{translate("Profile")}</span>
                        </Link>
                      </motion.div>

                      {/* Item 2: Settings (Hover sub-dropdown) */}
                      <div
                        className="relative"
                        onMouseEnter={() => setIsSettingsHovered(true)}
                        onMouseLeave={() => setIsSettingsHovered(false)}
                      >
                        <motion.button
                          whileHover={{ x: 3 }}
                          transition={{ type: "spring", stiffness: 400 }}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold hover:bg-off-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer text-ink text-left border-none bg-transparent"
                        >
                          <div className="flex items-center gap-2.5">
                            <Settings className="w-4 h-4 text-amber-500" />
                            <span>{translate("Settings")}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-ink/40" />
                        </motion.button>

                        {/* Nested Sub-dropdown Flyout */}
                        <AnimatePresence>
                          {isSettingsHovered && (
                            <motion.div
                              initial={{ opacity: 0, x: 10, scale: 0.95 }}
                              animate={{ opacity: 1, x: 0, scale: 1 }}
                              exit={{ opacity: 0, x: 10, scale: 0.95 }}
                              transition={{ type: "spring", stiffness: 350, damping: 22 }}
                              className="absolute right-[102%] top-0 min-w-[240px] z-50 rounded-[20px] overflow-hidden p-4 border border-zinc-200/50 dark:border-zinc-800/50 flex flex-col gap-3 pointer-events-auto shadow-2xl"
                            >
                              {/* Flyout Glass Layer */}
                              <div
                                className="absolute inset-0 z-0 overflow-hidden rounded-[20px]"
                                style={{
                                  backdropFilter: "blur(12px)",
                                  filter: "url(#glass-distortion)",
                                  isolation: "isolate",
                                }}
                              />
                              <div
                                className="absolute inset-0 z-10 transition-colors duration-300 rounded-[20px]"
                                style={{
                                  background: theme === "dark" ? "rgba(15, 15, 16, 0.85)" : "rgba(255, 255, 255, 0.85)",
                                }}
                              />
                              <div
                                className="absolute inset-0 z-20 rounded-[20px] overflow-hidden pointer-events-none"
                                style={{
                                  boxShadow:
                                    theme === "dark"
                                      ? "inset 1px 1px 1px 0 rgba(255, 255, 255, 0.15)"
                                      : "inset 2px 2px 1px 0 rgba(255, 255, 255, 0.5)",
                                }}
                              />

                              {/* Flyout Items */}
                              <div className="relative z-30 flex flex-col gap-3.5 w-full text-ink">
                                {/* Theme */}
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-xs font-bold text-ink">{translate("Theme")}</span>
                                  <div className="flex bg-off-black/5 dark:bg-white/10 border border-off-black/10 dark:border-white/10 p-1 rounded-full">
                                    <button
                                      onClick={() => setTheme("light")}
                                      className={`p-1.5 rounded-full cursor-pointer transition-all duration-200 border-none ${
                                        theme === "light"
                                          ? "bg-white/90 dark:bg-white/20 border border-off-black/15 text-ink shadow-sm"
                                          : "text-ink/50 hover:text-ink bg-transparent"
                                      }`}
                                    >
                                      <Sun className={`w-3.5 h-3.5 ${theme === "light" ? "text-amber-500 fill-amber-500" : ""}`} />
                                    </button>
                                    <button
                                      onClick={() => setTheme("dark")}
                                      className={`p-1.5 rounded-full cursor-pointer transition-all duration-200 border-none ${
                                        theme === "dark"
                                          ? "bg-white/90 dark:bg-white/20 border border-off-black/15 text-ink shadow-sm"
                                          : "text-ink/50 hover:text-ink bg-transparent"
                                      }`}
                                    >
                                      <Moon className={`w-3.5 h-3.5 ${theme === "dark" ? "text-yellow-400 fill-yellow-400" : ""}`} />
                                    </button>
                                  </div>
                                </div>

                                <hr className="border-t border-off-black/10 dark:border-white/10" />

                                {/* Animation */}
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-xs font-bold text-ink">{translate("Animation")}</span>
                                  <div className="flex bg-off-black/5 dark:bg-white/10 border border-off-black/10 dark:border-white/10 p-1 rounded-full">
                                    <button
                                      onClick={() => setAnimationEnabled(true)}
                                      className={`px-2.5 py-0.5 text-xs rounded-full font-bold cursor-pointer transition-all duration-200 border-none ${
                                        animationEnabled
                                          ? "border border-off-black/15 shadow-sm bg-white/90 dark:bg-white/20 text-ink"
                                          : "text-ink/50 hover:text-ink bg-transparent"
                                      }`}
                                    >
                                      ON
                                    </button>
                                    <button
                                      onClick={() => setAnimationEnabled(false)}
                                      className={`px-2.5 py-0.5 text-xs rounded-full font-bold cursor-pointer transition-all duration-200 border-none ${
                                        !animationEnabled
                                          ? "border border-off-black/15 shadow-sm bg-white/90 dark:bg-white/20 text-ink"
                                          : "text-ink/50 hover:text-ink bg-transparent"
                                      }`}
                                    >
                                      OFF
                                    </button>
                                  </div>
                                </div>

                                <hr className="border-t border-off-black/10 dark:border-white/10" />

                                {/* Language */}
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-xs font-bold text-ink">{translate("Language")}</span>
                                  <div className="flex bg-off-black/5 dark:bg-white/10 border border-off-black/10 dark:border-white/10 p-1 rounded-full">
                                    <button
                                      onClick={() => setLang("en")}
                                      className={`relative overflow-hidden px-2 py-0.5 text-xs rounded-full font-bold cursor-pointer transition-all duration-200 border-none ${
                                        lang === "en"
                                          ? "border border-off-black/15 shadow-sm bg-white/90 dark:bg-white/20"
                                          : "text-ink/50 hover:text-ink bg-transparent"
                                      }`}
                                    >
                                      {lang === "en" && (
                                        <img src="/english.png" alt="US" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
                                      )}
                                      <span className={lang === "en" ? "opacity-0" : "relative z-10"}>EN</span>
                                    </button>
                                    <button
                                      onClick={() => setLang("vi")}
                                      className={`relative overflow-hidden px-2 py-0.5 text-xs rounded-full font-bold cursor-pointer transition-all duration-200 border-none ${
                                        lang === "vi"
                                          ? "border border-off-black/15 shadow-sm bg-white/90 dark:bg-white/20"
                                          : "text-ink/50 hover:text-ink bg-transparent"
                                      }`}
                                    >
                                      {lang === "vi" && (
                                        <img src="/vietnam.png" alt="VN" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
                                      )}
                                      <span className={lang === "vi" ? "opacity-0" : "relative z-10"}>VI</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <hr className="border-t border-off-black/10 dark:border-white/10 my-0.5" />

                      {/* Item 3: Logout */}
                      <motion.button
                        whileHover={{ x: 3 }}
                        transition={{ type: "spring", stiffness: 400 }}
                        onClick={() => {
                          setIsProfileOpen(false);
                          confirmLogout();
                        }}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-500 dark:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer w-full text-left border-none bg-transparent"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>{translate("Logout")}</span>
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile Settings Gear Button in Top Header */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-ink relative z-50 cursor-pointer outline-none border-none bg-transparent flex items-center justify-center rounded-full hover:bg-off-black/5 dark:hover:bg-white/10 transition-colors"
          title="Settings"
        >
            <Settings className="w-[20px] h-[20px]" />
        </button>
        </div>
      </GlassSurface>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden pointer-events-auto"
            />

            {/* Bottom Sheet Drawer */}
            <motion.div
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0.05, bottom: 0.95 }}
              onDragEnd={(event, info) => {
                if (info.offset.y > 100 || info.velocity.y > 400) {
                  setIsMobileMenuOpen(false);
                }
              }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed bottom-0 left-0 right-0 max-h-[85vh] z-50 md:hidden rounded-t-[24px] border-t border-x border-zinc-200/50 dark:border-zinc-800/50 p-6 flex flex-col pointer-events-auto overflow-hidden bg-transparent shadow-[0_-12px_30px_0px_rgba(0,0,0,0.08)]"
            >
              {/* Glass Backdrop Layer */}
              <div
                className="absolute inset-0 z-0 overflow-hidden rounded-t-[24px] mobile-glass-backdrop"
                style={{
                  backdropFilter: "blur(20px)",
                  filter: "url(#glass-distortion)",
                  isolation: "isolate",
                }}
              />
              {/* Tint Overlay Layer */}
              <div
                className="absolute inset-0 z-10 transition-colors duration-300"
                style={{
                  background: theme === "dark" ? "rgba(15, 15, 16, 0.6)" : "rgba(255, 255, 255, 0.4)",
                }}
              />
              
              {/* Inner Specular Border Highlight */}
              <div
                className="absolute inset-0 z-20 rounded-t-[24px] overflow-hidden pointer-events-none"
                style={{
                  boxShadow:
                    theme === "dark"
                      ? "inset 1px 1px 1px 0 rgba(255, 255, 255, 0.15)"
                      : "inset 2px 2px 1px 0 rgba(255, 255, 255, 0.5)",
                }}
              />

              {/* Content */}
              <div className="relative z-30 flex flex-col gap-6 w-full text-ink max-h-full overflow-y-auto pt-2 scrollbar-none">
                {/* Drag handle / Accent line */}
                <div className="w-12 h-1.5 bg-off-black/10 dark:bg-white/10 rounded-full mx-auto mb-2 shrink-0" />

                {/* User Info or Auth CTA in Mobile */}
                {isAuthenticated && user ? (
                  <div className="flex flex-col gap-3 p-4 rounded-2xl bg-white/10 dark:bg-white/5 border border-zinc-200/50 dark:border-zinc-800/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-amber-500 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                        {user.fullName ? user.fullName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-bold text-ink truncate">{user.fullName || "User"}</span>
                        <span className="text-xs text-ink/60 truncate">{user.email}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-2 border-t border-off-black/10 dark:border-white/10">
                      <Link
                        href="/profile"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold transition-all"
                      >
                        <User className="w-4 h-4" />
                        <span>{translate("Profile")}</span>
                      </Link>
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          confirmLogout();
                        }}
                        className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-rose-500/10 text-rose-500 text-xs font-bold transition-all border-none cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>{translate("Logout")}</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-2">
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex-1 py-3 text-center rounded-xl bg-white/10 dark:bg-white/5 border border-zinc-200/50 dark:border-zinc-800/50 text-ink text-sm font-bold hover:bg-off-black/5 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                    >
                      <LogIn className="w-4 h-4 text-blue-500" />
                      <span>{translate("Login")}</span>
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex-1 py-3 text-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>{translate("Register")}</span>
                    </Link>
                  </div>
                )}

                {/* Nav Links */}
                <nav className="flex flex-col gap-2">
                  <Link
                    href="/home"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-normal text-off-black py-3 px-4 hover:bg-off-black/5 dark:hover:bg-white/10 rounded-2xl transition-all"
                  >
                    {translate("Home")}
                  </Link>

                  {/* Expandable Destination link */}
                  <div className="flex flex-col">
                    <button
                      onClick={() => setIsMobileDestinationsOpen(!isMobileDestinationsOpen)}
                      className="flex items-center justify-between text-lg font-normal text-off-black py-3 px-4 hover:bg-off-black/5 dark:hover:bg-white/10 rounded-2xl transition-all outline-none cursor-pointer text-left border-none bg-transparent w-full"
                    >
                      <span>Destination</span>
                      <ChevronDown
                        className={`w-[20px] h-[20px] transition-transform duration-200 ${isMobileDestinationsOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence>
                      {isMobileDestinationsOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden flex flex-col pl-6 mt-1 border-l border-off-black/10 dark:border-white/10 gap-1"
                        >
                          <Link
                            href="/destination/b1"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-base font-normal text-off-black/85 py-2.5 px-4 hover:bg-off-black/5 dark:hover:bg-white/10 rounded-xl transition-all"
                          >
                            Destination B1
                          </Link>
                          <Link
                            href="/destination/b2"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-base font-normal text-off-black/85 py-2.5 px-4 hover:bg-off-black/5 dark:hover:bg-white/10 rounded-xl transition-all"
                          >
                            Destination B2
                          </Link>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setIsMobileMenuOpen(false);
                              showToast({
                                title: "Under Development",
                                message: "Destination C1 & C2 is currently under development. Stay tuned!",
                                variant: "warning",
                                position: "top-right",
                              });
                            }}
                            className="text-left text-base font-normal text-off-black/85 py-2.5 px-4 hover:bg-off-black/5 dark:hover:bg-white/10 rounded-xl transition-all cursor-pointer outline-none border-none bg-transparent w-full"
                          >
                            Destination C1 & C2
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link
                    href="/resources"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-normal text-off-black py-3 px-4 hover:bg-off-black/5 dark:hover:bg-white/10 rounded-2xl transition-all"
                  >
                    {translate("Resources")}
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-normal text-off-black py-3 px-4 hover:bg-off-black/5 dark:hover:bg-white/10 rounded-2xl transition-all"
                  >
                    {translate("Contact")}
                  </Link>
                </nav>

                <hr className="border-t border-off-black/10 dark:border-white/10" />

                {/* Mobile Settings panel */}
                <div className="flex flex-col gap-4 px-4 pb-4">
                  <h4 className="text-xs font-bold text-pale-stone uppercase tracking-wider">{translate("Settings")}</h4>
                  
                  {/* Theme Select */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-ink">{translate("Theme")}</span>
                    <div className="flex bg-off-black/5 dark:bg-white/10 border border-off-black/10 dark:border-white/10 p-1 rounded-full">
                      <button
                        onClick={() => setTheme("light")}
                        className={`p-2 rounded-full cursor-pointer transition-all duration-200 border-none bg-transparent ${
                          theme === "light"
                            ? "bg-white dark:bg-white/20 border border-off-black/10 dark:border-white/10 text-ink shadow-sm"
                            : "text-ink/50 hover:text-ink"
                        }`}
                      >
                        <Sun className={`w-[16px] h-[16px] transition-all duration-200 ${theme === "light" ? "text-amber-500 fill-amber-500" : ""}`} />
                      </button>
                      <button
                        onClick={() => setTheme("dark")}
                        className={`p-2 rounded-full cursor-pointer transition-all duration-200 border-none bg-transparent ${
                          theme === "dark"
                            ? "bg-white dark:bg-white/20 border border-off-black/10 dark:border-white/10 text-ink shadow-sm"
                            : "text-ink/50 hover:text-ink"
                        }`}
                      >
                        <Moon className={`w-[16px] h-[16px] transition-all duration-200 ${theme === "dark" ? "text-yellow-400 fill-yellow-400" : ""}`} />
                      </button>
                    </div>
                  </div>

                  {/* Language Select */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-ink">{translate("Language")}</span>
                    <div className="flex bg-off-black/5 dark:bg-white/10 border border-off-black/10 dark:border-white/10 p-1 rounded-full">
                      <button
                        onClick={() => setLang("en")}
                        className={`relative overflow-hidden px-4 py-1.5 text-xs rounded-full font-bold cursor-pointer transition-all duration-200 border-none bg-transparent ${
                          lang === "en"
                            ? "border border-off-black/15 dark:border-white/15 shadow-sm bg-white dark:bg-white/20"
                            : "text-ink/50 hover:text-ink"
                        }`}
                      >
                        {lang === "en" && (
                          <img
                            src="/english.png"
                            alt="US Flag"
                            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                          />
                        )}
                        <span className={lang === "en" ? "opacity-0" : "relative z-10"}>
                          EN
                        </span>
                      </button>
                      <button
                        onClick={() => setLang("vi")}
                        className={`relative overflow-hidden px-4 py-1.5 text-xs rounded-full font-bold cursor-pointer transition-all duration-200 border-none bg-transparent ${
                          lang === "vi"
                            ? "border border-off-black/15 dark:border-white/15 shadow-sm bg-white dark:bg-white/20"
                            : "text-ink/50 hover:text-ink"
                        }`}
                      >
                        {lang === "vi" && (
                          <img
                            src="/vietnam.png"
                            alt="Vietnam Flag"
                            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                          />
                        )}
                        <span className={lang === "vi" ? "opacity-0" : "relative z-10"}>
                          VI
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Animation Select */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-ink">{translate("Animation")}</span>
                    <div className="flex bg-off-black/5 dark:bg-white/10 border border-off-black/10 dark:border-white/10 p-1 rounded-full">
                      <button
                        onClick={() => setAnimationEnabled(true)}
                        className={`px-4 py-1.5 text-xs rounded-full font-bold cursor-pointer transition-all duration-200 border-none bg-transparent ${
                          animationEnabled
                            ? "border border-off-black/15 dark:border-white/15 shadow-sm bg-white dark:bg-white/20 text-ink"
                            : "text-ink/50 hover:text-ink"
                        }`}
                      >
                        ON
                      </button>
                      <button
                        onClick={() => setAnimationEnabled(false)}
                        className={`px-4 py-1.5 text-xs rounded-full font-bold cursor-pointer transition-all duration-200 border-none bg-transparent ${
                          !animationEnabled
                            ? "border border-off-black/15 dark:border-white/15 shadow-sm bg-white dark:bg-white/20 text-ink"
                            : "text-ink/50 hover:text-ink"
                        }`}
                      >
                        OFF
                      </button>
                    </div>
                  </div>

                  {isInstalled && (
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-medium text-ink">
                        {lang === "vi" ? "Ứng dụng" : "App"}
                      </span>
                      <span className="px-3 py-1.5 text-xs text-green-600 dark:text-green-400 font-bold flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3.5 h-3.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        {lang === "vi" ? "Đã cài đặt" : "Installed"}
                      </span>
                    </div>
                  )}
                  {isInstallable && !isInstalled && (
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-medium text-ink">
                        {lang === "vi" ? "Ứng dụng" : "App"}
                      </span>
                      <button
                        onClick={installApp}
                        className="px-4 py-2 text-xs rounded-full border border-off-black/20 dark:border-white/20 bg-white/80 dark:bg-white/10 hover:bg-off-black/5 dark:hover:bg-white/20 text-ink cursor-pointer font-bold transition-all shadow-sm flex items-center gap-1.5 border-none"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-3.5 h-3.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                        {lang === "vi" ? "Cài đặt ứng dụng" : "Install App"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Floating Bottom Dock Navigation Bar (Matching User Image) */}
      <div className="fixed bottom-4 left-3 right-3 z-50 md:hidden pointer-events-auto flex flex-col items-center">
        {/* Destination Submenu Popover if active/clicked */}
        <AnimatePresence>
          {isMobileDestinationsOpen && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="mb-3 w-full max-w-xs rounded-[24px] p-2 bg-white/95 dark:bg-black/95 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-[0_12px_35px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.6)] flex flex-col gap-1 text-zinc-900 dark:text-white z-50"
            >
              <div className="px-3 py-1.5 text-[11px] font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
                <span>Destination Level</span>
                <button
                  onClick={() => setIsMobileDestinationsOpen(false)}
                  className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 p-0.5 border-none bg-transparent cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <Link
                href="/destination/b1"
                onClick={() => setIsMobileDestinationsOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors"
              >
                <span>Destination B1</span>
                <ChevronRight className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
              </Link>
              <Link
                href="/destination/b2"
                onClick={() => setIsMobileDestinationsOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors"
              >
                <span>Destination B2</span>
                <ChevronRight className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileDestinationsOpen(false);
                  showToast({
                    title: "Under Development",
                    message: "Destination C1 & C2 is currently under development. Stay tuned!",
                    variant: "warning",
                    position: "top-right",
                  });
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors border-none bg-transparent cursor-pointer text-left"
              >
                <span>Destination C1 & C2</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full font-bold">Soon</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Dock Container matching the photo design & theme modes */}
        <div className="w-full max-w-md bg-[#faf8f5]/90 dark:bg-[#0c0c0f]/95 backdrop-blur-2xl border border-zinc-200/90 dark:border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.6)] rounded-full p-1.5 flex items-center justify-around relative">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <div key={item.id} className="relative flex items-center justify-center">
                {item.id === "destination" ? (
                  <button
                    onClick={() => {
                      setIsMobileDestinationsOpen(!isMobileDestinationsOpen);
                    }}
                    className="relative z-10 flex items-center justify-center border-none bg-transparent outline-none cursor-pointer py-1 px-1"
                  >
                    {isActive ? (
                      <motion.div
                        layoutId="mobile-nav-pill"
                        className={`flex items-center gap-2 px-4 py-2 rounded-full border shadow-xs ${item.activeBg}`}
                        transition={{ type: "spring", stiffness: 450, damping: 32 }}
                      >
                        <Icon className={`w-4 h-4 ${item.iconColor}`} />
                        <span className="text-xs font-bold whitespace-nowrap tracking-tight">{item.label}</span>
                      </motion.div>
                    ) : (
                      <div className="p-2.5 rounded-full text-zinc-400 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                    )}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileDestinationsOpen(false)}
                    className="relative z-10 flex items-center justify-center outline-none cursor-pointer py-1 px-1"
                  >
                    {isActive ? (
                      <motion.div
                        layoutId="mobile-nav-pill"
                        className={`flex items-center gap-2 px-4 py-2 rounded-full border shadow-xs ${item.activeBg}`}
                        transition={{ type: "spring", stiffness: 450, damping: 32 }}
                      >
                        <Icon className={`w-4 h-4 ${item.iconColor}`} />
                        <span className="text-xs font-bold whitespace-nowrap tracking-tight">{item.label}</span>
                      </motion.div>
                    ) : (
                      <div className="p-2.5 rounded-full text-zinc-400 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                    )}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <GlassFilter />
    </header>
  );
}

// SVG Filter Component for Liquid Glass distortion
const GlassFilter: React.FC = () => (
  <svg style={{ width: 0, height: 0, position: "absolute", pointerEvents: "none", overflow: "hidden" }}>
    <defs>
      <linearGradient id="settings-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="var(--nav-grad-blue)" />
        <stop offset="50%" stopColor="var(--nav-grad-white)" />
        <stop offset="100%" stopColor="var(--nav-grad-yellow)" />
      </linearGradient>
      <filter
        id="glass-distortion"
        x="-20%"
        y="-20%"
        width="140%"
        height="140%"
        filterUnits="objectBoundingBox"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.001 0.005"
          numOctaves="1"
          seed="17"
          result="turbulence"
        />
        <feComponentTransfer in="turbulence" result="mapped">
          <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
          <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
          <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
        </feComponentTransfer>
        <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
        <feSpecularLighting
          in="softMap"
          surfaceScale="5"
          specularConstant="1"
          specularExponent="100"
          lightingColor="white"
          result="specLight"
        >
          <fePointLight x="-200" y="-200" z="300" />
        </feSpecularLighting>
        <feComposite
          in="specLight"
          operator="arithmetic"
          k1="0"
          k2="1"
          k3="1"
          k4="0"
          result="litImage"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="softMap"
          scale="0"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </defs>
  </svg>
);
