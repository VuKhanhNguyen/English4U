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
          "bg-off-black text-paper-canvas hover:bg-ink hover:text-paper-canvas border border-transparent shadow-md active:opacity-90",
        ghost:
          "bg-transparent text-off-black border border-off-black hover:bg-off-black/5 active:bg-off-black/10",
        link: "text-ink border-b border-transparent hover:border-off-black rounded-none",
      },
      size: {
        primary: "p-4 rounded-full",
        ghost: "p-4 rounded-full",
        link: "py-1 px-1",
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
