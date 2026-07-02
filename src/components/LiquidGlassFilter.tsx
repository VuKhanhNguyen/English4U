"use client";

import React, { useEffect, useRef } from "react";

export default function LiquidGlassFilter() {
  const displacementMapRef = useRef<SVGFEDisplacementMapElement>(null);
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    // Scroll animation loop disabled to turn off water wave border refraction effect on desktop and mobile.
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
            scale="0"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
