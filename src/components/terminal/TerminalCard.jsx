import { useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import { motion } from "framer-motion";

/* hoverRing=false keeps the border color constant on hover (no green ring) -
   used for project tiles, where the description panel expands the tile and the
   border should not brighten while it does. */
export default function TerminalCard({ children, className = "", hoverRing = true }) {
  const reduce = useReducedMotion();
  const hoverClasses = useMemo(
    () =>
      reduce ? "" : `group card-hover-lift${hoverRing ? "" : " card-hover-quiet"}`,
    [reduce, hoverRing]
  );

  return (
    <motion.div
      className={`terminal-panel relative rounded-lg border border-border border-t-terminal-green-dim bg-elevated p-6 font-mono text-base leading-normal ${hoverClasses} ${className}`}
    >
      <div
        aria-hidden="true"
        className="terminal-panel-texture pointer-events-none absolute inset-0 rounded-lg"
      />
      {hoverRing && (
        <div
          className={`absolute inset-0 rounded-lg border border-terminal-green/20 pointer-events-none opacity-0 transition-opacity duration-200 ease-out ${reduce ? "" : "group-hover:opacity-100"}`}
          aria-hidden
        />
      )}
      <div className="relative [&>*+*]:mt-3">{children}</div>
    </motion.div>
  );
}
