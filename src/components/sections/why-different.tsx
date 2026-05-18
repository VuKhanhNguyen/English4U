"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Grid, Search, Layout, ListTodo, Monitor, SunMoon } from "lucide-react"

const reasons = [
  {
    title: "Structured Tables",
    description: "Instead of overwhelming paragraph explanations, we present clear, color-coded rows and columns.",
    icon: Grid,
  },
  {
    title: "Fast Searching",
    description: "Instantaneous, client-side, zero-latency text filtering across all tabs and data fields.",
    icon: Search,
  },
  {
    title: "Modern Learning UI",
    description: "Built strictly on premium neo-brutalist design guidelines that make review sessions exciting.",
    icon: Layout,
  },
  {
    title: "Organized by Units",
    description: "Seamlessly aligns unit-by-unit with the Destination B1, B2, and C1/C2 official syllabus.",
    icon: ListTodo,
  },
  {
    title: "Responsive Interface",
    description: "High-contrast tables are fully scrollable and optimized for smartphones, tablets, and computers.",
    icon: Monitor,
  },
  {
    title: "Dark Mode Ready",
    description: "Clean Settings controls let you toggle visual modes to customize your learning environment.",
    icon: SunMoon,
  }
]

export function WhyDifferentSection() {
  return (
    <section id="why-different" className="py-24 bg-canvas-white border-t border-charcoal-border">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-accent-green bg-midnight-ink px-3 py-1 rounded-full border border-charcoal-border">
            Why English4U?
          </span>
          <h2 className="text-heading-lg font-bold tracking-tight text-midnight-ink mt-4 mb-4">
            Designed for Active & Modern Studying
          </h2>
          <p className="text-body text-[#737373] max-w-2xl mx-auto">
            Traditional learning materials are dense and text-heavy. English4U is engineered strictly to be parsed by the eye in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reasons.map((reason, index) => {
            const Icon = reason.icon
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -4 }}
              >
                <Card variant="content" className="h-full flex flex-col p-6 shadow-subtle hover:shadow-subtle-2 transition-all border border-charcoal-border bg-canvas-white group hover:bg-pale-ash/50 duration-200">
                  <div className="w-[44px] h-[44px] rounded-lg border-2 border-charcoal-border bg-accent-green flex items-center justify-center mb-6 shadow-[1.5px_1.5px_0px_0px_rgb(10,10,13)] group-hover:scale-105 transition-transform duration-200">
                    <Icon className="w-[18px] h-[18px] text-midnight-ink" />
                  </div>
                  <h3 className="text-heading font-black mb-2 text-midnight-ink">
                    {reason.title}
                  </h3>
                  <p className="text-body-sm text-[#525252] leading-relaxed">
                    {reason.description}
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
