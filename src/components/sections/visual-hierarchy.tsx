"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { BookOpen, ChevronDown } from "lucide-react"

export function VisualHierarchy() {
  return (
    <section className="py-24 bg-paper-canvas overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1432px]">
        
        {/* Header */}
        <div className="text-center mb-24">
          <span className="text-caption font-mono uppercase tracking-wider text-ink bg-atmosphere-wash px-3 py-1 rounded-full border border-off-black">
            Syllabus Architecture
          </span>
          <h2 className="text-heading-lg font-heading text-ink mt-4 mb-4">
            How English4U Organizes Learning
          </h2>
          <p className="text-body text-pale-stone max-w-2xl mx-auto font-mono">
            Sensory overload is the biggest obstacle to self-studying. Our structured hierarchy parses content down from high-level paths directly to side-by-side examples.
          </p>
        </div>

        {/* Alternating Steps */}
        <div className="flex flex-col gap-32 relative">
          
          {/* Connecting dashed timeline line */}
          <div className="hidden lg:block absolute left-1/2 top-10 bottom-10 w-0.5 border-l border-dashed border-off-black/30 z-0 -translate-x-1/2" />

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
                <span className="w-[32px] h-[32px] rounded-full border border-off-black bg-atmosphere-wash flex items-center justify-center font-mono text-xs text-ink">
                  01
                </span>
                <span className="text-caption font-mono uppercase tracking-wider text-pale-stone">Level Core</span>
              </div>
              <h3 className="text-heading font-heading text-ink mb-4">Select Your Destination Book</h3>
              <p className="text-body text-pale-stone leading-relaxed font-mono">
                Map your path. Whether you are Intermediate (B1), Upper-Intermediate (B2), or Advanced (C1/C2), choose the dedicated curriculum tailored to your starting level.
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
              <div className="w-full max-w-[420px] bg-paper-canvas border border-off-black rounded-[40px] p-6 flex flex-col gap-3 relative">
                <div className="absolute top-4 right-4 w-[12px] h-[12px] rounded-full bg-atmosphere-wash border border-off-black" />
                <div className="p-3 bg-atmosphere-wash border border-off-black rounded-full font-mono text-xs text-ink flex items-center gap-3">
                  <BookOpen className="w-[14px] h-[14px]" /> Destination B1 (42 Units)
                </div>
                <div className="p-3 bg-paper-canvas border border-off-black rounded-full font-mono text-xs text-ink flex items-center gap-3">
                  <BookOpen className="w-[14px] h-[14px]" /> Destination B2 (28 Units)
                </div>
                <div className="p-3 bg-paper-canvas border border-off-black rounded-full font-mono text-xs text-ink flex items-center gap-3">
                  <BookOpen className="w-[14px] h-[14px]" /> Destination C1 & C2 (26 Units)
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
              <div className="w-full max-w-[420px] bg-paper-canvas border border-off-black rounded-[40px] p-6 flex flex-col gap-4 relative">
                <div className="p-4 bg-atmosphere-wash border border-off-black rounded-full flex justify-between items-center">
                  <span className="text-xs font-mono text-ink">Unit 1: Present time</span>
                  <ChevronDown className="w-[14px] h-[14px] text-ink/50" />
                </div>
                <div className="p-4 bg-atmosphere-wash border border-off-black rounded-full flex justify-between items-center">
                  <span className="text-xs font-mono text-ink">Unit 2: Past time</span>
                  <ChevronDown className="w-[14px] h-[14px] text-ink/50 rotate-180" />
                </div>
                <div className="p-3 bg-paper-canvas border border-off-black rounded-[40px] text-caption text-pale-stone font-mono -mt-2">
                  Unit contents include detailed comparative structures and topic-based words.
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
                <span className="w-[32px] h-[32px] rounded-full border border-off-black bg-atmosphere-wash flex items-center justify-center font-mono text-xs text-ink">
                  02
                </span>
                <span className="text-caption font-mono uppercase tracking-wider text-pale-stone">Modular Units</span>
              </div>
              <h3 className="text-heading font-heading text-ink mb-4">Granular & Mapped Chapters</h3>
              <p className="text-body text-pale-stone leading-relaxed font-mono">
                Break massive level syllabi down. Each level compiles dozens of standalone, bite-sized chapters that map exactly to key syntactic units. Expand accordions instantly.
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
                <span className="w-[32px] h-[32px] rounded-full border border-off-black bg-atmosphere-wash flex items-center justify-center font-mono text-xs text-ink">
                  03
                </span>
                <span className="text-caption font-mono uppercase tracking-wider text-pale-stone">Category Filter</span>
              </div>
              <h3 className="text-heading font-heading text-ink mb-4">Focus On Specific Targets</h3>
              <p className="text-body text-pale-stone leading-relaxed font-mono">
                Pivot on command. Inside each unit chapter, you can switch seamlessly between Grammar, Vocabulary, Phrasal Verbs, Word Formations, or Collocations.
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
              <div className="w-full max-w-[420px] bg-paper-canvas border border-off-black rounded-[40px] p-6 flex flex-wrap gap-2 relative">
                <span className="text-caption font-mono bg-atmosphere-wash text-ink border border-off-black px-3 py-1 rounded-full">
                  Grammar
                </span>
                <span className="text-caption font-mono bg-transparent text-pale-stone border border-pale-stone px-3 py-1 rounded-full">
                  Vocabulary
                </span>
                <span className="text-caption font-mono bg-transparent text-pale-stone border border-pale-stone px-3 py-1 rounded-full">
                  Phrasal Verbs
                </span>
                <span className="text-caption font-mono bg-transparent text-pale-stone border border-pale-stone px-3 py-1 rounded-full">
                  Word Formations
                </span>
                <span className="text-caption font-mono bg-transparent text-pale-stone border border-pale-stone px-3 py-1 rounded-full">
                  Collocations
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
              <div className="w-full max-w-[420px] bg-paper-canvas border border-off-black rounded-[40px] p-6 relative overflow-x-auto">
                <table className="w-full text-left text-caption border-collapse min-w-[300px] font-mono">
                  <thead>
                    <tr className="border-b border-off-black">
                      <th className="pb-2 font-medium text-ink">Structure</th>
                      <th className="pb-2 font-medium text-ink">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-pale-stone/30">
                      <td className="py-2.5 pr-2 font-medium text-ink">
                        <span className="bg-atmosphere-wash border border-off-black px-2 py-0.5 rounded-full inline-block">
                          wish + Past Simple
                        </span>
                      </td>
                      <td className="py-2.5 font-medium text-pale-stone">"I wish I knew."</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-2 font-medium text-ink">
                        <span className="bg-atmosphere-wash border border-off-black px-2 py-0.5 rounded-full inline-block">
                          wish + Past Perfect
                        </span>
                      </td>
                      <td className="py-2.5 font-medium text-pale-stone">"I wish I had gone."</td>
                    </tr>
                  </tbody>
                </table>
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
                <span className="w-[32px] h-[32px] rounded-full border border-off-black bg-atmosphere-wash flex items-center justify-center font-mono text-xs text-ink">
                  04
                </span>
                <span className="text-caption font-mono uppercase tracking-wider text-pale-stone">Direct Visuals</span>
              </div>
              <h3 className="text-heading font-heading text-ink mb-4">Side-By-Side Reference Tables</h3>
              <p className="text-body text-pale-stone leading-relaxed font-mono">
                Zero clutter. Every category prints structured tables outlining structural forms, grammatical usages, and practical context examples side-by-side. Copy, memorize, and apply instantly.
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}

