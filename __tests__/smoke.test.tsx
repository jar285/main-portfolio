import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "@/app/page";

describe("Home page", () => {
  it("renders without crashing", () => {
    const { container } = render(<Home />);
    expect(container).toBeTruthy();
  });

  it("displays the developer name", () => {
    const { getByText } = render(<Home />);
    expect(getByText("Jesus Rosario")).toBeInTheDocument();
  });
});
