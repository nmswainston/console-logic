/**
 * Thin wrapper over the Umami tracker.
 *
 * The tracker tag is injected only into built HTML (see vite.config.js), so
 * window.umami is genuinely absent during the static prerender and in dev, and
 * it is absent in production too whenever a content blocker wins the race. Every
 * call therefore has to tolerate that rather than assume the script loaded.
 *
 * Nothing here may throw: these fire from click handlers, and a failed analytics
 * call must never take the interaction that triggered it down with it.
 */
export function track(event, data) {
  if (typeof window === "undefined") return;

  const umami = window.umami;
  if (!umami || typeof umami.track !== "function") return;

  try {
    if (data) umami.track(event, data);
    else umami.track(event);
  } catch {
    // Deliberately silent.
  }
}
