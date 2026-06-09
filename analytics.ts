// Plausible Analytics helpers
// Script loaded via index.html using script.manual.js (SPA mode)

declare global {
  interface Window {
    plausible?: (
      eventName: string,
      options?: { u?: string; props?: Record<string, string | number | boolean> }
    ) => void;
  }
}

/**
 * Fire a Plausible pageview for the current URL.
 * Called on every client-side route change.
 */
export function trackPageview(path: string): void {
  if (typeof window === "undefined" || !window.plausible) return;
  const url = `${window.location.origin}${path}`;
  window.plausible("pageview", { u: url });
}

/**
 * Fire a named custom event with optional props.
 * Used for section-level tracking (e.g. Contact viewed).
 */
export function trackEvent(
  name: string,
  props?: Record<string, string | number | boolean>
): void {
  if (typeof window === "undefined" || !window.plausible) return;
  window.plausible(name, props ? { props } : undefined);
}

/**
 * Map a pathname to a human-readable section name for custom events.
 * Returns null for paths that don't need a separate named event.
 */
export function sectionFromPath(path: string): string | null {
  if (path === "/practice") return "Practice";
  if (path.startsWith("/practice/")) return "Practice Entry";
  if (path === "/thinking") return "Thinking";
  if (path.startsWith("/thinking/")) return "Thinking Essay";
  if (path === "/work/lavou") return "Work — Lavou";
  if (path.startsWith("/work/")) return "Work Page";
  if (path === "/artifacts") return "Artifacts";
  return null;
}
