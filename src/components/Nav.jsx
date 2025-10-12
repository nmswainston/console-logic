import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-surface/80 backdrop-blur">
      <nav
        role="navigation"
        aria-label="Primary"
        className="mx-auto flex max-w-screen-xl items-center justify-between px-6 py-4"
      >
        <Link
          to="/"
          aria-label="Console Logic home"
          className="focus-ring group inline-flex items-center gap-2"
        >
          <span className="font-display text-lg tracking-tight">
            console.log(ic)
          </span>
        </Link>
        <ul className="flex items-center gap-6 text-sm text-muted-foreground">
          <li>
            <Link
              className="focus-ring hover:text-foreground transition-colors"
              to="/projects"
              aria-label="See selected work"
            >
              Work
            </Link>
          </li>
          <li>
            <Link
              className="focus-ring hover:text-foreground transition-colors"
              to="/about"
              aria-label="Learn about the studio"
            >
              About
            </Link>
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
