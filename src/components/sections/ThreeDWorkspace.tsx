"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Globe, Orbit, Sparkles } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { useTheme } from "@/components/providers/theme-provider";

// Load ThreeDCanvas dynamically to avoid server-side rendering issues
const ThreeDCanvas = dynamic(() => import("../ThreeDCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] md:h-[500px] lg:h-[550px] flex items-center justify-center rounded-3xl border border-off-black/10 dark:border-white/10 bg-off-black/5 dark:bg-black/40 backdrop-blur-md">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-off-black/20 dark:border-white/20 border-t-off-black dark:border-t-white rounded-full animate-spin" />
        <span className="text-xs text-pale-stone font-mono">Initializing WebGL Canvas...</span>
      </div>
    </div>
  )
});

type Mode = "constellation" | "book" | "globe";

const wordDatabase: Record<string, { vi: string; en: string }> = {
  STRUCTURE: { vi: "Cấu trúc - Cách sắp xếp các từ ngữ trong một câu hoàn chỉnh.", en: "Structure - The arrangement of words in a complete sentence." },
  GRAMMAR: { vi: "Ngữ pháp - Hệ thống các quy tắc và nguyên tắc của ngôn ngữ.", en: "Grammar - The system of rules and principles governing language." },
  VOCABULARY: { vi: "Từ vựng - Tập hợp các từ mà người học cần làm chủ.", en: "Vocabulary - The body of words used in a particular language." },
  COLLOCATION: { vi: "Cụm kết hợp - Sự đi kèm tự nhiên giữa các từ vựng với nhau.", en: "Collocation - The habitual co-occurrence of individual words." },
  PHRASAL: { vi: "Thuộc cụm từ - Cụm động từ mang một tầng nghĩa đặc biệt.", en: "Phrasal - Pertaining to a phrase, especially phrasal verbs." },
  VERB: { vi: "Động từ - Từ chỉ hành động, trạng thái hoặc quá trình.", en: "Verb - A word indicating action, state, or relation." },
  FORMATION: { vi: "Biến đổi từ - Quá trình phái sinh và biến đổi từ loại gốc.", en: "Word Formation - The process of creating new words from roots." },
  COGNITIVE: { vi: "Nhận thức - Liên quan đến quá trình xử lý tư duy của não bộ.", en: "Cognitive - Relating to the mental processes of knowledge." },
  DESTINATION: { vi: "Điểm đến - Giáo trình ngữ pháp/từ vựng học thuật chuẩn Cambridge.", en: "Destination - The standard academic Cambridge syllabus series." },
  ENGLISH: { vi: "Tiếng Anh - Ngôn ngữ cầu nối toàn cầu.", en: "English - The global lingua franca." },
  LEARNING: { vi: "Học tập - Tiếp thu tri thức hoặc kỹ năng mới.", en: "Learning - Acquiring new knowledge or behaviors." },
  FLUENCY: { vi: "Trôi chảy - Khả năng diễn đạt ngôn ngữ mạch lạc.", en: "Fluency - The ability to express oneself easily and articulately." },
  IDIOMS: { vi: "Thành ngữ - Cụm từ mang ý nghĩa ẩn dụ đặc trưng.", en: "Idioms - Figurative phrases representing cultural expressions." },
  EXPRESSION: { vi: "Diễn đạt - Cách biểu đạt ý kiến hoặc cảm xúc.", en: "Expression - The action of making one's thoughts known." },
  SYNTAX: { vi: "Cú pháp - Quy tắc kết hợp từ để tạo ra mệnh đề.", en: "Syntax - The arrangement of words to create sentences." },
  CLAUSE: { vi: "Mệnh đề - Nhóm từ chứa chủ ngữ và động từ.", en: "Clause - A group of words containing a subject and a verb." },
  TENSE: { vi: "Thì - Hình thái động từ chỉ thời gian của hành động.", en: "Tense - Verb forms showing the time of an action." },
  MODAL: { vi: "Động từ khuyết thiếu - Diễn tả khả năng, sự cho phép hoặc nghĩa vụ.", en: "Modal - Verbs expressing necessity, possibility, or permission." },
  PASSIVE: { vi: "Bị động - Thể nhấn mạnh vào đối tượng chịu tác động.", en: "Passive - Voice emphasizing the recipient of the action." },
  INFINITIVE: { vi: "Động từ nguyên mẫu - Dạng cơ bản nguyên bản của động từ.", en: "Infinitive - The basic dictionary form of a verb." }
};

