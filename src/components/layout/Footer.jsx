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
  showCraftedBy = true,
  yearStart,
}) {
  const year = new Date().getFullYear();
  const yearText =
    yearStart && yearStart !== year ? `${yearStart}-${year}` : `${year}`;

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
                <Logo className="text-base" />
              </a>
            ) : (
              <Link
                to={brandUrl}
                aria-label={brandName}
                className="inline-block transition-opacity hover:opacity-80"
              >
                <Logo className="text-base" />
              </Link>
            )}
            <p className="mt-2 text-sm text-muted-foreground max-w-xs leading-relaxed">
              Fast builds. Clean code. Clear communication.
            </p>
            <CommandPrompt className="mt-4" />
          </div>

          {/* Nav + contact columns */}
          <div className="flex flex-col gap-8 sm:flex-row sm:gap-14">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
                Navigate
              </p>
              <ul className="space-y-2">
                {navLinks.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
                Contact
              </p>
              <a
                href={`mailto:${contact.email}`}
                className="text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                {contact.email}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom: copyright */}
        <div className="mt-10 border-t border-border pt-6 text-xs font-mono text-muted-foreground">
          <span>
            © {yearText}{" "}
            {isExternal ? (
              <a
                href={brandUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={brandName}
                className="transition-opacity hover:opacity-80"
              >
                <Logo className="text-xs" showPrompt={false} />
              </a>
            ) : (
              <Link
                to={brandUrl}
                aria-label={brandName}
                className="transition-opacity hover:opacity-80"
              >
                <Logo className="text-xs" showPrompt={false} />
              </Link>
            )}
            {showCraftedBy && " | Crafted with logic"}
          </span>
        </div>
      </div>
    </footer>
  );
}
