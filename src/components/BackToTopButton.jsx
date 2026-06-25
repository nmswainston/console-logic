/**
 * Minimalist floating "back to top" button, fixed to the lower right on
 * every page. Sits below the contact modal (z-50) so the backdrop covers it.
 */
export default function BackToTopButton() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="focus-ring fixed bottom-5 right-5 z-40 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-border bg-elevated/80 text-muted-foreground backdrop-blur transition-colors hover:border-terminal-green-dim hover:text-terminal-green"
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
