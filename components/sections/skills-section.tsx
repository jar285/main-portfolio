"use client";

import { motion } from "motion/react";
import { skillsByCategory } from "@/lib/skills-data";
import { fadeUp, staggerFast, useReducedMotion } from "@/lib/motion";
import * as Icons from "@/components/ui/icons";

const IconMap: Record<string, React.ComponentType<Icons.IconProps>> = {
  Code2: Icons.Code2Icon,
  FileCode2: Icons.FileCode2Icon,
  Atom: Icons.AtomIcon,
  Globe: Icons.GlobeIcon,
  FileText: Icons.FileTextIcon,
  Palette: Icons.PaletteIcon,
  Wind: Icons.WindIcon,
  Server: Icons.ServerIcon,
  Route: Icons.RouteIcon,
  Terminal: Icons.TerminalIcon,
  Database: Icons.DatabaseIcon,
  GitBranch: Icons.GitBranchIcon,
  Container: Icons.ContainerIcon,
  MonitorSmartphone: Icons.MonitorSmartphoneIcon,
  Brain: Icons.BrainIcon,
  Sparkles: Icons.SparklesIcon,
  Cpu: Icons.CpuIcon,
  Zap: Icons.ZapIcon,
  Network: Icons.NetworkIcon,
  Figma: Icons.FigmaIcon,
};

export function SkillsSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="skills" className="section-padding relative overflow-x-clip">
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
            Technical Skills
          </motion.h2>
          <motion.p
            className="mt-3 text-muted-foreground md:text-lg"
            variants={prefersReducedMotion ? undefined : fadeUp}
          >
            Technologies and tools I work with.
          </motion.p>
        </motion.div>

        {/* Category groups */}
        <div className="space-y-10 md:space-y-12">
          {skillsByCategory.map((group) => (
            <motion.div
              key={group.category}
              variants={prefersReducedMotion ? undefined : staggerFast}
              initial={prefersReducedMotion ? undefined : "hidden"}
              whileInView={prefersReducedMotion ? undefined : "visible"}
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.h3
                className="mb-4 text-display-4 font-semibold text-muted-foreground md:mb-6"
                variants={prefersReducedMotion ? undefined : fadeUp}
              >
                {group.category}
              </motion.h3>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {group.skills.map((skill) => {
                  const IconComponent = IconMap[skill.icon] ?? Icons.Code2Icon;

                  return (
                    <motion.div
                      key={skill.name}
                      className="group flex cursor-pointer items-center gap-3 rounded-lg border border-border/50 bg-surface/50 px-4 py-3 transition-all duration-300 hover:border-accent/30 hover:bg-surface/80 hover:shadow-md"
                      variants={prefersReducedMotion ? undefined : fadeUp}
                      data-testid="skill-card"
                    >
                      <IconComponent
                        size={20}
                        className="shrink-0 text-accent transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
                        aria-hidden="true"
                      />
                      <span className="font-mono text-sm">{skill.name}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
