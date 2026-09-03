import { useRef, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useContactModal } from "@/context/ContactModalContext.jsx";
import ScrollMotion from "@/components/motion/ScrollMotion.jsx";
import ScrollStagger from "@/components/motion/ScrollStagger.jsx";

import TypingSequence from "@/components/terminal/TypingSequence.jsx";
import TerminalCard from "@/components/terminal/TerminalCard.jsx";
import TypingText from "@/components/terminal/TypingText.jsx";

import { heroServices } from "@/data/services";
import { TYPING_SPEED_MS, TYPING_LINE_DELAY_MS, OPACITY_TRANSITION } from "@/data/constants";
import BootSequence from "@/components/terminal/BootSequence.jsx";

function BlinkingCaret() {
  const reduce = useReducedMotion();

  return (
    <span
      className={`ml-1 inline-block h-[1em] w-[0.6em] bg-terminal-green ${
        reduce ? "" : "cursor-blink"
      }`}
      aria-hidden="true"
    />
  );
}

// Live status, shown on the terminal card's path row once the boot sequence
// completes. It rides along the ~/studio line rather than stacking under the
// CTAs so it costs no vertical space, which is what keeps the CTAs above the
// fold on short phones.
function TerminalStatus({ reduce }) {
  return (
    <motion.span
      initial={reduce ? false : { opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={OPACITY_TRANSITION}
      className="flex shrink-0 items-center gap-2 text-terminal-green"
    >
      <span
        className={`status-dot ${reduce ? "" : "status-pulse"}`}
        aria-hidden="true"
      />
      System online
    </motion.span>
  );
}

function CodeBlock({ startTyping, studioDone, commandDone, setStudioDone, setCommandDone, bootDone, reduce }) {
  return (
    <div className="code-block-terminal w-full max-w-md rounded-lg border border-border bg-elevated p-4 font-mono text-sm leading-normal sm:p-6">
      <div className="flex min-h-[1lh] items-center justify-between gap-4">
        <TypingText
          text="~/studio"
          active={startTyping}
          speed={TYPING_SPEED_MS}
          delay={0}
          onComplete={() => setStudioDone(true)}
          className={studioDone ? "code-path" : "code-path-dim"}
        />
        {bootDone && <TerminalStatus reduce={reduce} />}
      </div>
      <div className="mt-1 flex min-h-[1lh] items-center">
        <TypingText
          segments={[
            {
              text: "console",
              className: commandDone ? "code-func" : "code-func-dim",
            },
            {
              text: ".",
              className: commandDone ? "code-punc" : "code-punc-dim",
            },
            {
              text: "log",
              className: commandDone ? "code-func" : "code-func-dim",
            },
            {
              text: "(",
              className: commandDone ? "code-punc" : "code-punc-dim",
            },
            {
              text: '"Welcome to logic."',
              className: commandDone ? "code-string" : "code-string-dim",
            },
            {
              text: ");",
              className: commandDone ? "code-punc" : "code-punc-dim",
            },
          ]}
          active={studioDone}
          speed={TYPING_SPEED_MS}
          delay={TYPING_LINE_DELAY_MS}
          onComplete={() => setCommandDone(true)}
        />
        <BlinkingCaret />
      </div>
    </div>
  );
}

export default function Hero() {
  const { openModal } = useContactModal();
  const reduce = useReducedMotion();
  const heroRef = useRef(null);
  const [bootDone, setBootDone] = useState(false);
  const [studioDone, setStudioDone] = useState(false);
  const [commandDone, setCommandDone] = useState(false);
  // The code block starts typing as soon as the headline's SECOND line begins,
  // so it isn't missed while the full tagline finishes.
  const [codeBlockActive, setCodeBlockActive] = useState(false);

  const heroOffset = ["start end", "end start"];
  const fadeInRange = [0, 0.15];
  const onBootComplete = useCallback(() => setBootDone(true), []);
  const onHeadlineLineStart = useCallback((line) => {
    if (line === 1) setCodeBlockActive(true);
  }, []);

  const codeBlockProps = { startTyping: codeBlockActive, studioDone, commandDone, setStudioDone, setCommandDone, bootDone, reduce };

  // The header is sticky, so it already occupies its own space in flow and #main
  // adds no padding to compensate. On desktop
  // min-h holds the hero to one viewport and the [1fr auto] rows anchor the code
  // block to the bottom, letting the card panel stretch down to meet it.
  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative mx-auto grid max-w-screen-xl grid-cols-1 gap-24 px-6 pt-0 pb-20 sm:pt-14 sm:pb-24 lg:grid-cols-2 lg:grid-rows-[1fr_auto] lg:items-stretch lg:gap-10 lg:min-h-[calc(100dvh_-_4rem)]"
    >
      {/* Terminal glow */}
      {!reduce && (
        <ScrollMotion
          targetRef={heroRef}
          offset={heroOffset}
          opacityRange={[0, 0.2]}
          opacityInputRange={[0, 0.15]}
          yRange={[0, 60]}
          className="absolute inset-0 -z-40"
        >
          <div aria-hidden="true" className="terminal-glow-hero" />
        </ScrollMotion>
      )}

      {/* Boot sequence */}
      <BootSequence onComplete={onBootComplete} />

      {/* Left column. On mobile/tablet it fills the first viewport and centers its
          content (headline → code block → sub → credibility → CTAs), pushing the
          service cards below the fold. It reserves a viewport less 8rem rather
          than less 4rem: the scroll entrance offsets sit ~50px low at scroll 0,
          so reserving a full viewport left centring slack under the CTAs that
          pushed them out of view on short phones. 8rem still clears the fold
          (pb-20 keeps the service cards below it) on tall ones.
          On desktop the section min-height drives
          the fill instead (row 1 is 1fr), so the explicit min-height is dropped
          and the same flex centering balances the stack against the card panel. */}
      <div className="flex min-h-[calc(100dvh_-_8rem)] flex-col justify-center lg:col-1 lg:row-1 lg:min-h-0">
        {/* Headline */}
        <ScrollMotion
          targetRef={heroRef}
          yRange={[52, -36]}
          opacityRange={[0, 1]}
          opacityInputRange={fadeInRange}
          scaleRange={[0.98, 1.02]}
          offset={heroOffset}
        >
          {/* Height matches exactly 3 lines at the fluid font size — no dead space */}
          <div
            className="overflow-hidden"
            style={{ height: "calc(4.2 * var(--hero-headline-size))" }}
          >
            {bootDone && (
              <TypingSequence
                lines={[
                  "Smart builds.",
                  "Clean code.",
                  [
                    { text: "Logical", className: "logo-blue" },
                    { text: " outcomes."},
                  ],
                ]}
                speed={TYPING_SPEED_MS}
                lineDelay={TYPING_LINE_DELAY_MS}
                className="font-mono text-terminal-green text-[length:var(--hero-headline-size)] leading-snug !space-y-0"
                onLineStart={onHeadlineLineStart}
              />
            )}
          </div>
        </ScrollMotion>

        {/* Code block — sits directly under the headline on mobile/tablet; hidden on
            desktop, where it appears in its own grid cell (bottom-left). */}
        <ScrollMotion
          targetRef={heroRef}
          yRange={[40, -28]}
          opacityRange={[0, 1]}
          opacityInputRange={fadeInRange}
          scaleRange={[0.97, 1.02]}
          rotateYRange={[1.5, -1.5]}
          offset={heroOffset}
          className="mt-4 sm:mt-8 lg:hidden [perspective:1200px]"
        >
          <CodeBlock {...codeBlockProps} />
        </ScrollMotion>

        {/* Subheadline */}
        <ScrollMotion
          targetRef={heroRef}
          yRange={[36, -24]}
          opacityRange={[0, 1]}
          opacityInputRange={fadeInRange}
          offset={heroOffset}
        >
          <p className="mt-4 max-w-prose text-lg leading-snug text-muted-foreground max-[359px]:text-base sm:mt-6 sm:text-base sm:leading-normal">
            Console Logic builds fast, polished websites and internal tools for
            small businesses and growing teams.
            <br />
            Clean architecture, thoughtful design, and systems that stay
            maintainable long after launch.
          </p>
        </ScrollMotion>

        {/* Credibility line. Hidden below sm: it restates the headline almost
            verbatim ("Smart builds. Clean code."), and on short phones that
            duplicate costs the vertical space the CTAs need to stay in the
            first viewport. */}
        <ScrollMotion
          targetRef={heroRef}
          yRange={[28, -18]}
          opacityRange={[0, 1]}
          opacityInputRange={fadeInRange}
          offset={heroOffset}
          className="hidden sm:block"
        >
          <p className="mt-3 text-base text-muted-foreground/90 sm:mt-4 sm:text-sm">
            Fast builds. Clean code. Clear communication.
          </p>
        </ScrollMotion>

        {/* Buttons */}
        <ScrollStagger
          targetRef={heroRef}
          className="mt-6 flex flex-wrap items-center gap-4 sm:mt-8"
          yRange={[40, -20]}
          offset={heroOffset}
        >
          <button onClick={() => openModal("hero")} className="btn btn-primary">
            Start a project
          </button>
          <a href="#work" className="btn btn-ghost">
            View work
          </a>
        </ScrollStagger>
      </div>

      {/* Hero cards — right column on desktop, below left col on mobile/tablet */}
      <ScrollStagger
        targetRef={heroRef}
        className="grid gap-6 lg:col-2 lg:row-1 lg:row-span-2 lg:self-center"
        yRange={[40, -20]}
        offset={heroOffset}
      >
        {heroServices.map((item) => (
          <TerminalCard key={item.title}>
            <h3 className="card-title">{item.title}</h3>
            <p className="card-text">{item.text}</p>
          </TerminalCard>
        ))}
      </ScrollStagger>

      {/* Code block — desktop only, explicit grid placement bottom-left */}
      <div className="hidden lg:block lg:col-1 lg:row-2 [perspective:1200px]">
        <ScrollMotion
          targetRef={heroRef}
          yRange={[40, -28]}
          opacityRange={[0, 1]}
          opacityInputRange={fadeInRange}
          scaleRange={[0.97, 1.02]}
          rotateYRange={[1.5, -1.5]}
          offset={heroOffset}
        >
          <CodeBlock {...codeBlockProps} />
        </ScrollMotion>
      </div>
    </section>
  );
}
