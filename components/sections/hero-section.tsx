"use client";

import { motion } from "motion/react";
import { siteConfig } from "@/lib/constants";
import { useReducedMotion } from "@/lib/motion";
import { MagneticHover } from "@/components/ui/magnetic-hover";

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  // Sequential line-reveal variants for editorial pacing
  const lineReveal = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 20,
        mass: 1,
      },
    },
  } as const;

  const containerStagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  } as const;

  return (
    <section
      id="home"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-x-clip px-4 pt-12 md:pt-16"
    >
      {/* Atmospheric background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 30%, hsl(var(--accent) / 0.03) 0%, transparent 70%)",
        }}
      />
      {!prefersReducedMotion && (
        <div
          className="pointer-events-none absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 animate-blob rounded-full bg-accent/5 opacity-40 blur-[100px]"
          aria-hidden="true"
        />
      )}

      {/* Line-by-line staggered reveal container */}
      <motion.div
        className="relative z-10 flex max-w-2xl flex-col items-center text-center"
        variants={prefersReducedMotion ? undefined : containerStagger}
        initial={false}
        animate={prefersReducedMotion ? undefined : "visible"}
      >
        <motion.span
          className="mb-4 font-mono text-sm text-accent"
          variants={prefersReducedMotion ? undefined : lineReveal}
        >
          {siteConfig.role}
        </motion.span>

        <motion.h1
          className="font-display text-display-1 md:text-6xl md:tracking-tight"
          variants={prefersReducedMotion ? undefined : lineReveal}
        >
          {siteConfig.name}
        </motion.h1>

        <motion.p
          className="mt-4 max-w-md text-lg text-muted-foreground md:text-xl"
          variants={prefersReducedMotion ? undefined : lineReveal}
        >
          {siteConfig.tagline}
        </motion.p>

        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-6"
          variants={prefersReducedMotion ? undefined : lineReveal}
        >
          <MagneticHover strength={0.15}>
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-[4px] bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              View Projects
            </a>
          </MagneticHover>

          <MagneticHover strength={0.15}>
            <div className="group relative inline-flex overflow-hidden rounded-md p-[2px]">
              {/* Spinning Orange Neon Element */}
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,hsl(var(--accent))_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <a
                href="/Resume-Updated-2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 inline-flex items-center justify-center rounded-[4px] border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 group-hover:border-transparent group-hover:bg-surface"
              >
                View Resume
              </a>
            </div>
          </MagneticHover>
        </motion.div>
      </motion.div>
    </section>
  );
}
