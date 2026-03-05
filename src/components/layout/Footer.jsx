export default function Footer({
  brandName = "console.log(ic)",
  brandUrl = "https://www.consolelogic.net",
  showCraftedBy = true,
  yearStart,
}) {
  const year = new Date().getFullYear();
  const yearText =
    yearStart && yearStart !== year ? `${yearStart}–${year}` : `${year}`;

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-screen-xl px-6 py-8 text-center text-sm font-mono text-muted-foreground leading-normal">
        <span>© {yearText} </span>
        <a
          href={brandUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline-offset-4 transition-colors hover:text-foreground"
        >
          {brandName}
        </a>
        {showCraftedBy && <span> | Crafted with logic</span>}
      </div>
    </footer>
  );
}
