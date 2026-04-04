/**
 * Typed about and experience data — Singleton pattern.
 *
 * Single source of truth for the developer's background, education, and professional experience.
 */

export interface AboutInfo {
  headline: string;
  paragraphs: string[];
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export interface Education {
  degree: string;
  school: string;
  location: string;
  graduationDate: string;
  details: string[];
  certificateUrl?: string;
}

export const aboutInfo: AboutInfo = {
  headline: "About Me",
  paragraphs: [
    "Senior Web Information Systems student at NJIT graduating in May 2026. Currently an AI Consultant specializing in building full-stack web applications and AI-powered automation tools.",
    "Focused on clean architecture, type-safe code, and polished user experiences. Experienced with React, Node.js, TypeScript, Python, and modern cloud tooling.",
  ],
};

export const experiences: Experience[] = [
  {
    role: "Software Engineering Intern",
    company: "YU & Associates",
    location: "Elmwood, NJ",
    startDate: "October 2024",
    endDate: "Present",
    description: [
      "Built a data converter that transformed Fulcrum field data into standardized gINT boring-log report templates, eliminating repetitive manual entry.",
      "Developed and optimized an automated Survey Site using Django, Temporal.io, Docker, Vue.js, and Tailwind CSS to orchestrate end-to-end workflows.",
      "Bridged a legacy geotechnical reporting system (gINT) with the Fulcrum field app, creating a reliable modern-to-legacy data pipeline.",
      "Reduced manual report-preparation effort by 40% while improving turnaround time and consistency across boring logs.",
    ],
  },
  {
    role: "Finance Assistant and Organizer",
    company: "Top Food Provision",
    location: "Paterson, NJ",
    startDate: "April 2019",
    endDate: "July 2025",
    description: [
      "Communicated effectively with clients through written correspondence, phone calls, and face-to-face interactions",
      "Managed financial transactions for factory operations, ensuring accuracy and comprehensive documentation",
      "Refined and carefully packaged finished products for shipment, ensuring neat presentation and safe delivery",
      "Proactively orchestrated customer service during a company division, successfully navigating challenges without the aid of company software. This initiative led to a 10% increase in customer satisfaction.",
    ],
  },
];

export const education: Education = {
  degree: "Bachelor of Science in Web & Information Systems",
  school: "New Jersey Institute of Technology",
  location: "Newark, NJ",
  graduationDate: "May 2026",
  details: [
    "Cumulative GPA: 3.57/4.00",
    "Relevant Coursework: Building Web Applications, Designing the User Experience, Advanced Website Development, Database Design, Management & Appliance, Analysis & System Design, Discovering User Needs for UX",
    "Certifications: Certificate of Achievement in Cybersecurity (CodePath)",
  ],
  certificateUrl: "/codepath-cybersecurity-certificate.pdf",
};
