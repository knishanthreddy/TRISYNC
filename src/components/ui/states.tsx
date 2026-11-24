import React from "react";
import { cn } from "@/lib/utils";
import { Loader2, Inbox, AlertTriangle, CheckCircle2, RefreshCw } from "lucide-react";
import { Button } from "./button";

interface StateBaseProps {
  className?: string;
  title: string;
  description?: string;
}

export const LoadingState: React.FC<
  StateBaseProps & { label?: string; size?: "sm" | "md" | "lg" }
> = ({ title, description, size = "md", className }) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl bg-[#FAF8F4]/60 border border-[#183C32]/6",
        className
      )}
    >
      <div className="relative flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-[#183C32]/5">
        <Loader2 className="w-6 h-6 animate-spin text-[#183C32]" />
      </div>
      <h5 className="text-base font-medium text-[#222624] tracking-tight">{title}</h5>
      {description && (
        <p className="mt-1 text-sm text-[#3E4542]/70 max-w-sm leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};

export const EmptyState: React.FC<
  StateBaseProps & {
    actionLabel?: string;
    onAction?: () => void;
    icon?: React.ReactNode;
  }
> = ({ title, description, actionLabel, onAction, icon, className }) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl bg-[#FAF8F4] border border-dashed border-[#222624]/15",
        className
      )}
    >
      <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-[#ECE6D8] text-[#3E4542]">
        {icon || <Inbox className="w-5 h-5" />}
      </div>
      <h5 className="text-base font-medium text-[#222624] tracking-tight">{title}</h5>
      {description && (
        <p className="mt-1 text-sm text-[#3E4542]/75 max-w-sm leading-relaxed">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <div className="mt-5">
          <Button variant="secondary" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
};

export const ErrorState: React.FC<
  StateBaseProps & {
    onRetry?: () => void;
    retryLabel?: string;
  }
> = ({ title, description, onRetry, retryLabel = "Try Again", className }) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl bg-[#FDF1EC]/40 border border-[#ED805A]/25",
        className
      )}
    >
      <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-[#ED805A]/15 text-[#ED805A]">
        <AlertTriangle className="w-5 h-5" />
      </div>
      <h5 className="text-base font-medium text-[#222624] tracking-tight">{title}</h5>
      {description && (
        <p className="mt-1 text-sm text-[#3E4542]/75 max-w-sm leading-relaxed">
          {description}
        </p>
      )}
      {onRetry && (
        <div className="mt-5">
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            {retryLabel}
          </Button>
        </div>
      )}
    </div>
  );
};

export const SuccessState: React.FC<
  StateBaseProps & {
    actionLabel?: string;
    onAction?: () => void;
  }
> = ({ title, description, actionLabel, onAction, className }) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl bg-[#E3FAF5]/30 border border-[#46C5B0]/25",
        className
      )}
    >
      <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-[#46C5B0]/15 text-[#1A8A7A]">
        <CheckCircle2 className="w-5 h-5" />
      </div>
      <h5 className="text-base font-medium text-[#222624] tracking-tight">{title}</h5>
      {description && (
        <p className="mt-1 text-sm text-[#3E4542]/75 max-w-sm leading-relaxed">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <div className="mt-5">
          <Button variant="primary" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
};
