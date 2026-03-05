import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DURATION_FAST, EASE_SMOOTH } from "@/data/constants";

const HOVER_TRANSITION = { duration: DURATION_FAST, ease: EASE_SMOOTH };
const HOVER_STYLE = {
  scale: 1.02,
};

export default function TerminalCard({ children, className = "" }) {
  const reduce = useReducedMotion();
  const whileHover = useMemo(
    () => (reduce ? {} : HOVER_STYLE),
    [reduce]
  );

  return (
    <motion.div
      whileHover={whileHover}
      transition={HOVER_TRANSITION}
      className={`terminal-panel relative rounded-lg border border-border border-t-terminal-green-dim bg-elevated p-6 font-mono text-base leading-normal ${className}`}
    >
      <div
        aria-hidden="true"
        className="terminal-panel-texture pointer-events-none absolute inset-0 rounded-lg"
      />
      <motion.div
        className="absolute inset-0 rounded-lg border border-terminal-green/20 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={reduce ? {} : { opacity: 1 }}
        transition={HOVER_TRANSITION}
      />
      <div className="relative [&>*+*]:mt-3">{children}</div>
    </motion.div>
  );
}
