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

export function BentoFeatures() {
  const [bentoTheme, setBentoTheme] = React.useState<"light" | "dark">("light");
  const [searchHighlight, setSearchHighlight] = React.useState("grammar");

  return (
    <>
    <section 
      className="py-24 border-t border-charcoal-border overflow-hidden"
      style={{ background: "linear-gradient(#89e5f0, #b6eff6 27%, #ccf3fa 35%, #c5f3f8 55%)" }}
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-accent-green bg-midnight-ink px-3 py-1 rounded-full border border-charcoal-border">
            Interactive Bento Showcase
          </span>
          <h2 className="text-heading-lg font-bold tracking-tight text-midnight-ink mt-4 mb-4">
            Engineered For Absolute Visual Clarity
          </h2>
          <p className="text-body text-[#737373] max-w-2xl mx-auto">
            Traditional learning materials are dense and text-heavy. English4U
            is a custom-architected study hub built strictly for self-learners.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
          {/* Card 1: Smart Search Filter (Col Span 2) */}
          <Card
            variant="content"
            className="md:col-span-2 md:row-span-1 bg-canvas-white border-2 border-midnight-ink rounded-lg shadow-subtle p-6 flex flex-col justify-between overflow-hidden relative group"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-card-saffron border-b border-charcoal-border" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <Badge className="border-charcoal-border font-bold">
                  Fast Search
                </Badge>
                <Search className="w-[16px] h-[16px] text-midnight-ink/40" />
              </div>
              <h3 className="text-heading font-black text-midnight-ink mb-2">
                Zero-Latency Client Search
              </h3>
              <p className="text-body-sm text-[#525252] leading-relaxed max-w-md">
                Instantly filter vocabulary, grammatical structures, or
                collocations without waiting for a server request.
              </p>
            </div>

            {/* Interactive Search Mock */}
            <div className="bg-pale-ash border border-charcoal-border rounded p-3 flex gap-2 items-center overflow-x-auto">
              <span className="text-xs font-bold text-midnight-ink/40 shrink-0">
                Try typing:
              </span>
              <button
                onClick={() => setSearchHighlight("grammar")}
                className={`px-3 py-1 text-xs rounded-full border font-bold cursor-pointer transition-all ${searchHighlight === "grammar" ? "bg-midnight-ink text-canvas-white border-midnight-ink" : "bg-canvas-white border-charcoal-border text-midnight-ink"}`}
              >
                grammar
              </button>
              <button
                onClick={() => setSearchHighlight("noun")}
                className={`px-3 py-1 text-xs rounded-full border font-bold cursor-pointer transition-all ${searchHighlight === "noun" ? "bg-midnight-ink text-canvas-white border-midnight-ink" : "bg-canvas-white border-charcoal-border text-midnight-ink"}`}
              >
                noun
              </button>
              <button
                onClick={() => setSearchHighlight("phrase")}
                className={`px-3 py-1 text-xs rounded-full border font-bold cursor-pointer transition-all ${searchHighlight === "phrase" ? "bg-midnight-ink text-canvas-white border-midnight-ink" : "bg-canvas-white border-charcoal-border text-midnight-ink"}`}
              >
                phrase
              </button>
              <span className="text-xs font-bold bg-[#fef3c7] text-[#b45309] px-2 py-0.5 rounded border border-[#f59e0b] shadow-subtle-3 shrink-0 ml-auto animate-pulse">
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
            className={`md:col-span-1 md:row-span-1 border-2 border-midnight-ink rounded-lg shadow-subtle p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden cursor-pointer select-none group ${
              bentoTheme === "dark"
                ? "bg-midnight-ink text-canvas-white"
                : "bg-canvas-white text-midnight-ink"
            }`}
            onClick={() =>
              setBentoTheme(bentoTheme === "light" ? "dark" : "light")
            }
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-card-mint border-b border-charcoal-border" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <Badge className={`font-bold ${bentoTheme === "dark" ? "border-canvas-white/20 text-canvas-white" : "border-charcoal-border text-midnight-ink"}`}>
                  UX Customization
                </Badge>
                {bentoTheme === "light" ? (
                  <Sun className="w-[16px] h-[16px] text-midnight-ink" />
                ) : (
                  <Moon className="w-[16px] h-[16px] text-canvas-white" />
                )}
              </div>
              <h3 className="text-heading font-black mb-2">Theme Switcher</h3>
              <p
                className={`text-body-sm leading-relaxed ${bentoTheme === "dark" ? "text-canvas-white/80" : "text-[#525252]"}`}
              >
                Click anywhere on this card to preview the gorgeous dark-mode
                palette toggle.
              </p>
            </div>

            {/* Switched Pill Box */}
            <div
              className={`p-2.5 rounded-full border flex justify-between items-center transition-all ${
                bentoTheme === "dark"
                  ? "bg-canvas-white/10 border-canvas-white/20"
                  : "bg-pale-ash border-charcoal-border"
              }`}
            >
              <span className="text-xs font-bold ml-2">Selected Mode:</span>
              <div
                className={`text-xs px-3 py-1 rounded-full border font-bold flex items-center gap-1 ${
                  bentoTheme === "dark"
                    ? "bg-accent-green text-midnight-ink border-charcoal-border"
                    : "bg-midnight-ink text-canvas-white border-midnight-ink"
                }`}
              >
                {bentoTheme === "dark" ? "Dark Mode" : "Light Mode"}
                <Check className="w-[12px] h-[12px]" />
              </div>
            </div>
          </Card>

          {/* Card 3: Word Family Tree (Col Span 1) */}
          <Card
            variant="content"
            className="md:col-span-1 md:row-span-1 bg-canvas-white border-2 border-midnight-ink rounded-lg shadow-subtle p-6 flex flex-col justify-between overflow-hidden relative group"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-card-lavender border-b border-charcoal-border" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <Badge className="border-charcoal-border font-bold">
                  Linguistics
                </Badge>
                <Sparkles className="w-[16px] h-[16px] text-midnight-ink/40" />
              </div>
              <h3 className="text-heading font-black text-midnight-ink mb-2">
                Word Families
              </h3>
              <p className="text-body-sm text-[#525252] leading-relaxed">
                Unlock root suffixes and prefixes visually, multiplying your
                recall capability.
              </p>
            </div>

            {/* Interactive Suffix/Prefix Tree Mock */}
            <div className="flex items-center gap-2 justify-center py-1">
              <span className="text-xs font-bold px-2 py-1 bg-pale-ash border border-charcoal-border rounded shrink-0">
                struct-
              </span>
              <span className="text-midnight-ink/40 text-xs font-black">
                →
              </span>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-card-mint border border-charcoal-border rounded text-center">
                  -ure (noun)
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-card-lavender border border-charcoal-border rounded text-center">
                  -ural (adj)
                </span>
              </div>
            </div>
          </Card>

          {/* Card 4: Connected Collocations Map (Col Span 2) */}
          <Card
            variant="content"
            className="md:col-span-2 md:row-span-1 bg-canvas-white border-2 border-midnight-ink rounded-lg shadow-subtle p-6 flex flex-col justify-between overflow-hidden relative group"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-card-pink border-b border-charcoal-border" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <Badge className="border-charcoal-border font-bold">
                  Fluency Map
                </Badge>
                <Layers className="w-[16px] h-[16px] text-midnight-ink/40" />
              </div>
              <h3 className="text-heading font-black text-midnight-ink mb-2">
                Connected Collocations Bubble
              </h3>
              <p className="text-body-sm text-[#525252] leading-relaxed max-w-md">
                Learn natural word partners instead of isolated vocabulary.
                Connect verbs with nouns dynamically.
              </p>
            </div>

            {/* Connected Bubbles illustration */}
            <div className="flex justify-around items-center bg-pale-ash border border-charcoal-border rounded p-3 h-[70px] relative">
              <div className="absolute left-[35%] right-[35%] h-0.5 border-t border-dashed border-charcoal-border z-0" />
              <div className="z-10 bg-accent-green border border-charcoal-border rounded-full px-3 py-1 text-xs font-black shadow-subtle-3">
                make
              </div>
              <div className="z-10 bg-canvas-white border-2 border-midnight-ink rounded-lg px-2 py-0.5 text-[10px] font-bold shadow-subtle-3 text-center">
                an effort
              </div>
              <div className="z-10 bg-canvas-white border-2 border-midnight-ink rounded-lg px-2 py-0.5 text-[10px] font-bold shadow-subtle-3 text-center">
                a phone call
              </div>
            </div>
          </Card>

          {/* Card 5: Full Syllabus Grid (Col Span 3) */}
          <Card
            variant="content"
            className="md:col-span-3 md:row-span-1 bg-canvas-white border-2 border-midnight-ink rounded-lg shadow-subtle p-6 flex flex-col justify-between overflow-hidden relative group"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-accent-green border-b border-charcoal-border" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <Badge className="border-charcoal-border font-bold">
                  Coverage
                </Badge>
                <BookOpen className="w-[16px] h-[16px] text-accent-green" />
              </div>
              <h3 className="text-heading font-black text-midnight-ink mb-2">
                100% Comprehensive Syllabus Coverage
              </h3>
              <p className="text-body-sm text-[#525252] leading-relaxed max-w-2xl">
                Every unit in Destination B1, B2, and C1/C2 is thoroughly
                detailed. Over 90 detailed units covering thousands of custom
                tables, specific exceptions, word groups, and natural
                prepositional partnerships.
              </p>
            </div>

            {/* Grid of level badges */}
            <div className="grid grid-cols-3 gap-4 text-center mt-4">
              <div className="p-3 bg-card-saffron border border-charcoal-border rounded-lg shadow-subtle-3">
                <p className="text-[10px] font-black text-midnight-ink/40 uppercase">
                  Intermediate
                </p>
                <p className="text-sm font-black text-midnight-ink">
                  B1 Syllabus
                </p>
              </div>
              <div className="p-3 bg-card-mint border border-charcoal-border rounded-lg shadow-subtle-3">
                <p className="text-[10px] font-black text-midnight-ink/40 uppercase">
                  Upper-Inter
                </p>
                <p className="text-sm font-black text-midnight-ink">
                  B2 Syllabus
                </p>
              </div>
              <div className="p-3 bg-card-lavender border border-charcoal-border rounded-lg shadow-subtle-3">
                <p className="text-[10px] font-black text-midnight-ink/40 uppercase">
                  Proficient
                </p>
                <p className="text-sm font-black text-midnight-ink">
                  C1 & C2 Syllabus
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>

    {/* Mint green slider bar with wave separator */}
    <div className="relative -mt-1 z-20 overflow-hidden bg-sky-breeze-gradient">
      {/* Wave SVG separator */}
      <img 
        src="/imgs/wave.svg" 
        className="w-full h-auto block select-none pointer-events-none" 
        alt="wave transition" 
      />
      
      {/* Slider content placed absolute on top of the SVG filled area (bottom half) */}
      <div className="absolute bottom-2 md:bottom-4 lg:bottom-6 left-0 right-0 z-10 flex items-center overflow-hidden">
        <div className="flex gap-16 whitespace-nowrap animate-marquee shrink-0">
          {/* First loop of items */}
          {sliderItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <span className={`text-sm md:text-base font-black tracking-tight uppercase italic ${itemColors[idx % itemColors.length]}`}>
                {item}
              </span>
            </div>
          ))}
          {/* Second loop */}
          {sliderItems.map((item, idx) => (
            <div key={`dup-${idx}`} className="flex items-center gap-4">
              <span className={`text-sm md:text-base font-black tracking-tight uppercase italic ${itemColors[idx % itemColors.length]}`}>
                {item}
              </span>
            </div>
          ))}
          {/* Third loop */}
          {sliderItems.map((item, idx) => (
            <div key={`dup2-${idx}`} className="flex items-center gap-4">
              <span className={`text-sm md:text-base font-black tracking-tight uppercase italic ${itemColors[idx % itemColors.length]}`}>
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}

const itemColors = [
  "text-[#E11D48]", // Premium Rose
  "text-[#2563EB]", // Royal Blue
  "text-[#059669]", // Deep Emerald
  "text-[#7C3AED]", // Neon Violet
  "text-[#D97706]", // Rich Amber
  "text-[#DB2777]", // Hot Pink
  "text-[#0284C7]", // Bright Sky Blue
  "text-[#9333EA]", // Electric Purple
  "text-[#EA580C]", // Flame Orange
  "text-[#4F46E5]", // Vivid Indigo
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
