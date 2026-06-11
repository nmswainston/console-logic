import { Link } from "react-router-dom";
import { contact } from "@/data/contact";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Work", to: "/projects" },
  { label: "About", to: "/about" },
];

export default function Footer({
  brandName = "console.log(ic)",
  brandUrl = "https://consolelogic.net",
  showCraftedBy = true,
  yearStart,
}) {
  const year = new Date().getFullYear();
  const yearText =
    yearStart && yearStart !== year ? `${yearStart}-${year}` : `${year}`;

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-screen-xl px-6 py-10">
        {/* Top row: brand + nav + contact */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand */}
          <div>
            <a
              href={brandUrl}
              className="font-mono text-base text-accent transition-colors hover:text-foreground"
            >
              {">_"}{brandName}
            </a>
            <p className="mt-2 text-sm text-muted-foreground max-w-xs leading-relaxed">
              Fast builds. Clean code. Clear communication.
            </p>
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
            <a
              href={brandUrl}
              className="text-accent hover:text-foreground transition-colors"
            >
              {brandName}
            </a>
            {showCraftedBy && " | Crafted with logic"}
          </span>
        </div>
      </div>
    </footer>
  );
}
