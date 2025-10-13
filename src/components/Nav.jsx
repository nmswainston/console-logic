import { Link, NavLink } from "react-router-dom";
import { useContactModal } from "../context/ContactModalContext";

export default function Nav() {
  const { openModal } = useContactModal();

  return (
    <>
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
              <NavLink
                className={({ isActive }) =>
                  `focus-ring transition-colors ${isActive ? "text-foreground" : "hover:text-foreground"}`
                }
                to="/projects"
                aria-label="See selected work"
              >
                Work
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `focus-ring transition-colors ${isActive ? "text-foreground" : "hover:text-foreground"}`
                }
                to="/about"
                aria-label="Learn about the studio"
              >
                About
              </NavLink>
            </li>
            <li>
              <button
                onClick={openModal}
                className="focus-ring btn btn-primary"
                aria-label="Start a conversation"
              >
                Let's talk
              </button>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
