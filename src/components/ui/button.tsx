import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-charcoal-border disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-accent-green text-midnight-ink border border-charcoal-border shadow-subtle hover:shadow-subtle-2 active:shadow-subtle-3",
        ghost:
          "bg-canvas-white text-midnight-ink border border-charcoal-border shadow-subtle hover:shadow-subtle-2 active:shadow-subtle-3",
        link: "text-midnight-ink border-b border-transparent hover:border-charcoal-border rounded-none",
      },
      size: {
        primary: "h-[44px] px-6 rounded-md", // 12px vertical roughly, 24px horiz
        ghost: "h-[36px] px-4 rounded-md", // 8px vertical roughly, 16px horiz
        link: "py-1 px-0", // 2px top, 4px bottom approx
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "primary",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
