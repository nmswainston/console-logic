export default function Nav() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-surface/80 backdrop-blur">
      <nav
        role="navigation"
        aria-label="Primary"
        className="mx-auto flex max-w-screen-xl items-center justify-between px-6 py-4"
      >
        <a
          href="/"
          aria-label="Console Logic home"
          className="focus-ring group inline-flex items-center gap-2"
        >
          <span className="h-2 w-2 rounded-sm bg-terminal-green shadow-glow"></span>
          <span className="font-display text-lg tracking-tight">
            console.log(ic)
          </span>
        </a>
        <ul className="flex items-center gap-6 text-sm text-muted-foreground">
          <li>
            <a
              className="focus-ring hover:text-foreground transition-colors"
              href="#work"
              aria-label="See selected work"
            >
              Work
            </a>
          </li>
          <li>
            <a
              className="focus-ring hover:text-foreground transition-colors"
              href="#about"
              aria-label="Learn about the studio"
            >
              About
            </a>
          </li>
          <li>
            <a
              className="focus-ring btn btn-primary"
              href="#contact"
              aria-label="Start a conversation"
            >
              Let’s talk
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
