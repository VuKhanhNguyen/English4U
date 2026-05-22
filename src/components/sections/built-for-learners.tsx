"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Smartphone, RotateCw, CheckSquare, Compass } from "lucide-react"

const scenarios = [
  {
    title: "Mobile Learning",
    description: "Review rules and phrasal verbs on your commute or during short breaks with dynamic scrolling tables.",
    icon: Smartphone,
  },
  {
    title: "Quick Revision",
    description: "Find exactly what you need in seconds before exams using our lightning-fast search filters.",
    icon: RotateCw,
  },
  {
    title: "Organized Review",
    description: "Track your progress unit-by-unit with a clear layout designed to keep your thoughts organized.",
    icon: CheckSquare,
  },
  {
    title: "Efficient Navigation",
    description: "Pivot between levels B1, B2, and C1 & C2 and skip to unit categories instantly.",
    icon: Compass,
  }
]

export function BuiltForLearnersSection() {
  return (
    <section id="built-for-learners" className="py-24 bg-paper-canvas border-t border-off-black">
      <div className="container mx-auto px-6 max-w-[1432px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Info Column */}
          <div className="lg:col-span-5">
            <span className="text-caption font-mono uppercase tracking-wider text-ink bg-atmosphere-wash px-3 py-1 rounded-full border border-off-black">
              Target Audience
            </span>
            <h2 className="text-heading-lg font-heading text-ink mt-4 mb-6 leading-tight">
              Built For Modern & Ambitious Learners
            </h2>
            <p className="text-body font-mono text-pale-stone mb-8 leading-relaxed">
              Whether you are preparing for international exams (IELTS, TOEFL, Cambridge), self-studying English at home, or revising school lessons, English4U provides a beautifully structured repository that respects your time.
            </p>
            
            <div className="p-6 bg-paper-canvas border border-off-black rounded-[40px] flex items-start gap-4">
              <div className="w-[10px] h-[10px] rounded-full bg-atmosphere-wash mt-1.5 shrink-0 border border-off-black" />
              <div className="font-mono">
                <h4 className="text-body-sm font-medium text-ink mb-1">Production Ready Curriculum</h4>
                <p className="text-caption text-pale-stone leading-relaxed">
                  Every gram of mock data is fully verified to match official B1/B2/C1&C2 grammar criteria.
                </p>
              </div>
            </div>
          </div>

          {/* Cards Grid Column */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {scenarios.map((scen, index) => {
              const Icon = scen.icon
              return (
                <motion.div
                  key={scen.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card variant="content" className="h-full flex flex-col group">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-[40px] h-[40px] rounded-full border border-off-black flex items-center justify-center bg-atmosphere-wash">
                        <Icon className="w-[18px] h-[18px] text-ink" />
                      </div>
                      <h3 className="text-body font-mono font-medium text-ink">
                        {scen.title}
                      </h3>
                    </div>
                    <p className="text-body-sm font-mono text-pale-stone leading-relaxed">
                      {scen.description}
                    </p>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

