/**
 * Site-wide constants — Singleton pattern.
 *
 * Single source of truth for site metadata, navigation links, and
 * social links. Imported throughout the application, never duplicated.
 */

export interface SiteConfig {
  name: string;
  description: string;
  tagline: string;
  url: string;
  author: string;
  role: string;
  graduation: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

export const siteConfig: SiteConfig = {
  name: "Jesus Rosario",
  description:
    "Developer portfolio — senior Web Information Systems student at NJIT, Software Engineering Intern at YU & Associates.",
  tagline: "Building polished web experiences with modern tools.",
  url: "",
  author: "Jesus Rosario",
  role: "AI Consultant",
  graduation: "May 2026",
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
];

export const socialLinks: SocialLink[] = [
  {
    platform: "Email",
    url: "mailto:jar285@njit.edu",
    label: "Email Me",
  },
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/jesus-adonis-rosario-vargas-371508255/",
    label: "LinkedIn",
  },
  {
    platform: "GitHub",
    url: "https://github.com/jar285",
    label: "GitHub",
  },
];
