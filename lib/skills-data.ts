/**
 * Typed skill data — Singleton pattern.
 *
 * Single source of truth for the developer's technical skills.
 * Grouped by category with an ordered array for deterministic
 * display order (Frontend → Backend → Tools).
 */

export type SkillCategory =
  | "AI & Machine Learning"
  | "Frontend"
  | "Backend"
  | "Tools";

export interface Skill {
  name: string;
  icon: string;
  category: SkillCategory;
}

export interface SkillGroup {
  category: SkillCategory;
  skills: Skill[];
}

export const skills: Skill[] = [
  // AI & Machine Learning
  { name: "LangChain", icon: "Brain", category: "AI & Machine Learning" },
  {
    name: "OpenAI / LLMs",
    icon: "Sparkles",
    category: "AI & Machine Learning",
  },
  {
    name: "Vector Databases",
    icon: "Database",
    category: "AI & Machine Learning",
  },
  {
    name: "Prompt Engineering",
    icon: "Zap",
    category: "AI & Machine Learning",
  },
  { name: "PyTorch", icon: "Cpu", category: "AI & Machine Learning" },
  {
    name: "Multi-Agent Orchestration",
    icon: "Network",
    category: "AI & Machine Learning",
  },

  // Frontend
  { name: "JavaScript", icon: "Code2", category: "Frontend" },
  { name: "TypeScript", icon: "FileCode2", category: "Frontend" },
  { name: "React", icon: "Atom", category: "Frontend" },
  { name: "Next.js", icon: "Globe", category: "Frontend" },
  { name: "HTML", icon: "FileText", category: "Frontend" },
  { name: "CSS", icon: "Palette", category: "Frontend" },
  { name: "Tailwind CSS", icon: "Wind", category: "Frontend" },

  // Backend
  { name: "Node.js", icon: "Server", category: "Backend" },
  { name: "Express", icon: "Route", category: "Backend" },
  { name: "Python", icon: "Terminal", category: "Backend" },
  { name: "MongoDB", icon: "Database", category: "Backend" },

  // Tools
  { name: "Git", icon: "GitBranch", category: "Tools" },
  { name: "Docker", icon: "Container", category: "Tools" },
  { name: "VS Code", icon: "MonitorSmartphone", category: "Tools" },
  { name: "Figma", icon: "Figma", category: "Tools" },
];

/** Ordered skill groups for deterministic display: AI & ML → Frontend → Backend → Tools */
const categoryOrder: SkillCategory[] = [
  "AI & Machine Learning",
  "Frontend",
  "Backend",
  "Tools",
];

export const skillsByCategory: SkillGroup[] = categoryOrder.map((category) => ({
  category,
  skills: skills.filter((skill) => skill.category === category),
}));
