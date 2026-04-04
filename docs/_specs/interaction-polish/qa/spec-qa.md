# Spec QA - Interaction Polish

**Date:** 2026-04-03
**Workstream:** `interaction-polish`

## Findings

- **Mobile Density**: The decision to move the `StatusIndicator` into the `MobileMenu` panel instead of the header (320px) is correct. It prevents UI overlap and maintains the premium "empty space" editorial feel.
- **Dependency Isolation**: Confirmed no new dependencies (no GSAP/SplitType). The `whileHover` implementation in `ProjectCard` is the most performant way to deliver the requested "lift" and "glow" without adding to the First Load JS budget.
- **Scroll Usability**: Threshold of `400px` for the `BackToTop` button ensures it doesn't appear prematurely on landing.

## Observations

- **Border Glow**: In Light Mode (Champagne Ivory), the `border-accent/40` must be balanced with `shadow-sm` to avoid feeling too harsh.
- **Pulsing Dot**: The `bg-success` dot should use a light-weight "ping" animation (`animate-ping` with absolute positioning) to ensure the status text does not jump.

## Verdict: PASS

Spec is technically sound. Proceed to Sprint Doc.
