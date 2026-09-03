import { motion } from "framer-motion";

/** Shared terminal flicker: a line that blinks in like a slow CRT readout. */
const FLICKER_KEYFRAMES = [0, 1, 0.4, 1, 0.4, 1];
const FLICKER_TIMES = [0, 0.2, 0.4, 0.6, 0.8, 1];

export default function LoaderLine({
  text,
  className = "font-mono text-terminal-green mt-1",
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: FLICKER_KEYFRAMES,
      }}
      transition={{
        duration: 1.4, // slow terminal flicker
        ease: "easeInOut",
        times: FLICKER_TIMES,
      }}
      className={className}
    >
      {text}
    </motion.div>
  );
}
