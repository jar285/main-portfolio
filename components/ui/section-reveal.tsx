"use client";

import { motion } from "motion/react";
import { fadeUp, useReducedMotion } from "@/lib/motion";
import { ReactNode, useState, useEffect } from "react";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Higher-order component for scroll-triggered section entrances.
 * Uses useInView implicitly via whileInView to trigger fade-up.
 */
export function SectionReveal({
  children,
  className,
  delay = 0,
}: SectionRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isFallbackVisible, setIsFallbackVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsFallbackVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className={className}
      variants={prefersReducedMotion ? undefined : fadeUp}
      initial={prefersReducedMotion ? undefined : "hidden"}
      whileInView={prefersReducedMotion ? undefined : "visible"}
      animate={isFallbackVisible ? "visible" : undefined}
      viewport={{ once: true, amount: 0.2 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { delay, type: "spring", stiffness: 100, damping: 20 }
      }
    >
      {children}
    </motion.div>
  );
}
