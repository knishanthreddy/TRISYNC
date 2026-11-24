"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "physical"
    | "mental"
    | "digital";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const sizeStyles = {
      sm: "h-9 px-3.5 text-xs tracking-wide rounded-md gap-1.5",
      md: "h-11 px-5 text-sm tracking-wide rounded-lg gap-2",
      lg: "h-13 px-7 text-base tracking-wide rounded-xl gap-2.5 font-medium",
    };

    const variantStyles = {
      primary:
        "bg-[#183C32] text-[#F5F1E8] hover:bg-[#112C25] active:scale-[0.99] shadow-subtle hover:shadow-soft transition-all duration-200 border border-[#183C32]/30",
      secondary:
        "bg-[#FAF8F4] text-[#222624] hover:bg-[#ECE6D8] border border-[#222624]/10 active:scale-[0.99] transition-all duration-200",
      outline:
        "bg-transparent text-[#222624] border border-[#222624]/20 hover:border-[#183C32] hover:bg-[#183C32]/5 active:scale-[0.99] transition-all duration-200",
      ghost:
        "bg-transparent text-[#222624] hover:bg-[#183C32]/5 active:scale-[0.99] transition-all duration-200",
      physical:
        "bg-[#183C32] text-[#F5F1E8] hover:bg-[#255346] border border-[#A9B9A4]/30 shadow-subtle transition-all duration-200",
      mental:
        "bg-[#7B59BA] text-white hover:bg-[#6846A6] border border-[#B9A5DF]/40 shadow-subtle transition-all duration-200",
      digital:
        "bg-[#1A8A7A] text-white hover:bg-[#157265] border border-[#46C5B0]/40 shadow-subtle transition-all duration-200",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center font-sans select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183C32] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F1E8] disabled:opacity-50 disabled:pointer-events-none transition-all",
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : (
          leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
