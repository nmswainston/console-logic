import { Link } from "react-router-dom";

function ExternalLinkIcon({ className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
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

export default function ProjectCard({ title, tag, description, link = "#", slug, thumb, priority = false }) {
  const hasExternalLink = link && /^https?:\/\//.test(link);
  const caseStudyUrl = slug ? `/projects/${slug}` : null;

  const previewContent = (
    <>
      <div className="project-card-image-wrap p-6 pb-0">
        <div className="preview-frame relative aspect-[16/10] w-full overflow-hidden rounded-lg">
          {thumb ? (
            <div className="flex h-full w-full items-center justify-center p-4">
              <img
                src={thumb}
                width="800"
                height="480"
                alt=""
                loading={priority ? "eager" : "lazy"}
                decoding="async"
                {...(priority && { fetchpriority: "high" })}
                className="max-h-full max-w-full object-contain transition-transform duration-200 ease-out group-hover:scale-[1.03]"
              />
            </div>
          ) : (
            <div className="absolute inset-0 bg-surface" />
          )}
        </div>
      </div>

      <div className="px-6 pt-6 pb-0 flex flex-col">
        <div className="text-sm uppercase tracking-wide text-muted-foreground leading-normal">
          {tag}
        </div>
        <div className="mt-2 font-medium text-base leading-snug">{title}</div>
      </div>
    </>
  );

  // inOverlay renders the hover-overlay copy: identical layout, but the links
  // are removed from the tab order (keyboard users get the in-flow originals).
  const ctaRow = (inOverlay = false) => (
    <div className="pt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground leading-normal transition-colors group-hover:text-foreground">
      {caseStudyUrl ? (
        <>
          <Link
            to={caseStudyUrl}
            tabIndex={inOverlay ? -1 : undefined}
            className="inline-flex items-center gap-1.5 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-terminal-green focus:ring-offset-1 rounded font-medium"
          >
            View case study
            <span aria-hidden>→</span>
          </Link>
          {hasExternalLink && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={inOverlay ? -1 : undefined}
              className="inline-flex items-center gap-1 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-terminal-green focus:ring-offset-1 rounded"
            >
              See live site
              <ExternalLinkIcon className="opacity-70" />
            </a>
          )}
        </>
      ) : (
        <span>See live site</span>
      )}
    </div>
  );

  /* Bottom panel: clamped description + CTA row in flow (defines the card's
     collapsed size), plus a hover overlay holding the full description and
     the same CTA row, which expands over the page instead of pushing it. */
  const bottomPanel = (
    <div className="relative px-6 pb-6">
      {description && (
        <p className="project-card-description mt-2 text-sm text-muted-foreground leading-normal">
          {description}
        </p>
      )}
      {ctaRow()}
      {description && (
        <div className="project-card-overlay" aria-hidden="true">
          {/* Inside a TerminalCard tile, this box continues the inner card's
              border so the text box visibly expands along with the tile;
              standalone (Work page) it is unstyled. */}
          <div className="project-card-overlay-box">
            {/* No mt-2 here: the in-flow copy's top margin collapses out of
                the wrapper, but inside the absolutely-positioned overlay it
                would not, which would push this copy 8px lower. */}
            <p className="text-sm text-muted-foreground leading-normal pointer-events-none">
              {description}
            </p>
            {ctaRow(true)}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="group block rounded-lg border border-border bg-elevated project-card-hover focus-within:ring-2 focus-within:ring-terminal-green focus-within:ring-offset-0 relative">
      {caseStudyUrl ? (
        <Link
          to={caseStudyUrl}
          aria-label={`${title} - ${tag}`}
          className="block focus:outline-none"
        >
          {previewContent}
        </Link>
      ) : (
        <a
          href={link}
          aria-label={`${title} - ${tag}`}
          target={hasExternalLink ? "_blank" : undefined}
          rel={hasExternalLink ? "noopener noreferrer" : undefined}
          className="block focus:outline-none"
        >
          {previewContent}
        </a>
      )}
      {bottomPanel}

      {hasExternalLink && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${title} live site in new tab`}
          className="absolute top-[12px] right-[12px] z-10 p-1.5 rounded text-muted-foreground opacity-50 transition-opacity duration-200 ease-out hover:opacity-100 hover:text-foreground hover:bg-border/50 focus:outline-none focus:ring-2 focus:ring-terminal-green focus:ring-offset-1 group-hover:opacity-100"
        >
          <ExternalLinkIcon />
        </a>
      )}
    </div>
  );
}
