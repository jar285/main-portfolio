import "@testing-library/jest-dom/vitest";

/**
 * IntersectionObserver mock for jsdom.
 * Required by Motion's whileInView prop which uses IntersectionObserver
 * internally. jsdom does not implement IntersectionObserver natively.
 */
const mockIntersectionObserver = class IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = "0px";
  readonly thresholds: ReadonlyArray<number> = [0];
  constructor(private callback: IntersectionObserverCallback) {}
  observe(target: Element): void {
    // Immediately trigger with isIntersecting: true so whileInView fires
    this.callback(
      [{ isIntersecting: true, target } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver
    );
  }
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
};

globalThis.IntersectionObserver =
  mockIntersectionObserver as unknown as typeof IntersectionObserver;

/**
 * matchMedia mock for jsdom.
 * Required by MagneticHover components checking for pointer devices.
 */
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false, // Default to false (mobile/touch) in tests for safety
    media: query,
    onchange: null,
    addListener: () => {}, // deprecated
    removeListener: () => {}, // deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});
