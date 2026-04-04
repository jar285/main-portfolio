import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AboutSection } from "@/components/sections/about-section";

describe("AboutSection", () => {
  it("renders with id='about'", () => {
    render(<AboutSection />);
    const section = document.getElementById("about");
    expect(section).toBeInTheDocument();
  });

  it("displays the section heading", () => {
    render(<AboutSection />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("About Me");
  });

  it("renders about narrative paragraphs", () => {
    render(<AboutSection />);
    expect(
      screen.getByText(/Senior Web Information Systems student/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Focused on clean architecture/)
    ).toBeInTheDocument();
  });

  it("displays experience role and company", () => {
    render(<AboutSection />);
    expect(screen.getByText("Software Engineering Intern")).toBeInTheDocument();
    expect(
      screen.getByText("YU & Associates — Elmwood, NJ")
    ).toBeInTheDocument();
  });

  it("displays education degree and school", () => {
    render(<AboutSection />);
    expect(
      screen.getByText("New Jersey Institute of Technology")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Bachelor of Science in Web & Information Systems")
    ).toBeInTheDocument();
  });

  it("renders experience description bullets", () => {
    render(<AboutSection />);
    expect(
      screen.getByText(
        /Built a data converter that transformed Fulcrum field data/
      )
    ).toBeInTheDocument();
  });
});
