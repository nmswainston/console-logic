import { Helmet } from "react-helmet-async";
import Section from "@/components/Section.jsx";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About — Console Logic</title>
        <meta
          name="description"
          content="Console Logic builds fast, clear, maintainable websites and web apps for teams of all sizes, from non-technical founders to product-minded companies."
        />
        <link rel="canonical" href="https://console-logic.dev/about" />
      </Helmet>

      <Section>
        {/* Intro */}
        <header className="max-w-prose">
          <h1 className="font-display text-4xl leading-snug">About</h1>
          <p className="mt-3 text-base text-muted-foreground leading-normal">
            Console Logic builds software that makes life easier, not heavier.
            <br />We ship websites, internal tools, and automations that stay fast, clear,
            and maintainable.
          </p>
        </header>

        {/* Cards */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="card">
            <h3 className="card-title">What we do</h3>
            <p className="card-text">
              UI engineering, APIs, and thoughtful automation. <br />Products that feel
              calm to use and boring to maintain, the kind of boring where
              nothing breaks.
            </p>
          </div>

          <div className="card">
            <h3 className="card-title">Stack</h3>
            <p className="card-text">
              React, Node, Tailwind, and TypeScript when it earns its keep. <br />Tools
              chosen for clarity, speed, and a tight feedback loop.
            </p>
          </div>

          <div className="card">
            <h3 className="card-title">How we work</h3>
            <ul className="card-text mt-3 list-disc pl-5 space-y-2">
              <li>Start with the user flow.</li>
              <li>Ship in small, validated slices.</li>
              <li>Keep architecture simple.</li>
              <li>Make performance and accessibility defaults.</li>
            </ul>
          </div>

          <div className="card">
            <h3 className="card-title">Good fit</h3>
            <p className="card-text">
              You want something fast, clear, and dependable. You value
              communication and steady progress.
            </p>
            <p className="card-text mt-3">
              Not a fit: “Make it go viral” with no content, no goals, and a
              deadline of yesterday.
            </p>
          </div>
        </div>

        <div className="mt-24 max-w-prose">
          <h2 className="font-display text-3xl leading-snug">If you’re not technical</h2>
          <p className="mt-3 text-base text-muted-foreground leading-normal">
            Most clients aren’t. We keep things simple, explain decisions in plain
            language, and guide you through the process without jargon or overwhelm.
            You focus on your business; we handle the technical side.
          </p>
        </div>

        <div className="mt-24 max-w-prose">
          <h2 className="font-display text-3xl leading-snug">Working together</h2>
          <ul className="mt-3 list-disc pl-5 space-y-2 text-base text-muted-foreground leading-normal">
            <li>We learn your goals and what you need the software to do.</li>
            <li>We help shape the content and map out the simplest path forward.</li>
            <li>You see progress early instead of waiting for a big reveal.</li>
            <li>Communication stays clear and predictable.</li>
            <li>You get something you can actually use and update.</li>
          </ul>
        </div>

        <div className="mt-24 max-w-prose">
          <h2 className="font-display text-3xl leading-snug">Why “Console Logic”</h2>
          <p className="mt-3 text-base text-muted-foreground leading-normal">
            We built Console Logic after seeing too many teams struggle with slow,
            confusing, over engineered sites. We wanted the opposite: clear,
            pragmatic software that stays fast and understandable.
          </p>
          <p className="mt-3 text-base text-muted-foreground leading-normal">
            The console is where builders debug reality. The logic is where we keep
            things understandable. The goal is simple: software that works and keeps
            working.
          </p>
        </div>

        {/* Typical projects */}
        <div className="mt-24">
          <div className="card">
            <h3 className="card-title">Typical projects</h3>
            <ul className="card-text mt-3 list-disc pl-5 space-y-2">
              <li>Marketing sites with crisp UX and real SEO</li>
              <li>Internal tools that replace messy spreadsheets</li>
              <li>Client portals, lightweight CRMs, and workflow automation</li>
              <li>Modernizing front ends that have seen things</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 max-w-prose">
          <h2 className="font-display text-3xl leading-snug">Let’s build something that lasts</h2>
          <p className="mt-3 text-base text-muted-foreground leading-normal">
            If you want software that is fast, clear, and built to last, reach
            out. We would love to hear what you are working on.
          </p>
        </div>
      </Section>
    </>
  );
}