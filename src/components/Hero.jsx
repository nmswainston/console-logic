import { useRef, useState, useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import { useContactModal } from "@/context/ContactModalContext.jsx";
import ScrollMotion from "@/components/motion/ScrollMotion.jsx";
import ScrollStagger from "@/components/motion/ScrollStagger.jsx";

import TypingSequence from "@/components/terminal/TypingSequence.jsx";
import TerminalCard from "@/components/terminal/TerminalCard.jsx";

import { heroServices } from "@/data/services";
import { TYPING_SPEED_MS, TYPING_LINE_DELAY_MS } from "@/data/constants";
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

export default function Hero({ onHeroComplete }) {
  const { openModal } = useContactModal();
  const reduce = useReducedMotion();
  const heroRef = useRef(null);
  const [bootDone, setBootDone] = useState(false);

  const heroOffset = ["start end", "end start"];
  const fadeInRange = [0, 0.15];
  const onBootComplete = useCallback(() => setBootDone(true), []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative mx-auto grid max-w-screen-xl grid-cols-1 gap-10 px-6 pt-12 pb-20 sm:pt-14 sm:pb-24 lg:grid-cols-2 lg:grid-rows-[auto_auto] lg:items-start"
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

      {/* Left column: headline, support, CTA */}
      <div className="lg:col-1 lg:row-1">
        {/* Headline */}
        <ScrollMotion
          targetRef={heroRef}
          yRange={[52, -36]}
          opacityRange={[0, 1]}
          opacityInputRange={fadeInRange}
          scaleRange={[0.98, 1.02]}
          offset={heroOffset}
        >
          <div className="h-[8em] overflow-hidden sm:h-[10em] md:h-[12em]">
            {bootDone && (
              <TypingSequence
                lines={[
                  "Smart devs.",
                  "Clean code.",
                  [
                    { text: "Logical", className: "logo-blue" },
                    { text: " outcomes.", className: "text-headline-accent" },
                  ],
                ]}
                speed={TYPING_SPEED_MS}
                lineDelay={TYPING_LINE_DELAY_MS}
                className="font-display text-3xl leading-snug !space-y-0 sm:text-4xl md:text-5xl"
                onComplete={onHeroComplete}
              />
            )}
          </div>
        </ScrollMotion>

        {/* Subheadline */}
        <ScrollMotion
          targetRef={heroRef}
          yRange={[36, -24]}
          opacityRange={[0, 1]}
          opacityInputRange={fadeInRange}
          offset={heroOffset}
        >
          <p className="mt-6 max-w-prose text-base leading-normal text-muted-foreground">
            Console Logic builds fast, polished websites and internal tools for
            small businesses and growing teams.
            <br />
            Clean architecture, thoughtful design, and systems that stay
            maintainable long after launch.
          </p>
        </ScrollMotion>

        {/* Credibility line */}
        <ScrollMotion
          targetRef={heroRef}
          yRange={[28, -18]}
          opacityRange={[0, 1]}
          opacityInputRange={fadeInRange}
          offset={heroOffset}
        >
          <p className="mt-4 text-sm text-muted-foreground/90">
            Fast builds. Clean code. Clear communication.
          </p>
        </ScrollMotion>

        {/* Buttons */}
        <ScrollStagger
          targetRef={heroRef}
          className="mt-8 flex flex-wrap items-center gap-4"
          yRange={[40, -20]}
          offset={heroOffset}
        >
          <button onClick={openModal} className="btn btn-primary">
            Start a project
          </button>
          <a href="#work" className="btn btn-ghost">
            View work
          </a>
        </ScrollStagger>
      </div>

      {/* Hero cards - stacks after CTA on mobile */}
      <ScrollStagger
        targetRef={heroRef}
        className="grid gap-6 rounded-lg border border-border border-t-terminal-green-dim bg-elevated p-6 lg:col-2 lg:row-1 lg:row-span-2 lg:self-start"
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

      {/* Code block - after hero cards on mobile, left column on desktop */}
      <div className="lg:col-1 lg:row-2 [perspective:1200px]">
        <ScrollMotion
          targetRef={heroRef}
          yRange={[40, -28]}
          opacityRange={[0, 1]}
          opacityInputRange={fadeInRange}
          scaleRange={[0.97, 1.02]}
          rotateYRange={[1.5, -1.5]}
          offset={heroOffset}
        >
          <div className="code-block-terminal w-full max-w-md rounded-lg border border-border bg-elevated p-6 font-mono text-sm leading-normal">
            <div className="opacity-70">~/studio</div>
            <div className="mt-1">
              <span className="text-terminal-green">console</span>.
              <span className="text-terminal-green">log</span>(
              <span className="text-accent">&quot;Welcome to logic.&quot;</span>
              );
              <BlinkingCaret />
            </div>
          </div>
        </ScrollMotion>
      </div>
    </section>
  );
}