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
  liveUrlLabel?: string;
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
  {
    title: "Campus Companion",
    problem:
      "Students lack a unified tool to track their academic journey, from progress tracking to peer networking.",
    outcome:
      "Designed a comprehensive mobile companion app with schedule management, progress tracking, and peer networking features.",
    description:
      "A mobile app designed to help university students track academic progress and manage schedules.",
    techStack: ["Figma", "UI/UX Design", "Mobile App Design"],
    isFeatured: false,
    image: "",
    liveUrl:
      "https://www.figma.com/design/vIh7oksGDMljicrzth29bm/Campus-Companion?node-id=21911-234988&t=kzwmpy5sgN9hVFLU-1",
    liveUrlLabel: "View Design",
  },
  {
    title: "Cosmic Connect",
    problem:
      "An online community needed an intuitive interface for members to share and explore space exploration content.",
    outcome:
      "Designed a complete design system including a member dashboard, user persona, and a marketing homepage.",
    description:
      "A sleek community dashboard and homepage for an online platform focused on space exploration and research.",
    techStack: [
      "Figma",
      "UI/UX Design",
      "Dashboard Design",
      "Persona Development",
    ],
    isFeatured: false,
    image: "",
    liveUrl:
      "https://www.figma.com/design/jQ8j0DIR8Vdsg82En3yxB2/UI-Project-Draft?node-id=0-1&p=f",
    liveUrlLabel: "View Design",
  },
];
