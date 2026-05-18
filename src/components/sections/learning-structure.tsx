"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { BookOpen, Layers, Trello, TableProperties } from "lucide-react"

const steps = [
  {
    num: "01",
    title: "Destination Book",
    desc: "Choose between B1, B2, or C1/C2 to start your structured level path.",
    icon: BookOpen,
    color: "bg-card-saffron"
  },
  {
    num: "02",
    title: "Structured Units",
    desc: "Browse dozens of highly focused modular learning units matching syllabus chapters.",
    icon: Layers,
    color: "bg-card-mint"
  },
  {
    num: "03",
    title: "Study Categories",
    desc: "Seamlessly pivot between grammar, vocabulary, collocations, phrasal verbs, etc.",
    icon: Trello,
    color: "bg-card-lavender"
  },
  {
    num: "04",
    title: "Tables & Details",
    desc: "Review side-by-side structures, meanings, patterns, and contextual examples.",
    icon: TableProperties,
    color: "bg-card-pink"
  }
]

export function LearningStructureSection() {
  return (
    <section id="structure" className="py-24 bg-pale-ash border-t border-charcoal-border overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-xs font-bold uppercase tracking-wider text-accent-green bg-midnight-ink px-3 py-1 rounded-full border border-charcoal-border">
            Learning Structure
          </span>
          <h2 className="text-heading-lg font-bold tracking-tight text-midnight-ink mt-4 mb-4">
            A Clear, Visual Syllabus Hierarchy
          </h2>
          <p className="text-body text-[#737373] max-w-2xl mx-auto">
            Our content structure is designed to avoid sensory overload. Walk step-by-step from books down to specific examples.
          </p>
        </div>

        {/* Steps Cards Connector Flow */}
        <div className="relative">
          {/* Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-1 border-t-2 border-dashed border-charcoal-border/30 z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.12 }}
                >
                  <div className="flex flex-col items-center text-center">
                    {/* Circle Step Number */}
                    <div className={`w-[80px] h-[80px] rounded-full border-2 border-charcoal-border flex items-center justify-center font-black text-xl text-midnight-ink shadow-subtle-3 mb-6 relative transition-transform duration-200 hover:scale-105 ${step.color}`}>
                      <Icon className="w-[24px] h-[24px] text-midnight-ink" />
                      <span className="absolute -bottom-2 right-0 bg-midnight-ink text-canvas-white text-xs px-2 py-0.5 rounded-full border border-charcoal-border font-bold">
                        {step.num}
                      </span>
                    </div>

                    <Card variant="content" className="w-full shadow-subtle hover:shadow-subtle-2 transition-all p-6 bg-canvas-white border border-charcoal-border rounded-lg h-[200px] flex flex-col justify-start">
                      <h3 className="text-heading font-black mb-3 text-midnight-ink">
                        {step.title}
                      </h3>
                      <p className="text-body-sm text-[#525252] leading-relaxed">
                        {step.desc}
                      </p>
                    </Card>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
