/**
 * Analytics helpers.
 *
 * Thin wrappers over the Umami tracker and the Google Ads conversion event.
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

/**
 * Reports a Google Ads conversion: a contact form message that was delivered.
 *
 * This is the "request_quote" conversion action's event snippet from Google
 * Ads, moved out of a <script> tag and into code. Google's instructions assume
 * a separate thank-you page; this site has none (the form posts in the
 * background and shows its success message in place), so the event fires from
 * the same success branch as the Umami event instead.
 *
 * window.gtag is defined by the Google tag in index.html. It is missing during
 * the static prerender and whenever a content blocker removes the tag, so like
 * track() above this has to tolerate its absence and never throw.
 */
const ADS_CONVERSION = "AW-18591571761/3RmICNCw-70dELG-k6FF";

export function trackAdsConversion() {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;

  try {
    window.gtag("event", "conversion", {
      send_to: ADS_CONVERSION,
      value: 1.0,
      currency: "USD",
    });
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
