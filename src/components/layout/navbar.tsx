"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, Settings, Sun, Moon } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  const [lang, setLang] = React.useState<"en" | "vi">("en");

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8 pointer-events-none">
      <div
        className={`mx-auto max-w-6xl w-full h-[64px] flex items-center justify-between px-6 rounded-full border border-charcoal-border bg-canvas-white/90 backdrop-blur-md shadow-subtle transition-all duration-300 pointer-events-auto`}
      >
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-midnight-ink"
        >
          English4<span className="text-accent-green">U</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/#about"
            className="text-sm font-medium hover:text-accent-green transition-colors"
          >
            About
          </Link>

          {/* Hover-activated dropdown */}
          <div
            className="relative py-2"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium hover:text-accent-green transition-colors outline-none cursor-pointer">
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
                  className="absolute left-0 top-full min-w-[160px] bg-canvas-white border border-charcoal-border rounded-md shadow-subtle-2 p-2 z-50 mt-2"
                >
                  <Link
                    href="/destination/b1"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block text-sm px-3 py-2 outline-none hover:bg-pale-ash rounded cursor-pointer text-midnight-ink transition-colors font-medium"
                  >
                    Destination B1
                  </Link>
                  <Link
                    href="/destination/b2"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block text-sm px-3 py-2 outline-none hover:bg-pale-ash rounded cursor-pointer text-midnight-ink transition-colors font-medium"
                  >
                    Destination B2
                  </Link>
                  <Link
                    href="/destination/c1-c2"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block text-sm px-3 py-2 outline-none hover:bg-pale-ash rounded cursor-pointer text-midnight-ink transition-colors font-medium"
                  >
                    Destination C1 & C2
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link
            href="/#resources"
            className="text-sm font-medium hover:text-accent-green transition-colors"
          >
            Resources
          </Link>
          <Link
            href="/#contact"
            className="text-sm font-medium hover:text-accent-green transition-colors"
          >
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4 relative">
          <Button
            variant="primary"
            size="ghost"
            className="h-[36px] px-4 rounded-full bg-accent-green text-midnight-ink border border-charcoal-border shadow-[1px_1px_0px_0px_rgb(10,10,13)] hover:shadow-subtle active:shadow-subtle-3 flex items-center gap-2 cursor-pointer font-bold"
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
                className="absolute right-0 top-full min-w-[220px] bg-canvas-white border border-charcoal-border rounded-md shadow-subtle-2 p-3 z-50 mt-2 flex flex-col gap-3 pointer-events-auto"
              >
                {/* Dark/Light mode toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-midnight-ink">Theme</span>
                  <div className="flex bg-pale-ash border border-charcoal-border p-0.5 rounded-full">
                    <button
                      onClick={() => setTheme("light")}
                      className={`p-1.5 rounded-full cursor-pointer transition-all duration-200 ${
                        theme === "light"
                          ? "bg-canvas-white border border-charcoal-border text-midnight-ink shadow-subtle-3"
                          : "text-midnight-ink/50 hover:text-midnight-ink"
                      }`}
                    >
                      <Sun className="w-[14px] h-[14px]" />
                    </button>
                    <button
                      onClick={() => setTheme("dark")}
                      className={`p-1.5 rounded-full cursor-pointer transition-all duration-200 ${
                        theme === "dark"
                          ? "bg-canvas-white border border-charcoal-border text-midnight-ink shadow-subtle-3"
                          : "text-midnight-ink/50 hover:text-midnight-ink"
                      }`}
                    >
                      <Moon className="w-[14px] h-[14px]" />
                    </button>
                  </div>
                </div>

                <hr className="border-t border-charcoal-border" />

                {/* Language selection */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-midnight-ink">Language</span>
                  <div className="flex bg-pale-ash border border-charcoal-border p-0.5 rounded-full">
                    <button
                      onClick={() => setLang("en")}
                      className={`px-2 py-1 text-xs rounded-full font-bold cursor-pointer transition-all duration-200 ${
                        lang === "en"
                          ? "bg-canvas-white border border-charcoal-border text-midnight-ink shadow-subtle-3"
                          : "text-midnight-ink/50 hover:text-midnight-ink"
                      }`}
                    >
                      EN
                    </button>
                    <button
                      onClick={() => setLang("vi")}
                      className={`px-2 py-1 text-xs rounded-full font-bold cursor-pointer transition-all duration-200 ${
                        lang === "vi"
                          ? "bg-canvas-white border border-charcoal-border text-midnight-ink shadow-subtle-3"
                          : "text-midnight-ink/50 hover:text-midnight-ink"
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
        <button className="md:hidden p-2 text-midnight-ink">
          <Menu className="w-[24px] h-[24px]" />
        </button>
      </div>
    </header>
  );
}
