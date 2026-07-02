"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ChevronRight } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { showToast } from "@/components/ui/toast";

import dynamic from "next/dynamic";

const ThreeDCanvas = dynamic(() => import("../ThreeDCanvas"), {
  ssr: false,
  loading: () => null,
});

const books = [
  {
    id: "b1",
    title: "Destination B1",
    description: "Grammar and Vocabulary for intermediate learners.",
    units: 42,
    color: "mint" as const,
  },
  {
    id: "b2",
    title: "Destination B2",
    description:
      "Advanced Grammar and Vocabulary for upper-intermediate learners.",
    units: 28,
    color: "saffron" as const,
  },
  {
    id: "c1-c2",
    title: "Destination C1 & C2",
    description:
      "Mastery level Grammar and Vocabulary for proficient learners.",
    units: 26,
    color: "pink" as const,
  },
];

export function BookSelectionSection() {
  const { translate } = useLanguage();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      id="explore"
      className="w-full py-16 relative overflow-hidden z-0"
    >
      {/* 3D Vocab Cloud Background covering full width */}
      {!isMobile && (
        <div className="absolute inset-0 -z-10 pointer-events-none opacity-40 dark:opacity-30">
          <ThreeDCanvas mode="constellation" onHoverWord={() => {}} />
        </div>
      )}

      {/* Centered Floating 3D Glass Container */}
      <div className="max-w-6xl mx-4 md:mx-auto py-16 px-6 md:px-12 liquid-glass border border-white/20 dark:border-white/10 rounded-[32px] shadow-3d-card relative z-10 overflow-hidden">
        {/* Glass Backdrop Layer */}
        <div className="liquid-glass-bg" />

        <div className="w-full relative z-20">
        <div className="text-center mb-16">
          <h2 className="text-heading-lg font-heading text-gradient-heading mb-4">
            {translate("Choose Your Destination")}
          </h2>
          <p className="text-body font-mono text-pale-stone max-w-2xl mx-auto">
            {translate("Select a book to explore structured lessons, interactive tables, comprehensive vocabulary lists.")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {books.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {book.id === "c1-c2" ? (
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    showToast({
                      title: "Under Development",
                      message: "Destination C1 & C2 is currently under development. Stay tuned!",
                      variant: "warning",
                      position: "top-right",
                      duration: 3000,
                    });
                  }}
                  className="block h-full cursor-pointer"
                >
                  <Card
                    variant={book.color}
                    className="h-full flex flex-col group transition-all duration-300 border-off-black/15 hover:border-off-black/40 dark:border-white/10 dark:hover:border-white/20"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <Badge className="border-off-black/20 bg-paper-canvas/50 dark:bg-black/35 text-ink text-caption font-mono rounded-full px-3 py-1">
                        {book.units} {translate("Units")}
                      </Badge>
                      <BookOpen className="w-[20px] h-[20px] text-ink/50 group-hover:text-ink transition-colors" />
                    </div>
                    <h3 className="text-heading font-heading text-ink mb-2 group-hover:translate-x-1 transition-transform duration-300">{book.title}</h3>
                    <p className="text-body-sm font-mono text-pale-stone mb-8 flex-grow leading-relaxed">
                      {translate(book.description)}
                    </p>
                    <div className="flex items-center text-body-sm font-mono text-ink mt-auto transition-colors px-1 font-bold">
                      {translate("Start Exploring")}{" "}
                      <ChevronRight className="w-[16px] h-[16px] ml-1 transition-transform group-hover:translate-x-2" />
                    </div>
                  </Card>
                </div>
              ) : (
                <Link href={`/destination/${book.id}`} className="block h-full">
                  <Card
                    variant={book.color}
                    className="h-full flex flex-col cursor-pointer group transition-all duration-300 border-off-black/15 hover:border-off-black/40 dark:border-white/10 dark:hover:border-white/20"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <Badge className="border-off-black/20 bg-paper-canvas/50 dark:bg-black/35 text-ink text-caption font-mono rounded-full px-3 py-1">
                        {book.units} {translate("Units")}
                      </Badge>
                      <BookOpen className="w-[20px] h-[20px] text-ink/50 group-hover:text-ink transition-colors" />
                    </div>
                    <h3 className="text-heading font-heading text-ink mb-2 group-hover:translate-x-1 transition-transform duration-300">{book.title}</h3>
                    <p className="text-body-sm font-mono text-pale-stone mb-8 flex-grow leading-relaxed">
                      {translate(book.description)}
                    </p>
                    <div className="flex items-center text-body-sm font-mono text-ink mt-auto transition-colors px-1 font-bold">
                      {translate("Start Exploring")}{" "}
                      <ChevronRight className="w-[16px] h-[16px] ml-1 transition-transform group-hover:translate-x-2" />
                    </div>
                  </Card>
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}

