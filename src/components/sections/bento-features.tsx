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
      className="py-24 border-t border-off-black overflow-hidden bg-sky-mint-gradient"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <div className="text-center mb-16 font-abc-diatype-mono">
          <span className="text-xs font-normal uppercase tracking-wider text-paper-canvas bg-off-black px-3 py-1 rounded-full border border-off-black">
            {translate("Interactive Bento Showcase")}
          </span>
          <h2 className="text-heading-lg font-heading font-normal tracking-[-0.02em] text-ink mt-4 mb-4">
            {translate("Engineered For Absolute Visual Clarity")}
          </h2>
          <p className="text-body text-pale-stone max-w-2xl mx-auto">
            {translate("Traditional learning materials are dense and text-heavy. English4U is a custom-architected study hub built strictly for self-learners.")}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] font-abc-diatype-mono">
          {/* Card 1: Smart Search Filter (Col Span 2) */}
          <Card
            variant="content"
            className="md:col-span-2 md:row-span-1 flex flex-col justify-between overflow-hidden relative group"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-sunset-violet-gradient border-b border-off-black" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <Badge className="border-off-black font-normal rounded-full px-3 py-0.5 text-xs bg-paper-canvas text-off-black">
                  {translate("Fast Search")}
                </Badge>
                <Search className="w-[16px] h-[16px] text-off-black/40" />
              </div>
              <h3 className="text-heading font-normal text-ink mb-2 tracking-tight">
                {translate("Zero-Latency Client Search")}
              </h3>
              <p className="text-body-sm text-pale-stone leading-relaxed max-w-md">
                {translate("Instantly filter vocabulary, grammatical structures, or collocations without waiting for a server request.")}
              </p>
            </div>

            {/* Interactive Search Mock */}
            <div className="bg-atmosphere-wash border border-off-black rounded-full p-2 px-4 flex gap-2 items-center overflow-x-auto">
              <span className="text-xs font-normal text-off-black/60 shrink-0">
                {translate("Try typing:")}
              </span>
              <button
                onClick={() => setSearchHighlight("grammar")}
                className={`px-3 py-1 text-xs rounded-full border font-normal cursor-pointer transition-all ${searchHighlight === "grammar" ? "bg-off-black text-paper-canvas border-off-black" : "bg-paper-canvas border-off-black text-off-black"}`}
              >
                grammar
              </button>
              <button
                onClick={() => setSearchHighlight("noun")}
                className={`px-3 py-1 text-xs rounded-full border font-normal cursor-pointer transition-all ${searchHighlight === "noun" ? "bg-off-black text-paper-canvas border-off-black" : "bg-paper-canvas border-off-black text-off-black"}`}
              >
                noun
              </button>
              <button
                onClick={() => setSearchHighlight("phrase")}
                className={`px-3 py-1 text-xs rounded-full border font-normal cursor-pointer transition-all ${searchHighlight === "phrase" ? "bg-off-black text-paper-canvas border-off-black" : "bg-paper-canvas border-off-black text-off-black"}`}
              >
                phrase
              </button>
              <span className="text-xs font-normal bg-sky-mint-gradient text-ink px-3 py-1 rounded-full border border-off-black shrink-0 ml-auto animate-pulse">
                {searchHighlight === "grammar"
                  ? "Present Simple..."
                  : searchHighlight === "noun"
                    ? "Structuring..."
                    : "make an effort..."}
              </span>
            </div>
          </Card>

          {/* Card 2: Theme Switcher Preview (Col Span 1) */}
          <Card
            variant="content"
            className={`md:col-span-1 md:row-span-1 border border-off-black flex flex-col justify-between transition-all duration-300 relative overflow-hidden cursor-pointer select-none group ${
              bentoTheme === "dark"
                ? "bg-off-black text-paper-canvas border-off-black"
                : "bg-paper-canvas text-ink border-off-black"
            }`}
            onClick={() =>
              setBentoTheme(bentoTheme === "light" ? "dark" : "light")
            }
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-sky-mint-gradient border-b border-off-black" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <Badge className={`font-normal rounded-full px-3 py-0.5 text-xs ${bentoTheme === "dark" ? "border-paper-canvas/20 text-paper-canvas bg-paper-canvas/10" : "border-off-black text-off-black bg-atmosphere-wash"}`}>
                  {translate("UX Customization")}
                </Badge>
                {bentoTheme === "light" ? (
                  <Sun className="w-[16px] h-[16px] text-ink" />
                ) : (
                  <Moon className="w-[16px] h-[16px] text-paper-canvas" />
                )}
              </div>
              <h3 className="text-heading font-normal mb-2 tracking-tight">{translate("Theme Switcher")}</h3>
              <p
                className={`text-body-sm leading-relaxed ${bentoTheme === "dark" ? "text-paper-canvas/80" : "text-pale-stone"}`}
              >
                {translate("Click anywhere on this card to preview the gorgeous dark-mode palette toggle.")}
              </p>
            </div>

            {/* Switched Pill Box */}
            <div
              className={`p-2 rounded-full border flex justify-between items-center transition-all ${
                bentoTheme === "dark"
                  ? "bg-paper-canvas/10 border-paper-canvas/20"
                  : "bg-atmosphere-wash border-off-black"
              }`}
            >
              <span className={`text-xs font-normal ml-2 ${bentoTheme === "dark" ? "text-paper-canvas/80" : "text-off-black"}`}>{translate("Selected Mode:")}</span>
              <div
                className={`text-xs px-3 py-1 rounded-full border font-normal flex items-center gap-1 ${
                  bentoTheme === "dark"
                    ? "bg-paper-canvas text-off-black border-paper-canvas"
                    : "bg-off-black text-paper-canvas border-off-black"
                }`}
              >
                {bentoTheme === "dark" ? translate("Dark Mode") : translate("Light Mode")}
                <Check className="w-[12px] h-[12px]" />
              </div>
            </div>
          </Card>

          {/* Card 3: Word Family Tree (Col Span 1) */}
          <Card
            variant="content"
            className="md:col-span-1 md:row-span-1 flex flex-col justify-between overflow-hidden relative group"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-sunset-violet-gradient border-b border-off-black" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <Badge className="border-off-black font-normal rounded-full px-3 py-0.5 text-xs bg-paper-canvas text-off-black">
                  {translate("Linguistics")}
                </Badge>
                <Sparkles className="w-[16px] h-[16px] text-off-black/40" />
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
              <span className="text-xs font-normal px-3 py-1 bg-paper-canvas border border-off-black rounded-full shrink-0">
                struct-
              </span>
              <span className="text-off-black/40 text-xs font-normal">
                →
              </span>
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-normal px-2.5 py-1 bg-atmosphere-wash border border-off-black rounded-full text-center">
                  -ure (noun)
                </span>
                <span className="text-[10px] font-normal px-2.5 py-1 bg-atmosphere-wash border border-off-black rounded-full text-center">
                  -ural (adj)
                </span>
              </div>
            </div>
          </Card>

          {/* Card 4: Connected Collocations Map (Col Span 2) */}
          <Card
            variant="content"
            className="md:col-span-2 md:row-span-1 flex flex-col justify-between overflow-hidden relative group"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-amber-glow-gradient border-b border-off-black" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <Badge className="border-off-black font-normal rounded-full px-3 py-0.5 text-xs bg-paper-canvas text-off-black">
                  {translate("Fluency Map")}
                </Badge>
                <Layers className="w-[16px] h-[16px] text-off-black/40" />
              </div>
              <h3 className="text-heading font-normal text-ink mb-2 tracking-tight">
                {translate("Connected Collocations Bubble")}
              </h3>
              <p className="text-body-sm text-pale-stone leading-relaxed max-w-md">
                {translate("Learn natural word partners instead of isolated vocabulary. Connect verbs with nouns dynamically.")}
              </p>
            </div>

            {/* Connected Bubbles illustration */}
            <div className="flex justify-around items-center bg-atmosphere-wash border border-off-black rounded-[40px] p-3 h-[74px] relative">
              <div className="absolute left-[35%] right-[35%] h-0.5 border-t border-dashed border-off-black z-0" />
              <div className="z-10 bg-off-black text-paper-canvas border border-off-black rounded-full px-4 py-1.5 text-xs font-normal shadow-sm">
                make
              </div>
              <div className="z-10 bg-paper-canvas border border-off-black rounded-full px-3 py-1 text-[11px] font-normal text-ink text-center">
                an effort
              </div>
              <div className="z-10 bg-paper-canvas border border-off-black rounded-full px-3 py-1 text-[11px] font-normal text-ink text-center">
                a phone call
              </div>
            </div>
          </Card>

          {/* Card 5: Full Syllabus Grid (Col Span 3) */}
          <Card
            variant="content"
            className="md:col-span-3 md:row-span-1 flex flex-col justify-between overflow-hidden relative group"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-sunset-violet-gradient border-b border-off-black" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <Badge className="border-off-black font-normal rounded-full px-3 py-0.5 text-xs bg-paper-canvas text-off-black">
                  {translate("Coverage")}
                </Badge>
                <BookOpen className="w-[16px] h-[16px] text-off-black/60" />
              </div>
              <h3 className="text-heading font-normal text-ink mb-2 tracking-tight">
                {translate("100% Comprehensive Syllabus Coverage")}
              </h3>
              <p className="text-body-sm text-pale-stone leading-relaxed max-w-2xl">
                {translate("Every unit in Destination B1, B2, and C1/C2 is thoroughly detailed. Over 90 detailed units covering thousands of custom tables, specific exceptions, word groups, and natural prepositional partnerships.")}
              </p>
            </div>

            {/* Grid of level badges */}
            <div className="grid grid-cols-3 gap-4 text-center mt-4">
              <div className="p-4 bg-atmosphere-wash border border-off-black rounded-[40px] shadow-sm">
                <p className="text-[10px] font-normal text-off-black/60 uppercase tracking-wider">
                  {translate("Intermediate")}
                </p>
                <p className="text-sm font-normal text-ink mt-1">
                  {translate("B1 Syllabus")}
                </p>
              </div>
              <div className="p-4 bg-atmosphere-wash border border-off-black rounded-[40px] shadow-sm">
                <p className="text-[10px] font-normal text-off-black/60 uppercase tracking-wider">
                  {translate("Upper-Inter")}
                </p>
                <p className="text-sm font-normal text-ink mt-1">
                  {translate("B2 Syllabus")}
                </p>
              </div>
              <div className="p-4 bg-atmosphere-wash border border-off-black rounded-[40px] shadow-sm">
                <p className="text-[10px] font-normal text-off-black/60 uppercase tracking-wider">
                  {translate("Proficient")}
                </p>
                <p className="text-sm font-normal text-ink mt-1">
                  {translate("C1 & C2 Syllabus")}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>

    {/* Marquee slider bar */}
    <div className="border-t border-off-black bg-off-black py-4 flex items-center overflow-hidden">
      <div className="flex gap-12 whitespace-nowrap animate-marquee shrink-0">
          {/* First loop */}
          {sliderItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span
                className="text-sm md:text-base font-normal font-mono tracking-tight uppercase italic"
                style={itemGradients[idx % itemGradients.length]}
              >
                {translate(item)}
              </span>
              <span className="text-paper-canvas/30 text-lg select-none">·</span>
            </div>
          ))}
          {/* Second loop */}
          {sliderItems.map((item, idx) => (
            <div key={`dup-${idx}`} className="flex items-center gap-3">
              <span
                className="text-sm md:text-base font-normal font-mono tracking-tight uppercase italic"
                style={itemGradients[idx % itemGradients.length]}
              >
                {translate(item)}
              </span>
              <span className="text-paper-canvas/30 text-lg select-none">·</span>
            </div>
          ))}
          {/* Third loop */}
          {sliderItems.map((item, idx) => (
            <div key={`dup2-${idx}`} className="flex items-center gap-3">
              <span
                className="text-sm md:text-base font-normal font-mono tracking-tight uppercase italic"
                style={itemGradients[idx % itemGradients.length]}
              >
                {translate(item)}
              </span>
              <span className="text-paper-canvas/30 text-lg select-none">·</span>
            </div>
          ))}
      </div>
    </div>
    </>
  );
}

