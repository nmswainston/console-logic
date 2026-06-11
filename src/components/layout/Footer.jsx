import { Link } from "react-router-dom";

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
  const brandClassName =
    "text-accent underline-offset-4 transition-colors hover:text-foreground";

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-screen-xl px-6 py-8 text-center text-sm font-mono text-muted-foreground leading-normal">
        <span>© {yearText} </span>
        {isExternal ? (
          <a
            href={brandUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={brandClassName}
          >
            {brandName}
          </a>
        ) : (
          <Link to={brandUrl} className={brandClassName}>
            {brandName}
          </Link>
        )}
        {showCraftedBy && <span> | Crafted with logic</span>}
      </div>
    </footer>
  );
}
