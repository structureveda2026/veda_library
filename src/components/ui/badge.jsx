import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils.js";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        // Master Yellow Brand Identity
        default:
          "border-transparent bg-[#FFD21F] text-[#111111] shadow-2xs hover:bg-[#D9A441]",
        primary:
          "border-transparent bg-[#FFD21F] text-[#111111] shadow-2xs hover:bg-[#D9A441]",
        // Secondary Black & Yellow
        secondary:
          "border-transparent bg-[#111111] text-[#FFD21F] shadow-2xs hover:text-[#D9A441]",
        // Clean Minimal Outline
        outline:
          "text-[#111111] border-[#E5E5E5] bg-[#FFFFFF] hover:border-[#D9A441]",
        // Spiritual Sacred Red
        destructive:
          "border-transparent bg-[#C62828] text-white shadow-2xs hover:bg-[#A71D1D]",
        spiritual:
          "border-transparent bg-[#C62828] text-white shadow-2xs hover:bg-[#A71D1D]",
        // Canonical status
        verified:
          "border-emerald-200 bg-emerald-50 text-emerald-800",
        approved:
          "border-emerald-200 bg-emerald-50 text-emerald-800",
        review:
          "border-[#FFD21F] bg-[#FFD21F]/20 text-[#111111]",
        // Premium Sacred Gold
        sacred:
          "border-[#D9A441]/40 bg-[#D9A441]/12 text-[#111111] font-bold",
        premium:
          "border-[#D9A441]/50 bg-[#D9A441]/15 text-[#111111] font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
