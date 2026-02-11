export default function ProjectCard({ title, tag, link = "#", thumb }) {
  const isExternal = /^https?:\/\//.test(link);
  return (
    <a
      href={link}
      aria-label={`${title} – ${tag}`}
      className="focus-ring group block rounded-xl border border-border/60 bg-elevated overflow-hidden transition hover:shadow-glow"
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      <div className="p-5 pb-0">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-surface/40">
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

      <div className="p-5">
        <div className="text-xs uppercase tracking-wide text-muted-foreground">
          {tag}
        </div>
        <div className="mt-2 font-medium">{title}</div>
        <div className="mt-3 text-sm text-muted-foreground transition-colors group-hover:text-foreground">
          View →
        </div>
      </div>

    </a>
  );
}
