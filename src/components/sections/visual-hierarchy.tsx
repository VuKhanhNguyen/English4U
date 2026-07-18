"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { BookOpen, ChevronDown } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"

export function VisualHierarchy() {
  const { translate } = useLanguage()

  return (
    <section className="py-24 bg-section-hierarchy border-t border-zinc-200/50 dark:border-zinc-800/50 overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1432px]">
        
        {/* Header */}
        <div className="text-center mb-24">
          <span className="section-badge">
            <span className="text-gradient-badge">
              {translate("Syllabus Architecture")}
            </span>
          </span>
          <br/>
          <h2 className="text-heading-lg font-heading text-gradient-heading mt-4 mb-4">
            {translate("How English4U Organizes Learning")}
          </h2>
          <p className="text-body text-pale-stone max-w-2xl mx-auto font-sans">
            {translate("Sensory overload is the biggest obstacle to self-studying. Our structured hierarchy parses content down from high-level paths directly to side-by-side examples.")}
          </p>
        </div>

        {/* Alternating Steps */}
        <div className="flex flex-col gap-32 relative">
          
          {/* Connecting dashed timeline line */}
          <div className="hidden lg:block absolute left-1/2 top-10 bottom-10 w-0.5 border-l border-dashed border-zinc-200 dark:border-zinc-800 z-0 -translate-x-1/2" />

          {/* STEP 1: Book Level Selector */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            {/* Column 1: Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-[32px] h-[32px] rounded-full border border-blue-500/20 bg-blue-500/10 flex items-center justify-center font-mono text-xs text-blue-600 dark:text-blue-400 font-bold">
                   01
                </span>
                <span className="text-caption font-mono uppercase tracking-wider text-pale-stone">{translate("Level Core")}</span>
              </div>
              <h3 className="text-heading font-heading text-ink mb-4">{translate("Select Your Destination Book")}</h3>
              <p className="text-body text-pale-stone leading-relaxed font-sans">
                {translate("Map your path. Whether you are Intermediate (B1), Upper-Intermediate (B2), or Advanced (C1/C2), choose the dedicated curriculum tailored to your starting level.")}
              </p>
            </motion.div>
            
            {/* Column 2: Visual Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <div className="w-full max-w-[420px] liquid-glass p-6 flex flex-col gap-3 relative">
                <div className="liquid-glass-bg" />
                <div className="absolute top-4 right-4 w-[12px] h-[12px] rounded-full bg-blue-500/10 border border-blue-500/20" />
                <div className="p-3 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-zinc-800/50 rounded-xl font-sans text-xs text-ink flex items-center gap-3 shadow-sm">
                  <BookOpen className="w-[14px] h-[14px] text-blue-600 dark:text-blue-400" /> Destination B1 (42 {translate("Units")})
                </div>
                <div className="p-3 bg-transparent border border-zinc-200/20 dark:border-zinc-800/20 rounded-xl font-sans text-xs text-ink/65 flex items-center gap-3">
                  <BookOpen className="w-[14px] h-[14px] text-zinc-400" /> Destination B2 (28 {translate("Units")})
                </div>
                <div className="p-3 bg-transparent border border-zinc-200/20 dark:border-zinc-800/20 rounded-xl font-sans text-xs text-ink/65 flex items-center gap-3">
                  <BookOpen className="w-[14px] h-[14px] text-zinc-400" /> Destination C1 & C2 (26 {translate("Units")})
                </div>
              </div>
            </motion.div>
          </div>

          {/* STEP 2: Structured Chapters / Units */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 lg:flow-row-dense">
            {/* Column 1: Visual Mockup (Left on Desktop) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="lg:order-1 flex justify-center"
            >
              <div className="w-full max-w-[420px] liquid-glass p-6 flex flex-col gap-4 relative">
                <div className="liquid-glass-bg" />
                <div className="p-4 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-zinc-800/50 rounded-xl flex justify-between items-center shadow-sm">
                  <span className="text-xs font-sans font-medium text-ink">{translate("Unit")} 1: Present time</span>
                  <ChevronDown className="w-[14px] h-[14px] text-ink/50" />
                </div>
                <div className="p-4 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-zinc-800/50 rounded-xl flex justify-between items-center shadow-sm">
                  <span className="text-xs font-sans font-medium text-ink">{translate("Unit")} 2: Past time</span>
                  <ChevronDown className="w-[14px] h-[14px] text-ink/50 rotate-180" />
                </div>
                <div className="p-3 bg-transparent border border-zinc-200/20 dark:border-zinc-800/20 rounded-xl text-caption text-pale-stone font-sans -mt-2">
                  {translate("Unit contents include detailed comparative structures and topic-based words.")}
                </div>
              </div>
            </motion.div>

            {/* Column 2: Info (Right on Desktop) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="lg:order-2"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-[32px] h-[32px] rounded-full border border-blue-500/20 bg-blue-500/10 flex items-center justify-center font-mono text-xs text-blue-600 dark:text-blue-400 font-bold">
                  02
                </span>
                <span className="text-caption font-mono uppercase tracking-wider text-pale-stone">{translate("Modular Units")}</span>
              </div>
              <h3 className="text-heading font-heading text-ink mb-4">{translate("Granular & Mapped Chapters")}</h3>
              <p className="text-body text-pale-stone leading-relaxed font-sans">
                {translate("Break massive level syllabi down. Each level compiles dozens of standalone, bite-sized chapters that map exactly to key syntactic units. Expand accordions instantly.")}
              </p>
            </motion.div>
          </div>

          {/* STEP 3: Category Selectors */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            {/* Column 1: Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-[32px] h-[32px] rounded-full border border-blue-500/20 bg-blue-500/10 flex items-center justify-center font-mono text-xs text-blue-600 dark:text-blue-400 font-bold">
                  03
                </span>
                <span className="text-caption font-mono uppercase tracking-wider text-pale-stone">{translate("Category Filter")}</span>
              </div>
              <h3 className="text-heading font-heading text-ink mb-4">{translate("Focus On Specific Targets")}</h3>
              <p className="text-body text-pale-stone leading-relaxed font-sans">
                {translate("Pivot on command. Inside each unit chapter, you can switch seamlessly between Grammar, Vocabulary, Phrasal Verbs, Word Formations, or Collocations.")}
              </p>
            </motion.div>
            
            {/* Column 2: Visual Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <div className="w-full max-w-[420px] liquid-glass p-6 flex flex-wrap gap-2 relative">
                <div className="liquid-glass-bg" />
                <span className="text-caption font-mono bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full">
                  {translate("Grammar")}
                </span>
                <span className="text-caption font-mono bg-transparent text-pale-stone border border-zinc-200/50 dark:border-zinc-800 px-3 py-1 rounded-full">
                  {translate("Vocabulary")}
                </span>
                <span className="text-caption font-mono bg-transparent text-pale-stone border border-zinc-200/50 dark:border-zinc-800 px-3 py-1 rounded-full">
                  {translate("Phrasal Verbs")}
                </span>
                <span className="text-caption font-mono bg-transparent text-pale-stone border border-zinc-200/50 dark:border-zinc-800 px-3 py-1 rounded-full">
                  {translate("Word Formations")}
                </span>
                <span className="text-caption font-mono bg-transparent text-pale-stone border border-zinc-200/50 dark:border-zinc-800 px-3 py-1 rounded-full">
                  {translate("Collocations")}
                </span>
              </div>
            </motion.div>
          </div>

          {/* STEP 4: High-Contrast Data Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 lg:flow-row-dense">
            {/* Column 1: Visual Mockup (Left on Desktop) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="lg:order-1 flex justify-center"
            >
              <div className="w-full max-w-[420px] liquid-glass p-6 relative">
                <div className="liquid-glass-bg" />
                <div className="w-full text-left text-caption font-mono flex flex-col gap-4">
                  {/* Header */}
                  <div className="hidden sm:flex border-b border-zinc-200/50 dark:border-zinc-800/50 pb-2 font-medium text-ink">
                    <div className="w-1/2">{translate("Structure")}</div>
                    <div className="w-1/2">{translate("Example")}</div>
                  </div>
                  {/* Rows */}
                  <div className="flex flex-col sm:flex-row border-b border-zinc-200/50 dark:border-zinc-800/50 pb-3 sm:pb-0 sm:border-0">
                    <div className="w-full sm:w-1/2 pr-2 font-medium text-ink pb-1.5 sm:pb-0">
                      <span className="bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full inline-block font-mono">
                        wish + Past Simple
                      </span>
                    </div>
                    <div className="w-full sm:w-1/2 font-sans font-medium text-pale-stone">"I wish I knew."</div>
                  </div>
                  <div className="flex flex-col sm:flex-row">
                    <div className="w-full sm:w-1/2 pr-2 font-medium text-ink pb-1.5 sm:pb-0">
                      <span className="bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full inline-block font-mono">
                        wish + Past Perfect
                      </span>
                    </div>
                    <div className="w-full sm:w-1/2 font-sans font-medium text-pale-stone">"I wish I had gone."</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Column 2: Info (Right on Desktop) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="lg:order-2"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-[32px] h-[32px] rounded-full border border-blue-500/20 bg-blue-500/10 flex items-center justify-center font-mono text-xs text-blue-600 dark:text-blue-400 font-bold">
                  04
                </span>
                <span className="text-caption font-mono uppercase tracking-wider text-pale-stone">{translate("Direct Visuals")}</span>
              </div>
              <h3 className="text-heading font-heading text-ink mb-4">{translate("Side-By-Side Reference Tables")}</h3>
              <p className="text-body text-pale-stone leading-relaxed font-sans">
                {translate("Zero clutter. Every category prints structured tables outlining structural forms, grammatical usages, and practical context examples side-by-side. Copy, memorize, and apply instantly.")}
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}

