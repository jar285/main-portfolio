import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Navbar } from "@/components/layout/navbar";
import { SkipToContent } from "@/components/layout/skip-to-content";
import { siteConfig } from "@/lib/constants";
import { ThemeProvider } from "@/components/theme/theme-provider";

// Mock Scroll functionality
vi.mock("motion/react", async () => {
  const actual = await vi.importActual("motion/react");
  return {
    ...actual,
    useScroll: () => ({
      scrollY: { get: () => 0, on: vi.fn(), onChange: vi.fn() },
    }),
    useMotionValueEvent: vi.fn(),
  };
});

describe("Navbar", () => {
  it("renders a navigation element", () => {
    render(
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>
    );
    expect(screen.getByLabelText("Main navigation")).toBeInTheDocument();
  });

  it("renders all nav links", () => {
    render(
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>
    );
    expect(screen.getAllByText("Home").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Skills").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Projects").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("About").length).toBeGreaterThanOrEqual(1);
  });

  it("displays the developer name", () => {
    render(
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>
    );
    expect(screen.getByText(siteConfig.name)).toBeInTheDocument();
  });

  it("contains the theme toggle", () => {
    render(
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>
    );
    const toggles = screen.getAllByRole("button", {
      name: /switch to (light|dark) mode/i,
    });
    expect(toggles.length).toBeGreaterThanOrEqual(1);
  });
});

describe("SkipToContent", () => {
  it("renders a skip-to-content link targeting #main-content", () => {
    render(<SkipToContent />);
    const link = screen.getByText("Skip to content");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "#main-content");
  });
});
