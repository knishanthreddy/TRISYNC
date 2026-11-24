import React from "react";
import { cn } from "@/lib/utils";
import { DIMENSIONS, DimensionKey } from "@/lib/constants";
import { Activity, Brain, Sparkles, Compass } from "lucide-react";

interface DimensionPillProps {
  dimension: DimensionKey;
  size?: "sm" | "md";
  showIcon?: boolean;
  className?: string;
  subtle?: boolean;
}

const iconMap = {
  physical: Activity,
  mental: Brain,
  digital: Sparkles,
  unified: Compass,
};

export const DimensionPill: React.FC<DimensionPillProps> = ({
  dimension,
  size = "md",
  showIcon = true,
  className,
  subtle = false,
}) => {
  const meta = DIMENSIONS[dimension];
  const Icon = iconMap[dimension];

  const sizeClasses = {
    sm: "text-[11px] px-2 py-0.5 gap-1 font-medium tracking-wide rounded-md",
    md: "text-xs px-2.5 py-1 gap-1.5 font-medium tracking-wide rounded-lg",
  };

  const subtleClasses = {
    physical: "bg-[#183C32]/8 text-[#183C32] border border-[#183C32]/15",
    mental: "bg-[#B9A5DF]/20 text-[#603E99] border border-[#B9A5DF]/35",
    digital: "bg-[#46C5B0]/15 text-[#0F685B] border border-[#46C5B0]/30",
    unified: "bg-[#222624]/6 text-[#222624] border border-[#222624]/12",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center uppercase tracking-wider transition-colors",
        sizeClasses[size],
        subtle ? subtleClasses[dimension] : meta.pillClasses,
        className
      )}
    >
      {showIcon && <Icon className={size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5"} />}
      <span>{meta.label.replace(" Wellbeing", "")}</span>
    </span>
  );
};
