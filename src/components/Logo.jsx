/**
 * The wordmark, with its per-token colouring. Every visible instance of
 * console.log(ic) on the site renders through this so the palette stays in one
 * place: `>_` and the punctuation white, `console` green, `log` and `ic` blue.
 *
 * `className` carries the type size for the context it sits in (the header uses
 * the default, the footer sets its own). `showPrompt` drops the leading `>_`
 * for places that read as prose rather than as a terminal line.
 */
export default function Logo({ className = "text-xl", showPrompt = true }) {
  return (
    <span
      className={`font-display tracking-tight whitespace-nowrap leading-snug ${className}`}
    >
      {showPrompt && <span className="logo-white">&gt;_</span>}
      <span className="logo-green">console</span>
      <span className="logo-white">.</span>
      <span className="logo-blue">log</span>
      <span className="logo-white">(</span>
      <span className="logo-blue">ic</span>
      <span className="logo-white">)</span>
    </span>
  );
}
