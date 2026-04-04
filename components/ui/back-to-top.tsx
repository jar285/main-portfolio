"use client";

import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { ChevronUpIcon } from "@/components/ui/icons";
import { useReducedMotion } from "@/lib/motion";

const SCROLL_THRESHOLD = 400;

export function BackToTop() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsVisible(latest > SCROLL_THRESHOLD);
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/80 text-foreground shadow-lg backdrop-blur-md transition-colors hover:border-accent/40 hover:bg-surface hover:text-accent md:h-12 md:w-12"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          aria-label="Back to top"
        >
          <ChevronUpIcon size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
