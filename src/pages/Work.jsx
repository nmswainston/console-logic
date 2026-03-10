import { Helmet } from "react-helmet-async";
import Section from "@/components/Section.jsx";
import ProjectCard from "@/components/ProjectCard.jsx";
import { projects } from "@/data/projects";

export default function Work() {
  return (
    <>
      <Helmet>
        <title>Projects - console.log(ic)</title>
        <meta
          name="description"
          content="A selection of recent work across apps, sites, and systems."
        />
        <link rel="canonical" href="https://console-logic.dev/projects" />
      </Helmet>
      <Section>
        <h1 className="font-display text-3xl leading-snug sm:text-4xl md:text-5xl">Projects</h1>
        <p className="mt-3 max-w-prose text-base text-muted-foreground leading-normal">
          A selection of recent work across apps, sites, and systems.
        </p>
        <div className="mt-8 grid gap-6 gap-y-8 sm:grid-cols-2 md:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.title}
              title={p.title}
              tag={p.tag}
              description={p.description}
              link={p.link}
              slug={p.slug}
              thumb={p.thumb}
              priority={i < 3}
            />
          ))}
        </div>
      </Section>
    </>
  );
}
