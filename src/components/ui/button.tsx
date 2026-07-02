import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-abc-diatype-mono font-normal transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-off-black disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "border-3d shadow-3d-btn press-active bg-off-black text-paper-canvas hover:bg-ink hover:text-paper-canvas font-bold",
        default: "border-3d shadow-3d-btn press-active bg-primary text-primary-foreground font-bold hover:bg-primary/90",
        destructive:
          "border-3d shadow-3d-btn press-active bg-destructive text-destructive-foreground font-bold hover:bg-destructive/90",
        outline:
          "border-3d shadow-3d-btn press-active bg-background text-ink font-bold hover:bg-accent hover:text-accent-foreground",
        secondary:
          "border-3d shadow-3d-btn press-active bg-secondary text-secondary-foreground font-bold hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        primary: "p-4 rounded-lg",
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "primary",
    },
  },
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
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
