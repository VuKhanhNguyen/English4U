"use client";

import React, { useEffect, useRef, memo } from 'react';
import { useTheme } from "@/components/providers/theme-provider";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
}

interface GridDot {
  x: number;
  y: number;
  ox: number;
  oy: number;
}

const ParallaxBackground = memo(() => {
  const { theme } = useTheme();
  const [isMobile, setIsMobile] = React.useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasBackRef = useRef<HTMLCanvasElement>(null);
  const canvasFrontRef = useRef<HTMLCanvasElement>(null);
  
  // Smooth positioning refs
  const scrollRef = useRef({ current: 0, target: 0 });
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  
  // Starfield & grid data refs
  const starsRef = useRef<Star[]>([]);
  const dotsRef = useRef<GridDot[]>([]);
  
  const rafRef = useRef<number | null>(null);
  const isReducedMotion = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Check for prefers-reduced-motion
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    isReducedMotion.current = mediaQuery.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotion.current = e.matches;
    };
    mediaQuery.addEventListener("change", handleMotionChange);
    return () => mediaQuery.removeEventListener("change", handleMotionChange);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || isMobile) return;
    const canvasBack = canvasBackRef.current;
    const canvasFront = canvasFrontRef.current;
    if (!canvasBack || !canvasFront) return;

    const ctxBack = canvasBack.getContext('2d', { alpha: true });
    const ctxFront = canvasFront.getContext('2d', { alpha: true });
    if (!ctxBack || !ctxFront) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    
    // Initialize stars (for dark mode)
    const initStars = (w: number, h: number) => {
      const count = Math.min(Math.floor((w * h) / 8000), 180);
      const stars: Star[] = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          z: Math.random() * 0.9 + 0.1, // depth factor
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.7 + 0.3,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
        });
      }
      starsRef.current = stars;
    };

    // Initialize dot grid (for light mode)
    const initDots = (w: number, h: number) => {
      const spacing = 32;
      const dots: GridDot[] = [];
      const cols = Math.floor(w / spacing) + 1;
      const rows = Math.floor(h / spacing) + 1;
      
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const x = c * spacing;
          const y = r * spacing;
          dots.push({ x, y, ox: x, oy: y });
        }
      }
      dotsRef.current = dots;
    };

    const handleResize = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      width = rect?.width || window.innerWidth;
      height = rect?.height || window.innerHeight;

      // Adjust for screen scaling
      canvasBack.width = width * dpr;
      canvasBack.height = height * dpr;
      canvasBack.style.width = `${width}px`;
      canvasBack.style.height = `${height}px`;
      ctxBack.scale(dpr, dpr);

      canvasFront.width = width * dpr;
      canvasFront.height = height * dpr;
      canvasFront.style.width = `${width}px`;
      canvasFront.style.height = `${height}px`;
      ctxFront.scale(dpr, dpr);

      initStars(width, height);
      initDots(width, height);
    };

    // Listeners
    const handleScroll = () => {
      scrollRef.current.target = window.scrollY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.tx = e.clientX;
      mouseRef.current.ty = e.clientY;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    // Initial size setting
    handleResize();

    let frame = 0;

    const render = () => {
      frame++;
      
      // Interpolate smooth scroll and mouse coordinates
      const scrollSpeed = isReducedMotion.current ? 1 : 0.08;
      scrollRef.current.current += (scrollRef.current.target - scrollRef.current.current) * scrollSpeed;
      
      const mouseSpeed = isReducedMotion.current ? 1 : 0.05;
      mouseRef.current.x += (mouseRef.current.tx - mouseRef.current.x) * mouseSpeed;
      mouseRef.current.y += (mouseRef.current.ty - mouseRef.current.y) * mouseSpeed;

      // Clear contexts
      ctxBack.clearRect(0, 0, width, height);
      ctxFront.clearRect(0, 0, width, height);

      // --- LAYER 1: BACK CANVAS (Geometric blueprints and large orbits) ---
      ctxBack.save();
      
      // Multiplier scroll effect
      const scrollOffsetBack = -scrollRef.current.current * 0.05;
      const mouseOffsetBackX = (mouseRef.current.x - width / 2) * 0.01;
      const mouseOffsetBackY = (mouseRef.current.y - height / 2) * 0.01;
      
      ctxBack.translate(mouseOffsetBackX, mouseOffsetBackY + (scrollOffsetBack % height));

      if (theme === 'dark') {
        // Dark mode: Deep orbits & constellations
        ctxBack.strokeStyle = 'rgba(226, 193, 97, 0.04)'; // Gold-tinted orbits
        ctxBack.lineWidth = 1;

        // Draw large orbital ellipses
        ctxBack.beginPath();
        ctxBack.ellipse(width / 2, height / 2, width * 0.45, height * 0.4, Math.PI / 6, 0, Math.PI * 2);
        ctxBack.stroke();

        ctxBack.beginPath();
        ctxBack.ellipse(width / 3, height / 3, width * 0.6, height * 0.5, -Math.PI / 12, 0, Math.PI * 2);
        ctxBack.stroke();
      } else {
        // Light mode: Faint blueprints and alignments
        ctxBack.strokeStyle = 'rgba(0, 0, 0, 0.02)';
        ctxBack.lineWidth = 1;

        ctxBack.beginPath();
        ctxBack.arc(width / 2, height / 2, Math.min(width, height) * 0.4, 0, Math.PI * 2);
        ctxBack.stroke();

        // Crosshairs
        ctxBack.beginPath();
        ctxBack.moveTo(0, height / 2);
        ctxBack.lineTo(width, height / 2);
        ctxBack.moveTo(width / 2, 0);
        ctxBack.lineTo(width / 2, height);
        ctxBack.stroke();
      }
      ctxBack.restore();

      // --- LAYER 2: FRONT CANVAS (Twinkling starfield OR reactive dots) ---
      if (theme === 'dark') {
        // Render 3D-like drifting starfield for Cosmic Dark Mode
        const stars = starsRef.current;
        const scrollOffsetFront = scrollRef.current.current * 0.15;
        const mouseOffsetFrontX = (mouseRef.current.x - width / 2) * 0.03;
        const mouseOffsetFrontY = (mouseRef.current.y - height / 2) * 0.03;

        stars.forEach((star) => {
          // drift over time
          if (!isReducedMotion.current) {
            star.y += star.z * 0.2; // slow vertical drift
            if (star.y > height) {
              star.y = -10;
              star.x = Math.random() * width;
            }
          }

          // twinkling opacity
          const opacity = star.opacity + Math.sin(frame * star.twinkleSpeed) * 0.15;

          // Parallax coordinate adjustments
          const drawX = (star.x + mouseOffsetFrontX * star.z + width) % width;
          const drawY = (star.y + mouseOffsetFrontY * star.z + scrollOffsetFront * star.z + height) % height;

          // Draw star
          ctxFront.fillStyle = `rgba(246, 243, 241, ${Math.max(0.1, Math.min(1, opacity))})`;
          ctxFront.beginPath();
          ctxFront.arc(drawX, drawY, star.size * star.z, 0, Math.PI * 2);
          ctxFront.fill();
          
          // Draw subtle cross glow for brighter stars
          if (star.size > 1.6 && opacity > 0.6) {
            ctxFront.strokeStyle = `rgba(226, 193, 97, ${opacity * 0.25})`; // stardust gold tint glow
            ctxFront.lineWidth = 0.5;
            ctxFront.beginPath();
            ctxFront.moveTo(drawX - 4, drawY);
            ctxFront.lineTo(drawX + 4, drawY);
            ctxFront.moveTo(drawX, drawY - 4);
            ctxFront.lineTo(drawX, drawY + 4);
            ctxFront.stroke();
          }
        });
      } else {
        // Render paper canvas dots that warp/interact slightly with mouse in Light Mode
        const dots = dotsRef.current;
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        
        ctxFront.fillStyle = 'rgba(0, 0, 0, 0.06)';
        
        dots.forEach((dot) => {
          const dx = mx - dot.ox;
          const dy = my - dot.oy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          // Warp dots slightly around cursor (within 180px radius)
          if (dist < 180 && dist > 1) {
            const force = (180 - dist) / 180;
            const angle = Math.atan2(dy, dx);
            // Push dots away from mouse
            const push = force * 8;
            dot.x = dot.ox - Math.cos(angle) * push;
            dot.y = dot.oy - Math.sin(angle) * push;
          } else {
            dot.x += (dot.ox - dot.x) * 0.1;
            dot.y += (dot.oy - dot.y) * 0.1;
          }
          
          ctxFront.beginPath();
          ctxFront.arc(dot.x, dot.y, 1, 0, Math.PI * 2);
          ctxFront.fill();
        });
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [theme, isMobile]);

  if (isMobile) {
    return (
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none -z-10 bg-transparent opacity-[0.4] dark:opacity-[0.25]"
        style={{
          backgroundImage: theme === 'dark' 
            ? 'radial-gradient(rgba(246, 243, 241, 0.4) 1px, transparent 1px)' 
            : 'radial-gradient(rgba(0, 0, 0, 0.15) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />
    );
  }

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none -z-10 bg-transparent"
    >
      <canvas ref={canvasBackRef} className="absolute inset-0 w-full h-full block" />
      <canvas ref={canvasFrontRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
});

ParallaxBackground.displayName = 'ParallaxBackground';

export default ParallaxBackground;
