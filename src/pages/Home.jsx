import { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useContactModal } from "@/context/ContactModalContext.jsx";

import ScrollMotion from "@/components/motion/ScrollMotion.jsx";
import ScrollStagger from "@/components/motion/ScrollStagger.jsx";

import SectionLoader from "@/components/terminal/SectionLoader.jsx";
import TerminalCard from "@/components/terminal/TerminalCard.jsx";

import Hero from "@/components/Hero.jsx";
import TrustSection from "@/components/TrustSection.jsx";
import Section from "@/components/Section.jsx";
import ProjectCard from "@/components/ProjectCard.jsx";

import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { SECTION_LOADER_OFFSET_CONTACT } from "@/data/constants";

// TODO: Replace these with real client quotes before going live.
// Keep each quote short (1–2 sentences) and attribute to first name + role/company.
const testimonials = [
  {
    quote:
      "Console Logic delivered a clean, fast site and made the whole process easy to follow. No jargon, no surprises — just a site that works.",
    name: "Client name",
    role: "Founder",
  },
  {
    quote:
      "We replaced a mess of spreadsheets with an internal tool that actually fits how our team works. It's been running quietly in the background ever since.",
    name: "Client name",
    role: "Operations lead",
  },
];

export default function Home() {
  const { openModal } = useContactModal();
  const servicesRef = useRef(null);
  const workRef = useRef(null);
  const aboutRef = useRef(null);
  const testimonialsRef = useRef(null);
  const contactRef = useRef(null);
  const [heroLoadingComplete, setHeroLoadingComplete] = useState(false);

  return (
    <>
      <Helmet>
        <title>console.log(ic) - Smart devs. Clean code.</title>
        <meta
          name="description"
          content="We build crisp frontends, tidy backends, and automations that keep teams moving."
        />
        <link rel="canonical" href="https://consolelogic.net/" />
      </Helmet>

      <Hero onHeroComplete={() => setHeroLoadingComplete(true)} />

      <TrustSection waitForReady={heroLoadingComplete} />

      {/* Services */}
      <Section id="services" borderTop ref={servicesRef}>
        <SectionLoader label="loading section: services" sectionRef={servicesRef} waitForReady={heroLoadingComplete}>
          <div className="section-surface-panel">
            <ScrollMotion className="section-header" useOpacity={false}>
              <p className="section-kicker">Services</p>
              <h2 id="services-heading" className="section-heading">
                What we do best
              </h2>
              <p className="section-intro">
                We focus on clear flows, fast interfaces, and automation that quietly does its job -
                the parts of the stack that move the needle.
              </p>
            </ScrollMotion>

            <ScrollStagger className="section-content section-grid-gap grid md:grid-cols-3" initiallyVisible>
              {services.map((item) => (
                <TerminalCard key={item.title} className="h-full">
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-text">{item.text}</p>
                </TerminalCard>
              ))}
            </ScrollStagger>
          </div>
        </SectionLoader>
      </Section>

      {/* Work */}
      <Section id="work" borderTop ref={workRef}>
        <SectionLoader label="loading section: work" sectionRef={workRef}>
          <ScrollMotion className="section-header-flex" useOpacity={false}>
            <div className="max-w-2xl">
              <p className="section-kicker">Portfolio</p>
              <h2 id="work-heading" className="section-heading">
                Selected work
              </h2>
              <p className="section-intro">
                Projects that demonstrate clear UX thinking, fast performance, and maintainable
                implementation - so the result works well and stays easy to evolve.
              </p>
            </div>
            <a
              href="/projects"
              className="inline-flex items-center min-h-[44px] py-2 text-base text-accent underline-offset-4 hover:underline leading-normal shrink-0"
            >
              View all work
            </a>
          </ScrollMotion>

          <ScrollStagger className="section-content section-grid-gap grid sm:grid-cols-2 md:grid-cols-3" initiallyVisible>
            {projects.slice(0, 6).map((p) => (
              <TerminalCard key={p.title}>
                <ProjectCard
                  title={p.title}
                  tag={p.tag}
                  description={p.description}
                  link={p.link}
                  slug={p.slug}
                  thumb={p.thumb}
                />
              </TerminalCard>
            ))}
          </ScrollStagger>
        </SectionLoader>
      </Section>

      {/* About */}
      <Section id="about" borderTop ref={aboutRef}>
        <SectionLoader label="loading section: about" sectionRef={aboutRef}>
          <div className="section-surface-panel">
            <ScrollMotion className="section-header" useOpacity={false}>
              <p className="section-kicker">About</p>
              <h2 id="about-heading" className="section-heading">
                About the studio
              </h2>
              <p className="section-intro">
                A small studio focused on clear flows, simple architecture, and software that stays
                fast and understandable. You bring the business context; we translate it into
                something that works.
              </p>
            </ScrollMotion>

            <ScrollStagger className="section-content section-grid-gap grid md:grid-cols-3" initiallyVisible>
              {[
                {
                  title: "Clear communication",
                  text: "Projects move forward when everyone understands the plan. We keep decisions transparent and explain the technical parts in plain language.",
                },
                {
                  title: "Practical architecture",
                  text: "Simple systems age better than clever ones. We design software that teams can understand, maintain, and extend.",
                },
                {
                  title: "Maintainable builds",
                  text: "The goal is software that stays easy to live with. Fast, readable, and structured so future updates are straightforward.",
                },
              ].map((item) => (
                <TerminalCard key={item.title} className="h-full">
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-text">{item.text}</p>
                </TerminalCard>
              ))}
            </ScrollStagger>
          </div>
        </SectionLoader>
      </Section>

      {/* Testimonials */}
      <Section id="testimonials" borderTop ref={testimonialsRef}>
        <SectionLoader label="loading section: testimonials" sectionRef={testimonialsRef} isLastSection>
          <div className="section-surface-panel">
            <ScrollMotion className="section-header" useOpacity={false}>
              <p className="section-kicker">What clients say</p>
              <h2 id="testimonials-heading" className="section-heading">
                Heard from the people we build for
              </h2>
            </ScrollMotion>

            <ScrollStagger className="section-content section-grid-gap grid md:grid-cols-2" initiallyVisible>
              {testimonials.map((t) => (
                <TerminalCard key={t.name + t.role} className="h-full">
                  <p className="card-text text-base leading-relaxed">
                    {"“"}{t.quote}{"”"}
                  </p>
                  <p className="mt-4 text-sm font-mono text-terminal-green">
                    {"—"} {t.name},{" "}
                    <span className="text-muted-foreground">{t.role}</span>
                  </p>
                </TerminalCard>
              ))}
            </ScrollStagger>
          </div>
        </SectionLoader>
      </Section>

      {/* Contact */}
      <Section id="contact" borderTop ref={contactRef}>
        <SectionLoader label="loading section: contact" sectionRef={contactRef} offset={SECTION_LOADER_OFFSET_CONTACT}>
          <div className="section-surface-panel">
            <ScrollMotion className="section-header" useOpacity={false}>
              <p className="section-kicker">Get in touch</p>
              <h2 id="contact-heading" className="section-heading">
                Let us make your software less stressful
              </h2>
              <p className="section-intro">
                Whether you need a new site, a cleaner frontend, or automation that quietly does
                its job. We ship useful things and keep them easy to live with.
              </p>
              <p className="mt-3 text-sm font-mono text-terminal-green">
                {">"} We typically respond within one business day.
              </p>

              <ScrollStagger
                className="mt-6 mb-7 section-cta-gap flex flex-wrap items-center"
                initiallyVisible
              >
                <button
                  onClick={openModal}
                  className="btn btn-primary"
                >
                  Start a conversation
                </button>
                <button
                  type="button"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="btn btn-ghost inline-flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  Back to top
                </button>
              </ScrollStagger>
            </ScrollMotion>
          </div>
        </SectionLoader>
      </Section>
    </>
  );
}
