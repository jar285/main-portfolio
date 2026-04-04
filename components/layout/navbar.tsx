"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { MenuIcon } from "@/components/ui/icons";
import { navLinks, siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { fadeDown, useReducedMotion } from "@/lib/motion";
import { MobileMenu } from "./mobile-menu";

import { MagneticHover } from "@/components/ui/magnetic-hover";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { StatusIndicator } from "@/components/ui/status-indicator";

const SCROLL_THRESHOLD = 50;

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const prefersReducedMotion = useReducedMotion();

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > SCROLL_THRESHOLD);

    // Dynamic scroll-spy mapping
    const sectionIds = navLinks.map((link) => link.href.replace("#", ""));
    const offsets = sectionIds
      .map((id) => {
        const el = document.getElementById(id);
        return el ? { id, offset: el.offsetTop - 100 } : null;
      })
      .filter(Boolean) as { id: string; offset: number }[];

    const currentSection = offsets.reduce((acc, curr) => {
      if (latest >= curr.offset) return curr.id;
      return acc;
    }, "home");

    if (currentSection !== activeSection) {
      setActiveSection(currentSection);
    }
  });

  // Sync body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <motion.header
        className={cn(
          "fixed left-0 right-0 top-0 z-40 transition-colors duration-300",
          scrolled
            ? "border-b border-border bg-surface/80 backdrop-blur-lg"
            : "bg-transparent"
        )}
        variants={prefersReducedMotion ? undefined : fadeDown}
        initial="hidden"
        animate="visible"
      >
        <div className="section-container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <MagneticHover strength={0.2}>
              <a
                href="#home"
                className="font-display text-lg font-bold text-foreground transition-colors hover:text-accent"
              >
                {siteConfig.name}
              </a>
            </MagneticHover>
            <StatusIndicator className="hidden lg:flex" />
          </div>

          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => {
              const isActive = `#${activeSection}` === link.href;
              return (
                <MagneticHover key={link.href} strength={0.3}>
                  <a
                    href={link.href}
                    className={cn(
                      "text-sm font-medium transition-colors",
                      isActive
                        ? "text-accent"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </a>
                </MagneticHover>
              );
            })}
            <div className="ml-4 h-6 w-px bg-border/50" aria-hidden="true" />
            <ThemeToggle className="ml-4" />
          </nav>

          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              <MenuIcon size={24} />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu
        isOpen={isOpen}
        onClose={handleClose}
        activeSection={activeSection}
      />
    </>
  );
}
