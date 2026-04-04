import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SkillsSection } from "@/components/sections/skills-section";
import { skills } from "@/lib/skills-data";

describe("SkillsSection", () => {
  it("renders with id='skills'", () => {
    render(<SkillsSection />);
    const section = document.getElementById("skills");
    expect(section).toBeInTheDocument();
  });

  it("displays the section heading", () => {
    render(<SkillsSection />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Technical Skills");
  });

  it("renders all three category headings", () => {
    render(<SkillsSection />);
    expect(screen.getByText("Frontend")).toBeInTheDocument();
    expect(screen.getByText("Backend")).toBeInTheDocument();
    expect(screen.getByText("Tools")).toBeInTheDocument();
  });

  it("displays known skill names", () => {
    render(<SkillsSection />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
  });

  it("renders the correct number of skill cards", () => {
    render(<SkillsSection />);
    const cards = screen.getAllByTestId("skill-card");
    expect(cards).toHaveLength(skills.length);
  });
});
