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
      className={`ml-1 inline-block w-[0.6em] h-[1em] bg-terminal-green ${
        reduce ? "" : "[animation:blink_1s_steps(2,_start)_infinite]"
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
      className="relative mx-auto grid max-w-screen-xl grid-cols-1 gap-10 px-6 pt-12 pb-24 sm:pt-14 lg:grid-cols-2 lg:items-center"
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
          <div
            aria-hidden="true"
            className="terminal-glow-hero"
          />
        </ScrollMotion>
      )}

      {/* Boot sequence (independent, scroll-away) */}
      <BootSequence onComplete={onBootComplete} />

      {/* Left column */}
      <div>
        {/* Headline */}
        <ScrollMotion
          targetRef={heroRef}
          yRange={[52, -36]}
          opacityRange={[0, 1]}
          opacityInputRange={fadeInRange}
          scaleRange={[0.98, 1.02]}
          offset={heroOffset}
        >
          <div className="h-[9em] sm:h-[12em] overflow-hidden">
            {bootDone && (
              <TypingSequence
                lines={[
                  "Smart devs.",
                  "Clean code.",
                  [
                    { text: "Logical", className: "logo-blue" },
                    { text: " outcomes." }
                  ]
                ]}
                speed={TYPING_SPEED_MS}
                lineDelay={TYPING_LINE_DELAY_MS}
                className="font-display text-4xl sm:text-5xl leading-snug !space-y-0"
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
          <p className="mt-6 max-w-prose text-base text-muted-foreground leading-normal">
            We build crisp frontends, tidy backends, and automations that keep
            teams moving. Fewer surprises, faster shipping, measurable results.
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
            See work
          </a>
        </ScrollStagger>

        {/* Code block */}
        <div className="mt-8 [perspective:1200px]">
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
                <span className="text-accent">&quot;Welcome to logic.&quot;</span>);
                <BlinkingCaret />
              </div>
            </div>
          </ScrollMotion>
        </div>
      </div>

      {/* Right column */}
      <ScrollStagger
        targetRef={heroRef}
        className="grid gap-6 rounded-lg border border-border border-t-terminal-green-dim bg-elevated p-6"
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
    </section>
  );
}