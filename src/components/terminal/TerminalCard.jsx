import { useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import { motion } from "framer-motion";

export default function TerminalCard({ children, className = "" }) {
  const reduce = useReducedMotion();
  const hoverClasses = useMemo(
    () => (reduce ? "" : "group card-hover-lift"),
    [reduce]
  );

  return (
    <motion.div
      className={`terminal-panel relative rounded-lg border border-border border-t-terminal-green-dim bg-elevated p-6 font-mono text-base leading-normal ${hoverClasses} ${className}`}
    >
      <div
        aria-hidden="true"
        className="terminal-panel-texture pointer-events-none absolute inset-0 rounded-lg"
      />
      <div
        className={`absolute inset-0 rounded-lg border border-terminal-green/20 pointer-events-none opacity-0 transition-opacity duration-200 ease-out ${reduce ? "" : "group-hover:opacity-100"}`}
        aria-hidden
      />
      <div className="relative [&>*+*]:mt-3">{children}</div>
    </motion.div>
  );
}
