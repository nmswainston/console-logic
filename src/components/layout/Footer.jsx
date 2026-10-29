import { Link } from "react-router-dom";
import { contact } from "@/data/contact";
import Logo from "@/components/Logo.jsx";
import CommandPrompt from "@/components/CommandPrompt.jsx";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Work", to: "/projects" },
  { label: "About", to: "/about" },
];

export default function Footer({
  brandName = "console.log(ic)",
  brandUrl = "/",
}) {
  const year = new Date().getFullYear();

  const isExternal = /^https?:\/\//.test(brandUrl);

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-screen-xl px-6 py-10">
        {/* Top row: brand + nav + contact */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand */}
          <div>
            {isExternal ? (
              <a
                href={brandUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={brandName}
                className="inline-block transition-opacity hover:opacity-80"
              >
                <Logo className="text-sm leading-relaxed" />
              </a>
            ) : (
              <Link
                to={brandUrl}
                aria-label={brandName}
                className="inline-block transition-opacity hover:opacity-80"
              >
                <Logo className="text-sm leading-relaxed" />
              </Link>
            )}
            <p className="font-mono text-sm leading-relaxed text-muted-foreground">
              Fast builds. Clean code. Clear communication.
            </p>
            {/* The button keeps a 44px tap target, so its 20px of type sits
                centred with ~12px of slack above. The negative margin pulls it
                back onto the terminal row rhythm without shrinking the target. */}
            <CommandPrompt className="-mt-3 leading-relaxed" />
          </div>

          {/* Nav + contact columns */}
          <div className="flex flex-col gap-8 sm:flex-row sm:gap-14">
            <nav aria-label="Footer">
              <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
                Navigate
              </p>
              <ul className="space-y-2">
                {navLinks.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="focus-ring text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
                Contact
              </p>
              <a
                href={`mailto:${contact.email}`}
                className="focus-ring text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                {contact.email}
              </a>
              <p className="mt-2 text-sm text-muted-foreground">
                {contact.location}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom: legal line. The legal entity is spelled out in plain text
            (not the logo) so it reads exactly as "ConsoleLogic LLC" to people,
            crawlers, and reviewers. */}
        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs font-mono text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {contact.legalName}. {brandName} is a brand of{" "}
            {contact.legalName}.
          </p>
          <p>
            <Link
              to="/privacy"
              className="focus-ring underline underline-offset-4 hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
