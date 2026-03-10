import { motion } from "framer-motion";
import { SCANLINE_OPACITY } from "@/data/constants";

export default function ScanlineOverlay() {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-20 mix-blend-overlay"
      style={{
        opacity: SCANLINE_OPACITY,
        backgroundImage: `repeating-linear-gradient(
          0deg,
          transparent 0px,
          transparent 2px,
          var(--color-scanline-overlay) 2px,
          var(--color-scanline-overlay) 4px
        )`,
      }}
    />
  );
}
