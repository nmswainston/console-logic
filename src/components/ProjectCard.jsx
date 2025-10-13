export default function ProjectCard({ title, tag, link = "#", thumb }) {
  const isExternal = /^https?:\/\//.test(link);
  return (
    <a
      href={link}
      aria-label={`${title} – ${tag}`}
      className="focus-ring group block rounded-xl border border-border/60 bg-elevated p-5 transition hover:shadow-glow"
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      <div className="overflow-hidden rounded-lg">
        <div className="relative aspect-video w-full">
          {thumb ? (
            <img
              src={thumb} width="800" height="450"
              alt=""
              loading="lazy"
              decoding="async"
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="absolute inset-0 bg-surface" />
          )}
        </div>
      </div>
      <div className="mt-4 text-xs uppercase tracking-wide text-muted-foreground">
        {tag}
      </div>
      <div className="mt-2 font-medium">{title}</div>
      <div className="mt-6 text-sm text-muted-foreground transition-colors group-hover:text-foreground">
        View →
      </div>
    </a>
  );
}
