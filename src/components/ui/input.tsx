"use client";

import React, { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      label,
      helperText,
      error,
      success,
      leftIcon,
      rightIcon,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
    const isPassword = type === "password";
    const computedType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className="w-full space-y-1.5 font-sans">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-medium text-[#222624] tracking-wide uppercase opacity-85"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-[#3E4542]">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            type={computedType}
            disabled={disabled}
            className={cn(
              "w-full h-11 px-4 text-sm bg-[#FAF8F4] text-[#222624] placeholder-[#3E4542]/50 border rounded-lg transition-all duration-200 outline-none",
              "border-[#222624]/15 hover:border-[#222624]/30 focus:border-[#183C32] focus:ring-1 focus:ring-[#183C32]",
              leftIcon && "pl-10",
              (rightIcon || isPassword || error || success) && "pr-10",
              error && "border-[#ED805A] focus:border-[#ED805A] focus:ring-[#ED805A]/30 bg-[#FDF1EC]/40",
              success && "border-[#46C5B0] focus:border-[#46C5B0] focus:ring-[#46C5B0]/30",
              disabled && "opacity-50 cursor-not-allowed bg-[#ECE6D8]/50",
              className
            )}
            {...props}
          />
          <div className="absolute right-3.5 flex items-center gap-1.5 text-[#3E4542]">
            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1 rounded hover:text-[#183C32] transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            )}
            {error && !isPassword && <AlertCircle className="w-4 h-4 text-[#ED805A]" />}
            {success && !isPassword && <CheckCircle2 className="w-4 h-4 text-[#1A8A7A]" />}
            {rightIcon && !error && !success && !isPassword && rightIcon}
          </div>
        </div>
        {error && (
          <p className="text-xs text-[#ED805A] font-medium tracking-tight flex items-center gap-1">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p className="text-xs text-[#3E4542]/80 leading-normal">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
