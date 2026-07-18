"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Sun,
  Moon,
  Sparkles,
  BookOpen,
  Layers,
  Check,
} from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";

export function BentoFeatures() {
  const { translate } = useLanguage();
  const [bentoTheme, setBentoTheme] = React.useState<"light" | "dark">("light");
  const [searchHighlight, setSearchHighlight] = React.useState("grammar");

  return (
    <>
    <section 
      className="py-24 border-t border-off-black/10 dark:border-white/10 overflow-hidden bg-section-bento"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <div className="text-center mb-16 font-sans">
          <span className="section-badge">
            <span className="text-gradient-badge">
              {translate("Interactive Bento Showcase")}
            </span>
          </span>
          <br/>
          <h2 className="text-heading-lg font-heading font-normal tracking-[-0.02em] text-gradient-heading mt-4 mb-4">
            {translate("Engineered For Absolute Visual Clarity")}
          </h2>
          <p className="text-body text-pale-stone max-w-2xl mx-auto">
            {translate("Traditional learning materials are dense and text-heavy. English4U is a custom-architected study hub built strictly for self-learners.")}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto md:auto-rows-[300px] font-sans">
          {/* Card 1: Smart Search Filter (Col Span 2) */}
          <motion.div
            className="md:col-span-2 md:row-span-1"
            whileHover={{ y: -6, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <Card
              variant="content"
              className="h-full flex flex-col justify-between overflow-hidden relative group min-h-[300px] md:min-h-0 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Badge className="border border-zinc-200/50 dark:border-zinc-800/50 font-semibold rounded-full px-3 py-0.5 text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                    {translate("Fast Search")}
                  </Badge>
                  <Search className="w-[16px] h-[16px] text-ink/40 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
                </div>
                <h3 className="text-heading font-normal text-ink mb-2 tracking-tight">
                  {translate("Instant Interactive Search")}
                </h3>
                <p className="text-body-sm text-pale-stone leading-relaxed max-w-md">
                  {translate("Instantly filter vocabulary, grammatical structures, or collocations without waiting for a server request.")}
                </p>
              </div>

              {/* Interactive Search Mock */}
              <div className="bg-zinc-50 border border-zinc-200/50 dark:bg-zinc-900/30 dark:border-zinc-800/50 rounded-2xl p-2 px-4 flex gap-2 items-center overflow-x-auto shadow-inner">
                <span className="text-xs font-normal text-zinc-400 dark:text-zinc-500 shrink-0">
                  {translate("Try typing:")}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSearchHighlight("grammar")}
                  className={`px-3 py-1 text-xs rounded-full border font-semibold cursor-pointer transition-all ${searchHighlight === "grammar" ? "bg-blue-600 text-white border-blue-600 shadow-sm" : "bg-transparent border-zinc-200/50 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"}`}
                >
                  grammar
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSearchHighlight("noun")}
                  className={`px-3 py-1 text-xs rounded-full border font-semibold cursor-pointer transition-all ${searchHighlight === "noun" ? "bg-blue-600 text-white border-blue-600 shadow-sm" : "bg-transparent border-zinc-200/50 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"}`}
                >
                  noun
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSearchHighlight("phrase")}
                  className={`px-3 py-1 text-xs rounded-full border font-semibold cursor-pointer transition-all ${searchHighlight === "phrase" ? "bg-blue-600 text-white border-blue-600 shadow-sm" : "bg-transparent border-zinc-200/50 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"}`}
                >
                  phrase
                </motion.button>
                <span className="text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full border border-blue-500/20 shrink-0 ml-auto font-mono">
                  {searchHighlight === "grammar"
                    ? "Present Simple..."
                    : searchHighlight === "noun"
                      ? "Structuring..."
                      : "make an effort..."}
                </span>
              </div>
            </Card>
          </motion.div>

          {/* Card 2: Theme Switcher Preview (Col Span 1) */}
          <motion.div
            className="md:col-span-1 md:row-span-1"
            whileHover={{ y: -6, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <Card
              variant="content"
              className="h-full flex flex-col justify-between transition-all duration-300 relative overflow-hidden cursor-pointer select-none group min-h-[300px] md:min-h-0"
              onClick={() =>
                setBentoTheme(bentoTheme === "light" ? "dark" : "light")
              }
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Badge className="border border-zinc-200/50 dark:border-zinc-800/50 font-semibold rounded-full px-3 py-0.5 text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                    {translate("UX Customization")}
                  </Badge>
                  {bentoTheme === "light" ? (
                    <Sun className="w-[16px] h-[16px] text-ink group-hover:scale-110 group-hover:rotate-45 transition-transform duration-300" />
                  ) : (
                    <Moon className="w-[16px] h-[16px] text-ink group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300" />
                  )}
                </div>
                <h3 className="text-heading font-normal mb-2 tracking-tight">{translate("Theme Switcher")}</h3>
                <p className="text-body-sm leading-relaxed text-pale-stone">
                  {translate("Click anywhere on this card to preview the gorgeous dark-mode palette toggle.")}
                </p>
              </div>

              {/* Switched Pill Box */}
              <div
                className={`p-2 rounded-2xl border flex justify-between items-center transition-all ${
                  bentoTheme === "dark"
                    ? "bg-slate-950/20 border-zinc-800"
                    : "bg-zinc-50 border-zinc-100"
                }`}
              >
                <span className="text-xs font-normal ml-2 text-zinc-500 dark:text-zinc-400">{translate("Selected Mode:")}</span>
                <div
                  className="text-xs px-3 py-1 rounded-full border font-semibold flex items-center gap-1 bg-blue-600 text-white border-blue-600 shadow-sm"
                >
                  {bentoTheme === "dark" ? translate("Dark Mode") : translate("Light Mode")}
                  <Check className="w-[12px] h-[12px]" />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Card 3: Word Family Tree (Col Span 1) */}
          <motion.div
            className="md:col-span-1 md:row-span-1"
            whileHover={{ y: -6, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <Card
              variant="content"
              className="h-full flex flex-col justify-between overflow-hidden relative group min-h-[300px] md:min-h-0 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Badge className="border border-zinc-200/50 dark:border-zinc-800/50 font-semibold rounded-full px-3 py-0.5 text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                    {translate("Linguistics")}
                  </Badge>
                  <Sparkles className="w-[16px] h-[16px] text-ink/40 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <h3 className="text-heading font-normal text-ink mb-2 tracking-tight">
                  {translate("Word Families")}
                </h3>
                <p className="text-body-sm text-pale-stone leading-relaxed">
                  {translate("Unlock root suffixes and prefixes visually, multiplying your recall capability.")}
                </p>
              </div>

              {/* Interactive Suffix/Prefix Tree Mock */}
              <div className="flex items-center gap-2 justify-center py-1">
                <span className="text-xs font-semibold px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full shrink-0 text-blue-600 dark:text-blue-400 font-mono">
                  struct-
                </span>
                <span className="text-zinc-400 text-xs font-bold">
                  →
                </span>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-medium px-2.5 py-1 bg-zinc-100 border border-zinc-200/50 dark:bg-zinc-800/40 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-full text-center font-mono animate-none">
                    -ure (noun)
                  </span>
                  <span className="text-[10px] font-medium px-2.5 py-1 bg-zinc-100 border border-zinc-200/50 dark:bg-zinc-800/40 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-full text-center font-mono animate-none">
                    -ural (adj)
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Card 4: Connected Collocations Map (Col Span 2) */}
          <motion.div
            className="md:col-span-2 md:row-span-1"
            whileHover={{ y: -6, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <Card
              variant="content"
              className="h-full flex flex-col justify-between overflow-hidden relative group min-h-[300px] md:min-h-0 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Badge className="border border-zinc-200/50 dark:border-zinc-800/50 font-semibold rounded-full px-3 py-0.5 text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                    {translate("Fluency Map")}
                  </Badge>
                  <Layers className="w-[16px] h-[16px] text-ink/40 group-hover:scale-110 group-hover:translate-y-[-2px] transition-transform duration-300" />
                </div>
                <h3 className="text-heading font-normal text-ink mb-2 tracking-tight">
                  {translate("Natural Word Partnerships")}
                </h3>
                <p className="text-body-sm text-pale-stone leading-relaxed max-w-md">
                  {translate("Learn natural word partners instead of isolated vocabulary. Connect verbs with nouns dynamically.")}
                </p>
              </div>

              {/* Connected Bubbles illustration */}
              <div className="flex justify-around items-center bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200/40 dark:border-zinc-800/60 rounded-2xl p-3 h-[74px] relative">
                <div className="absolute left-[35%] right-[35%] h-0.5 border-t border-dashed border-zinc-300 dark:border-zinc-700 z-0" />
                <div className="z-10 bg-blue-600 text-white border border-blue-600 rounded-full px-4 py-1.5 text-xs font-semibold shadow-sm">
                  make
                </div>
                <div className="z-10 bg-white dark:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-700 rounded-full px-3 py-1 text-[11px] font-medium text-zinc-800 dark:text-zinc-200 text-center shadow-sm">
                  an effort
                </div>
                <div className="z-10 bg-white dark:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-700 rounded-full px-3 py-1 text-[11px] font-medium text-zinc-800 dark:text-zinc-200 text-center shadow-sm">
                  a phone call
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Card 5: Full Syllabus Grid (Col Span 3) */}
          <motion.div
            className="md:col-span-3 md:row-span-1"
            whileHover={{ y: -6, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <Card
              variant="content"
              className="h-full flex flex-col justify-between overflow-hidden relative group min-h-[350px] md:min-h-0 md:h-full p-8 md:p-12 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Badge className="border border-zinc-200/50 dark:border-zinc-800/50 font-semibold rounded-full px-3 py-0.5 text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                    {translate("Coverage")}
                  </Badge>
                  <BookOpen className="w-[16px] h-[16px] text-ink/60 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300" />
                </div>
                <h3 className="text-heading font-normal text-ink mb-2 tracking-tight">
                  {translate("100% Comprehensive Syllabus Coverage")}
                </h3>
                <p className="text-body-sm text-pale-stone leading-relaxed max-w-2xl">
                  {translate("Every unit in Destination B1, B2, and C1/C2 is thoroughly detailed. Over 90 detailed units covering thousands of custom tables, specific exceptions, word groups, and natural prepositional partnerships.")}
                </p>
              </div>

              {/* Grid of level badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mt-6">
                <div className="p-3 sm:p-4 bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl flex flex-col justify-center shadow-sm">
                  <p className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-mono">
                    {translate("Intermediate")}
                  </p>
                  <p className="text-sm font-semibold text-ink mt-1">
                    {translate("B1 Syllabus")}
                  </p>
                </div>
                <div className="p-3 sm:p-4 bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl flex flex-col justify-center shadow-sm">
                  <p className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-mono">
                    {translate("Upper-Inter")}
                  </p>
                  <p className="text-sm font-semibold text-ink mt-1">
                    {translate("B2 Syllabus")}
                  </p>
                </div>
                <div className="p-3 sm:p-4 bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl flex flex-col justify-center shadow-sm">
                  <p className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-mono">
                    {translate("Proficient")}
                  </p>
                  <p className="text-sm font-semibold text-ink mt-1">
                    {translate("C1 & C2 Syllabus")}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Marquee slider bar */}
    <div className="border-y border-off-black/10 dark:border-white/10 bg-[#faf9f6] dark:bg-zinc-950 py-5 flex items-center overflow-hidden">
      <div className="flex gap-8 md:gap-12 items-center whitespace-nowrap animate-marquee shrink-0">
          {/* First loop */}
          {englishLogos.map((logo, idx) => (
            <React.Fragment key={`logo-1-${idx}`}>
              <a
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center shrink-0 hover:scale-105 transition-transform duration-300 ease-out"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-9 md:h-10 w-auto object-contain brightness-95 hover:brightness-100 transition-all duration-300"
                />
              </a>
              <span className="text-zinc-300 dark:text-zinc-500/50 select-none font-extralight text-sm">|</span>
            </React.Fragment>
          ))}
          {/* Second loop */}
          {englishLogos.map((logo, idx) => (
            <React.Fragment key={`logo-2-${idx}`}>
              <a
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center shrink-0 hover:scale-105 transition-transform duration-300 ease-out"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-9 md:h-10 w-auto object-contain brightness-95 hover:brightness-100 transition-all duration-300"
                />
              </a>
              <span className="text-zinc-300 dark:text-zinc-500/50 select-none font-extralight text-sm">|</span>
            </React.Fragment>
          ))}
          {/* Third loop */}
          {englishLogos.map((logo, idx) => (
            <React.Fragment key={`logo-3-${idx}`}>
              <a
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center shrink-0 hover:scale-105 transition-transform duration-300 ease-out"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-9 md:h-10 w-auto object-contain brightness-95 hover:brightness-100 transition-all duration-300"
                />
              </a>
              <span className="text-zinc-300 dark:text-zinc-500/50 select-none font-extralight text-sm">|</span>
            </React.Fragment>
          ))}
      </div>
    </div>
    </>
  );
}

const englishLogos = [
  {
    src: "/imgs/english/british.png",
    alt: "British Council",
    href: "https://www.britishcouncil.org",
  },
  {
    src: "/imgs/english/cambridge.png",
    alt: "Cambridge English",
    href: "https://www.cambridgeenglish.org",
  },
  {
    src: "/imgs/english/cefr.png",
    alt: "CEFR",
    href: "https://www.coe.int/en/web/common-european-framework-reference-languages",
  },
  {
    src: "/imgs/english/ielts.png",
    alt: "IELTS",
    href: "https://www.ielts.org",
  },
  {
    src: "/imgs/english/toefl.png",
    alt: "TOEFL",
    href: "https://www.ets.org/toefl",
  },
  {
    src: "/imgs/english/toeic.png",
    alt: "TOEIC",
    href: "https://www.ets.org/toeic",
  },
  {
    src: "/imgs/english/vstep.png",
    alt: "VSTEP",
    href: "https://vstep.vnu.edu.vn",
  },
];
