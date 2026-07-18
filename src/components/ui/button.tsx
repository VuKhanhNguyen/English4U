import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-sans font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer active:scale-98 active:duration-75",
  {
    variants: {
      variant: {
        primary:
          "bg-blue-600 text-white hover:bg-blue-700 border border-transparent shadow-[0_4px_12px_rgba(37,99,235,0.15)] hover:shadow-[0_6px_16px_rgba(37,99,235,0.25)]",
        default: "bg-blue-600 text-white hover:bg-blue-700 border border-transparent shadow-sm",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 border border-transparent",
        outline:
          "border border-zinc-200 dark:border-zinc-800 bg-transparent text-ink hover:bg-zinc-50 dark:hover:bg-zinc-900/50",
        secondary:
          "bg-zinc-100 dark:bg-zinc-800/85 text-ink hover:bg-zinc-200 dark:hover:bg-zinc-700",
        ghost: "hover:bg-zinc-100 dark:hover:bg-zinc-900 text-ink",
        link: "text-blue-600 dark:text-blue-400 underline-offset-4 hover:underline",
      },
      size: {
        primary: "h-12 px-8 rounded-full text-base",
        default: "h-10 px-6 rounded-full text-sm",
        sm: "h-9 rounded-full px-4 text-xs",
        lg: "h-12 rounded-full px-8 text-base",
        icon: "h-10 w-10 rounded-full",
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
