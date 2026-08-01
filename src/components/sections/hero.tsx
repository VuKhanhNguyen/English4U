"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/language-provider";
import GlitchText from "@/components/GlitchText";
import TextType from "@/components/TextType";

import { FloatingItem } from "@/components/ui/floating-items";

export interface HeroSectionProps {
  hideButtons?: boolean;
  title1?: string;
  title2?: string;
  subtitle?: string;
}

export function HeroSection({
  hideButtons = false,
  title1 = "Master English",
  title2 = "Grammar & Vocabulary",
  subtitle = "Learn Destination B1, B2, C1 & C2 with structured grammar tables, vocabulary systems, word formation, collocations, and phrasal verbs.",
}: HeroSectionProps = {}) {
  const { translate } = useLanguage();
  const text1 = translate(title1);
  const text2 = translate(title2);
  const text3 = translate(subtitle);

  if (hideButtons) {
    return (
      <section className="relative min-h-[450px] flex flex-col items-center justify-start pt-[140px] pb-16 md:pt-[180px] md:pb-24 overflow-hidden border-b border-off-black/10 dark:border-white/10 bg-section-hero">
        {/* Background image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat blur-[3px] scale-105 opacity-50 pointer-events-none"
          style={{ backgroundImage: "url('/imgs/bgOwl1.png')" }}
        />
        {/* Soft overlay */}
        <div className="absolute inset-0 z-0 bg-paper-canvas/15 dark:bg-black/10 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center w-full">
          <h1 className="text-display-sm md:text-display lg:text-display font-heading font-normal leading-[1.2] tracking-[-0.02em] max-w-4xl">
            <GlitchText className="text-gradient-heading" enableOnHover={false}>
              {text1}
            </GlitchText>
            {text2 && (
              <>
                <br />
                <GlitchText className="text-gradient-heading" enableOnHover={false}>
                  {text2}
                </GlitchText>
              </>
            )}
          </h1>

          <div className="relative mt-6 max-w-2xl w-full">
            <p
              className="text-subheading md:text-heading-sm font-mono font-normal tracking-[-0.02em] opacity-0 pointer-events-none select-none text-center"
              aria-hidden="true"
            >
              {text3}
            </p>
            <div className="absolute inset-0 flex items-center justify-center">
              <TextType
                key={text3}
                text={text3}
                as="p"
                typingSpeed={25}
                deletingSpeed={12}
                pauseDuration={4000}
                loop={true}
                className="text-subheading md:text-heading-sm font-mono font-normal tracking-[-0.02em] text-pale-stone dark:text-[#eae6df] text-center w-full"
                cursorClassName="font-light text-off-black dark:text-stardust-gold"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-[750px] md:min-h-[800px] flex flex-col items-center justify-center pt-[140px] pb-16 md:pt-[180px] md:pb-24 overflow-hidden border-b border-off-black/10 dark:border-white/10 bg-section-hero">
      {/* 
        ========================================================================
        HERO FLOATING ITEMS CONFIGURATION (5 ITEMS BEHIND CONTENT)
        Cấu hình vị trí 5 item trôi nền Hero (Bạn có thể tùy chỉnh top/left/right/size/opacity tại đây):
        ========================================================================
      */}
      {/* 1. Mascot Cú (Owl) - Phía trên bên trái */}
      <FloatingItem
        src="/imgs/itemFloat/owl.png"
        alt="Owl Mascot Item"
        size={85}
        duration={5.0}
        yOffset={16}
        rotateOffset={8}
        alwaysAnimate={true}
        className="hidden md:block absolute top-[160px] left-[14%] z-0 opacity-60 pointer-events-none"
      />

      {/* 2. Badge Destination B1 - Phía trên bên phải */}
      <FloatingItem
        src="/imgs/itemFloat/b1.png"
        alt="Destination B1 Badge"
        size={78}
        duration={4.4}
        delay={0.6}
        yOffset={14}
        rotateOffset={-7}
        alwaysAnimate={true}
        className="hidden md:block absolute top-[170px] right-[16%] z-0 opacity-60 pointer-events-none"
      />

      {/* 3. Badge Destination B2 - Phía dưới bên trái */}
      <FloatingItem
        src="/imgs/itemFloat/b2.png"
        alt="Destination B2 Badge"
        size={80}
        duration={4.8}
        delay={1.2}
        yOffset={15}
        rotateOffset={6}
        alwaysAnimate={true}
        className="hidden md:block absolute bottom-[150px] left-[8%] z-0 opacity-60 pointer-events-none"
      />

      {/* 4. Badge Destination C1 - Ở giữa trung tâm phía sau */}
      <FloatingItem
        src="/imgs/itemFloat/c1.png"
        alt="Destination C1 Badge"
        size={82}
        duration={5.2}
        delay={0.3}
        yOffset={18}
        rotateOffset={-9}
        alwaysAnimate={true}
        className="hidden lg:block absolute top-[50%] left-[45%] -translate-x-1/2 z-0 opacity-50 pointer-events-none"
      />

      {/* 5. Badge Destination C2 - Phía dưới bên phải */}
      <FloatingItem
        src="/imgs/itemFloat/c2.png"
        alt="Destination C2 Badge"
        size={84}
        duration={5.6}
        delay={0.9}
        yOffset={20}
        rotateOffset={10}
        alwaysAnimate={true}
        className="hidden md:block absolute bottom-[80px] right-[10%] z-0 opacity-60 pointer-events-none"
      />

      {/* Soft overlay */}
      <div className="absolute inset-0 z-0 bg-paper-canvas/15 dark:bg-black/10 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          {/* Left Column: Heading with GlitchText and subtitle with TextType */}
          <div className="lg:col-span-7 flex flex-col items-start text-left w-full">
            <h1 className="text-display-sm md:text-display font-heading font-normal leading-[1.2] tracking-[-0.02em] text-left w-full relative">
              <GlitchText className="text-gradient-heading" enableOnHover={false}>
                {text1}
              </GlitchText>
              {text2 && (
                <>
                  <br />
                  <GlitchText className="text-gradient-heading" enableOnHover={false}>
                    {text2}
                  </GlitchText>
                </>
              )}
            </h1>

            {/* Typewriter wrapper reserving full text height to prevent layout shift */}
            <div className="relative mt-6 max-w-xl w-full">
              <p
                className="text-subheading md:text-heading-sm font-sans font-normal tracking-[-0.02em] opacity-0 pointer-events-none select-none text-left"
                aria-hidden="true"
              >
                {text3}
              </p>
              <div className="absolute inset-0">
                <TextType
                  key={text3}
                  text={text3}
                  as="p"
                  typingSpeed={25}
                  deletingSpeed={12}
                  pauseDuration={4000}
                  loop={true}
                  className="text-subheading md:text-heading-sm font-sans font-normal tracking-[-0.02em] text-pale-stone dark:text-[#eae6df] text-left w-full"
                  cursorClassName="font-light text-off-black dark:text-stardust-gold"
                />
              </div>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mt-10 sm:mt-12 w-full sm:w-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <Button variant="primary" className="h-[48px] px-8 text-base cursor-pointer">
                {translate("Explore Destination B1")}
              </Button>
              <Button
                variant="outline"
                className="h-[48px] px-8 text-base cursor-pointer"
              >
                {translate("Start Learning")}
              </Button>
            </motion.div>
          </div>

          {/* Right Column: Learning Overview card widget with peeking owl mascot */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end w-full mt-8 lg:mt-0">
            <div className="relative w-full max-w-sm overflow-visible">
              {/* Zoomed-in circular Owl Mascot peeking from top-right */}
              <div className="absolute -top-12 -right-4 w-20 h-20 rounded-full border-2 border-white dark:border-zinc-800 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.15)] overflow-hidden z-30 pointer-events-none">
                <img
                  src="/imgs/bgOwl1.png"
                  alt="Owl Mascot"
                  className="w-full h-full object-cover scale-[2.3] object-[49%_58%]"
                />
              </div>

              <motion.div
                className="w-full liquid-glass p-6 select-none"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
              >
                {/* Glass Background */}
                <div className="liquid-glass-bg" />

                {/* Card Content */}
                <div className="relative z-20 flex flex-col gap-5 text-ink font-sans">
                  {/* Title Row */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold tracking-tight">{translate("Learning Overview")}</span>
                    <span className="text-xs flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                      {translate("Today")}
                    </span>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-4 border-t border-b border-zinc-200/50 dark:border-zinc-800/50 py-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-mono">
                        {translate("WORDS LEARNED")}
                      </div>
                      <div className="text-xl md:text-2xl font-bold mt-1 text-ink">
                        2,483
                      </div>
                      <div className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1 mt-1 font-semibold font-mono">
                        <span>↑</span> 126 {translate("this week")}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-mono">
                        {translate("LEARNING STREAK")}
                      </div>
                      <div className="text-xl md:text-2xl font-bold mt-1 text-ink">
                        24 {translate("Days")}
                      </div>
                      <div className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1 mt-1 font-semibold font-mono">
                        <span>↑</span> {translate("Keep Going")}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar (Daily Goal) */}
                  <div>
                    <div className="flex items-center justify-between text-xs text-zinc-400 dark:text-zinc-500 mb-2">
                      <span>{translate("Daily Goal")}</span>
                      <span className="font-bold text-ink">80%</span>
                    </div>
                    <div className="w-full h-2.5 bg-zinc-100 dark:bg-zinc-800/50 rounded-full overflow-hidden p-[1px] border border-zinc-200/50 dark:border-zinc-800">
                      <div className="h-full bg-blue-500 dark:bg-blue-400 rounded-full w-[80%]" />
                    </div>
                  </div>

                  {/* Current Level */}
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-mono">
                      {translate("Current Level")}
                    </div>
                    <div className="text-sm font-bold text-ink mt-1 flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs border border-blue-500/20 font-mono">B2</span>
                      {translate("B2 Intermediate")}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

