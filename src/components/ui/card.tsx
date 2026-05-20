"use client";

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import ElectricBorder from "@/components/ElectricBorder"

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
    VariantProps<typeof cardVariants> {
  electric?: boolean | 'hover' | 'always';
  electricColor?: string;
  electricSpeed?: number;
}

const getElectricColor = (variant: string | null | undefined, customColor?: string) => {
  if (customColor) return customColor;
  switch (variant) {
    case "saffron":
      return "#fbbf25";
    case "lavender":
      return "#d946ef";
    case "mint":
      return "#10b981";
    case "pink":
      return "#ec4899";
    case "feature":
      return "#fbbf25";
    default:
      return "#a3e635"; // Brand accent green
  }
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, electric = 'hover', electricColor, electricSpeed, ...props }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const shouldShowElectric = electric === 'always' || electric === true || (electric === 'hover' && isHovered);

    let borderRadius = 8;
    if (variant === 'shadowed') {
      borderRadius = 4;
    } else if (variant === 'subtle') {
      borderRadius = 0;
    }

    const colorToUse = getElectricColor(variant, electricColor);

    return (
      <div
        ref={ref}
        className={cn("relative", cardVariants({ variant, className }))}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {props.children}
        {shouldShowElectric && (
          <ElectricBorder
            color={colorToUse}
            speed={electricSpeed}
            borderRadius={borderRadius}
            className="absolute inset-0 pointer-events-none"
          />
        )}
      </div>
    )
  }
)
Card.displayName = "Card"

export { Card, cardVariants }
