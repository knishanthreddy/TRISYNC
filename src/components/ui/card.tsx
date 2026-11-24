import React from "react";
import { cn } from "@/lib/utils";
import { DimensionKey, DIMENSIONS } from "@/lib/constants";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "flat" | "elevated" | "interactive";
  dimension?: DimensionKey;
  headerBorder?: boolean;
}

export const Card: React.FC<CardProps> = ({
  className,
  variant = "default",
  dimension,
  children,
  ...props
}) => {
  const variantStyles = {
    default: "bg-[#FAF8F4] border border-[#183C32]/8 rounded-2xl shadow-subtle",
    flat: "bg-transparent border-0 rounded-none shadow-none",
    elevated: "bg-white border border-[#222624]/6 rounded-2xl shadow-soft",
    interactive:
      "bg-[#FAF8F4] border border-[#183C32]/10 rounded-2xl shadow-subtle hover:border-[#183C32]/25 hover:shadow-soft transition-all duration-200 cursor-pointer",
  };

  const dimensionStyles = dimension
    ? {
        borderColor: DIMENSIONS[dimension].borderColor,
      }
    : undefined;

  return (
    <div
      style={dimensionStyles}
      className={cn("p-6 sm:p-7 relative overflow-hidden", variantStyles[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div className={cn("flex flex-col space-y-1.5 pb-4", className)} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  children,
  ...props
}) => (
  <h4
    className={cn(
      "text-lg font-medium tracking-tight text-[#222624]",
      className
    )}
    {...props}
  >
    {children}
  </h4>
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  children,
  ...props
}) => (
  <p className={cn("text-sm text-[#3E4542]/80 leading-relaxed", className)} {...props}>
    {children}
  </p>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => <div className={cn("pt-2", className)} {...props}>{children}</div>;
