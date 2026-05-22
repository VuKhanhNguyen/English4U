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
    description: "Built strictly on premium Monad design guidelines that make review sessions clean and focused.",
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
    <section id="why-different" className="py-24 bg-paper-canvas border-t border-off-black">
      <div className="container mx-auto px-6 max-w-[1432px]">
        <div className="text-center mb-16">
          <span className="text-caption font-mono uppercase tracking-wider text-ink bg-atmosphere-wash px-3 py-1 rounded-full border border-off-black">
            Why English4U?
          </span>
          <h2 className="text-heading-lg font-heading text-ink mt-4 mb-4">
            Designed for Active & Modern Studying
          </h2>
          <p className="text-body font-mono text-pale-stone max-w-2xl mx-auto">
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
                <Card variant="content" className="h-full flex flex-col group duration-200">
                  <div className="w-[44px] h-[44px] rounded-full border border-off-black bg-atmosphere-wash flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-200">
                    <Icon className="w-[18px] h-[18px] text-ink" />
                  </div>
                  <h3 className="text-subheading font-heading text-ink mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-body-sm font-mono text-pale-stone leading-relaxed">
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

