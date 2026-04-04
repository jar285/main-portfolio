/**
 * Typed project data — Singleton pattern.
 *
 * Single source of truth for the developer's high-impact case studies.
 * Upgraded to support Featured vs. Other tiering.
 */

export interface Project {
  title: string;
  problem: string;
  outcome: string;
  description: string;
  techStack: string[];
  isFeatured: boolean;
  image: string;
  liveUrl?: string;
  repoUrl?: string;
  isPrivate?: boolean;
}

export const projects: Project[] = [
  {
    title: "YU-SURVEYSITE",
    problem:
      "Internal company workflows for PTO and surveys were manual, leading to delays in approval and documentation.",
    outcome:
      "Automated the entire approval/denial process for PTO and general surveys. Tested with real users and approved for production use.",
    description:
      "An automated survey and workflow orchestration site built for YU & Associates.",
    techStack: ["Django", "Temporal.io", "Docker", "Vue.js", "Tailwind"],
    isFeatured: true,
    image: "",
    repoUrl: "https://github.com/jvargasYU",
    isPrivate: true,
  },
  {
    title: "Blogtalk Studio",
    problem:
      "Content creators needed a tool to convert audio recordings into polished blog posts.",
    outcome:
      "Hexagonal architecture with swappable LLM adapters (Anthropic/OpenAI), Whisper transcription, and a full CI test suite.",
    description:
      "A full-stack blog with AI-assisted content management and custom analytics pipeline.",
    techStack: ["Next.js", "TypeScript", "Whisper API", "Zod", "App Router"],
    isFeatured: true,
    image: "",
    liveUrl: "https://blogtalk-phi.vercel.app/",
    repoUrl: "https://github.com/jar285/blogtalk-studio",
    isPrivate: true,
  },
  {
    title: "gINT Log Converter",
    problem:
      "Geotechnical engineers manually formatted boring log data, costing hours per project.",
    outcome:
      "Automated conversion tool reducing manual data entry by ~4 hours per project week.",
    description:
      "An automation bridge that connects legacy geotechnical reporting systems with modern field data apps.",
    techStack: ["Python", "Automation", "Data Pipelines", "Parsing"],
    isFeatured: true,
    image: "",
    repoUrl: "https://github.com/jar285/Fulcrum-gINT-NewarkBay",
    isPrivate: true,
  },
  {
    title: "AI Toolkit",
    problem:
      "Researchers needed an autonomous way to fetch, summarize, and organize disparate web sources for AI agents.",
    outcome:
      "CLI tool achieving 90% faster background research by automating source synthesis and citation management.",
    description:
      "An autonomous research CLI following Clean Architecture for AI-driven information gathering.",
    techStack: ["Python", "Clean Architecture", "NLP", "LLMs"],
    isFeatured: false,
    image: "",
    repoUrl: "https://github.com/jar285/ai-toolkit",
  },
  {
    title: "User Management System",
    problem:
      "Students needed a realistic technical resource to learn industry-standard deployment and agile methodologies.",
    outcome:
      "Implementation of 12-Factor App principles and Agile Manifesto, serving as a comprehensive multi-field learning resource.",
    description:
      "A production-ready user management platform focusing on best practices and immersive technical training.",
    techStack: ["Docker", "Agile", "12-Factor App", "CI/CD"],
    isFeatured: false,
    image: "",
    repoUrl: "https://github.com/jar285/user_management",
  },
];
