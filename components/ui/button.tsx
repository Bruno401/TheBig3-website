"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-body-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-brand-purple text-white hover:bg-brand-ink",
        destructive:
          "bg-red-500 text-white hover:bg-red-600",
        outline:
          "border border-brand-border bg-transparent text-brand-ink hover:bg-brand-lavender",
        secondary:
          "bg-brand-lavender text-brand-purple hover:bg-brand-border",
        ghost:
          "text-brand-ink hover:bg-brand-lavender hover:text-brand-purple",
        link:
          "text-brand-purple underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-body-sm",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, onClick, onMouseEnter, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      try {
        if (typeof window !== "undefined") {
          const audio = new Audio("/audio/click.mp3")
          audio.volume = 0.4
          audio.play().catch(() => {})
        }
      } catch (err) {}
      
      if (onClick) onClick(e)
    }

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      try {
        if (typeof window !== "undefined") {
          const audio = new Audio("/audio/pop.mp3")
          audio.volume = 0.4
          audio.play().catch(() => {})
        }
      } catch (err) {}
      
      if (onMouseEnter) onMouseEnter(e)
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
