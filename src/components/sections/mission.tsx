"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Sparkles, Zap, BookOpen, Heart } from "lucide-react"

const missions = [
  {
    title: "Structured Learning",
    description: "Make English learning organized with systematic tables, avoiding fragmented knowledge pieces.",
    icon: BookOpen,
    variant: "saffron" as const,
  },
  {
    title: "Fast Review",
    description: "Simplify complex grammar rules into elegant, high-contrast visual comparison blocks.",
    icon: Zap,
    variant: "mint" as const,
  },
  {
    title: "Smart Vocabulary",
    description: "Connect collocations, word formations, and phrasal verbs around unified learning cards.",
    icon: Sparkles,
    variant: "lavender" as const,
  },
  {
    title: "Better Retention",
    description: "Built strictly on cognitive reinforcement patterns to ensure you remember what you study.",
    icon: Heart,
    variant: "pink" as const,
  }
]

export function MissionSection() {
  return (
    <section id="about" className="py-24 bg-pale-ash border-t border-charcoal-border">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-accent-green bg-midnight-ink px-3 py-1 rounded-full border border-charcoal-border">
            Our Mission
          </span>
          <h2 className="text-heading-lg font-bold tracking-tight text-midnight-ink mt-4 mb-4">
            Simplifying The Mastery of English
          </h2>
          <p className="text-body text-[#737373] max-w-2xl mx-auto">
            We are dedicated to building a beautifully structured platform that makes English grammar and vocabulary study clear, efficient, and visual.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {missions.map((mission, index) => {
            const Icon = mission.icon
            return (
              <motion.div
                key={mission.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
              >
                <Card variant={mission.variant} className="h-full flex flex-col p-6 shadow-subtle hover:shadow-subtle-2 transition-all">
                  <div className="w-[40px] h-[40px] rounded-full border border-charcoal-border bg-canvas-white flex items-center justify-center mb-6 shadow-subtle-3">
                    <Icon className="w-[18px] h-[18px] text-midnight-ink" />
                  </div>
                  <h3 className="text-heading font-black mb-3 text-midnight-ink">
                    {mission.title}
                  </h3>
                  <p className="text-body-sm text-midnight-ink/80 leading-relaxed">
                    {mission.description}
                  </p>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
