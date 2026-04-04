"use client";

import { motion } from "motion/react";
import { projects, type Project } from "@/lib/projects-data";
import { fadeUp, staggerFast, useReducedMotion } from "@/lib/motion";
import {
  ExternalLinkIcon,
  GitHubIcon,
  ZapIcon,
  BrainIcon,
} from "@/components/ui/icons";

export function ProjectsSection() {
  const prefersReducedMotion = useReducedMotion();

  const featuredProjects = projects.filter((p) => p.isFeatured);
  const otherProjects = projects.filter((p) => !p.isFeatured);

  return (
    <section id="projects" className="section-padding relative overflow-x-clip">
      {/* Atmospheric background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, hsl(var(--accent) / 0.04) 0%, transparent 70%)",
        }}
      />

      <div className="section-container relative z-10">
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
            Case Studies
          </motion.h2>
          <motion.p
            className="mt-3 text-muted-foreground md:text-lg"
            variants={prefersReducedMotion ? undefined : fadeUp}
          >
            Evidence of impact through technical problem solving.
          </motion.p>
        </motion.div>

        {/* Featured Projects Tier */}
        <div className="mb-20">
          <motion.h3
            className="mb-8 font-display text-display-3 text-muted-foreground/50"
            variants={prefersReducedMotion ? undefined : fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Featured Impact
          </motion.h3>
          <motion.div
            className="grid grid-cols-1 gap-8"
            variants={prefersReducedMotion ? undefined : staggerFast}
            initial={prefersReducedMotion ? undefined : "hidden"}
            whileInView={prefersReducedMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.1 }}
          >
            {featuredProjects.map((project) => (
              <ProjectCard key={project.title} project={project} featured />
            ))}
          </motion.div>
        </div>

        {/* Other Projects Tier */}
        <div>
          <motion.h3
            className="mb-8 font-display text-display-3 text-muted-foreground/50"
            variants={prefersReducedMotion ? undefined : fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Technical Experiments
          </motion.h3>
          <motion.div
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
            variants={prefersReducedMotion ? undefined : staggerFast}
            initial={prefersReducedMotion ? undefined : "hidden"}
            whileInView={prefersReducedMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.1 }}
          >
            {otherProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`flex flex-col gap-4 rounded-xl border border-border/50 bg-surface/50 p-6 transition-all duration-300 hover:border-accent/40 hover:bg-surface/80 hover:shadow-lg md:p-8 ${
        featured ? "md:grid md:grid-cols-2 md:gap-12" : ""
      }`}
      variants={prefersReducedMotion ? undefined : fadeUp}
      data-testid="project-card"
    >
      <div className="flex flex-col gap-4">
        {/* Title & Description */}
        <div>
          <h4
            className={`font-display ${featured ? "text-display-2" : "text-display-3"}`}
          >
            {project.title}
          </h4>
          <p className="mt-3 text-muted-foreground">{project.description}</p>
        </div>

        {/* Tech stack tags */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech: string) => (
            <span
              key={tech}
              className="rounded-full border border-border/50 bg-elevated/50 px-3 py-1 font-mono text-xs text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action links */}
        <div className="mt-6 flex flex-wrap gap-6">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm text-sm font-medium text-accent ring-offset-background hover:underline focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <ExternalLinkIcon size={16} />
              Live Demo
            </a>
          )}
          {project.repoUrl && !project.isPrivate && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm text-sm font-medium text-accent ring-offset-background hover:underline focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <GitHubIcon size={16} />
              Source Code
            </a>
          )}
          {project.isPrivate && (
            <span className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground/60">
              <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
              {project.repoUrl ? (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-foreground hover:underline"
                >
                  Private Repository
                </a>
              ) : (
                "Private Repository"
              )}
            </span>
          )}
        </div>
      </div>

      {/* Case Study Details - The Result / The Challenge */}
      <div className="flex flex-col gap-6 rounded-lg border border-border/40 bg-elevated/30 p-6">
        <div className="flex gap-4">
          <BrainIcon className="shrink-0 text-accent" size={20} />
          <div>
            <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-accent">
              The Challenge
            </span>
            <p className="text-sm leading-relaxed">{project.problem}</p>
          </div>
        </div>

        <div className="flex gap-4">
          <ZapIcon className="shrink-0 text-accent" size={20} />
          <div>
            <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-accent">
              The Result
            </span>
            <p className="text-sm font-medium leading-relaxed text-muted-foreground dark:text-white/90">
              {project.outcome}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
