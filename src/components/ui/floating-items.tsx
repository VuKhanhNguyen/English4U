"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAnimation } from "@/components/providers/animation-provider";

export interface FloatingItemProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  duration?: number;
  yOffset?: number;
  rotateOffset?: number;
  delay?: number;
  size?: number | string;
  alwaysAnimate?: boolean;
}

export function FloatingItem({
  src,
  alt,
  className = "",
  style,
  duration = 4.5,
  yOffset = 15,
  rotateOffset = 8,
  delay = 0,
  size = 72,
  alwaysAnimate = false,
}: FloatingItemProps) {
  const { animationEnabled } = useAnimation();
  const shouldAnimate = alwaysAnimate || animationEnabled;

  return (
    <motion.div
      className={`pointer-events-none select-none ${className}`}
      style={{ width: size, height: "auto", ...style }}
      initial={{ y: 0, rotate: 0 }}
      animate={
        shouldAnimate
          ? {
              y: [-yOffset, yOffset, -yOffset],
              rotate: [-rotateOffset, rotateOffset, -rotateOffset],
            }
          : { y: 0, rotate: 0 }
      }
      transition={
        shouldAnimate
          ? {
              duration: duration,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: delay,
            }
          : { duration: 0.4 }
      }
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_8px_16px_rgba(255,255,255,0.08)] transition-transform duration-300"
      />
    </motion.div>
  );
}

interface ItemDef {
  src: string;
  alt: string;
}

const defaultItems: ItemDef[] = [
  { src: "/imgs/itemFloat/owl.png", alt: "Owl Mascot" },
  { src: "/imgs/itemFloat/b1.png", alt: "Destination B1 Badge" },
  { src: "/imgs/itemFloat/b2.png", alt: "Destination B2 Badge" },
  { src: "/imgs/itemFloat/c1.png", alt: "Destination C1 Badge" },
  { src: "/imgs/itemFloat/c2.png", alt: "Destination C2 Badge" },
];

export function RandomFloatingItems() {
  const [mounted, setMounted] = useState(false);
  const [randomPositions, setRandomPositions] = useState<
    {
      top: string;
      left: string;
      size: number;
      duration: number;
      delay: number;
      yOffset: number;
      rotateOffset: number;
    }[]
  >([]);

  useEffect(() => {
    setMounted(true);

    const bands = [
      { minTop: 8, maxTop: 22 },
      { minTop: 26, maxTop: 42 },
      { minTop: 46, maxTop: 62 },
      { minTop: 66, maxTop: 80 },
      { minTop: 84, maxTop: 94 },
    ];

    const positions = defaultItems.map((_, index) => {
      const band = bands[index] || { minTop: 10 + index * 18, maxTop: 25 + index * 18 };
      const randomTop = Math.floor(Math.random() * (band.maxTop - band.minTop + 1)) + band.minTop;
      const randomLeft = Math.floor(Math.random() * 82) + 4;
      const randomSize = Math.floor(Math.random() * 22) + 70;
      const randomDuration = Math.random() * 2.5 + 4;
      const randomDelay = Math.random() * 1.5;
      const randomYOffset = Math.floor(Math.random() * 12) + 12;
      const randomRotate = Math.floor(Math.random() * 20) - 10;

      return {
        top: `${randomTop}%`,
        left: `${randomLeft}%`,
        size: randomSize,
        duration: randomDuration,
        delay: randomDelay,
        yOffset: randomYOffset,
        rotateOffset: randomRotate,
      };
    });

    setRandomPositions(positions);
  }, []);

  if (!mounted || randomPositions.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {defaultItems.map((item, idx) => {
        const pos = randomPositions[idx];
        return (
          <FloatingItem
            key={item.src}
            src={item.src}
            alt={item.alt}
            size={pos.size}
            duration={pos.duration}
            delay={pos.delay}
            yOffset={pos.yOffset}
            rotateOffset={pos.rotateOffset}
            className="hidden md:block absolute"
            style={{
              top: pos.top,
              left: pos.left,
            }}
          />
        );
      })}
    </div>
  );
}
