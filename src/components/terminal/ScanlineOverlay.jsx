import { motion } from "framer-motion";
import { SCANLINE_OPACITY } from "@/data/constants";

export default function ScanlineOverlay() {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-20 mix-blend-overlay bg-[url('/scanlines.png')]"
      style={{ opacity: SCANLINE_OPACITY }}
    />
  );
}
