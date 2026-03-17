import { Helmet } from "react-helmet-async";
import { useContactModal } from "@/context/ContactModalContext.jsx";
import Section from "@/components/Section.jsx";

export default function About() {
  const { openModal } = useContactModal();

  return (
    <>
      <Helmet>
        <title>About - console.log(ic)</title>
        <meta
          name="description"
          content="console.log(ic) builds fast, clear, maintainable websites and web apps for teams of all sizes, from non-technical founders to product-minded companies."
        />
        <link rel="canonical" href="https://consolelogic.net/about" />
      </Helmet>

      <Section>
        {/* Intro */}
        <header className="section-header max-w-prose">
          <p className="section-kicker">About</p>
          <h1 className="section-heading">Where builders debug reality</h1>
          <p className="section-intro">
            Console Logic builds software that makes life easier, not heavier. Websites,
            internal tools, and automations that stay fast, clear, and maintainable.
          </p>
        </header>

        {/* Cards */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="card">
            <h3 className="card-title">What we do</h3>
            <p className="card-text">
              UI engineering, APIs, and thoughtful automation. <br />Products that feel calm to use and boring to maintain.<br />
              the kind of boring where nothing breaks.
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
              Less ideal: projects with vague goals, little content, and
              unrealistic timelines.
            </p>
          </div>
        </div>

        <div className="mt-24 section-header max-w-prose">
          <p className="section-kicker">If you’re not technical</p>
          <h2 className="section-heading">We keep things simple</h2>
          <p className="section-intro">
            Most clients aren’t. We keep things simple, explain decisions in plain
            language, and guide you through the process without jargon or overwhelm.
            You focus on your business; we handle the technical side.
          </p>
        </div>

        <div className="mt-24">
          <div className="section-header max-w-prose mb-6">
            <p className="section-kicker">Working together</p>
            <h2 className="section-heading">How we collaborate</h2>
          </div>
          <div className="card max-w-2xl">
            <ul className="card-text list-disc pl-5 space-y-2">
              <li>We learn your goals and what you need the software to do.</li>
              <li>We help shape the content and map out the simplest path forward.</li>
              <li>You see progress early instead of waiting for a big reveal.</li>
              <li>Communication stays clear and predictable.</li>
              <li>You get something you can actually use and update.</li>
            </ul>
          </div>
        </div>

        <div className="mt-24 section-header max-w-prose">
          <p className="section-kicker">Why Console Logic</p>
          <h2 className="section-heading">The story behind the name</h2>
          <p className="section-intro">
            We built Console Logic after seeing too many teams struggle with slow,
            confusing, over-engineered sites.
            <br />We wanted the opposite: clear, pragmatic software that stays fast and understandable.
          </p>
          <p className="section-intro mt-4">
            The console is where builders debug reality. 
            <br />The logic is where we keep things understandable. 
            <br />The goal is simple: software that works and keeps
            working.
          </p>
        </div>

        {/* Typical projects */}
        <div className="mt-24">
          <div className="section-header max-w-prose mb-6">
            <p className="section-kicker">What we build</p>
            <h2 className="section-heading">Typical projects</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="card">
              <h3 className="card-title">Project types</h3>
              <ul className="card-text mt-3 list-disc pl-5 space-y-2">
                <li>Marketing sites with crisp UX and real SEO</li>
                <li>Internal tools that replace messy spreadsheets</li>
                <li>Client portals, lightweight CRMs, and workflow automation</li>
                <li>Modernizing front ends that have seen things</li>
              </ul>
            </div>
            <div className="card">
              <h3 className="card-title">What we bring</h3>
              <p className="card-text">
                Clear milestones, steady progress, and a focus on what actually ships.
                No scope creep, no surprises. Just work that moves forward.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 section-header max-w-prose">
          <p className="section-kicker">Ready when you are</p>
          <h2 className="section-heading">Let’s build something that lasts</h2>
          <p className="section-intro">
          If the approach here sounds like the kind of work you want to do,
          we’d love to hear what you’re building.
          </p>
          <div className="mt-6">
            <button onClick={openModal} className="btn btn-primary">
              Start a conversation
            </button>
          </div>
        </div>
      </Section>
    </>
  );
}