import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardVariants = cva("w-full transition-all duration-200", {
  variants: {
    variant: {
      content: "bg-canvas-white border border-charcoal-border rounded-lg p-6", // 8px radius, 24px padding
      shadowed: "bg-canvas-white shadow-[1px_1px_0px_0px_rgb(10,10,13)] border border-charcoal-border rounded p-[18px]", // 4px radius, 18px padding
      feature: "bg-highlight-yellow rounded-lg py-4 px-6", // 8px radius, 16px vert, 24px horiz
      subtle: "bg-transparent py-0 px-8", // 0px radius, 0px vert, 32px horiz
      saffron: "bg-card-saffron border border-charcoal-border rounded-lg p-6",
      lavender: "bg-card-lavender border border-charcoal-border rounded-lg p-6",
      mint: "bg-card-mint border border-charcoal-border rounded-lg p-6",
      pink: "bg-card-pink border border-charcoal-border rounded-lg p-6",
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
  ({ className, variant, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(cardVariants({ variant, className }))} {...props} />
    )
  }
)
Card.displayName = "Card"

export { Card, cardVariants }
