/**
 * Motion (Framer Motion) animation primitives.
 *
 * Design-system-tuned spring physics, stagger presets, and variant
 * library. Components import from here to maintain a single source
 * of truth for animation behavior.
 *
 * Strategy pattern: Components choose between Motion (this file) and
 * GSAP (lib/gsap.ts) based on animation complexity requirements.
 */

import type { Variants, Transition } from "motion/react";
export { useReducedMotion } from "motion/react";

/** Default spring transition — soft, organic feel */
export const springTransition: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 0.5,
};

/** Snappy spring for interactive feedback (buttons, toggles) */
export const snapTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

/** Reduced motion fallback — instant transitions */
export const reducedMotionTransition: Transition = {
  duration: 0,
};

/** Fade-in variant for component enter animations */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: springTransition,
  },
};

/** Fade-up variant for staggered section reveals */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springTransition,
  },
};

/** Fade-down variant for top-anchored reveals */
export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springTransition,
  },
};

/** Scale-in variant for emphasis reveals */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springTransition,
  },
};

/** Slide-in from left */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: springTransition,
  },
};

/** Slide-in from right */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: springTransition,
  },
};

/** Stagger container — fast cadence for tight groups */
export const staggerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

/** Stagger container — slow cadence for editorial pacing */
export const staggerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

/** Bundled motion config for convenient imports */
export const motionConfig = {
  variants: {
    fadeIn,
    fadeUp,
    fadeDown,
    scaleIn,
    slideInLeft,
    slideInRight,
  },
  containers: {
    staggerFast,
    staggerSlow,
  },
  transitions: {
    spring: springTransition,
    snap: snapTransition,
    reducedMotion: reducedMotionTransition,
  },
} as const;
