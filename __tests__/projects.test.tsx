import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectsSection } from "@/components/sections/projects-section";
import { projects } from "@/lib/projects-data";

describe("ProjectsSection", () => {
  it("renders with id='projects'", () => {
    render(<ProjectsSection />);
    const section = document.getElementById("projects");
    expect(section).toBeInTheDocument();
  });

  it("displays the section heading", () => {
    render(<ProjectsSection />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Case Studies");
  });

  it("renders the primary project titles", () => {
    render(<ProjectsSection />);
    expect(screen.getByText("YU-SURVEYSITE")).toBeInTheDocument();
    expect(screen.getByText("Blogtalk Studio")).toBeInTheDocument();
    expect(screen.getByText("gINT Log Converter")).toBeInTheDocument();
  });

  it("displays tech tags", () => {
    render(<ProjectsSection />);
    expect(screen.getAllByText("TypeScript").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Python").length).toBeGreaterThanOrEqual(1);
  });

  it("renders the correct number of project cards", () => {
    render(<ProjectsSection />);
    const cards = screen.getAllByTestId("project-card");
    expect(cards).toHaveLength(projects.length);
  });

  it("renders private repository indicators", () => {
    render(<ProjectsSection />);
    const privateLabels = screen.getAllByText(/Private Repository/i);
    expect(privateLabels.length).toBeGreaterThanOrEqual(1);
  });

  it("renders links with correct attributes", () => {
    render(<ProjectsSection />);
    const links = screen.getAllByRole("link");
    const externalLink = links.find(
      (link) => link.getAttribute("target") === "_blank"
    );
    expect(externalLink).toBeDefined();
    expect(externalLink).toHaveAttribute("rel", "noopener noreferrer");
  });
});
