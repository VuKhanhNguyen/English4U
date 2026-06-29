"use client";

import React, { useEffect, useRef } from "react";

export default function LiquidGlassFilter() {
  const displacementMapRef = useRef<SVGFEDisplacementMapElement>(null);
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let lastScrollY = window.scrollY;
    let smoothVelocity = 0;
    let time = 0;
    let frameId: number;

    const tick = () => {
      time += 0.015;
      
      // Calculate scroll speed (delta)
      const currentScrollY = window.scrollY;
      const scrollDiff = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;

      // Smooth scroll velocity using linear interpolation (lerp)
      smoothVelocity += (scrollDiff - smoothVelocity) * 0.08;
      
      if (smoothVelocity < 0.1) smoothVelocity = 0;

      // Base refraction scale is 8px (stationary).
      // Max displacement scale under high velocity is capped around 45px.
      const targetScale = 8 + Math.min(smoothVelocity * 0.6, 37);

      if (displacementMapRef.current) {
        displacementMapRef.current.setAttribute("scale", String(targetScale));
      }

      // Micro-shimmer: continuously shift base frequency slightly so the glass feels dynamic even when static
      if (turbulenceRef.current) {
        const baseFreqX = 0.002 + Math.sin(time * 0.5) * 0.0003;
        const baseFreqY = 0.006 + Math.cos(time * 0.4) * 0.0005;
        turbulenceRef.current.setAttribute("baseFrequency", `${baseFreqX} ${baseFreqY}`);
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <svg style={{ display: "none" }}>
      <defs>
        <filter
          id="liquid-glass-refraction"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          filterUnits="objectBoundingBox"
        >
          <feTurbulence
            ref={turbulenceRef}
            type="fractalNoise"
            baseFrequency="0.002 0.006"
            numOctaves="1"
            seed="23"
            result="turbulence"
          />
          <feGaussianBlur in="turbulence" stdDeviation="4" result="softMap" />
          <feDisplacementMap
            ref={displacementMapRef}
            in="SourceGraphic"
            in2="softMap"
            scale="8"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
