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
    color: "feature" as const,
  },
  {
    id: "b2",
    title: "Destination B2",
    description:
      "Advanced Grammar and Vocabulary for upper-intermediate learners.",
    units: 28,
    color: "content" as const,
  },
  {
    id: "c1-c2",
    title: "Destination C1 & C2",
    description:
      "Mastery level Grammar and Vocabulary for proficient learners.",
    units: 26,
    color: "feature" as const,
  },
];

export function BookSelectionSection() {
  return (
    <section id="explore" className="py-24 bg-paper-canvas relative">
      <div className="container mx-auto px-6 max-w-[1432px]">
        <div className="text-center mb-16">
          <h2 className="text-heading-lg font-heading text-ink mb-4">
            Choose Your Destination
          </h2>
          <p className="text-body font-mono text-pale-stone max-w-2xl mx-auto">
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
                  className="h-full flex flex-col cursor-pointer group transition-all"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <Badge className="border-off-black bg-transparent text-ink text-caption font-mono rounded-full">
                      {book.units} Units
                    </Badge>
                    <BookOpen className="w-[20px] h-[20px] text-ink/50" />
                  </div>
                  <h3 className="text-heading font-heading text-ink mb-2">{book.title}</h3>
                  <p className="text-body-sm font-mono text-pale-stone mb-8 flex-grow">
                    {book.description}
                  </p>
                  <div className="flex items-center text-body-sm font-mono text-ink mt-auto group-hover:text-off-black transition-colors px-1">
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

