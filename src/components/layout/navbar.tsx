"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, Settings, Sun, Moon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/language-provider";
import { useTheme } from "@/components/providers/theme-provider";

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const { lang, setLang } = useLanguage();

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
        className={`mx-auto max-w-6xl w-full h-[64px] flex items-center justify-between px-6 rounded-full border border-off-black bg-paper-canvas/70 backdrop-blur-xl shadow-md transition-all duration-300 pointer-events-auto`}
      >
        <Link
          href="/"
          className="flex items-center"
        >
          <img src="/imgs/logo2.png" alt="English4U Logo" className="h-[50px] w-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4">
          <Link
            href="/#about"
            className="text-sm font-normal text-off-black px-[10px] py-[8px] hover:underline hover:decoration-off-black transition-all"
          >
            About
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
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute left-0 top-full min-w-[180px] bg-paper-canvas border border-off-black rounded-[40px] shadow-md p-4 z-50 mt-2"
                >
                  <Link
                    href="/destination/b1"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block text-sm px-4 py-2 outline-none hover:bg-atmosphere-wash rounded-full cursor-pointer text-off-black transition-colors font-normal"
                  >
                    Destination B1
                  </Link>
                  <Link
                    href="/destination/b2"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block text-sm px-4 py-2 outline-none hover:bg-atmosphere-wash rounded-full cursor-pointer text-off-black transition-colors font-normal"
                  >
                    Destination B2
                  </Link>
                  <Link
                    href="/destination/c1-c2"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block text-sm px-4 py-2 outline-none hover:bg-atmosphere-wash rounded-full cursor-pointer text-off-black transition-colors font-normal"
                  >
                    Destination C1 & C2
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link
            href="/resources"
            className="text-sm font-normal text-off-black px-[10px] py-[8px] hover:underline hover:decoration-off-black transition-all"
          >
            Resources
          </Link>
          <Link
            href="/#contact"
            className="text-sm font-normal text-off-black px-[10px] py-[8px] hover:underline hover:decoration-off-black transition-all"
          >
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4 relative">
          <Button
            variant="ghost"
            className="h-[36px] px-4 rounded-full border border-off-black text-off-black bg-transparent hover:bg-off-black/5 active:bg-off-black/10 flex items-center gap-2 cursor-pointer font-normal"
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          >
            Settings <Settings className="w-[16px] h-[16px]" />
          </Button>

          <AnimatePresence>
            {isSettingsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute right-0 top-full min-w-[240px] bg-paper-canvas border border-off-black rounded-[40px] shadow-md p-6 z-50 mt-2 flex flex-col gap-4 pointer-events-auto"
              >
                {/* Dark/Light mode toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-ink">Theme</span>
                  <div className="flex bg-atmosphere-wash border border-off-black p-1 rounded-full">
                    <button
                      onClick={() => setTheme("light")}
                      className={`p-1.5 rounded-full cursor-pointer transition-all duration-200 ${
                        theme === "light"
                          ? "bg-paper-canvas border border-off-black text-ink shadow-sm"
                          : "text-ink/50 hover:text-ink"
                      }`}
                    >
                      <Sun className="w-[14px] h-[14px]" />
                    </button>
                    <button
                      onClick={() => setTheme("dark")}
                      className={`p-1.5 rounded-full cursor-pointer transition-all duration-200 ${
                        theme === "dark"
                          ? "bg-paper-canvas border border-off-black text-ink shadow-sm"
                          : "text-ink/50 hover:text-ink"
                      }`}
                    >
                      <Moon className="w-[14px] h-[14px]" />
                    </button>
                  </div>
                </div>

                <hr className="border-t border-off-black" />

                {/* Language selection */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-ink">Language</span>
                  <div className="flex bg-atmosphere-wash border border-off-black p-1 rounded-full">
                    <button
                      onClick={() => setLang("en")}
                      className={`px-3 py-1 text-xs rounded-full font-normal cursor-pointer transition-all duration-200 ${
                        lang === "en"
                          ? "bg-paper-canvas border border-off-black text-ink shadow-sm"
                          : "text-ink/50 hover:text-ink"
                      }`}
                    >
                      EN
                    </button>
                    <button
                      onClick={() => setLang("vi")}
                      className={`px-3 py-1 text-xs rounded-full font-normal cursor-pointer transition-all duration-200 ${
                        lang === "vi"
                          ? "bg-paper-canvas border border-off-black text-ink shadow-sm"
                          : "text-ink/50 hover:text-ink"
                      }`}
                    >
                      VI
                    </button>
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
    </header>
  );
}
