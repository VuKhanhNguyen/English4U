import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {}

function Badge({ className, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-charcoal-border bg-canvas-white px-3.5 py-1.5 text-xs font-semibold text-midnight-ink transition-colors focus:outline-none focus:ring-2 focus:ring-charcoal-border focus:ring-offset-2",
        className
      )}
      {...props}
    />
  )
}

export { Badge }
