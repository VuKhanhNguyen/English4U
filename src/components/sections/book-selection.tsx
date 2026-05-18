"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ChevronRight } from "lucide-react";

const books = [
  {
    id: "b1",
    title: "Destination B1",
    description: "Grammar and Vocabulary for intermediate learners.",
    units: 42,
    color: "saffron" as const,
  },
  {
    id: "b2",
    title: "Destination B2",
    description:
      "Advanced Grammar and Vocabulary for upper-intermediate learners.",
    units: 28,
    color: "mint" as const,
  },
  {
    id: "c1-c2",
    title: "Destination C1 & C2",
    description:
      "Mastery level Grammar and Vocabulary for proficient learners.",
    units: 26,
    color: "lavender" as const,
  },
];

export function BookSelectionSection() {
  return (
    <section id="explore" className="py-24 bg-canvas-white relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-heading-lg font-bold tracking-tight text-midnight-ink mb-4">
            Choose Your Destination
          </h2>
          <p className="text-body text-[#737373] max-w-2xl mx-auto">
            Select a book to explore structured lessons, interactive tables,
            comprehensive vocabulary lists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {books.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Link href={`/destination/${book.id}`} className="block h-full">
                <Card
                  variant={book.color}
                  className="h-full flex flex-col cursor-pointer group shadow-subtle hover:shadow-subtle-2 transition-all"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <Badge>{book.units} Units</Badge>
                    <BookOpen className="w-[20px] h-[20px] text-midnight-ink/50" />
                  </div>
                  <h3 className="text-heading font-bold mb-2">{book.title}</h3>
                  <p className="text-body-sm text-midnight-ink/80 mb-8 flex-grow">
                    {book.description}
                  </p>
                  <div className="flex items-center text-sm font-bold mt-auto group-hover:text-accent-green transition-colors">
                    Start Exploring{" "}
                    <ChevronRight className="w-[16px] h-[16px] ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
