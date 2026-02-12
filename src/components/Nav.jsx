import { Link, NavLink, useLocation } from "react-router-dom";
import { useContactModal } from "../context/ContactModalContext";
import Logo from "../components/Logo";

export default function Nav() {
  const { openModal } = useContactModal();
  const location = useLocation();

  const handleHomeClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-surface/80 backdrop-blur">
      <nav
        role="navigation"
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-6"
      >
        <Link
          to="/"
          aria-label="console.log(ic) home"
          className="focus-ring group inline-flex items-center gap-2 transition-opacity hover:opacity-90"
          onClick={handleHomeClick}
        >
          <Logo />
        </Link>

        <ul className="flex items-center gap-6 text-sm text-muted-foreground">
          <li>
            <NavLink
              to="/"
              aria-label="Go to home"
              onClick={handleHomeClick}
              className={({ isActive }) =>
                `focus-ring transition-colors ${
                  isActive ? "text-foreground" : "hover:text-foreground"
                }`
              }
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/projects"
              aria-label="See selected work"
              className={({ isActive }) =>
                `focus-ring transition-colors ${
                  isActive ? "text-foreground" : "hover:text-foreground"
                }`
              }
            >
              Work
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/about"
              aria-label="Learn about the studio"
              className={({ isActive }) =>
                `focus-ring transition-colors ${
                  isActive ? "text-foreground" : "hover:text-foreground"
                }`
              }
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
              Let&apos;s talk
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
