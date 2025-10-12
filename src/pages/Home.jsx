import Hero from "../components/Hero";
import Section from "../components/Section";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";
import { getMailtoHref } from "../data/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Section id="work">
        <h2 className="font-display text-2xl">Selected work</h2>
          <div className="mt-8 grid gap-6 gap-y-8 sm:grid-cols-2 md:grid-cols-3">
            {projects.slice(0, -4).map((p) => (
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
        <a href={getMailtoHref()} className="btn btn-primary mt-4">
          Start a conversation
        </a>
      </Section>
    </>
  );
}
