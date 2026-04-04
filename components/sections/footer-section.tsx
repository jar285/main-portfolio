"use client";

import { motion } from "motion/react";
import { socialLinks, siteConfig } from "@/lib/constants";
import { fadeUp, staggerSlow, useReducedMotion } from "@/lib/motion";
import { MagneticHover } from "@/components/ui/magnetic-hover";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/ui/icons";

// Helper component to render exact SVG paths securely mapping to standard branding parameters natively.

export function FooterSection() {
  const prefersReducedMotion = useReducedMotion();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border bg-surface px-4 py-20 text-center sm:py-32">
      <motion.div
        className="mx-auto flex max-w-4xl flex-col items-center"
        variants={prefersReducedMotion ? undefined : staggerSlow}
        initial={prefersReducedMotion ? undefined : "hidden"}
        whileInView={prefersReducedMotion ? undefined : "visible"}
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Contact CTA */}
        <motion.p
          variants={prefersReducedMotion ? undefined : fadeUp}
          className="mb-4 font-mono text-sm uppercase tracking-widest text-accent"
        >
          What&apos;s Next?
        </motion.p>
        <motion.h2
          variants={prefersReducedMotion ? undefined : fadeUp}
          className="mb-6 font-display text-display-2 sm:text-5xl"
        >
          Get In Touch
        </motion.h2>
        <motion.p
          variants={prefersReducedMotion ? undefined : fadeUp}
          className="mb-10 max-w-lg text-muted-foreground"
        >
          I&apos;m currently looking for new opportunities. Whether you have a
          question or just want to say hi, my inbox is always open.
        </motion.p>

        {/* Dynamic Social Grid */}
        <motion.ul
          variants={prefersReducedMotion ? undefined : fadeUp}
          className="mb-20 flex flex-wrap justify-center gap-6"
        >
          {socialLinks.map((link) => (
            <li key={link.platform}>
              <MagneticHover strength={0.4}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="group flex items-center justify-center rounded-full border border-border bg-background p-4 text-muted-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {link.platform === "GitHub" && (
                    <GitHubIcon
                      size={24}
                      className="h-6 w-6 transition-transform group-hover:scale-110"
                    />
                  )}
                  {link.platform === "LinkedIn" && (
                    <LinkedInIcon
                      size={24}
                      className="h-6 w-6 transition-transform group-hover:scale-110"
                    />
                  )}
                  {link.platform === "Email" && (
                    <MailIcon
                      size={24}
                      className="h-6 w-6 transition-transform group-hover:scale-110"
                    />
                  )}
                </a>
              </MagneticHover>
            </li>
          ))}
        </motion.ul>

        {/* Minimal Signature Layer */}
        <motion.div
          variants={prefersReducedMotion ? undefined : fadeUp}
          className="flex flex-col items-center"
        >
          <p className="text-sm text-muted-foreground/60 transition-colors hover:text-accent">
            Designed & Built by {siteConfig.name}
          </p>
          <p className="mt-1 font-mono text-xs text-muted-foreground/40">
            &copy; {currentYear} All Rights Reserved
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
