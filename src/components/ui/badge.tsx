import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "info" | "neutral";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}) => {
  const variantStyles = {
    default: "bg-[#183C32]/10 text-[#183C32] border-[#183C32]/15",
    success: "bg-[#46C5B0]/15 text-[#136B5E] border-[#46C5B0]/30",
    warning: "bg-[#ED805A]/15 text-[#9E4525] border-[#ED805A]/30",
    info: "bg-[#B9A5DF]/20 text-[#59398E] border-[#B9A5DF]/35",
    neutral: "bg-[#222624]/6 text-[#3E4542] border-[#222624]/10",
  };

  const sizeStyles = {
    sm: "text-[10px] px-2 py-0.5 rounded-full font-medium tracking-wide uppercase",
    md: "text-xs px-2.5 py-0.5 rounded-full font-medium tracking-normal",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center border transition-colors",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
