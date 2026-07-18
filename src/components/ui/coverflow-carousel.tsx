"use client"

import * as React from "react"
import { useCallback, useEffect, useMemo, useRef } from "react"
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion"

type Props<T> = {
  items: T[]
  renderItem: (item: T, index: number, isActive: boolean) => React.ReactNode
  activeWidth?: number
  activeHeight?: number
  restWidth?: number
  restHeight?: number
  gap?: number
  radius?: number
  showArrows?: boolean
  arrowColor?: string
  arrowBackground?: string
  arrowSize?: number
  autoplay?: boolean
  autoplayDirection?: "leftToRight" | "rightToLeft"
  transition?: any
  style?: React.CSSProperties
  activeIndex: number
  onChangeActiveIndex: (index: number) => void
}

type Sizing = {
  restWidth: number
  restHeight: number
  activeWidth: number
  activeHeight: number
}

function relOf(index: number, pos: number, count: number): number {
  let rel = (((index - pos) % count) + count) % count
  if (rel > count / 2) rel -= count
  return rel
}

function yForRel(rel: number, s: Sizing, gap: number): number {
  const ar = Math.abs(rel)
  const c1 = s.activeHeight / 2 + gap + s.restHeight / 2
  const pitch = s.restHeight + gap
  const mag = ar <= 1 ? ar * c1 : c1 + (ar - 1) * pitch
  return (rel < 0 ? -1 : 1) * mag
}

function blendForRel(rel: number): number {
  return Math.min(Math.abs(rel), 1)
}

function Card<T>({
  item,
  index,
  pos,
  count,
  R,
  sizing,
  gap,
  radius,
  renderItem,
  onSelect,
  active,
}: {
  item: T
  index: number
  pos: MotionValue<number>
  count: number
  R: number
  sizing: Sizing
  gap: number
  radius: number
  renderItem: (item: T, index: number, isActive: boolean) => React.ReactNode
  onSelect: ((index: number) => void) | undefined
  active: boolean
}) {
  const y = useTransform(pos, (p: number) =>
    yForRel(relOf(index, p, count), sizing, gap)
  )
  const opacity = useTransform(pos, (p: number) => {
    const ar = Math.abs(relOf(index, p, count))
    return ar <= R ? 1 : ar >= R + 1 ? 0 : 1 - (ar - R)
  })
  const zIndex = useTransform(pos, (p: number) =>
    Math.round(1000 - Math.abs(relOf(index, p, count)) * 100)
  )
  const width = useTransform(pos, (p: number) => {
    const a = blendForRel(relOf(index, p, count))
    return sizing.activeWidth + (sizing.restWidth - sizing.activeWidth) * a
  })
  const height = useTransform(pos, (p: number) => {
    const a = blendForRel(relOf(index, p, count))
    return sizing.activeHeight + (sizing.restHeight - sizing.activeHeight) * a
  })
  const boxShadow = useTransform(pos, (p: number) =>
    Math.abs(relOf(index, p, count)) < 0.5
      ? "0 12px 30px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(255,255,255,0.06)"
      : "0 4px 12px rgba(0,0,0,0.05), inset 0 0 0 1px rgba(255,255,255,0.05)"
  )

  return (
    <motion.div
      onClick={onSelect ? () => onSelect(index) : undefined}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        y,
        zIndex,
        opacity,
        cursor: onSelect ? "pointer" : "default",
      }}
    >
      <motion.div
        style={{
          x: "-50%",
          y: "-50%",
          width,
          height,
          borderRadius: radius,
          overflow: "hidden",
          boxShadow,
        }}
      >
        {renderItem(item, index, active)}
      </motion.div>
    </motion.div>
  )
}

function ArrowButton({
  side,
  onClick,
  color,
  background,
  size,
}: {
  side: "up" | "down"
  onClick: () => void
  color: string
  background: string
  size: number
}) {
  const isUp = side === "up"
  return (
    <button
      type="button"
      aria-label={isUp ? "Previous" : "Next"}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      className="flex items-center justify-center border border-off-black/15 dark:border-white/15 shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
      style={{
        position: "absolute",
        left: "50%",
        [isUp ? "top" : "bottom"]: "12px",
        transform: "translateX(-50%)",
        width: size,
        height: size,
        borderRadius: "50%",
        background,
        color,
        cursor: "pointer",
        padding: 0,
        zIndex: 2000,
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <svg
        width={size * 0.4}
        height={size * 0.4}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ pointerEvents: "none" }}
      >
        {isUp ? (
          <polyline points="18 15 12 9 6 15" />
        ) : (
          <polyline points="6 9 12 15 18 9" />
        )}
      </svg>
    </button>
  )
}

