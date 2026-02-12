import { Helmet } from "react-helmet-async";
import Section from "../components/Section";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About — Console Logic</title>
        <meta
          name="description"
          content="Console Logic is a small studio focused on clean UX and clean code. We build pragmatic web apps and automations that stay fast, clear, and maintainable."
        />
        <link rel="canonical" href="https://console-logic.dev/about" />
      </Helmet>

      <Section>
        <header className="max-w-prose">
          <h1 className="font-display text-3xl">About</h1>
          <p className="mt-3 text-muted-foreground">
            Console Logic is a small studio focused on clean UX and clean code.
            We ship pragmatic web apps and automations with a focus on speed,
            clarity, and maintainability.
          </p>
        </header>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="card">
            <h3 className="card-title">What we do</h3>
            <p className="card-text">
              UI engineering, APIs, and thoughtful automation. We build products
              that feel calm to use and boring to maintain (the good kind of
              boring).
            </p>
          </div>

          <div className="card">
            <h3 className="card-title">Stack</h3>
            <p className="card-text">
              React, Node, Tailwind, TypeScript when it helps, and tooling that
              keeps the feedback loop tight.
            </p>
          </div>

          <div className="card">
            <h3 className="card-title">How we work</h3>
            <ul className="card-text mt-2 list-disc pl-5 space-y-1">
              <li>Start with the user flow, not the framework.</li>
              <li>Ship small, prove value, then scale.</li>
              <li>Prefer simple architecture over clever architecture.</li>
              <li>Make performance and accessibility default, not “later.”</li>
            </ul>
          </div>

          <div className="card">
            <h3 className="card-title">Good fit</h3>
            <p className="card-text">
              You want a site or app that loads fast, reads clearly, and doesn’t
              fall apart when someone touches it six months from now. You value
              communication, iteration, and shipping.
            </p>
            <p className="card-text mt-3">
              Not a fit: “Just make it go viral” with no content, no goals, and
              a deadline of yesterday.
            </p>
          </div>
        </div>

        <div className="mt-10 max-w-prose">
          <h2 className="font-display text-2xl">Why “Console Logic”</h2>
          <p className="mt-3 text-muted-foreground">
            Because great software is equal parts craft and constraint. The
            “console” is where builders debug reality. The “logic” is where we
            keep things understandable. The goal is simple: build things that
            work, and keep working.
          </p>
        </div>

        <div className="mt-10">
          <div className="card">
            <h3 className="card-title">Typical projects</h3>
            <ul className="card-text mt-2 list-disc pl-5 space-y-1">
              <li>Marketing sites with crisp UX and real SEO foundations</li>
              <li>Internal tools that replace messy spreadsheets</li>
              <li>Client portals, lightweight CRMs, and workflow automation</li>
              <li>Fixing or modernizing front ends that have… seen things</li>
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
