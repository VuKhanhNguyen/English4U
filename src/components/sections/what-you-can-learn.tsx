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
  },
  {
    title: "Topic Vocabulary",
    description: "Organized topic-based vocabulary lists covering advanced definitions, parts of speech, and sample sentences.",
    icon: Type,
    badge: "Words",
  },
  {
    title: "Word Formation",
    description: "Master prefix, suffix, noun, verb, and adjective derivation families to exponentially boost your vocabulary size.",
    icon: Boxes,
    badge: "Patterns",
  },
  {
    title: "Phrasal Verbs",
    description: "Common dynamic verb combinations, key idiomatic meanings, and conversational contexts clearly laid out.",
    icon: GitMerge,
    badge: "Idioms",
  },
  {
    title: "Collocations",
    description: "Natural English word couplings and common partner patterns to make your speaking and writing sound native.",
    icon: Layers,
    badge: "Fluency",
  }
]

export function WhatYouCanLearnSection() {
  return (
    <section id="features" className="py-24 bg-paper-canvas border-t border-off-black">
      <div className="container mx-auto px-6 max-w-[1432px]">
        <div className="text-center mb-16">
          <span className="text-caption font-mono uppercase tracking-wider text-ink bg-atmosphere-wash px-3 py-1 rounded-full border border-off-black">
            What You Can Learn
          </span>
          <h2 className="text-heading-lg font-heading text-ink mt-4 mb-4">
            A Complete Curriculum for High-Level English
          </h2>
          <p className="text-body font-mono text-pale-stone max-w-2xl mx-auto">
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
                <Card variant="content" className="h-full flex flex-col group">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="w-[36px] h-[36px] rounded-full border border-off-black bg-atmosphere-wash flex items-center justify-center group-hover:bg-off-black group-hover:text-paper-canvas transition-colors duration-200">
                      <Icon className="w-[16px] h-[16px]" />
                    </div>
                    <Badge className="border-off-black bg-transparent text-ink text-caption font-mono rounded-full">
                      {feat.badge}
                    </Badge>
                  </div>
                  
                  <h3 className="text-subheading font-heading text-ink mb-3">
                    {feat.title}
                  </h3>
                  <p className="text-body-sm font-mono text-pale-stone leading-relaxed">
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

