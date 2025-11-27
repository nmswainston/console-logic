import Hero from "../components/Hero";
import { Helmet } from "react-helmet-async";
import Section from "../components/Section";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";
import { useContactModal } from "../context/ContactModalContext";

export default function Home() {
  const { openModal } = useContactModal();

  return (
    <>
      <Helmet>
        <title>Console Logic — Smart devs. Clean code.</title>
        <meta
          name="description"
          content="We build crisp frontends, tidy backends, and automations that keep teams moving."
        />
        <link rel="canonical" href="https://console-logic.dev/" />
      </Helmet>
      <Hero />
      <Section id="work">
        <h2 className="font-display text-2xl">Selected work</h2>
          <div className="mt-8 grid gap-6 gap-y-8 sm:grid-cols-2 md:grid-cols-3">
            {projects.map((p) => (
            <ProjectCard
              key={p.title}
              title={p.title}
              tag={p.tag}
              link={p.link}
              thumb={p.thumb}
            />
          ))}
        </div>
      </Section>
      <Section id="about">
        <h2 className="font-display text-2xl">About the studio</h2>
        <p className="mt-3 max-w-prose text-muted-foreground">
          We’re a small studio that believes clean design and clean code
          should shake hands. We prototype fast, ship thoughtfully, and
          maintain like pros.
        </p>
      </Section>
      <Section id="contact">
        <h2 className="font-display text-2xl">
          Let's build something useful
        </h2>
        <button onClick={openModal} className="btn btn-primary mt-4">
          Start a conversation
        </button>
      </Section>
    </>
  );
}
