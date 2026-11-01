import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils.js";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD21F] disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
  {
    variants: {
      variant: {
        // Master Brand Identity Primary CTA
        default:
          "bg-[#FFD21F] text-[#111111] font-semibold shadow-2xs hover:bg-[#D9A441] active:scale-[0.98]",
        primary:
          "bg-[#FFD21F] text-[#111111] font-semibold shadow-2xs hover:bg-[#D9A441] active:scale-[0.98]",
        // Secondary contrast button
        secondary:
          "bg-[#111111] text-[#FFD21F] font-medium shadow-2xs hover:bg-black hover:text-[#D9A441] active:scale-[0.98]",
        // Spiritual sacred actions
        spiritual:
          "bg-[#C62828] text-[#FFFFFF] font-medium shadow-2xs hover:bg-[#A71D1D] active:scale-[0.98]",
        sacred:
          "bg-[#C62828] text-[#FFFFFF] font-medium shadow-2xs hover:bg-[#A71D1D] active:scale-[0.98]",
        // Sacred & premium highlight
        premium:
          "bg-[#D9A441] text-[#111111] font-semibold shadow-2xs hover:bg-[#C28E2E] active:scale-[0.98]",
        outline:
          "border border-[#E5E5E5] bg-[#FFFFFF] text-[#111111] hover:border-[#D9A441] hover:bg-[#FFFDF5] shadow-2xs active:scale-[0.98]",
        ghost:
          "text-[#111111] hover:bg-[#FFD21F]/15 hover:text-[#111111] active:scale-[0.98]",
        destructive:
          "bg-[#C62828] text-white shadow-2xs hover:bg-[#A71D1D] active:scale-[0.98]",
        link:
          "text-[#111111] underline-offset-4 hover:underline hover:text-[#D9A441]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-xl px-6 text-base font-semibold",
        pill: "h-10 rounded-full px-5 text-sm",
        icon: "h-9 w-9 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
