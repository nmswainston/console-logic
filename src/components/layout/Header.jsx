import { useState, useCallback, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useContactModal } from "@/context/ContactModalContext.jsx";
import Logo from "@/components/Logo.jsx";

export default function Header() {
  const { openModal } = useContactModal();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const panelRef = useRef(null);
  const closedByNavigationRef = useRef(false);
  const wasOpenRef = useRef(false);

  const closeMenu = useCallback((byNavigation = false) => {
    closedByNavigationRef.current = byNavigation;
    setMenuOpen(false);
  }, []);

  const handleHomeClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleHomeNavClick = () => {
    handleHomeClick();
    closeMenu(true);
  };

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeMenu();
    };
    if (menuOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [menuOpen, closeMenu]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuOpen &&
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(e.target)
      ) {
        closeMenu();
      }
    };
    if (menuOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [menuOpen, closeMenu]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [menuOpen]);

  // Return focus to menu button when closing (not when navigating).
  // Skip on initial mount so the button is not focused before the menu
  // has ever been opened.
  useEffect(() => {
    if (menuOpen) {
      wasOpenRef.current = true;
      return;
    }
    if (wasOpenRef.current && !closedByNavigationRef.current) {
      menuButtonRef.current?.focus();
    }
    closedByNavigationRef.current = false;
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-surface/80 backdrop-blur">
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

        {/* Desktop nav - hidden on mobile */}
        <ul className="hidden md:flex items-center gap-6 text-base text-muted-foreground leading-normal">
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
              onClick={() => openModal("header")}
              className="focus-ring btn btn-primary"
              aria-label="Start a conversation"
            >
              Let&apos;s talk
            </button>
          </li>
        </ul>

        {/* Mobile menu button - visible only on mobile */}
        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-panel"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="focus-ring flex md:hidden min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground active:text-foreground"
        >
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          <svg
            aria-hidden
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-200 ${menuOpen ? "rotate-90" : ""}`}
          >
            {menuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu panel */}
      <div
        id="mobile-nav-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`mobile-nav-panel md:hidden fixed inset-x-0 top-16 z-30 overflow-y-auto backdrop-blur transition-[opacity,transform] duration-200 ease-out ${
          menuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
        style={{ visibility: menuOpen ? "visible" : "hidden" }}
      >
        <div className="mx-auto max-w-screen-xl px-6 py-4">
          <ul className="flex flex-col gap-0.5">
            <li>
              <NavLink
                to="/"
                end
                onClick={handleHomeNavClick}
                aria-label="Go to home"
                className={({ isActive }) =>
                  `focus-ring block rounded-lg px-4 py-3.5 text-base font-medium transition-colors border-l-2 ${
                    isActive
                      ? "text-foreground bg-[var(--color-terminal-green-subtle)] border-l-accent"
                      : "border-l-transparent text-muted-foreground hover:text-foreground hover:bg-[var(--color-terminal-green-subtle)] active:bg-[var(--color-terminal-green-subtle)]"
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/projects"
                onClick={() => closeMenu(true)}
                aria-label="See selected work"
                className={({ isActive }) =>
                  `focus-ring block rounded-lg px-4 py-3.5 text-base font-medium transition-colors border-l-2 ${
                    isActive
                      ? "text-foreground bg-[var(--color-terminal-green-subtle)] border-l-accent"
                      : "border-l-transparent text-muted-foreground hover:text-foreground hover:bg-[var(--color-terminal-green-subtle)] active:bg-[var(--color-terminal-green-subtle)]"
                  }`
                }
              >
                Work
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                onClick={() => closeMenu(true)}
                aria-label="Learn about the studio"
                className={({ isActive }) =>
                  `focus-ring block rounded-lg px-4 py-3.5 text-base font-medium transition-colors border-l-2 ${
                    isActive
                      ? "text-foreground bg-[var(--color-terminal-green-subtle)] border-l-accent"
                      : "border-l-transparent text-muted-foreground hover:text-foreground hover:bg-[var(--color-terminal-green-subtle)] active:bg-[var(--color-terminal-green-subtle)]"
                  }`
                }
              >
                About
              </NavLink>
            </li>
            <li className="mt-2 pt-2 border-t border-border">
              <button
                onClick={() => {
                  openModal("header-mobile");
                  closeMenu(true);
                }}
                className="focus-ring btn btn-primary w-full justify-center"
                aria-label="Start a conversation"
              >
                Let&apos;s talk
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
