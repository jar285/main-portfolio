import { cn } from "@/lib/utils";

/**
 * Shared placeholder component for dynamically loaded sections.
 * Matches the vertical height and background structure of section headers
 * to prevent Cumulative Layout Shift (CLS).
 */
export function SectionSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "section-padding min-h-[400px] w-full bg-surface/30",
        className
      )}
      aria-hidden="true"
    >
      <div className="section-container">
        {/* Placeholder for heading */}
        <div className="mx-auto h-12 w-64 animate-pulse rounded-lg bg-border/40" />
        {/* Placeholder for description */}
        <div className="mx-auto mt-4 h-4 w-48 animate-pulse rounded-lg bg-border/20" />
      </div>
    </div>
  );
}
