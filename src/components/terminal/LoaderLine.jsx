import { motion } from "framer-motion";

export default function LoaderLine({ text }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1, 0.4, 1, 0.4, 1],
      }}
      transition={{
        duration: 1.4, // slow terminal flicker
        ease: "easeInOut",
        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
      }}
      className="font-mono text-terminal-green mt-1"
    >
      {text}
    </motion.div>
  );
}