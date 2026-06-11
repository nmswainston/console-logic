import { Head } from "vite-react-ssg";
import { useParams, Link } from "react-router-dom";
import Section from "@/components/Section.jsx";
import { getProjectBySlug, getAdjacentProjects } from "@/data/projects";

function ExternalLinkIcon({ className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export default function ProjectCaseStudy() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <>
        <Head>
          <title>Project not found | console.log(ic)</title>
          <meta name="robots" content="noindex, follow" />
        </Head>
        <main className="min-h-[100dvh] grid place-items-center p-8">
          <div className="text-center max-w-lg">
            <div className="font-mono text-terminal-green">$ error</div>
            <h1 className="mt-2 font-display text-4xl leading-snug">
              Project not found
              <span className="ml-1 inline-block w-[0.6em] h-[1em] translate-y-[2px] bg-terminal-green cursor-blink" aria-hidden />
            </h1>
            <p className="mt-3 text-base text-muted-foreground leading-normal">
              This case study doesn&apos;t exist. Head back to see our work.
            </p>
            <Link to="/projects" className="btn btn-primary mt-6">
              View all projects
            </Link>
          </div>
        </main>
      </>
    );
  }

  const { title, tag, thumb, description, overview, problem, approach, outcome, techStack, link } = project;
  const hasLiveSite = link && /^https?:\/\//.test(link);
  const { prev, next } = getAdjacentProjects(slug);
  const canonical = `https://consolelogic.net/projects/${slug}`;
  const metaDescription = overview || description;
  const ogImage = thumb ? `https://consolelogic.net${thumb}` : "https://consolelogic.net/og.png";

  return (
    <>
      <Head>
        <title>{title} - console.log(ic)</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${title} - console.log(ic)`} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:title" content={`${title} - console.log(ic)`} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={ogImage} />
      </Head>

      <Section>
        <header className="section-header max-w-3xl">
          <p className="section-kicker">{tag}</p>
          <h1 className="section-heading">{title}</h1>
          {overview && (
            <p className="section-intro mt-4">{overview}</p>
          )}
          {hasLiveSite && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-6 inline-flex items-center gap-2"
            >
              View live site
              <ExternalLinkIcon />
            </a>
          )}
        </header>

        {thumb && (
          <div className="mt-10 rounded-lg overflow-hidden border border-border bg-elevated">
            <div className="aspect-[16/10] w-full flex items-center justify-center p-6 md:p-10">
              <img
                src={thumb}
                alt=""
                width="1200"
                height="675"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>
        )}

        <div className="mt-16 max-w-3xl space-y-12">
          {problem && (
            <section>
              <h2 className="font-display text-xl font-semibold text-foreground">Problem</h2>
              <p className="mt-3 text-base text-muted-foreground leading-relaxed">{problem}</p>
            </section>
          )}

          {approach && (
            <section>
              <h2 className="font-display text-xl font-semibold text-foreground">Approach</h2>
              <p className="mt-3 text-base text-muted-foreground leading-relaxed">{approach}</p>
            </section>
          )}

          {outcome && (
            <section>
              <h2 className="font-display text-xl font-semibold text-foreground">Outcome</h2>
              <p className="mt-3 text-base text-muted-foreground leading-relaxed">{outcome}</p>
            </section>
          )}

          {techStack && techStack.length > 0 && (
            <section>
              <h2 className="font-display text-xl font-semibold text-foreground">Tech stack</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <li
                    key={tech}
                    className="px-3 py-1.5 rounded-md bg-elevated border border-border text-sm font-mono text-muted-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <nav
          className="mt-16 pt-10 border-t border-border"
          aria-label="Project navigation"
        >
          <div className="flex justify-between items-center gap-4">
            <Link
              to="/projects"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap min-w-0"
            >
              ← Back to all projects
            </Link>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap shrink-0"
            >
              Back to top
            </button>
          </div>

          <div
            className={`mt-8 grid gap-3 items-stretch ${prev && next ? "sm:grid-cols-2" : "grid-cols-1"}`}
          >
            {prev && (
              <Link
                to={`/projects/${prev.slug}`}
                className="flex flex-col rounded-lg border border-border bg-surface/60 p-4 transition hover:border-accent/40 focus-ring focus:outline-none"
              >
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  ← Previous
                </span>
                <span className="mt-1 text-base font-medium text-foreground">
                  {prev.title}
                </span>
              </Link>
            )}
            {next && (
              <Link
                to={`/projects/${next.slug}`}
                className="flex flex-col rounded-lg border border-border bg-surface/60 p-4 transition hover:border-accent/40 focus-ring focus:outline-none text-right"
              >
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  Next →
                </span>
                <span className="mt-1 text-base font-medium text-foreground">
                  {next.title}
                </span>
              </Link>
            )}
          </div>
        </nav>
      </Section>
    </>
  );
}
