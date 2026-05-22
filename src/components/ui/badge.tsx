import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {}

function Badge({ className, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-off-black bg-transparent px-3 py-1 text-xs font-mono font-medium text-ink transition-colors focus:outline-none focus:ring-2 focus:ring-off-black focus:ring-offset-2",
        className
      )}
      {...props}
    />
  )
}

export { Badge }
