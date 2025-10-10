import Nav from "../components/Nav";
import Hero from "../components/Hero";
import Section from "../components/Section";
import ProjectCard from "../components/ProjectCard";
import Footer from "../components/Footer";
import { projects } from "../data/projects";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Section id="work">
          <h2 className="font-display text-2xl">Selected work</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
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
          <a href="#" className="btn btn-primary mt-4">
            Start a conversation
          </a>
        </Section>
      </main>
      <Footer />
    </>
  );
}
