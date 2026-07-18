"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ContactBubbles() {
  const [isOpen, setIsOpen] = useState(false);

  const bubbleItems = [
    {
      name: "Chatbot AI",
      icon: "/imgs/iconApp.png",
      tooltip: "Chatbot AI",
      dx: -100,
      dy: 0,
      delay: 0,
      floatDelay: 0,
    },
    {
      name: "Messenger",
      icon: "/imgs/socials/messenger.png",
      tooltip: "Messenger",
      dx: -71,
      dy: -71,
      delay: 0.05,
      floatDelay: 0.5,
    },
    {
      name: "Zalo",
      icon: "/imgs/socials/zalo.png",
      tooltip: "Zalo",
      dx: 0,
      dy: -100,
      delay: 0.1,
      floatDelay: 1,
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center select-none">
      {/* Expanded arc menu items */}
      <AnimatePresence>
        {isOpen &&
          bubbleItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
              animate={{
                x: item.dx,
                y: item.dy,
                scale: 1,
                opacity: 1,
                transition: {
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: item.delay,
                },
              }}
              exit={{
                x: 0,
                y: 0,
                scale: 0,
                opacity: 0,
                transition: {
                  duration: 0.2,
                  delay: (bubbleItems.length - 1 - index) * 0.05,
                },
              }}
              className="absolute pointer-events-auto"
            >
              {/* Floating inner wrapper (staggered floating) */}
              <motion.div
                animate={{
                  y: [0, -6, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: item.floatDelay,
                }}
                className="relative group cursor-pointer"
              >
                {/* Bubble button */}
                <div
                  className={cn(
                    "w-12 h-12 rounded-full border-2 border-ink dark:border-off-black bg-paper-canvas dark:bg-atmosphere-wash flex items-center justify-center overflow-hidden",
                    "shadow-[3px_3px_0px_0px_var(--ink)] dark:shadow-[3px_3px_0px_0px_var(--off-black)]",
                    "hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_var(--ink)] dark:hover:shadow-[4px_4px_0px_0px_var(--off-black)]",
                    "active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_var(--ink)] dark:active:shadow-[1px_1px_0px_0px_var(--off-black)]",
                    "transition-all duration-200"
                  )}
                >
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Tooltip */}
                <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-ink dark:bg-off-black text-paper-canvas dark:text-ink text-xs font-abc-diatype-mono py-1 px-2.5 rounded-sm border border-ink dark:border-off-black whitespace-nowrap shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)]">
                    {item.tooltip}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
      </AnimatePresence>

      {/* Main Parent Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 rounded-full border-2 border-ink dark:border-off-black bg-paper-canvas dark:bg-atmosphere-wash text-ink dark:text-off-black flex items-center justify-center z-50 cursor-pointer",
          "shadow-[4px_4px_0px_0px_var(--ink)] dark:shadow-[4px_4px_0px_0px_var(--off-black)]",
          "hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_var(--ink)] dark:hover:shadow-[6px_6px_0px_0px_var(--off-black)]",
          "active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_var(--ink)] dark:active:shadow-[2px_2px_0px_0px_var(--off-black)]",
          "transition-all duration-200 outline-none"
        )}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-center"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </motion.div>
      </button>
    </div>
  );
}