// Gradient text styles for marquee items — each item gets a unique vibrant gradient
const itemGradients: React.CSSProperties[] = [
  // Sky Blue → Mint
  { background: "linear-gradient(90deg, #a0b5eb, #a7fccd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" },
  // Amber → Orange glow
  { background: "linear-gradient(90deg, #e2c161, #f37a0a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" },
  // Sunset Orange → Violet Blue
  { background: "linear-gradient(90deg, #ffa773, #a0b5eb)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" },
  // Soft Mint → Sky Blue
  { background: "linear-gradient(90deg, #a7fccd, #a0b5eb)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" },
  // Warm Amber → Paper Canvas
  { background: "linear-gradient(90deg, #e2c161, #f6f3f1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" },
  // Violet → Orange
  { background: "linear-gradient(90deg, #c4b5fd, #ffa773)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" },
  // Mint → Amber
  { background: "linear-gradient(90deg, #a7fccd, #e2c161)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" },
  // Paper White → Sky Blue
  { background: "linear-gradient(90deg, #f6f3f1, #a0b5eb)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" },
  // Orange → Mint
  { background: "linear-gradient(90deg, #f37a0a, #a7fccd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" },
  // Sky Blue → Amber
  { background: "linear-gradient(90deg, #a0b5eb, #e2c161)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" },
];

const sliderItems = [
  "Word Patterns",
  "Vocabulary Systems",
  "Word Family Trees",
  "IELTS Academic",
  "VSTEP Masterclass",
  "TOEIC Practice",
  "Grammar Rules",
  "Phrasal Verbs",
  "Collocations Map",
  "Prepositional Phrases",
];
