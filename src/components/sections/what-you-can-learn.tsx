"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Type, Boxes, GitMerge, Layers } from "lucide-react"

const features = [
  {
    title: "Grammar Rules",
    description: "Clear structures, functional usage guidelines, and practical daily examples arranged side-by-side.",
    icon: BookOpen,
    badge: "Structure",
    colorClass: "bg-card-saffron"
  },
  {
    title: "Topic Vocabulary",
    description: "Organized topic-based vocabulary lists covering advanced definitions, parts of speech, and sample sentences.",
    icon: Type,
    badge: "Words",
    colorClass: "bg-card-mint"
  },
  {
    title: "Word Formation",
    description: "Master prefix, suffix, noun, verb, and adjective derivation families to exponentially boost your vocabulary size.",
    icon: Boxes,
    badge: "Patterns",
    colorClass: "bg-card-lavender"
  },
  {
    title: "Phrasal Verbs",
    description: "Common dynamic verb combinations, key idiomatic meanings, and conversational contexts clearly laid out.",
    icon: GitMerge,
    badge: "Idioms",
    colorClass: "bg-card-pink"
  },
  {
    title: "Collocations",
    description: "Natural English word couplings and common partner patterns to make your speaking and writing sound native.",
    icon: Layers,
    badge: "Fluency",
    colorClass: "bg-accent-green"
  }
]

export function WhatYouCanLearnSection() {
  return (
    <section id="features" className="py-24 bg-canvas-white border-t border-charcoal-border">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-accent-green bg-midnight-ink px-3 py-1 rounded-full border border-charcoal-border">
            What You Can Learn
          </span>
          <h2 className="text-heading-lg font-bold tracking-tight text-midnight-ink mt-4 mb-4">
            A Complete Curriculum for High-Level English
          </h2>
          <p className="text-body text-[#737373] max-w-2xl mx-auto">
            Everything you need to master English grammar, word families, and idioms structured strictly for Destination books.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {features.map((feat, index) => {
            const Icon = feat.icon
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
              >
                <Card variant="content" className="h-full flex flex-col p-6 shadow-subtle hover:shadow-subtle-2 transition-all border border-charcoal-border bg-canvas-white relative overflow-hidden group">
                  <div className={`absolute top-0 left-0 right-0 h-2 border-b border-charcoal-border ${feat.colorClass}`} />
                  
                  <div className="mt-4 mb-6 flex items-center justify-between">
                    <div className="w-[36px] h-[36px] rounded-full border border-charcoal-border bg-pale-ash flex items-center justify-center group-hover:bg-midnight-ink group-hover:text-canvas-white transition-colors duration-200">
                      <Icon className="w-[16px] h-[16px]" />
                    </div>
                    <Badge className="border-charcoal-border font-bold">
                      {feat.badge}
                    </Badge>
                  </div>
                  
                  <h3 className="text-heading font-black mb-3 text-midnight-ink">
                    {feat.title}
                  </h3>
                  <p className="text-body-sm text-midnight-ink/80 leading-relaxed">
                    {feat.description}
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
