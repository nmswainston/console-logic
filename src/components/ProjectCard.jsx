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

  const cardContent = (
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
                fetchpriority={priority ? "high" : undefined}
                className="max-h-full max-w-full object-contain transition-transform duration-200 ease-out group-hover:scale-[1.03]"
              />
            </div>
          ) : (
            <div className="absolute inset-0 bg-surface" />
          )}
        </div>
      </div>

      <div className="p-6 flex flex-col min-h-[140px]">
        <div className="text-sm uppercase tracking-wide text-muted-foreground leading-normal">
          {tag}
        </div>
        <div className="mt-2 font-medium text-base leading-snug">{title}</div>
        {description && (
          <div className="mt-2">
            <div className="project-card-description-reveal">
              <p className="text-sm text-muted-foreground leading-normal pr-0">
                {description}
              </p>
            </div>
          </div>
        )}
        <div className="mt-auto pt-3 text-sm text-muted-foreground leading-normal transition-colors group-hover:text-foreground">
          View project
        </div>
      </div>
    </>
  );

  return (
    <div className="group block rounded-lg border border-border bg-elevated overflow-hidden project-card-hover focus-within:ring-2 focus-within:ring-terminal-green focus-within:ring-offset-0 relative">
      {caseStudyUrl ? (
        <Link
          to={caseStudyUrl}
          aria-label={`${title} - ${tag}`}
          className="block focus:outline-none"
        >
          {cardContent}
        </Link>
      ) : (
        <a
          href={link}
          aria-label={`${title} - ${tag}`}
          target={hasExternalLink ? "_blank" : undefined}
          rel={hasExternalLink ? "noopener noreferrer" : undefined}
          className="block focus:outline-none"
        >
          {cardContent}
        </a>
      )}

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
