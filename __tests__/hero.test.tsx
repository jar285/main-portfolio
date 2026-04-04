import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroSection } from "@/components/sections/hero-section";
import { siteConfig } from "@/lib/constants";
import { ThemeProvider } from "@/components/theme/theme-provider";

describe("HeroSection", () => {
  it("renders with id='home'", () => {
    render(
      <ThemeProvider>
        <HeroSection />
      </ThemeProvider>
    );
    const section = document.getElementById("home");
    expect(section).toBeInTheDocument();
  });

  it("displays the developer name in an h1", () => {
    render(
      <ThemeProvider>
        <HeroSection />
      </ThemeProvider>
    );
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(siteConfig.name);
  });

  it("displays the role", () => {
    render(
      <ThemeProvider>
        <HeroSection />
      </ThemeProvider>
    );
    expect(screen.getByText(siteConfig.role)).toBeInTheDocument();
  });

  it("displays the tagline", () => {
    render(
      <ThemeProvider>
        <HeroSection />
      </ThemeProvider>
    );
    expect(screen.getByText(siteConfig.tagline)).toBeInTheDocument();
  });

  it("has View Projects and View Resume CTA links", () => {
    render(
      <ThemeProvider>
        <HeroSection />
      </ThemeProvider>
    );
    expect(screen.getByText("View Projects")).toBeInTheDocument();
    expect(screen.getByText("View Resume")).toBeInTheDocument();
  });
});