export function ThreeDWorkspace() {
  const { translate, lang } = useLanguage();
  const { theme } = useTheme();
  const [activeMode, setActiveMode] = useState<Mode>("constellation");
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);

  const tabs = [
    {
      id: "constellation" as Mode,
      label: "Vocab Constellation",
      desc: "An interactive space galaxy of core English terms. Hover to inspect their semantic roots.",
      labelVi: "Chòm sao Từ vựng",
      descVi: "Vũ trụ từ vựng 3D tương tác. Di chuột để tra cứu nhanh nguồn gốc ngữ nghĩa.",
      icon: Orbit
    },
    {
      id: "book" as Mode,
      label: "Grammar Codex",
      desc: "A glassmorphic 3D study book displaying destination rules and layouts.",
      labelVi: "Cẩm nang Ngữ pháp 3D",
      descVi: "Cuốn sách 3D thủy tinh mờ hiển thị các quy tắc ngữ pháp một cách trực quan.",
      icon: BookOpen
    },
    {
      id: "globe" as Mode,
      label: "Global Learning Network",
      desc: "A point cloud globe representing English4U global connectivity node network.",
      labelVi: "Mạng lưới Toàn cầu",
      descVi: "Quả cầu tinh thể biểu trưng cho mạng lưới học viên kết nối toàn cầu.",
      icon: Globe
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden border-t border-off-black/10 dark:border-white/10 bg-section-workspace">
      {/* Space glow backgrounds for dark mode */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-radial-cosmic-gold opacity-100 pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-radial-cosmic-orange opacity-100 pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT PANEL - Controls and Details */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-off-black dark:text-e2c161 bg-atmosphere-wash dark:bg-white/5 border border-off-black/15 dark:border-white/10 px-3.5 py-1.5 rounded-full w-fit">
              <Sparkles className="w-[12px] h-[12px] text-stardust-gold" />
              {translate("Premium 3D Hub")}
            </span>
            
            <h2 className="text-display-sm font-heading font-normal tracking-[-0.02em] text-gradient-heading mt-4 mb-6 leading-tight">
              {translate("Explore Through Dimensional Space")}
            </h2>
            
            <p className="text-body text-pale-stone mb-8 leading-relaxed">
              {translate("Interact with our virtual three-dimensional workspace. Toggle tabs to rotate vocab clouds, flip grammar codex pages, or traverse the global study network in real time.")}
            </p>

            {/* TAB SELECTOR GROUP */}
            <div className="flex flex-col gap-3">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isSelected = activeMode === tab.id;
                return (
                  <motion.button
                    key={tab.id}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setActiveMode(tab.id);
                      setHoveredWord(null);
                    }}
                    className={`flex flex-col p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-atmosphere-wash border-off-black dark:bg-white/5 dark:border-stardust-gold/40 shadow-sm"
                        : "bg-transparent border-transparent hover:bg-off-black/5 dark:hover:bg-white/5 text-off-black/60 dark:text-ink/60"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl border ${
                        isSelected 
                          ? "bg-off-black dark:bg-stardust-gold dark:border-stardust-gold text-paper-canvas dark:text-black" 
                          : "bg-paper-canvas border-off-black/10 dark:bg-neutral-900 dark:border-white/10 text-ink"
                      }`}>
                        <Icon className="w-[16px] h-[16px]" />
                      </div>
                      <span className="font-bold text-sm text-ink">{lang === "vi" ? tab.labelVi : tab.label}</span>
                    </div>
                    {isSelected && (
                      <motion.p 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-2 pl-11 text-xs text-pale-stone leading-relaxed"
                      >
                        {lang === "vi" ? tab.descVi : tab.desc}
                      </motion.p>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* CONSTELLATION INTERACTION FOOTER */}
            <div className="mt-8 h-[90px] relative">
              <AnimatePresence mode="wait">
                {activeMode === "constellation" && (
                  <motion.div
                    key="constellation-interaction"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-2xl border border-off-black/15 dark:border-white/10 bg-off-black/5 dark:bg-white/5 h-full flex flex-col justify-center"
                  >
                    {hoveredWord ? (
                      <div>
                        <span className="text-[10px] font-bold text-stardust-gold uppercase tracking-widest block mb-0.5">
                          {translate("Active Node")}
                        </span>
                        <h4 className="text-sm font-bold text-ink mb-1">{hoveredWord}</h4>
                        <p className="text-xs text-pale-stone leading-tight truncate">
                          {lang === "vi" ? wordDatabase[hoveredWord]?.vi : wordDatabase[hoveredWord]?.en}
                        </p>
                      </div>
                    ) : (
                      <p className="text-xs text-pale-stone italic text-center font-mono">
                        {translate("Hover over words in the 3D galaxy to translate...")}
                      </p>
                    )}
                  </motion.div>
                )}
                {activeMode === "book" && (
                  <motion.p
                    key="book-tip"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-pale-stone italic font-mono p-4 border border-dashed border-off-black/15 dark:border-white/10 rounded-2xl text-center"
                  >
                    {translate("Tip: Click and drag your mouse to spin the 3D book in space.")}
                  </motion.p>
                )}
                {activeMode === "globe" && (
                  <motion.p
                    key="globe-tip"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-pale-stone italic font-mono p-4 border border-dashed border-off-black/15 dark:border-white/10 rounded-2xl text-center"
                  >
                    {translate("Tip: Double click to reset globe orientation and spin momentum.")}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          {/* RIGHT PANEL - WebGL Canvas */}
          <div className="lg:col-span-7 w-full h-[400px] md:h-[500px] lg:h-[550px] select-none">
            <ThreeDCanvas mode={activeMode} onHoverWord={setHoveredWord} />
          </div>

        </div>
      </div>
    </section>
  );
}
