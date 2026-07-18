"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/language-provider";

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

  const [t1, setT1] = React.useState("");
  const [t2, setT2] = React.useState("");
  const [t3, setT3] = React.useState("");
  const [hasStarted, setHasStarted] = React.useState(false);
  const [phase, setPhase] = React.useState<
    | "typing-1"
    | "typing-2"
    | "typing-3"
    | "paused"
    | "deleting-3"
    | "deleting-2"
    | "deleting-1"
    | "paused-empty"
  >("typing-1");

  React.useEffect(() => {
    setT1("");
    setT2("");
    setT3("");
    setPhase("typing-1");
  }, [text1, text2, text3]);

  React.useEffect(() => {
    // Initial delay on page mount
    const initialTimer = setTimeout(() => {
      setHasStarted(true);
    }, 1000);
    return () => clearTimeout(initialTimer);
  }, []);

  React.useEffect(() => {
    if (!hasStarted) return;

    let timer: NodeJS.Timeout;

    const tick = () => {
      switch (phase) {
        case "typing-1":
          if (t1.length < text1.length) {
            setT1(text1.substring(0, t1.length + 1));
          } else {
            setPhase("typing-2");
          }
          break;

        case "typing-2":
          if (t2.length < text2.length) {
            setT2(text2.substring(0, t2.length + 1));
          } else {
            setPhase("typing-3");
          }
          break;

        case "typing-3":
          if (t3.length < text3.length) {
            setT3(text3.substring(0, t3.length + 1));
          } else {
            setPhase("paused");
          }
          break;

        case "paused":
          timer = setTimeout(() => {
            setPhase("deleting-3");
          }, 3500); // Pause for 3.5 seconds when full
          return;

        case "deleting-3":
          if (t3.length > 0) {
            setT3(text3.substring(0, t3.length - 1));
          } else {
            setPhase("deleting-2");
          }
          break;

        case "deleting-2":
          if (t2.length > 0) {
            setT2(text2.substring(0, t2.length - 1));
          } else {
            setPhase("deleting-1");
          }
          break;

        case "deleting-1":
          if (t1.length > 0) {
            setT1(text1.substring(0, t1.length - 1));
          } else {
            setPhase("paused-empty");
          }
          break;

        case "paused-empty":
          timer = setTimeout(() => {
            setPhase("typing-1");
          }, 1000); // Pause for 1 second when empty
          return;
      }
    };

    // Calculate speed dynamically
    let speed = 40; // Default typing speed for h1
    if (phase === "typing-3") speed = 12; // Faster typing for description
    else if (phase === "deleting-3") speed = 6; // Ultrafast deleting for description
    else if (phase === "deleting-2" || phase === "deleting-1") speed = 20; // Deleting for h1

    timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [hasStarted, phase, t1, t2, t3]);

  if (hideButtons) {
    return (
      <section className="relative min-h-[500px] flex flex-col items-center justify-start pt-[140px] pb-16 md:pt-[200px] md:pb-24 overflow-hidden border-b border-off-black/10 dark:border-white/10 bg-section-hero">
        {/* Background image — lightly blurred, low opacity so starfield is visible */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat blur-[3px] scale-105 opacity-50 pointer-events-none"
          style={{ backgroundImage: "url('/imgs/bgOwl1.png')" }}
        />
        {/* Soft overlay to keep text contrast */}
        <div className="absolute inset-0 z-0 bg-paper-canvas/15 dark:bg-black/10 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center w-full">
          <h1 className={`text-display-sm md:text-display lg:text-display font-heading font-normal leading-[1.2] tracking-[-0.02em] text-gradient-heading max-w-4xl ${title2 ? 'min-h-[3.8em] sm:min-h-[2.5em] md:min-h-[2.5em]' : 'min-h-[1.9em] sm:min-h-[1.3em] md:min-h-[1.3em]'}`}>
            <span className="inline-block pb-1">
              {t1}
            </span>
            {hasStarted && (phase === "typing-1" || phase === "deleting-1") && (
              <span className="animate-pulse inline-block ml-0.5 font-light text-[#df5745] dark:text-[#ffae7a]">|</span>
            )}
            {text2 && (
              <>
                <br />
                <span className="inline-block pb-1">
                  {text2}
                </span>
                {hasStarted && (phase === "typing-2" || phase === "deleting-2") && (
                  <span className="animate-pulse inline-block ml-0.5 font-light text-[#0cb88f] dark:text-[#6efac6]">|</span>
                )}
              </>
            )}
          </h1>

          <p className="mt-6 text-subheading md:text-heading-sm font-mono font-normal tracking-[-0.02em] text-pale-stone max-w-2xl min-h-[8.5em] sm:min-h-[5.5em] md:min-h-[4em]">
            <span className="text-pale-stone dark:text-[#eae6df] inline-block">
              {t3}
            </span>
            {hasStarted && (phase === "typing-3" || phase === "deleting-3" || phase === "paused") && (
              <span className="animate-pulse inline-block ml-0.5 font-light text-off-black dark:text-stardust-gold">|</span>
            )}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-[750px] md:min-h-[800px] flex flex-col items-center justify-center pt-[140px] pb-16 md:pt-[180px] md:pb-24 overflow-hidden border-b border-off-black/10 dark:border-white/10 bg-section-hero">
      {/* Soft overlay to keep text contrast */}
      <div className="absolute inset-0 z-0 bg-paper-canvas/15 dark:bg-black/10 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          {/* Left Column: Heading, description, and buttons (col-span-7) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left w-full">
            <h1 className="text-display-sm md:text-display font-heading font-normal leading-[1.2] tracking-[-0.02em] text-gradient-heading text-left w-full relative">
              {/* Invisible placeholder to prevent height shifts */}
              <span className="invisible select-none pointer-events-none block pb-1">
                {text1}
                {text2 && (
                  <>
                    <br />
                    {text2}
                  </>
                )}
              </span>

              {/* Typing text overlay */}
              <span className="absolute inset-x-0 top-0">
                <span className="inline-block pb-1">
                  {t1}
                </span>
                {hasStarted && (phase === "typing-1" || phase === "deleting-1") && (
                  <span className="animate-pulse inline-block ml-0.5 font-light text-[#df5745] dark:text-[#ffae7a]">|</span>
                )}
                {text2 && (
                  <>
                    <br />
                    <span className="inline-block pb-1">
                      {t2}
                    </span>
                    {hasStarted && (phase === "typing-2" || phase === "deleting-2") && (
                      <span className="animate-pulse inline-block ml-0.5 font-light text-[#0cb88f] dark:text-[#6efac6]">|</span>
                    )}
                  </>
                )}
              </span>
            </h1>

            <p className="mt-6 text-subheading md:text-heading-sm font-sans font-normal tracking-[-0.02em] text-pale-stone text-left max-w-xl w-full relative">
              {/* Invisible placeholder to prevent height shifts */}
              <span className="invisible select-none pointer-events-none block">
                {text3}
              </span>

              {/* Typing text overlay */}
              <span className="absolute inset-x-0 top-0 text-pale-stone dark:text-[#eae6df]">
                {t3}
                {hasStarted && (phase === "typing-3" || phase === "deleting-3" || phase === "paused") && (
                  <span className="animate-pulse inline-block ml-0.5 font-light text-off-black dark:text-stardust-gold">|</span>
                )}
              </span>
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto"
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

