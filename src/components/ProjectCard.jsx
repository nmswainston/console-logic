export default function ProjectCard({ title, tag, link = "#", thumb }) {
  const isExternal = /^https?:\/\//.test(link);
  return (
    <a
      href={link}
      aria-label={`${title} – ${tag}`}
      className="group block rounded-lg border border-border bg-elevated overflow-hidden transition hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-terminal-green focus:ring-offset-0"
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      <div className="p-6 pb-0">
        <div className="preview-frame relative aspect-[16/10] w-full overflow-hidden rounded-lg">
          {thumb ? (
            <div className="flex h-full w-full items-center justify-center p-4">
              <img
                src={thumb}
                width="800"
                height="480"
                alt=""
                loading="lazy"
                decoding="async"
                fetchPriority="high"
                className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>
          ) : (
            <div className="absolute inset-0 bg-surface" />
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="text-sm uppercase tracking-wide text-muted-foreground leading-normal">
          {tag}
        </div>
        <div className="mt-2 font-medium text-base leading-snug">{title}</div>
        <div className="mt-3 text-sm text-muted-foreground leading-normal transition-colors group-hover:text-foreground">
          View →
        </div>
      </div>
    </a>
  );
}
