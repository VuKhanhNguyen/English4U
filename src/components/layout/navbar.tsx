"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, Settings, Sun, Moon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/language-provider";
import { useTheme } from "@/components/providers/theme-provider";
import { showToast } from "@/components/ui/toast";

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [settingsRotation, setSettingsRotation] = React.useState(0);
  const { theme, setTheme } = useTheme();
  const { lang, setLang, translate } = useLanguage();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8 pointer-events-none font-abc-diatype-mono">
      <div
        className={`mx-auto max-w-6xl w-full h-[64px] flex items-center justify-between px-6 rounded-full border border-white/20 dark:border-white/10 bg-white/20 dark:bg-black/30 backdrop-blur-xl transition-all duration-300 pointer-events-auto`}
        style={{
          boxShadow: theme === "dark" 
            ? "0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.15)"
            : "0 8px 32px 0 rgba(31, 38, 135, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.6)"
        }}
      >
        <Link
          href="/"
          className="flex items-center"
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
        <nav className="hidden md:flex items-center gap-4">
          <Link
            href="/#about"
            className="text-sm font-normal text-off-black px-[10px] py-[8px] hover:underline hover:decoration-off-black transition-all"
          >
            {translate("About")}
          </Link>

          {/* Hover-activated dropdown */}
          <div
            className="relative py-2"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-normal text-off-black px-[10px] py-[8px] hover:underline hover:decoration-off-black transition-all outline-none cursor-pointer">
              Destination{" "}
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
                  className="absolute left-0 top-full min-w-[180px] z-50 mt-2 rounded-[30px] overflow-hidden p-4 border border-white/20 dark:border-white/10 pointer-events-auto"
                  style={{
                    boxShadow: theme === "dark"
                      ? "0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 10px 20px -10px rgba(0, 0, 0, 0.5)"
                      : "0 20px 40px -15px rgba(0, 0, 0, 0.15), 0 10px 20px -10px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  {/* Glass Backdrop Layer */}
                  <div
                    className="absolute inset-0 z-0 overflow-hidden rounded-[30px]"
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
                    className="absolute inset-0 z-20 rounded-[30px] overflow-hidden pointer-events-none"
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
            {translate("Resources")}
          </Link>
          <Link
            href="/#contact"
            className="text-sm font-normal text-off-black px-[10px] py-[8px] hover:underline hover:decoration-off-black transition-all"
          >
            {translate("Contact")}
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4 relative">
          <Button
            variant="ghost"
            className="h-[36px] px-4 rounded-full border border-off-black text-off-black bg-transparent hover:bg-off-black/5 active:bg-off-black/10 flex items-center gap-2 cursor-pointer font-normal"
            onClick={() => {
              setIsSettingsOpen(!isSettingsOpen);
              setSettingsRotation((prev) => prev + 180);
            }}
          >
            {translate("Settings")}{" "}
            <Settings
              className="w-[16px] h-[16px] transition-transform duration-500 ease-in-out"
              style={{ transform: `rotate(${settingsRotation}deg)` }}
            />
          </Button>

          <AnimatePresence>
            {isSettingsOpen && (
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
                className="absolute right-0 top-full min-w-[240px] z-50 mt-2 rounded-[30px] overflow-hidden p-6 border border-white/20 dark:border-white/10 flex flex-col gap-4 pointer-events-auto"
                style={{
                  boxShadow: theme === "dark"
                    ? "0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 10px 20px -10px rgba(0, 0, 0, 0.5)"
                    : "0 20px 40px -15px rgba(0, 0, 0, 0.15), 0 10px 20px -10px rgba(0, 0, 0, 0.1)"
                }}
              >
                {/* Glass Backdrop Layer */}
                <div
                  className="absolute inset-0 z-0 overflow-hidden rounded-[30px]"
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
                  className="absolute inset-0 z-20 rounded-[30px] overflow-hidden pointer-events-none"
                  style={{
                    boxShadow:
                      theme === "dark"
                        ? "inset 1px 1px 1px 0 rgba(255, 255, 255, 0.15), inset -1px -1px 1px 1px rgba(0, 0, 0, 0.3)"
                        : "inset 2px 2px 1px 0 rgba(255, 255, 255, 0.5), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.3)",
                  }}
                />

                {/* Content */}
                <div className="relative z-30 flex flex-col gap-4 w-full text-ink">
                  {/* Dark/Light mode toggle */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-ink">{translate("Theme")}</span>
                    <div className="flex bg-off-black/5 dark:bg-white/10 border border-off-black/10 dark:border-white/10 p-1 rounded-full">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 450, damping: 14 }}
                        onClick={() => setTheme("light")}
                        className={`p-1.5 rounded-full cursor-pointer transition-all duration-200 ${
                          theme === "light"
                            ? "bg-white/80 dark:bg-white/20 border border-off-black/15 dark:border-white/15 text-ink shadow-sm"
                            : "text-ink/50 hover:text-ink"
                        }`}
                      >
                        <Sun className={`w-[14px] h-[14px] transition-all duration-200 ${theme === "light" ? "text-amber-500 fill-amber-500" : ""}`} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 450, damping: 14 }}
                        onClick={() => setTheme("dark")}
                        className={`p-1.5 rounded-full cursor-pointer transition-all duration-200 ${
                          theme === "dark"
                            ? "bg-white/80 dark:bg-white/20 border border-off-black/15 dark:border-white/15 text-ink shadow-sm"
                            : "text-ink/50 hover:text-ink"
                        }`}
                      >
                        <Moon className={`w-[14px] h-[14px] transition-all duration-200 ${theme === "dark" ? "text-yellow-400 fill-yellow-400" : ""}`} />
                      </motion.button>
                    </div>
                  </div>

                  <hr className="border-t border-off-black/10 dark:border-white/10" />

                  {/* Language selection */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-ink">{translate("Language")}</span>
                    <div className="flex bg-off-black/5 dark:bg-white/10 border border-off-black/10 dark:border-white/10 p-1 rounded-full">
                      <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.92 }}
                        transition={{ type: "spring", stiffness: 450, damping: 14 }}
                        onClick={() => setLang("en")}
                        className={`relative overflow-hidden px-3 py-1 text-xs rounded-full font-normal cursor-pointer transition-all duration-200 ${
                          lang === "en"
                            ? "border border-off-black/15 dark:border-white/15 shadow-sm bg-white/80 dark:bg-white/20"
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
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.92 }}
                        transition={{ type: "spring", stiffness: 450, damping: 14 }}
                        onClick={() => setLang("vi")}
                        className={`relative overflow-hidden px-3 py-1 text-xs rounded-full font-normal cursor-pointer transition-all duration-200 ${
                          lang === "vi"
                            ? "border border-off-black/15 dark:border-white/15 shadow-sm bg-white/80 dark:bg-white/20"
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
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden p-2 text-ink">
          <Menu className="w-[24px] h-[24px]" />
        </button>
      </div>
      <GlassFilter />
    </header>
  );
}

// SVG Filter Component for Liquid Glass distortion
const GlassFilter: React.FC = () => (
  <svg style={{ display: "none" }}>
    <defs>
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
          scale="30"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </defs>
  </svg>
);
