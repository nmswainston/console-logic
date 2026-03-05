import { useReducedMotion } from "framer-motion";

export default function TerminalGlow() {
  const reduce = useReducedMotion();

  if (reduce) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-40"
    >
      <div className="terminal-glow h-full w-full" />
    </div>
  );
}
