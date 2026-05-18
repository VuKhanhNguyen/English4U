"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Layers, Trello, TableProperties, ChevronDown, Check } from "lucide-react"

export function VisualHierarchy() {
  return (
    <section 
      className="py-24 overflow-hidden"
      style={{ background: "linear-gradient(#b4edd8, #b3eed700)" }}
    >
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-24">
          <span className="text-xs font-bold uppercase tracking-wider text-accent-green bg-midnight-ink px-3 py-1 rounded-full border border-charcoal-border">
            Syllabus Architecture
          </span>
          <h2 className="text-heading-lg font-bold tracking-tight text-midnight-ink mt-4 mb-4">
            How English4U Organizes Learning
          </h2>
          <p className="text-body text-[#737373] max-w-2xl mx-auto">
            Sensory overload is the biggest obstacle to self-studying. Our structured hierarchy parses content down from high-level paths directly to side-by-side examples.
          </p>
        </div>

        {/* Alternating Steps */}
        <div className="flex flex-col gap-32 relative">
          
          {/* Connecting dashed timeline line */}
          <div className="hidden lg:block absolute left-1/2 top-10 bottom-10 w-0.5 border-l-2 border-dashed border-charcoal-border/30 z-0 -translate-x-1/2" />

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
                <span className="w-[32px] h-[32px] rounded-full border border-charcoal-border bg-card-saffron flex items-center justify-center font-black text-xs text-midnight-ink shadow-subtle-3">
                  01
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-midnight-ink/50">Level Core</span>
              </div>
              <h3 className="text-display-xs font-bold text-midnight-ink mb-4">Select Your Destination Book</h3>
              <p className="text-body text-[#525252] leading-relaxed">
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
              <div className="w-full max-w-[420px] bg-canvas-white border-2 border-midnight-ink rounded-lg shadow-subtle p-6 flex flex-col gap-3 relative">
                <div className="absolute top-2 right-2 w-[12px] h-[12px] rounded-full bg-accent-green border border-charcoal-border shadow-subtle-3" />
                <div className="p-3 bg-card-saffron border border-charcoal-border rounded-lg shadow-subtle-3 font-bold text-xs text-midnight-ink flex items-center gap-3">
                  <BookOpen className="w-[14px] h-[14px]" /> Destination B1 (42 Units)
                </div>
                <div className="p-3 bg-card-mint border border-charcoal-border rounded-lg shadow-subtle-3 font-bold text-xs text-midnight-ink flex items-center gap-3">
                  <BookOpen className="w-[14px] h-[14px]" /> Destination B2 (28 Units)
                </div>
                <div className="p-3 bg-card-lavender border border-charcoal-border rounded-lg shadow-subtle-3 font-bold text-xs text-midnight-ink flex items-center gap-3">
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
              <div className="w-full max-w-[420px] bg-canvas-white border-2 border-midnight-ink rounded-lg shadow-subtle p-6 flex flex-col gap-4 relative">
                <div className="p-4 bg-pale-ash border border-charcoal-border rounded flex justify-between items-center shadow-subtle-3">
                  <span className="text-xs font-bold text-midnight-ink">Unit 1: Present time</span>
                  <ChevronDown className="w-[14px] h-[14px] text-midnight-ink/50" />
                </div>
                <div className="p-4 bg-pale-ash border border-charcoal-border rounded flex justify-between items-center shadow-subtle-3">
                  <span className="text-xs font-bold text-midnight-ink">Unit 2: Past time</span>
                  <ChevronDown className="w-[14px] h-[14px] text-midnight-ink/50 rotate-180" />
                </div>
                <div className="p-3 bg-canvas-white border border-charcoal-border rounded text-[10px] text-midnight-ink/50 -mt-2 shadow-subtle-3">
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
                <span className="w-[32px] h-[32px] rounded-full border border-charcoal-border bg-card-mint flex items-center justify-center font-black text-xs text-midnight-ink shadow-subtle-3">
                  02
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-midnight-ink/50">Modular Units</span>
              </div>
              <h3 className="text-display-xs font-bold text-midnight-ink mb-4">Granular & Mapped Chapters</h3>
              <p className="text-body text-[#525252] leading-relaxed">
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
                <span className="w-[32px] h-[32px] rounded-full border border-charcoal-border bg-card-lavender flex items-center justify-center font-black text-xs text-midnight-ink shadow-subtle-3">
                  03
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-midnight-ink/50">Category Filter</span>
              </div>
              <h3 className="text-display-xs font-bold text-midnight-ink mb-4">Focus On Specific Targets</h3>
              <p className="text-body text-[#525252] leading-relaxed">
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
              <div className="w-full max-w-[420px] bg-canvas-white border-2 border-midnight-ink rounded-lg shadow-subtle p-6 flex flex-wrap gap-2 relative">
                <span className="text-[10px] font-bold bg-accent-green text-midnight-ink border border-charcoal-border px-3 py-1 rounded-full shadow-subtle-3">
                  Grammar
                </span>
                <span className="text-[10px] font-bold bg-pale-ash text-midnight-ink border border-charcoal-border/30 px-3 py-1 rounded-full">
                  Vocabulary
                </span>
                <span className="text-[10px] font-bold bg-pale-ash text-midnight-ink border border-charcoal-border/30 px-3 py-1 rounded-full">
                  Phrasal Verbs
                </span>
                <span className="text-[10px] font-bold bg-pale-ash text-midnight-ink border border-charcoal-border/30 px-3 py-1 rounded-full">
                  Word Formations
                </span>
                <span className="text-[10px] font-bold bg-pale-ash text-midnight-ink border border-charcoal-border/30 px-3 py-1 rounded-full">
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
              <div className="w-full max-w-[420px] bg-canvas-white border-2 border-midnight-ink rounded-lg shadow-subtle p-6 relative overflow-x-auto">
                <table className="w-full text-left text-[10px] border-collapse min-w-[300px]">
                  <thead>
                    <tr className="border-b border-charcoal-border">
                      <th className="pb-2 font-black text-midnight-ink">Structure</th>
                      <th className="pb-2 font-black text-midnight-ink">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-charcoal-border/20">
                      <td className="py-2.5 font-bold text-accent-green bg-midnight-ink px-1.5 rounded inline-block my-1 border border-charcoal-border">wish + Past Simple</td>
                      <td className="py-2.5 font-medium text-midnight-ink/80">"I wish I knew."</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-bold text-accent-green bg-midnight-ink px-1.5 rounded inline-block my-1 border border-charcoal-border">wish + Past Perfect</td>
                      <td className="py-2.5 font-medium text-midnight-ink/80">"I wish I had gone."</td>
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
                <span className="w-[32px] h-[32px] rounded-full border border-charcoal-border bg-card-pink flex items-center justify-center font-black text-xs text-midnight-ink shadow-subtle-3">
                  04
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-midnight-ink/50">Direct Visuals</span>
              </div>
              <h3 className="text-display-xs font-bold text-midnight-ink mb-4">Side-By-Side Reference Tables</h3>
              <p className="text-body text-[#525252] leading-relaxed">
                Zero clutter. Every category prints structured tables outlining structural forms, grammatical usages, and practical context examples side-by-side. Copy, memorize, and apply instantly.
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
