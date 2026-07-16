"use client"

import * as React from "react"

export function InteractiveBackground() {
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      container.style.setProperty("--mouse-x", `${x}px`)
      container.style.setProperty("--mouse-y", `${y}px`)
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      style={{
        "--mouse-x": "-9999px",
        "--mouse-y": "-9999px",
      } as React.CSSProperties}
    >
      {/* Ambient Slowly Floating Auras */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(79,70,229,0.06)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(226,193,97,0.04)_0%,transparent_70%)] animate-ambient-float-1 will-change-transform" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.04)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(255,174,122,0.03)_0%,transparent_70%)] animate-ambient-float-2 will-change-transform" />
      
      {/* Mouse Spotlight Grid overlay */}
      <div 
        className="absolute inset-0 opacity-100 dark:opacity-90 transition-opacity duration-300"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
          maskImage: "radial-gradient(circle 300px at var(--mouse-x) var(--mouse-y), black 20%, rgba(0,0,0,0.15) 80%)",
          WebkitMaskImage: "radial-gradient(circle 300px at var(--mouse-x) var(--mouse-y), black 20%, rgba(0,0,0,0.15) 80%)",
        }}
      />
    </div>
  )
}
