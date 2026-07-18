import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardVariants = cva("w-full transition-all duration-200 font-sans", {
  variants: {
    variant: {
      content: "liquid-glass border-3d shadow-3d-card rounded-[24px] p-10 transition-all duration-300",
      shadowed: "liquid-glass border-3d shadow-3d-card rounded-[24px] p-10 transition-all duration-300",
      feature: "liquid-glass border-3d shadow-3d-card rounded-[24px] p-10 transition-all duration-300",
      subtle: "bg-transparent p-0 rounded-none",
      saffron: "liquid-glass border-3d shadow-3d-card bg-honey-dew-glass-gradient rounded-[24px] p-10 text-ink transition-all duration-300",
      lavender: "liquid-glass border-3d shadow-3d-card bg-sky-breeze-glass-gradient rounded-[24px] p-10 text-ink transition-all duration-300",
      mint: "liquid-glass border-3d shadow-3d-card bg-sky-breeze-glass-gradient rounded-[24px] p-10 text-ink transition-all duration-300",
      pink: "liquid-glass border-3d shadow-3d-card bg-sunset-violet-glass-gradient rounded-[24px] p-10 text-ink transition-all duration-300",
    },
  },
  defaultVariants: {
    variant: "content",
  },
})

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, children, ...props }, ref) => {
    const isGlass = variant !== "subtle";
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, className }))}
        {...props}
      >
        {isGlass && <div className="liquid-glass-bg" />}
        {children}
      </div>
    )
  }
)
Card.displayName = "Card"

export { Card, cardVariants }

