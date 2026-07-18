"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/providers/language-provider";
import { showToast } from "@/components/ui/toast";
import CoverflowGallery from "@/components/ui/coverflow-gallery";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function BookSelectionSection() {
  const { translate } = useLanguage();
  const router = useRouter();
  const [isMobile, setIsMobile] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [activeIdx, setActiveIdx] = React.useState(0);

  React.useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const books = [
    {
      id: "b1",
      title: "Destination B1",
      description: "Grammar and Vocabulary for intermediate learners. Deepen your understanding of standard English grammar rules, word families, and common idiomatic patterns.",
      units: 42,
      color: "mint",
      image: {
        src: "/imgs/destination-b1.png",
        alt: "Destination B1 Book Cover",
      },
    },
    {
      id: "b2",
      title: "Destination B2",
      description: "Advanced Grammar and Vocabulary for upper-intermediate learners. Master complex sentence patterns, phrasal verbs, word formation matrices, and academic collocations.",
      units: 28,
      color: "saffron",
      image: {
        src: "/imgs/destination-b2.png",
        alt: "Destination B2 Book Cover",
      },
    },
    {
      id: "c1-c2",
      title: "Destination C1 & C2",
      description: "Mastery level Grammar and Vocabulary for proficient learners. Dive into the most challenging aspects of English structures, rare idioms, and academic vocab families.",
      units: 26,
      color: "pink",
      image: {
        src: "/imgs/destination-c1-c2.png",
        alt: "Destination C1 & C2 Book Cover",
      },
    },
  ];

  const handleBookNavigate = (index: number) => {
    const book = books[index];
    if (book.id === "c1-c2") {
      showToast({
        title: "Under Development",
        message: "Destination C1 & C2 is currently under development. Stay tuned!",
        variant: "warning",
        position: "top-right",
        duration: 3000,
      });
    } else {
      router.push(`/destination/${book.id}`);
    }
  };

  const activeBook = books[activeIdx];

  return (
    <section id="explore" className="w-full py-20 relative overflow-hidden z-0">
      <div className="max-w-6xl mx-4 md:mx-auto py-16 px-6 md:px-12 liquid-glass relative z-10 overflow-hidden">
        {/* Glass Backdrop Layer */}
        <div className="liquid-glass-bg" />

        <div className="w-full relative z-20 flex flex-col items-center">
          {/* Header */}
          <div className="text-center mb-10 max-w-2xl">
            <h2 className="text-heading-lg font-heading text-gradient-heading mb-4">
              {translate("Choose Your Destination")}
            </h2>
            <p className="text-body font-sans text-pale-stone">
              {translate(
                "Select a book to explore structured lessons, interactive tables, and comprehensive vocabulary lists."
              )}
            </p>
          </div>

          {/* 3D Coverflow Gallery */}
          {mounted && (
            <div className="w-full h-[400px] sm:h-[460px] flex items-center justify-center select-none mb-10">
              <CoverflowGallery
                slides={books}
                cardWidth={isMobile ? 260 : 360}
                cardHeight={isMobile ? 260 : 360}
                radius={24}
                tilt={10}
                sideTilt={6}
                gap={isMobile ? 5 : 8}
                opacity={55}
                showTitle={false} // Hidden inside covers since covers already have beautiful rendered titles
                onActiveCardChange={(index) => setActiveIdx(index)}
                onActiveCardClick={(index) => handleBookNavigate(index)}
              />
            </div>
          )}

          {/* Dynamic Active Slide Detail Card */}
          <div className="w-full max-w-2xl bg-white/5 dark:bg-black/20 border border-zinc-200/50 dark:border-zinc-800 backdrop-blur-md rounded-[24px] p-6 sm:p-8 flex flex-col items-center text-center shadow-lg transition-all duration-300">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeBook.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full flex flex-col items-center"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="border border-blue-200/50 dark:border-blue-900/30 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-caption font-mono rounded-full px-3 py-1">
                    {activeBook.units} {translate("Units")}
                  </Badge>
                  {activeBook.id === "c1-c2" && (
                    <Badge className="border border-orange-200/50 dark:border-orange-950/30 bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 text-caption font-mono rounded-full px-3 py-1 uppercase font-bold animate-pulse">
                      {translate("Coming Soon")}
                    </Badge>
                  )}
                </div>

                <h3 className="text-heading-lg font-heading text-ink mb-3">
                  {activeBook.title}
                </h3>
                
                <p className="text-body font-sans text-pale-stone max-w-lg mb-6 leading-relaxed">
                  {translate(activeBook.description)}
                </p>

                <Button
                  onClick={() => handleBookNavigate(activeIdx)}
                  variant={activeBook.id === "c1-c2" ? "outline" : "default"}
                  className={`rounded-full h-[48px] px-8 font-bold flex items-center gap-2 group transition-all duration-200 shadow-md ${
                    activeBook.id === "c1-c2"
                      ? "!border-zinc-300 dark:!border-zinc-700 cursor-not-allowed opacity-60"
                      : "hover:scale-[1.03] active:scale-[0.98]"
                  }`}
                >
                  <BookOpen className="w-[18px] h-[18px]" />
                  {activeBook.id === "c1-c2" ? (
                    translate("Coming Soon")
                  ) : (
                    <>
                      {translate("Start Exploring")}
                      <ChevronRight className="w-[16px] h-[16px] transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
