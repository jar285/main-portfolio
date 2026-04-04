"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { XIcon } from "@/components/ui/icons";
import { navLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { fadeUp, staggerFast, useReducedMotion } from "@/lib/motion";
import { StatusIndicator } from "@/components/ui/status-indicator";

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
}

export function MobileMenu({
  isOpen,
  onClose,
  activeSection,
}: MobileMenuProps) {
  const prefersReducedMotion = useReducedMotion();
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && firstLinkRef.current) {
      firstLinkRef.current.focus();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col bg-surface md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={
            prefersReducedMotion ? { duration: 0 } : { duration: 0.2 }
          }
        >
          <div className="flex items-center justify-end px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Close menu"
            >
              <XIcon size={24} />
            </button>
          </div>

          <motion.nav
            className="flex flex-1 flex-col items-center justify-center gap-8"
            variants={prefersReducedMotion ? undefined : staggerFast}
            initial="hidden"
            animate="visible"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link, index) => {
              const isActive = `#${activeSection}` === link.href;
              return (
                <motion.a
                  key={link.href}
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={link.href}
                  onClick={onClose}
                  variants={prefersReducedMotion ? undefined : fadeUp}
                  className={cn(
                    "font-display text-3xl font-bold tracking-tight transition-colors",
                    isActive
                      ? "text-accent"
                      : "text-foreground hover:text-accent"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </motion.a>
              );
            })}
            <motion.div
              variants={prefersReducedMotion ? undefined : fadeUp}
              className="mt-4"
            >
              <StatusIndicator className="scale-110" />
            </motion.div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
