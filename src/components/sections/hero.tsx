"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

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
  const text1 = title1;
  const text2 = title2;
  const text3 = subtitle;

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

  return (
    <section className="relative pt-[120px] pb-24 md:pt-[160px] md:pb-32 overflow-hidden border-b border-charcoal-border bg-sky-breeze-gradient">
      {/* Blurry Background Image Layer */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat blur-[6px] scale-105 pointer-events-none"
        style={{ backgroundImage: "url('/imgs/bg2.png')" }}
      />
      
      {/* Subtle overlay mask to elevate text legibility */}
      <div className="absolute inset-0 bg-canvas-white/10 z-[1] pointer-events-none" />

      {/* Decorative Background Elements (Abstract/Playful) */}
      <div className="absolute top-20 left-10 w-32 h-32 border-2 border-canvas-white/40 rounded-full opacity-50 blur-sm z-[2] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-48 h-48 border-2 border-canvas-white/40 rounded-[40px] rotate-12 opacity-50 blur-sm z-[2] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <h1 className={`text-display-sm md:text-display lg:text-display-lg font-bold leading-[1.14] tracking-[-1.344px] text-midnight-ink max-w-4xl ${text2 ? 'min-h-[2.3em] md:min-h-[2.3em]' : 'min-h-[1.2em] md:min-h-[1.2em]'}`}>
          <span>
            {t1}
            {hasStarted && (phase === "typing-1" || phase === "deleting-1") && (
              <span className="animate-pulse inline-block ml-0.5 font-light text-accent-green">|</span>
            )}
          </span>
          {text2 && (
            <>
              <br />
              <span>
                {t2}
                {hasStarted && (phase === "typing-2" || phase === "deleting-2") && (
                  <span className="animate-pulse inline-block ml-0.5 font-light text-accent-green">|</span>
                )}
              </span>
            </>
          )}
        </h1>

        <p className="mt-6 text-subheading md:text-heading-sm font-medium text-[#111111] max-w-2xl min-h-[4.5em] md:min-h-[3.5em]">
          <span>
            {t3}
            {hasStarted && (phase === "typing-3" || phase === "deleting-3" || phase === "paused") && (
              <span className="animate-pulse inline-block ml-0.5 font-light text-accent-green">|</span>
            )}
          </span>
        </p>

        {!hideButtons && (
          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 3.5, ease: "easeOut" }}
          >
            <Button variant="primary" className="h-[48px] px-8 text-base">
              Explore Destination B1
            </Button>
            <Button
              variant="ghost"
              className="h-[48px] px-8 text-base bg-canvas-white"
            >
              Start Learning
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