export default function CoverflowCarousel<T>({
  items,
  renderItem,
  activeWidth = 320,
  activeHeight = 120,
  restWidth = 280,
  restHeight = 64,
  gap = 16,
  radius = 16,
  showArrows = true,
  arrowColor = "currentColor",
  arrowBackground = "rgba(255,255,255,0.8)",
  arrowSize = 36,
  autoplay = false,
  autoplayDirection = "rightToLeft",
  transition = {
    type: "tween",
    duration: 0.3,
    delay: 1,
    ease: "easeInOut",
  },
  style,
  activeIndex,
  onChangeActiveIndex,
}: Props<T>) {
  const prefersReducedMotion = useReducedMotion()
  const count = Math.max(1, items.length)

  const sizing: Sizing = useMemo(
    () => ({ restWidth, restHeight, activeWidth, activeHeight }),
    [restWidth, restHeight, activeWidth, activeHeight]
  )

  const moveDur = typeof transition?.duration === "number" ? transition.duration : 0.3
  const dwell = typeof transition?.delay === "number" ? Math.max(0, transition.delay) : 1.2

  const R = Math.max(1, Math.min(6, Math.floor(count / 2) - 1))

  const pos = useMotionValue(activeIndex)
  const targetRef = useRef(activeIndex)
  const rafRef = useRef<number | null>(null)
  const lastTRef = useRef<number | null>(null)

  const autoplayingRef = useRef(false)
  const dirRef = useRef(1)
  const dwellAccRef = useRef(0)
  const moveDurRef = useRef(moveDur)
  moveDurRef.current = moveDur
  const dwellRef = useRef(dwell)
  dwellRef.current = dwell
  const reducedRef = useRef(prefersReducedMotion)
  reducedRef.current = prefersReducedMotion

  const tick = useCallback(
    (t: number) => {
      const last = lastTRef.current ?? t
      const dt = Math.min((t - last) / 1000, 1 / 30)
      lastTRef.current = t

      const cur = pos.get()
      const diff = targetRef.current - cur
      const dur = Math.max(0.08, moveDurRef.current)
      const step = (1 / dur) * dt
      const arriving = reducedRef.current || Math.abs(diff) <= step

      if (arriving) {
        pos.set(targetRef.current)
        const wrapped = ((Math.round(targetRef.current) % count) + count) % count
        onChangeActiveIndex(wrapped)
        if (autoplayingRef.current) {
          dwellAccRef.current += dt
          if (dwellAccRef.current >= Math.max(0, dwellRef.current)) {
            dwellAccRef.current = 0
            targetRef.current += dirRef.current
          }
          rafRef.current = requestAnimationFrame(tick)
          return
        }
        rafRef.current = null
        lastTRef.current = null
        return
      }

      pos.set(cur + Math.sign(diff) * step)
      rafRef.current = requestAnimationFrame(tick)
    },
    [pos, count, onChangeActiveIndex]
  )

  const ensureRunning = useCallback(() => {
    if (rafRef.current == null) {
      lastTRef.current = null
      rafRef.current = requestAnimationFrame(tick)
    }
  }, [tick])

  // Synchronize activeIndex prop changes from parent
  useEffect(() => {
    const wrappedTarget = ((targetRef.current % count) + count) % count
    if (activeIndex !== wrappedTarget) {
      const cur = targetRef.current
      let d = activeIndex - wrappedTarget
      if (d > count / 2) d -= count
      if (d < -count / 2) d += count
      targetRef.current = cur + d
      ensureRunning()
    }
  }, [activeIndex, count, ensureRunning])

  const goNext = useCallback(() => {
    targetRef.current += 1
    ensureRunning()
  }, [ensureRunning])

  const goPrev = useCallback(() => {
    targetRef.current -= 1
    ensureRunning()
  }, [ensureRunning])

  const goTo = useCallback(
    (index: number) => {
      const cur = targetRef.current
      const wrapped = ((cur % count) + count) % count
      let d = index - wrapped
      if (d > count / 2) d -= count
      if (d < -count / 2) d += count
      targetRef.current = cur + d
      ensureRunning()
    },
    [ensureRunning, count]
  )

  // Keyboard navigation
  const isHoveredRef = useRef(false)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!isHoveredRef.current) return
      if (e.key === "ArrowUp") {
        e.preventDefault()
        goPrev()
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        goNext()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [goPrev, goNext])

  // Mouse wheel navigation
  const lastWheelTime = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const now = Date.now()
      if (now - lastWheelTime.current < 200) return
      lastWheelTime.current = now

      if (e.deltaY > 0) {
        goNext()
      } else if (e.deltaY < 0) {
        goPrev()
      }
    }

    container.addEventListener("wheel", handleWheel, { passive: false })
    return () => container.removeEventListener("wheel", handleWheel)
  }, [goNext, goPrev])

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [])

  // Autoplay
  useEffect(() => {
    const on = autoplay && count > 1
    autoplayingRef.current = on
    if (on) {
      dirRef.current = autoplayDirection === "leftToRight" ? -1 : 1
      dwellAccRef.current = 0
      ensureRunning()
    }
    return () => {
      autoplayingRef.current = false
    }
  }, [autoplay, autoplayDirection, count, ensureRunning])

  const containerStyle: React.CSSProperties = {
    ...style,
    position: "relative",
    width: "100%",
    height: "100%",
    minHeight: 240,
    overflow: "hidden",
    userSelect: "none",
    outline: "none",
  }

  const cards = items.map((item, i) => {
    const active = activeIndex === i
    return (
      <Card
        key={i}
        item={item}
        index={i}
        pos={pos}
        count={count}
        R={R}
        sizing={sizing}
        gap={gap}
        radius={radius}
        renderItem={renderItem}
        onSelect={goTo}
        active={active}
      />
    )
  })

  const arrows = showArrows && count > 1 && (
    <>
      <ArrowButton side="up" onClick={goPrev} color={arrowColor} background={arrowBackground} size={arrowSize} />
      <ArrowButton side="down" onClick={goNext} color={arrowColor} background={arrowBackground} size={arrowSize} />
    </>
  )

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onMouseEnter={() => {
        isHoveredRef.current = true
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false
      }}
      onFocus={() => {
        isHoveredRef.current = true
      }}
      onBlur={() => {
        isHoveredRef.current = false
      }}
      style={containerStyle}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          isolation: "isolate",
          zIndex: 0,
        }}
      >
        {cards}
      </div>
      {arrows}
    </div>
  )
}
