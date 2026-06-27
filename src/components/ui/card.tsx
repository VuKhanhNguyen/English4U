import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardVariants = cva("w-full transition-all duration-200 font-mono", {
  variants: {
    variant: {
      content: "bg-paper-canvas border border-off-black rounded-lg p-10 transition-all duration-300",
      shadowed: "bg-paper-canvas border border-off-black rounded-lg p-10 shadow-md transition-all duration-300",
      feature: "bg-atmosphere-wash border border-off-black rounded-lg p-10 transition-all duration-300",
      subtle: "bg-transparent p-0 rounded-none",
      saffron: "bg-honey-dew-gradient border border-off-black rounded-lg p-10 text-ink shadow-sm hover:shadow-md transition-all duration-300",
      lavender: "bg-sky-breeze-gradient border border-off-black rounded-lg p-10 text-ink shadow-sm hover:shadow-md transition-all duration-300",
      mint: "bg-sky-mint-gradient border border-off-black rounded-lg p-10 text-ink shadow-sm hover:shadow-md transition-all duration-300",
      pink: "bg-sunset-violet-gradient border border-off-black rounded-lg p-10 text-ink shadow-sm hover:shadow-md transition-all duration-300",
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
      <div
        ref={ref}
        className={cn(cardVariants({ variant, className }))}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

export { Card, cardVariants }

