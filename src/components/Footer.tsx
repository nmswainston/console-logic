import React from "react";

type FooterProps = {
  brandName?: string;          // What to display
  brandUrl?: string;           // Where it should link
  showCraftedBy?: boolean;     // Hide on certain client work if needed
  yearStart?: number;          // Optional start year if you want 2024–2026
};

export default function Footer({
  brandName = "console.log(ic)",
  brandUrl = "https://www.consolelogic.net",
  showCraftedBy = true,
  yearStart,
}: FooterProps) {
  const year = new Date().getFullYear();
  const yearText =
    yearStart && yearStart !== year ? `${yearStart}–${year}` : `${year}`;

  return (
    <footer className="border-t border-white/15">
      <div className="mx-auto max-w-screen-xl px-6 py-8 text-center text-xs font-mono text-muted-foreground">
        <span>© {yearText} </span>
        <a
          href={brandUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline-offset-4 transition-colors hover:text-foreground"
        >
          {brandName}
        </a>
        {showCraftedBy && <span> | Crafted with logic</span>}
      </div>
    </footer>
  );
}
