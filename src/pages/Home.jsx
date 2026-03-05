import { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useContactModal } from "@/context/ContactModalContext.jsx";

import ScrollMotion from "@/components/motion/ScrollMotion.jsx";
import ScrollStagger from "@/components/motion/ScrollStagger.jsx";

import SectionLoader from "@/components/terminal/SectionLoader.jsx";
import TerminalCard from "@/components/terminal/TerminalCard.jsx";

import Hero from "@/components/Hero.jsx";
import Section from "@/components/Section.jsx";
import ProjectCard from "@/components/ProjectCard.jsx";

import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { SECTION_LOADER_OFFSET_CONTACT } from "@/data/constants";

export default function Home() {
  const { openModal } = useContactModal();
  const servicesRef = useRef(null);
  const workRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const [heroLoadingComplete, setHeroLoadingComplete] = useState(false);

  return (
    <>
      <Helmet>
        <title>Console Logic - Smart devs. Clean code.</title>
        <meta
          name="description"
          content="We build crisp frontends, tidy backends, and automations that keep teams moving."
        />
        <link rel="canonical" href="https://console-logic.dev/" />
      </Helmet>

      <Hero onHeroComplete={() => setHeroLoadingComplete(true)} />

      {/* Services */}
      <Section id="services" borderTop ref={servicesRef}>
        <SectionLoader label="loading section: services" sectionRef={servicesRef} waitForReady={heroLoadingComplete}>
        <ScrollMotion className="mt-6" useOpacity={false}>
          <h2 className="font-display text-3xl leading-snug">What we do best</h2>
          <p className="mt-3 text-base text-muted-foreground leading-normal">
            Clear flows, fast interfaces, and automation that quietly does its job.
            We focus on the parts of the stack that move the needle.
          </p>
        </ScrollMotion>

        <ScrollStagger className="mt-8 grid gap-6 md:grid-cols-3" initiallyVisible>
          {services.map((item) => (
            <TerminalCard key={item.title} className="h-full">
              <h3 className="card-title">{item.title}</h3>
              <p className="card-text">{item.text}</p>
            </TerminalCard>
          ))}
        </ScrollStagger>
        </SectionLoader>
      </Section>

      {/* Work */}
      <Section id="work" borderTop ref={workRef}>
        <SectionLoader label="loading section: work" sectionRef={workRef}>
        <ScrollMotion className="mt-6 flex items-end justify-between gap-4" useOpacity={false}>
          <div>
            <h2 className="font-display text-3xl leading-snug">Selected work</h2>
            <p className="mt-3 text-sm text-muted-foreground leading-normal">
              A few projects that show how we think about speed, clarity, and maintainability.
            </p>
          </div>
          <a
            href="/projects"
            className="text-base text-accent underline-offset-4 hover:underline leading-normal"
          >
            View all work
          </a>
        </ScrollMotion>

        <ScrollStagger className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3" initiallyVisible>
          {projects.slice(0, 6).map((p) => (
            <TerminalCard key={p.title}>
              <ProjectCard
                title={p.title}
                tag={p.tag}
                link={p.link}
                thumb={p.thumb}
              />
            </TerminalCard>
          ))}
        </ScrollStagger>
        </SectionLoader>
      </Section>

      {/* About */}
      <Section id="about" borderTop ref={aboutRef}>
        <SectionLoader label="loading section: about" sectionRef={aboutRef} isLastSection>
        <ScrollMotion className="mt-6 max-w-prose" useOpacity={false}>
          <h2 className="font-display text-3xl leading-snug">About the studio</h2>
          <p className="mt-3 text-base text-muted-foreground leading-normal">
            Console Logic is a small studio that cares about clear flows, simple
            architecture, and software that stays fast and understandable. Most
            of our clients are not developers. You bring the business context,
            we translate it into something that works.
          </p>
        </ScrollMotion>
        </SectionLoader>
      </Section>

      {/* Contact */}
      <Section id="contact" borderTop ref={contactRef}>
        <SectionLoader label="loading section: contact" sectionRef={contactRef} offset={SECTION_LOADER_OFFSET_CONTACT}>
        <ScrollMotion className="mt-6 max-w-2xl" useOpacity={false}>
          <h2 className="font-display text-3xl leading-snug">
            Let us make your software less stressful
          </h2>
          <p className="mt-3 text-base text-muted-foreground leading-normal">
            Whether you need a new site, a cleaner frontend, or automation that
            quietly does its job, we focus on shipping useful things and keeping
            them easy to live with.
          </p>

          <ScrollStagger className="mt-8 flex flex-wrap items-center gap-4" initiallyVisible>
            <button
              onClick={openModal}
              className="btn btn-primary"
            >
              Start a conversation
            </button>
            <a href="#hero" className="btn btn-ghost">
              Back to top
            </a>
          </ScrollStagger>
        </ScrollMotion>
        </SectionLoader>
      </Section>
    </>
  );
}
