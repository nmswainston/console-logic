import { useEffect, useState } from "react";

/**
 * Minimalist floating "back to top" button, fixed to the lower right on
 * every page. Sits below the contact modal (z-50) so the backdrop covers it.
 *
 * Hidden until the user has scrolled past the first screen: at the top it has
 * nothing to do, and on mobile it lands beside the hero CTAs and competes with
 * them. It starts hidden so the prerendered SSG markup matches the top-of-page
 * state that every visitor lands on.
 */
const SHOW_AFTER_PX = 400;

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Reading scrollY and setting a boolean is cheap, and React bails out when
    // the value is unchanged, so this only re-renders when the threshold is
    // actually crossed. No rAF throttle: it would add a dependency on frames
    // being scheduled, which background/hidden tabs do not guarantee.
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);

    // ScrollRestoration can land us mid-page on reload, so seed from the
    // current offset rather than assuming we start at the top.
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`focus-ring fixed bottom-5 right-5 z-40 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-border bg-elevated/80 text-muted-foreground backdrop-blur transition-[color,border-color,opacity] hover:border-terminal-green-dim hover:text-terminal-green ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <svg
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}
