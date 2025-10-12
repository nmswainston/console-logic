import Section from "../components/Section";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";

export default function Projects() {
  return (
    <>
      <Section>
        <h1 className="font-display text-3xl">Projects</h1>
        <p className="mt-3 max-w-prose text-muted-foreground">
          A selection of recent work across apps, sites, and systems.
        </p>
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
    </>
  );
}


