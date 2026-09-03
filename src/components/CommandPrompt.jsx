import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useContactModal } from "@/context/ContactModalContext.jsx";
import TypingText from "@/components/terminal/TypingText.jsx";
import { TYPING_SPEED_MS } from "@/data/constants";

const COMMAND = "start-a-project";

/**
 * Closing prompt line that sits between the page content and the footer, so the
 * site signs off the way it opened: a terminal waiting for the next command.
 *
 * It is a real button rather than decoration. Pointing at it (or tabbing to it)
 * types the command out, and activating it opens the contact modal, so the
 * "waiting for input" promise actually leads somewhere.
 *
 * The caret is the only always-moving part. It reuses .cursor-blink, which
 * animations.css already switches off under prefers-reduced-motion, and it is
 * aria-hidden along with the typed text: the button carries its own label so
 * assistive tech never reads a half-typed string.
 */
export default function CommandPrompt() {
  const { openModal } = useContactModal();
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [hoverCapable, setHoverCapable] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    const sync = () => setHoverCapable(mq.matches);

    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const engage = useCallback(() => setHovered(true), []);
  const disengage = useCallback(() => setHovered(false), []);

  // On touch there is no hover to reveal the command, so show it outright
  // rather than leaving a bare caret that looks like a rendering artifact.
  // Derived rather than latched into state: a device that gains a pointer
  // (tablet with a keyboard attached, emulation toggled) must go back to
  // revealing on hover instead of staying stuck open.
  const showCommand = hovered || !hoverCapable;

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-screen-xl px-6 py-8">
        <button
          type="button"
          onClick={openModal}
          onMouseEnter={engage}
          onMouseLeave={disengage}
          onFocus={engage}
          onBlur={disengage}
          aria-label="Start a project"
          className="focus-ring group flex min-h-[44px] cursor-pointer items-center gap-2 font-mono text-base text-muted-foreground transition-colors hover:text-foreground"
        >
          <span aria-hidden="true" className="text-accent">
            {">_"}
          </span>
          {/* min-w reserves the full command plus caret, so nothing reflows as
              it types. 17ch covers 15 mono characters, the 1ch caret and its
              0.25rem gap. */}
          <span
            aria-hidden="true"
            className="inline-flex min-w-[17ch] items-center justify-start"
          >
            <TypingText
              text={COMMAND}
              active={showCommand}
              speed={TYPING_SPEED_MS}
            />
            <span
              className={`ml-1 inline-block h-[1em] w-[0.6em] bg-terminal-green ${
                reduce ? "" : "cursor-blink"
              }`}
            />
          </span>
        </button>
      </div>
    </section>
  );
}
