"use client";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/motion";

interface StatusIndicatorProps {
  className?: string;
  showText?: boolean;
}

export function StatusIndicator({
  className,
  showText = true,
}: StatusIndicatorProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={cn("flex items-center gap-2.5", className)}
      aria-label="Current status: Building AI-powered tools"
    >
      <div className="relative flex h-2 w-2">
        {!prefersReducedMotion && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
        )}
        <span
          className={cn(
            "relative inline-flex h-2 w-2 rounded-full bg-success",
            !prefersReducedMotion && "animate-pulse"
          )}
        />
      </div>
      {showText && (
        <span className="text-[11px] font-medium tracking-tight text-muted-foreground/80">
          Building AI-powered tools
        </span>
      )}
    </div>
  );
}
