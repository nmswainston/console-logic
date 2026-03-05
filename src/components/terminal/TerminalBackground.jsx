import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function TerminalBackground() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-30"
      style={{
        opacity: 0.07,
        backgroundImage:
          "linear-gradient(to right, var(--color-terminal-green-subtle) 1px, transparent 1px), linear-gradient(to bottom, var(--color-terminal-green-subtle) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    />
  );
}
