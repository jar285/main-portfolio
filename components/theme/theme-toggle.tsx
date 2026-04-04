"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SunIcon, MoonIcon } from "@/components/ui/icons";
import { useTheme } from "./theme-provider";
import { cn } from "@/lib/utils";

/**
 * Interactive Sun/Moon toggle with staggered motion transitions.
 * Uses the ThemeProvider context and handles hydration safety.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering icons after mount
  useEffect(() => {
    setMounted(true); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "h-10 w-10 shrink-0 rounded-md border border-border",
          className
        )}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "relative h-10 w-10 shrink-0 overflow-hidden rounded-md border border-border bg-background ring-offset-background transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        className
      )}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.div
            key="moon"
            initial={{ y: 20, opacity: 0, rotate: 45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: -45 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="flex h-full w-full items-center justify-center text-accent"
          >
            <MoonIcon size={20} />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ y: 20, opacity: 0, rotate: -45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: 45 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="flex h-full w-full items-center justify-center text-accent"
          >
            <SunIcon size={20} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
