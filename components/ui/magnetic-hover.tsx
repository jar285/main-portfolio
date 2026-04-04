"use client";

import { useRef, useState, useEffect, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useReducedMotion } from "@/lib/motion";

interface MagneticHoverProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export function MagneticHover({
  children,
  strength = 0.25,
  className = "",
}: MagneticHoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isPointerFine, setIsPointerFine] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Mouse position values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for the pull and snap back
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  useEffect(() => {
    // Only enable magnetic hover on devices with fine pointer (mice)
    const mediaQuery = window.matchMedia("(pointer: fine)");

    requestAnimationFrame(() => setIsPointerFine(mediaQuery.matches));

    const handler = (e: MediaQueryListEvent) => setIsPointerFine(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPointerFine || prefersReducedMotion || !ref.current) return;

    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    x.set((clientX - centerX) * strength);
    y.set((clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    if (!isPointerFine || prefersReducedMotion) return;
    x.set(0);
    y.set(0);
  };

  // If reduced motion or touch device, return a static div wrapper to maintain layout but drop the physics
  if (prefersReducedMotion || !isPointerFine) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
