"use client";

import { motion } from "motion/react";
import { aboutInfo, experiences, education } from "@/lib/about-data";
import { fadeUp, staggerFast, useReducedMotion } from "@/lib/motion";
import { ExternalLinkIcon } from "@/components/ui/icons";

export function AboutSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="about" className="section-padding relative overflow-x-clip">
      {/* Atmospheric background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, hsl(var(--accent) / 0.04) 0%, transparent 70%)",
        }}
      />

      <div className="section-container relative z-10 max-w-4xl">
        {/* Section header */}
        <motion.div
          className="mb-12 text-center md:mb-16"
          variants={prefersReducedMotion ? undefined : staggerFast}
          initial={prefersReducedMotion ? undefined : "hidden"}
          whileInView={prefersReducedMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2
            className="font-display text-display-2 md:text-display-1"
            variants={prefersReducedMotion ? undefined : fadeUp}
          >
            {aboutInfo.headline}
          </motion.h2>
          <motion.p
            className="mt-3 text-muted-foreground md:text-lg"
            variants={prefersReducedMotion ? undefined : fadeUp}
          >
            Background, experience, and education.
          </motion.p>
        </motion.div>

        <div className="space-y-16 md:space-y-24">
          {/* About narrative */}
          <motion.div
            className="space-y-4 text-muted-foreground md:text-lg"
            variants={prefersReducedMotion ? undefined : staggerFast}
            initial={prefersReducedMotion ? undefined : "hidden"}
            whileInView={prefersReducedMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.2 }}
          >
            {aboutInfo.paragraphs.map((paragraph, i) => (
              <motion.p
                key={i}
                variants={prefersReducedMotion ? undefined : fadeUp}
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>

          {/* Experience Timeline */}
          <motion.div
            variants={prefersReducedMotion ? undefined : staggerFast}
            initial={prefersReducedMotion ? undefined : "hidden"}
            whileInView={prefersReducedMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h3
              className="mb-8 font-display text-display-3"
              variants={prefersReducedMotion ? undefined : fadeUp}
            >
              Experience
            </motion.h3>

            <div className="space-y-8" role="list">
              {experiences.map((exp, index) => (
                <motion.div
                  key={`${exp.company}-${index}`}
                  className="relative border-l-2 border-border/50 pl-6"
                  variants={prefersReducedMotion ? undefined : fadeUp}
                  role="listitem"
                >
                  <div
                    className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                  <h4 className="font-display text-display-4">{exp.role}</h4>
                  <p className="mt-1 text-sm text-foreground md:text-base">
                    {exp.company} — {exp.location}
                  </p>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    {exp.startDate} — {exp.endDate}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {exp.description.map((bullet, i) => (
                      <li
                        key={i}
                        className="text-sm text-muted-foreground md:text-base"
                      >
                        • {bullet}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education Timeline */}
          <motion.div
            variants={prefersReducedMotion ? undefined : staggerFast}
            initial={prefersReducedMotion ? undefined : "hidden"}
            whileInView={prefersReducedMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h3
              className="mb-8 font-display text-display-3"
              variants={prefersReducedMotion ? undefined : fadeUp}
            >
              Education
            </motion.h3>

            <motion.div
              className="relative border-l-2 border-border/50 pl-6"
              variants={prefersReducedMotion ? undefined : fadeUp}
            >
              <div
                className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-accent"
                aria-hidden="true"
              />
              <h4 className="font-display text-display-4">
                {education.school}
              </h4>
              <p className="mt-1 text-sm text-foreground md:text-base">
                {education.degree}
              </p>
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                {education.location} • Expected {education.graduationDate}
              </p>
              {education.details.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {education.details.map((detail, i) => {
                    const isCert =
                      detail.includes("Certifications:") &&
                      education.certificateUrl;

                    return (
                      <li
                        key={i}
                        className="text-sm text-muted-foreground md:text-base"
                      >
                        •{" "}
                        {isCert ? (
                          <a
                            href={education.certificateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-accent hover:underline"
                          >
                            {detail}
                            <ExternalLinkIcon size={14} className="shrink-0" />
                          </a>
                        ) : (
                          detail
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
