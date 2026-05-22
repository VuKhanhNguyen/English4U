import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardVariants = cva("w-full transition-all duration-200 font-mono", {
  variants: {
    variant: {
      content: "bg-paper-canvas border border-off-black rounded-[40px] p-10",
      shadowed: "bg-paper-canvas border border-off-black rounded-[40px] p-10 shadow-md",
      feature: "bg-atmosphere-wash border border-off-black rounded-[40px] p-10",
      subtle: "bg-transparent p-0 rounded-none",
      saffron: "bg-atmosphere-wash border border-off-black rounded-[40px] p-10",
      lavender: "bg-atmosphere-wash border border-off-black rounded-[40px] p-10",
      mint: "bg-atmosphere-wash border border-off-black rounded-[40px] p-10",
      pink: "bg-atmosphere-wash border border-off-black rounded-[40px] p-10",
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

