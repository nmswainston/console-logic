import { useRef } from "react";

import Section from "@/components/Section.jsx";
import SectionLoader from "@/components/terminal/SectionLoader.jsx";
import ScrollMotion from "@/components/motion/ScrollMotion.jsx";
import ScrollStagger from "@/components/motion/ScrollStagger.jsx";
import TerminalCard from "@/components/terminal/TerminalCard.jsx";

import { startingPrice } from "@/data/pricing";

// The four stages a project goes through, in order. Someone who has never
// hired a developer mostly wants to know what happens after they get in touch,
// so each step says what they will see or receive, not what we do internally.
//
// Titles are JetBrains Mono, which is exactly 0.6em per character: keep them
// to about 20 characters so they stay on one line on a phone (see the
// .card-title note in globals.css).
const steps = [
  {
    title: "Intro call",
    text: "We talk through what you need, what you have today, and what a good result looks like. Plain language, no pressure.",
  },
  {
    title: "Written proposal",
    text: "You get the scope, timeline, and price in writing before any work starts, so you know exactly what you are agreeing to.",
  },
  {
    title: "Build and review",
    text: "You see real progress early on a private preview link and give feedback as we go, instead of waiting for a big reveal.",
  },
  {
    title: "Launch and support",
    text: "We handle the launch, then stay available for updates and fixes. You are never left with a site you cannot change.",
  },
];

export default function ProcessSection() {
  const processRef = useRef(null);

  return (
    <Section id="process" borderTop ref={processRef}>
      <SectionLoader label="loading section: process" sectionRef={processRef}>
        <ScrollMotion className="section-header" useOpacity={false}>
          <p className="section-kicker">How it works</p>

          <h2 id="process-heading" className="section-heading">
            What to expect, step by step
          </h2>

          <p className="section-intro">
            Most clients have never hired a developer before. Here is what happens from the
            first conversation to launch day and after.
          </p>

          {/* A starting figure lets a visitor rule themselves in or out before
              the first call, which saves both sides time. It is a floor, not a
              quote, so the second sentence says where the real number comes
              from. Hidden until a figure is set in src/data/pricing.js.

              It lives in the header block, like the response-time line in the
              Contact section, because the card grid below drifts with scroll
              and a line placed under it would not keep a steady gap. */}
          {startingPrice && (
            <p className="mt-3 text-sm font-mono text-terminal-green">
              {">"} Most projects start at {startingPrice}. You get an exact quote in writing
              before any work starts.
            </p>
          )}
        </ScrollMotion>

        {/* The step number is real text, not decoration: the order is the
            point of this section, so a screen reader should read "Step 1"
            ahead of each title. Sighted visitors see the short "01" form. */}
        <ScrollStagger
          className="section-content section-grid-gap grid sm:grid-cols-2"
          initiallyVisible
        >
          {steps.map((step, i) => (
            <TerminalCard key={step.title} className="h-full">
              <p className="font-mono text-sm text-terminal-green">
                <span className="sr-only">Step {i + 1}</span>
                <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              </p>
              <h3 className="card-title mt-2">{step.title}</h3>
              <p className="card-text">{step.text}</p>
            </TerminalCard>
          ))}
        </ScrollStagger>
      </SectionLoader>
    </Section>
  );
}
