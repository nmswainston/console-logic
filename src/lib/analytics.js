/**
 * Analytics helpers.
 *
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

// The tracker's own opt-out. Its send guard reads this key from localStorage
// on every request, so setting it silences the browser immediately, with no
// reload and no code of ours in the send path.
const OPT_OUT_KEY = "umami.disabled";
const PARAM = "analytics";

/**
 * Honours ?analytics=off and ?analytics=on.
 *
 * The opt-out lives in localStorage, so it is per browser and per device and
 * cannot be applied centrally. A URL is the one lever that works everywhere:
 * a phone, a second browser, or a machine with no devtools can all opt out by
 * visiting a link, which matters because the owner of a portfolio site is
 * usually its most frequent visitor.
 *
 * The parameter is stripped afterwards so the flag cannot leak into a shared
 * link, a bookmark, or an outbound referrer and silence someone else.
 *
 * Clearing site data clears the opt-out; re-visiting the link restores it.
 */
export function applyAnalyticsPreference() {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const value = params.get(PARAM);
  if (value !== "off" && value !== "on") return;

  try {
    if (value === "off") window.localStorage.setItem(OPT_OUT_KEY, "1");
    else window.localStorage.removeItem(OPT_OUT_KEY);
  } catch {
    // Private mode or blocked storage: nothing to do and nothing to report.
  }

  params.delete(PARAM);
  const query = params.toString();
  window.history.replaceState(
    null,
    "",
    window.location.pathname + (query ? `?${query}` : "") + window.location.hash,
  );
}
